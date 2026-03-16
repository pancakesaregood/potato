import {
  fetchJSON,
  getManifestoFiles,
  getOpenPRs,
  getRecentCommits,
  getContributors,
  getRepoInfo,
  getPipelineStatus,
  getFileContent,
  formatDate
} from './github.js';

import { API_BASE, REPO_OWNER, REPO_NAME } from './config.js';

// --- Stat helpers -----------------------------------------------------------

function setStat(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function escapeHTML(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// --- ADR count --------------------------------------------------------------

async function fetchADRCount() {
  const url   = `${API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}/contents/docs/adr`;
  const files = await fetchJSON(url);
  return files.filter(f =>
    f.type === 'file' &&
    /^\d{4}-/.test(f.name) &&
    f.name.endsWith('.md')
  ).length;
}

// --- Load all sections in parallel -----------------------------------------

async function loadDashboard() {
  const [articles, prs, commits, contributors, , pipeline, adrCount] =
    await Promise.allSettled([
      getManifestoFiles(),
      getOpenPRs(),
      getRecentCommits(),
      getContributors(),
      getRepoInfo(),       // fetched but not used directly; kept for future use
      getPipelineStatus(),
      fetchADRCount()
    ]);

  setStat('stat-articles',     articles.status     === 'fulfilled' ? articles.value.length     : '?');
  setStat('stat-prs',          prs.status          === 'fulfilled' ? prs.value.length          : '?');
  setStat('stat-contributors', contributors.status === 'fulfilled' ? contributors.value.length : '?');

  if (commits.status === 'fulfilled') {
    setStat('stat-commits', commits.value.length < 10 ? commits.value.length : '10+');
  } else {
    setStat('stat-commits', '?');
  }

  renderPipelineStatus(pipeline);
  renderCommits(commits);
  loadVersion();

  if (adrCount.status === 'fulfilled') {
    setStat('adr-count', adrCount.value);
  }
}

// --- Pipeline status --------------------------------------------------------

function renderPipelineStatus(result) {
  const el = document.getElementById('pipeline-status');
  if (!el) return;

  if (result.status !== 'fulfilled') {
    el.innerHTML = '<span class="pipeline-badge pipeline-unknown">Unknown</span>';
    return;
  }

  const runs = result.value?.workflow_runs;
  if (!runs?.length) {
    el.innerHTML = '<span class="pipeline-badge pipeline-unknown">No runs found</span>';
    return;
  }

  const latest     = runs[0];
  const conclusion = latest.conclusion;
  const date       = formatDate(latest.updated_at);
  const link       = `<a href="${latest.html_url}" target="_blank" rel="noopener">view ↗</a>`;

  if (conclusion === 'success') {
    el.innerHTML = `
      <div style="text-align:right;">
        <span class="pipeline-badge pipeline-pass">✓ Passing</span>
        <div style="font-size:0.8rem;color:var(--text-muted);margin-top:.25rem;">Last run ${date} &mdash; ${link}</div>
      </div>`;
  } else if (conclusion === 'failure') {
    el.innerHTML = `
      <div style="text-align:right;">
        <span class="pipeline-badge pipeline-fail">✗ Failing</span>
        <div style="font-size:0.8rem;color:var(--text-muted);margin-top:.25rem;">Last run ${date} &mdash; ${link}</div>
      </div>`;
  } else {
    el.innerHTML = `<span class="pipeline-badge pipeline-unknown">${conclusion || 'In progress'}</span>`;
  }
}

// --- Recent commits ---------------------------------------------------------

function renderCommits(result) {
  const list = document.getElementById('commit-list');
  if (!list) return;

  if (result.status !== 'fulfilled' || !result.value.length) {
    list.innerHTML = '<li><div class="state-error"><p>Could not load commit history.</p></div></li>';
    return;
  }

  list.innerHTML = result.value.map(c => {
    const sha  = c.sha.substring(0, 7);
    const msg  = escapeHTML(c.commit.message.split('\n')[0]);
    const date = formatDate(c.commit.author.date);
    return `
      <li class="commit-item">
        <a class="commit-sha" href="${c.html_url}" target="_blank" rel="noopener"
           title="${c.sha}" aria-label="Commit ${sha}">${sha}</a>
        <span class="commit-msg">${msg}</span>
        <span class="commit-date">${date}</span>
      </li>`;
  }).join('');
}

// --- Version ----------------------------------------------------------------

async function loadVersion() {
  const el = document.getElementById('repo-version');
  if (!el) return;
  try {
    el.textContent = (await getFileContent('VERSION')).trim() || '—';
  } catch {
    el.textContent = '—';
  }
}

// --- Init -------------------------------------------------------------------

loadDashboard();
