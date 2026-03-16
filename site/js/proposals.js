import { getOpenPRs, formatDate } from './github.js';

const prList = document.getElementById('pr-list');

function renderLabels(labels) {
  if (!labels || !labels.length) return '';
  return labels
    .map(l => `<span class="badge badge-label">${l.name}</span>`)
    .join(' ');
}

function renderPR(pr) {
  const date   = formatDate(pr.updated_at);
  const labels = renderLabels(pr.labels);

  return `
    <li class="pr-item">
      <div class="pr-item-title">
        <a href="${pr.html_url}" target="_blank" rel="noopener">
          ${escapeHTML(pr.title)}
        </a>
        <span class="badge badge-open" style="margin-left:0.5rem;">Open</span>
      </div>
      <div class="pr-item-meta">
        <span>
          <a href="${pr.user.html_url}" target="_blank" rel="noopener"
             style="color:inherit; text-decoration:underline; text-underline-offset:2px;">
            @${escapeHTML(pr.user.login)}
          </a>
        </span>
        <span>Updated ${date}</span>
        <span>#${pr.number}</span>
        ${labels ? `<span>${labels}</span>` : ''}
      </div>
    </li>
  `;
}

function escapeHTML(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

async function loadProposals() {
  try {
    const prs = await getOpenPRs();

    if (!prs.length) {
      prList.innerHTML = `
        <li>
          <div class="state-empty">
            <p>No open proposals at the moment.</p>
            <p style="font-size:0.9rem;">
              Be the first —
              <a href="https://github.com/pancakesaregood/potato/issues/new?template=policy_proposal.yml"
                 target="_blank" rel="noopener">submit a proposal ↗</a>
            </p>
          </div>
        </li>
      `;
      return;
    }

    prList.innerHTML = prs.map(renderPR).join('');
  } catch (err) {
    prList.innerHTML = `
      <li>
        <div class="state-error">
          <p>Could not load proposals: ${err.message}</p>
          <p style="margin-top:0.5rem; font-size:0.9rem;">
            <a href="https://github.com/pancakesaregood/potato/pulls"
               target="_blank" rel="noopener">View on GitHub instead ↗</a>
          </p>
        </div>
      </li>
    `;
  }
}

loadProposals();
