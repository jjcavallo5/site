export interface ContributionCalendarDay {
  date: string;
  contributionCount: number;
  contributionLevel:
    | "FIRST_QUARTILE"
    | "SECOND_QUARTILE"
    | "THIRD_QUARTILE"
    | "FOURTH_QUARTILE"
    | "NONE";
  color: string;
  weekday: number;
}

export interface ContributionCalendarWeek {
  contributionDays: ContributionCalendarDay[];
  firstDay: string;
}

export interface ContributionCalendarMonth {
  name: string;
  year: number;
  firstDay: string;
  totalWeeks: number;
}

export interface ContributionCalendar {
  totalContributions: number;
  weeks: ContributionCalendarWeek[];
  months: ContributionCalendarMonth[];
}

export interface ContributionsCollection {
  contributionCalendar: ContributionCalendar;
  totalCommitContributions: number;
  totalIssueContributions: number;
  totalPullRequestContributions: number;
  totalPullRequestReviewContributions: number;
  totalRepositoryContributions: number;
  restrictedContributionsCount: number;
  contributionYears: number[];
}

export interface RepositoryLanguage {
  name: string;
  color: string;
}

export interface RepositoryOwner {
  login: string;
  url: string;
}

export interface Repository {
  name: string;
  nameWithOwner: string;
  description: string | null;
  url: string;
  stargazerCount: number;
  forkCount: number;
  primaryLanguage: RepositoryLanguage | null;
  owner: RepositoryOwner;
  isPrivate: boolean;
  isFork: boolean;
  updatedAt: string;
}

interface GitHubContributionsResponse {
  data: {
    viewer: {
      contributionsCollection: ContributionsCollection;
    };
  };
  errors?: { message: string }[];
}

const query = `{
  viewer {
    contributionsCollection {
      totalCommitContributions
      totalIssueContributions
      totalPullRequestContributions
      totalPullRequestReviewContributions
      totalRepositoryContributions
      restrictedContributionsCount
      contributionYears
      contributionCalendar {
        totalContributions
        weeks {
          firstDay
          contributionDays {
            date
            contributionCount
            contributionLevel
            color
            weekday
          }
        }
        months {
          name
          year
          firstDay
          totalWeeks
        }
      }
    }
  }
}`;

export async function fetchGitHubContributions(): Promise<ContributionsCollection> {
  const token = import.meta.env.GITHUB_TOKEN;
  if (!token) {
    throw new Error("GITHUB_TOKEN environment variable is not set");
  }

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  if (!res.ok) {
    throw new Error(
      `GitHub API request failed: ${res.status} ${res.statusText}`,
    );
  }

  const json: GitHubContributionsResponse = await res.json();

  if (json.errors) {
    throw new Error(
      `GitHub GraphQL errors: ${json.errors.map((e) => e.message).join(", ")}`,
    );
  }

  return json.data.viewer.contributionsCollection;
}

interface GitHubRepositoriesResponse {
  data: {
    viewer: {
      repositoriesContributedTo: {
        nodes: Repository[];
      };
    };
  };
  errors?: { message: string }[];
}

const recentReposQuery = `query($count: Int!) {
  viewer {
    repositoriesContributedTo(
      first: $count
      includeUserRepositories: true
      contributionTypes: [COMMIT, PULL_REQUEST, ISSUE, PULL_REQUEST_REVIEW]
      orderBy: { field: PUSHED_AT, direction: DESC }
    ) {
      nodes {
        name
        nameWithOwner
        description
        url
        stargazerCount
        forkCount
        primaryLanguage {
          name
          color
        }
        owner {
          login
          url
        }
        isPrivate
        isFork
        updatedAt
      }
    }
  }
}`;

export async function fetchRecentRepositories(): Promise<Repository[]> {
  const token = import.meta.env.GITHUB_TOKEN;
  if (!token) {
    throw new Error("GITHUB_TOKEN environment variable is not set");
  }

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: recentReposQuery,
      variables: { count: 100 },
    }),
  });

  if (!res.ok) {
    throw new Error(
      `GitHub API request failed: ${res.status} ${res.statusText}`,
    );
  }

  const json: GitHubRepositoriesResponse = await res.json();

  if (json.errors) {
    throw new Error(
      `GitHub GraphQL errors: ${json.errors.map((e) => e.message).join(", ")}`,
    );
  }

  return json.data.viewer.repositoriesContributedTo.nodes
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .filter((repo) => !repo.isPrivate);
}
