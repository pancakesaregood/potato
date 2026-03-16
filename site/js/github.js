/**
 * GitHub REST API wrapper.
 * All reads are unauthenticated (public repo). Responses are cached in
 * sessionStorage to stay within the 60 req/hour unauthenticated rate limit.
 */

import { API_BASE, REPO_OWNER, REPO_NAME, MANIFESTO_PATH, CACHE_TTL } from './config.js';

// --- Cache helpers -----------------------------------------------------------

function cacheKey(url) {
  return `pppc_cache:${url}`;
}

function cacheGet(url) {
  try {
    const raw = sessionStorage.getItem(cacheKey(url));
    if (!raw) return null;
    const { data, ts } = JSON.parse(raw);
    if (Date.now() - ts > CACHE_TTL) {
      sessionStorage.removeItem(cacheKey(url));
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

function cacheSet(url, data) {
  try {
    sessionStorage.setItem(cacheKey(url), JSON.stringify({ data, ts: Date.now() }));
  } catch {
    // sessionStorage quota exceeded; silently skip caching.
  }
}

function decodeBase64Utf8(content) {
  const binary = atob(content.replace(/\n/g, ''));
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));

  try {
    return new TextDecoder('utf-8').decode(bytes);
  } catch {
    return binary;
  }
}

// --- Core fetch --------------------------------------------------------------

export async function fetchJSON(url) {
  const cached = cacheGet(url);
  if (cached !== null) return cached;

  const res = await fetch(url, {
    headers: { Accept: 'application/vnd.github+json' }
  });

  if (res.status === 403) {
    throw new Error('GitHub API rate limit reached. Please wait a few minutes and try again.');
  }
  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  cacheSet(url, data);
  return data;
}

// --- Content API -------------------------------------------------------------

/**
 * Returns a sorted list of manifesto article file metadata objects.
 * Filters to .md files only; excludes README.md.
 */
export async function getManifestoFiles() {
  const url = `${API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${MANIFESTO_PATH}`;
  const files = await fetchJSON(url);
  return files
    .filter((file) => file.type === 'file' && file.name.endsWith('.md') && file.name.toLowerCase() !== 'readme.md')
    .sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Fetches and decodes the content of a single file by its path.
 * Returns the decoded UTF-8 string.
 */
export async function getFileContent(path) {
  const url = `${API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`;
  const file = await fetchJSON(url);
  return decodeBase64Utf8(file.content);
}

// --- Pulls API ---------------------------------------------------------------

/**
 * Returns open pull requests against main, most recently updated first.
 */
export async function getOpenPRs() {
  const url = `${API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}/pulls?state=open&base=main&per_page=30&sort=updated&direction=desc`;
  return fetchJSON(url);
}

// --- Repo metadata -----------------------------------------------------------

/**
 * Returns basic repository information.
 */
export async function getRepoInfo() {
  const url = `${API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}`;
  return fetchJSON(url);
}

/**
 * Returns the most recent commits (up to 10).
 */
export async function getRecentCommits() {
  const url = `${API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}/commits?per_page=10`;
  return fetchJSON(url);
}

/**
 * Returns contributor statistics.
 */
export async function getContributors() {
  const url = `${API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}/contributors?per_page=30`;
  return fetchJSON(url);
}

/**
 * Returns recent workflow runs for the policy-lint workflow.
 */
export async function getPipelineStatus() {
  const url = `${API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}/actions/workflows/policy-lint.yml/runs?per_page=1`;
  return fetchJSON(url);
}

// --- Utility -----------------------------------------------------------------

/**
 * Extracts a human-readable title from a manifesto filename.
 * e.g. "article_05_housing_and_homelessness.md" -> "Article 05: Housing and Homelessness"
 *      "why_the_potato.md" -> "Why the Potato?"
 */
export function filenameToTitle(filename) {
  const base = filename.replace(/\.md$/, '');

  if (base === 'why_the_potato') return 'Why the Potato?';

  const match = base.match(/^article_(\d+)_(.+)$/);
  if (match) {
    const num = match[1];
    const words = match[2].split('_').map((word) => word.charAt(0).toUpperCase() + word.slice(1));
    return `Article ${num}: ${words.join(' ')}`;
  }

  return base.split('_').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

/**
 * Formats an ISO date string to a readable date.
 */
export function formatDate(iso) {
  if (!iso) return '-';
  return new Date(iso).toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}
