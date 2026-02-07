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
