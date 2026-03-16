// Repository configuration — update if the repo is renamed or transferred.
export const REPO_OWNER = 'pancakesaregood';
export const REPO_NAME  = 'potato';

// Content paths within the repository.
export const MANIFESTO_PATH   = 'instances/canada/manifesto';
export const PROPOSALS_PATH   = 'instances/canada/proposals';
export const EXPERIMENTS_PATH = 'docs/experiments';

// GitHub REST API base.
export const API_BASE = 'https://api.github.com';

// Proposal submission: redirects to GitHub Issues with template pre-filled.
export const ISSUES_URL = `https://github.com/${REPO_OWNER}/${REPO_NAME}/issues/new?template=policy_proposal.yml`;

// Cache TTL in milliseconds (5 minutes).
export const CACHE_TTL = 5 * 60 * 1000;
