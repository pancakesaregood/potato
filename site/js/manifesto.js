import { getManifestoFiles, getFileContent, filenameToTitle } from './github.js';
import { MANIFESTO_PATH } from './config.js';

const articleList    = document.getElementById('article-list');
const articlePanel   = document.getElementById('article-panel');
const articleWelcome = document.getElementById('article-welcome');
const articleContent = document.getElementById('article-content');

// Lazily-loaded rendering libraries (ES module imports from jsDelivr).
let markedFn   = null;
let purifyFn   = null;

async function ensureRenderers() {
  if (!markedFn) {
    const mod = await import('https://cdn.jsdelivr.net/npm/marked/+esm');
    // marked exports: { marked, Marked, ... } — use the parse function directly.
    markedFn = mod.marked ?? mod.default;
  }
  if (!purifyFn) {
    const mod = await import('https://cdn.jsdelivr.net/npm/dompurify/+esm');
    purifyFn = mod.default ?? mod.DOMPurify;
  }
}

// --- Render article ---------------------------------------------------------

async function loadArticle(filename) {
  history.replaceState(null, '', `#${filename}`);

  document.querySelectorAll('.article-list a').forEach(a => {
    a.classList.toggle('active', a.dataset.article === filename);
  });

  articleWelcome.hidden = true;
  articleContent.hidden = false;
  articleContent.innerHTML = '<div class="state-loading"><div class="spinner"></div><p>Loading…</p></div>';
  articlePanel.setAttribute('aria-busy', 'true');

  try {
    await ensureRenderers();
    const raw  = await getFileContent(`${MANIFESTO_PATH}/${filename}`);
    const html = purifyFn.sanitize(markedFn.parse(raw));

    articleContent.innerHTML = `
      <div class="article-meta">
        <span>${filenameToTitle(filename)}</span>
        &ensp;&bull;&ensp;
        <a href="https://github.com/pancakesaregood/potato/blob/main/${MANIFESTO_PATH}/${filename}"
           target="_blank" rel="noopener">View on GitHub ↗</a>
      </div>
      <div class="article-body">${html}</div>
    `;
  } catch (err) {
    articleContent.innerHTML = `<div class="state-error"><p>Could not load article: ${err.message}</p></div>`;
  } finally {
    articlePanel.setAttribute('aria-busy', 'false');
  }
}

// --- Populate article list --------------------------------------------------

async function buildArticleList() {
  try {
    const files = await getManifestoFiles();

    if (!files.length) {
      articleList.innerHTML = '<li><div class="state-empty"><p>No articles found.</p></div></li>';
      return;
    }

    articleList.innerHTML = '';
    files.forEach(file => {
      const li = document.createElement('li');
      const a  = document.createElement('a');
      a.href            = `#${file.name}`;
      a.textContent     = filenameToTitle(file.name);
      a.dataset.article = file.name;
      a.addEventListener('click', e => { e.preventDefault(); loadArticle(file.name); });
      li.appendChild(a);
      articleList.appendChild(li);
    });

    const hash = window.location.hash.replace('#', '');
    if (hash && files.find(f => f.name === hash)) {
      loadArticle(hash);
    }
  } catch (err) {
    articleList.innerHTML = `<li><div class="state-error"><p>${err.message}</p></div></li>`;
  }
}

// --- Welcome link -----------------------------------------------------------

const welcomeLink = document.querySelector('[data-article="why_the_potato.md"]');
if (welcomeLink) {
  welcomeLink.addEventListener('click', e => { e.preventDefault(); loadArticle('why_the_potato.md'); });
}

buildArticleList();
