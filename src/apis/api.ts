import { Octokit } from 'octokit';

// auth: import.meta.env.VITE_GITHUB_TOKEN,
// baseUrl: import.meta.env.VITE_BASE_API_URL,

export const octokit = new Octokit({
  baseUrl: 'https://api.github.com/repos/facebook/react',
});

export const getIssuesPage = async (pageParam = 1) => {
  const { data } = await octokit.request(
    `GET /issues?state=open&sort=comments&per_page=12&page=${pageParam}`,
  );
  return data;
};

export const getIssueDetails = async (id: number) => {
  if (id) {
    const { data } = await octokit.request(`GET /issues/${id}`);
    return data;
  }
};
