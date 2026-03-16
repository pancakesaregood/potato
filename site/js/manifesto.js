import { getManifestoFiles, getFileContent, filenameToTitle } from './github.js';
import { MANIFESTO_PATH } from './config.js';

// CDN-delivered libraries: marked (markdown) + DOMPurify (XSS sanitisation).
const MARKED_CDN  = 'https://cdn.jsdelivr.net/npm/marked@12/marked.min.js';
const PURIFY_CDN  = 'https://cdn.jsdelivr.net/npm/dompurify@3/dist/purify.min.js';

const articleList    = document.getElementById('article-list');
const articlePanel   = document.getElementById('article-panel');
const articleWelcome = document.getElementById('article-welcome');
const articleContent = document.getElementById('article-content');

let markedLoaded  = false;
let purifyLoaded  = false;

// --- Load CDN scripts -------------------------------------------------------

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = src; s.async = true;
    s.onload = resolve; s.onerror = reject;
    document.head.appendChild(s);
  });
}

async function ensureRenderers() {
  if (!markedLoaded)  { await loadScript(MARKED_CDN);  markedLoaded  = true; }
  if (!purifyLoaded)  { await loadScript(PURIFY_CDN);  purifyLoaded  = true; }
}

// --- Render article ---------------------------------------------------------

async function loadArticle(filename) {
  // Update URL hash for bookmarkability.
  history.replaceState(null, '', `#${filename}`);

  // Mark active in list.
  document.querySelectorAll('.article-list a').forEach(a => {
    a.classList.toggle('active', a.dataset.article === filename);
  });

  // Show loading state.
  articleWelcome.hidden = true;
  articleContent.hidden = false;
  articleContent.innerHTML = '<div class="state-loading"><div class="spinner"></div><p>Loading…</p></div>';
  articlePanel.setAttribute('aria-busy', 'true');

  try {
    await ensureRenderers();
    const path    = `${MANIFESTO_PATH}/${filename}`;
    const raw     = await getFileContent(path);
    const html    = window.DOMPurify.sanitize(window.marked.parse(raw));

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
      a.href         = `#${file.name}`;
      a.textContent  = filenameToTitle(file.name);
      a.dataset.article = file.name;
      a.addEventListener('click', e => {
        e.preventDefault();
        loadArticle(file.name);
      });
      li.appendChild(a);
      articleList.appendChild(li);
    });

    // If there's a hash in the URL, load that article.
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
  welcomeLink.addEventListener('click', e => {
    e.preventDefault();
    loadArticle('why_the_potato.md');
  });
}

// --- Init -------------------------------------------------------------------

buildArticleList();
