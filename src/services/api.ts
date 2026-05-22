import { graphql, GraphqlResponseError } from "@octokit/graphql";
import type { GraphQlQueryResponseData } from "@octokit/graphql";

const VITE_GH_API_TOKEN = import.meta.env.VITE_GH_API_TOKEN;
const GH_USERNAME = "gary-rivera";

const GitHubGQLConfig = graphql.defaults({
	headers: {
		authorization: `Bearer ${VITE_GH_API_TOKEN}`,
	},
});

interface LanguageEdge {
	node: {
		name: string;
	};
}

interface RepositoryData {
	name: string;
	description: string;
	stargazerCount: number;
	createdAt: string;
	url: string;
	languages: {
		edges: LanguageEdge[];
	};
	primaryLanguage?: {
		name: string;
	};
	owner: {
		login: string;
		avatarUrl: string;
	};
	repositoryTopics?: {
		edges: {
			node: {
				topic: {
					name: string;
				};
			};
		}[];
	};
	defaultBranchRef?: {
		target?: {
			history?: {
				totalCount: number;
			};
		};
	};
}

export const fetchGithubRepositoriesGQL = async (repoNames: string[]): Promise<Record<string, RepositoryData>> => {
	const sanitizeAlias = (name: string) => name.replace(/[^a-zA-Z0-9_]/g, "_");
	const queries = repoNames
		.map(
			(repoName) => `
      ${sanitizeAlias(repoName)}: repository(owner: "${GH_USERNAME}", name: "${repoName}") {
        name
        description
        createdAt
        url
        languages(first: 5) {
          edges {
            node {
              name
            }
          }
        }
        primaryLanguage {
          name
        }
        defaultBranchRef {
          target {
            ... on Commit {
              history {
                totalCount
              }
            }
          }
        }
        repositoryTopics(first: 5) {
          edges {
            node {
              topic {
                name
              }
            }
          }
        }
      }
    `,
		)
		.join("\n");

	const query = `query { ${queries} }`;

	try {
		const data: GraphQlQueryResponseData = await GitHubGQLConfig(query);

		return data as Record<string, RepositoryData>;
	} catch (error) {
		if (error instanceof GraphqlResponseError) {
			console.error("Partial data retrieved:", error.data);
			console.error("GraphQL Error Message:", error.message);
			return error.data as Record<string, RepositoryData>;
		}
		throw error;
	}
};

export const fetcher = (url: string) =>
	fetch(url, {
		headers: {
			Authorization: `Bearer ${VITE_GH_API_TOKEN}`,
		},
	}).then((res) => {
		if (!res.ok) throw new Error("Failed to fetch data");
		return res.json();
	});
