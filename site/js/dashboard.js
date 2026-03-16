import {
  getManifestoFiles,
  getOpenPRs,
  getRecentCommits,
  getContributors,
  getRepoInfo,
  getPipelineStatus,
  getFileContent,
  formatDate
} from './github.js';

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

// --- Load all sections in parallel -----------------------------------------

async function loadDashboard() {
  // Fire all requests simultaneously — they are independent.
  const [articles, prs, commits, contributors, repoInfo, pipeline, adrFiles] =
    await Promise.allSettled([
      getManifestoFiles(),
      getOpenPRs(),
      getRecentCommits(),
      getContributors(),
      getRepoInfo(),
      getPipelineStatus(),
      fetchADRFiles()
    ]);

  // Article count
  if (articles.status === 'fulfilled') {
    setStat('stat-articles', articles.value.length);
  } else {
    setStat('stat-articles', '?');
  }

  // Open PRs
  if (prs.status === 'fulfilled') {
    setStat('stat-prs', prs.value.length);
  } else {
    setStat('stat-prs', '?');
  }

  // Contributors
  if (contributors.status === 'fulfilled') {
    setStat('stat-contributors', contributors.value.length);
  } else {
    setStat('stat-contributors', '?');
  }

  // Commit count (repo info gives us a forks_count but not commits directly;
  // we use the commits array length as a "recent" figure and note that below)
  if (commits.status === 'fulfilled') {
    setStat('stat-commits', commits.value.length < 10 ? commits.value.length : '10+');
  } else {
    setStat('stat-commits', '?');
  }

  // Pipeline status
  renderPipelineStatus(pipeline);

  // Recent commits
  renderCommits(commits);

  // Version
  loadVersion();

  // ADR count
  if (adrFiles.status === 'fulfilled') {
    const adrEl = document.getElementById('adr-count');
    if (adrEl) adrEl.textContent = adrFiles.value;
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
  if (!runs || !runs.length) {
    el.innerHTML = '<span class="pipeline-badge pipeline-unknown">No runs found</span>';
    return;
  }

  const latest = runs[0];
  const conclusion = latest.conclusion;
  const date = formatDate(latest.updated_at);

  if (conclusion === 'success') {
    el.innerHTML = `
      <div style="text-align:right;">
        <span class="pipeline-badge pipeline-pass">✓ Passing</span>
        <div style="font-size:0.8rem; color:var(--text-muted); margin-top:0.25rem;">
          Last run ${date} &mdash;
          <a href="${latest.html_url}" target="_blank" rel="noopener">view ↗</a>
        </div>
      </div>
    `;
  } else if (conclusion === 'failure') {
    el.innerHTML = `
      <div style="text-align:right;">
        <span class="pipeline-badge pipeline-fail">✗ Failing</span>
        <div style="font-size:0.8rem; color:var(--text-muted); margin-top:0.25rem;">
          Last run ${date} &mdash;
          <a href="${latest.html_url}" target="_blank" rel="noopener">view ↗</a>
        </div>
      </div>
    `;
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
    const url  = c.html_url;
    return `
      <li class="commit-item">
        <a class="commit-sha" href="${url}" target="_blank" rel="noopener"
           title="${c.sha}" aria-label="Commit ${sha}">${sha}</a>
        <span class="commit-msg">${msg}</span>
        <span class="commit-date">${date}</span>
      </li>
    `;
  }).join('');
}

// --- Version ----------------------------------------------------------------

async function loadVersion() {
  const el = document.getElementById('repo-version');
  if (!el) return;
  try {
    const raw = await getFileContent('VERSION');
    el.textContent = raw.trim() || '—';
  } catch {
    el.textContent = '—';
  }
}

// --- ADR count --------------------------------------------------------------

async function fetchADRFiles() {
  const { fetchJSON } = await import('./github.js');
  const { API_BASE, REPO_OWNER, REPO_NAME } = await import('./config.js');
  const url   = `${API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}/contents/docs/adr`;
  const files = await fetchJSON(url);
  // Count numbered ADRs (pattern: NNNN-*.md), excluding template and README.
  const count = files.filter(f =>
    f.type === 'file' &&
    /^\d{4}-/.test(f.name) &&
    f.name.endsWith('.md')
  ).length;
  return count;
}

// --- Init -------------------------------------------------------------------

loadDashboard();
