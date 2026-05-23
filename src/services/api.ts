const VITE_GH_API_TOKEN = import.meta.env.VITE_GH_API_TOKEN;
const GH_USERNAME = "gary-rivera";

interface LanguageEdge {
	node: { name: string };
}

export interface RepositoryData {
	name: string;
	description: string;
	stargazerCount: number;
	createdAt: string;
	url: string;
	languages: { edges: LanguageEdge[] };
	primaryLanguage?: { name: string };
	owner: { login: string; avatarUrl: string };
	repositoryTopics?: {
		edges: { node: { topic: { name: string } } }[];
	};
	defaultBranchRef?: {
		target?: { history?: { totalCount: number } };
	};
}

interface GraphQLResponse<T> {
	data?: T;
	errors?: Array<{ message: string }>;
}

async function postGraphQL<T>(query: string): Promise<T> {
	const res = await fetch("https://api.github.com/graphql", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			...(VITE_GH_API_TOKEN ? { Authorization: `bearer ${VITE_GH_API_TOKEN}` } : {}),
		},
		body: JSON.stringify({ query }),
	});
	if (!res.ok) throw new Error(`GitHub GraphQL ${res.status}`);
	const json = (await res.json()) as GraphQLResponse<T>;
	if (json.errors?.length) {
		console.error("GraphQL errors:", json.errors);
	}
	if (!json.data) throw new Error("GitHub GraphQL: no data");
	return json.data;
}

export const fetchGithubRepositoriesGQL = async (
	repoNames: string[],
): Promise<Record<string, RepositoryData>> => {
	const sanitizeAlias = (name: string) => name.replace(/[^a-zA-Z0-9_]/g, "_");
	const queries = repoNames
		.map(
			(repoName) => `
      ${sanitizeAlias(repoName)}: repository(owner: "${GH_USERNAME}", name: "${repoName}") {
        name
        description
        createdAt
        url
        languages(first: 5) { edges { node { name } } }
        primaryLanguage { name }
        defaultBranchRef {
          target {
            ... on Commit { history { totalCount } }
          }
        }
        repositoryTopics(first: 5) {
          edges { node { topic { name } } }
        }
      }
    `,
		)
		.join("\n");

	const query = `query { ${queries} }`;
	return postGraphQL<Record<string, RepositoryData>>(query);
};

export const fetcher = (url: string) =>
	fetch(url, {
		headers: VITE_GH_API_TOKEN ? { Authorization: `bearer ${VITE_GH_API_TOKEN}` } : {},
	}).then((res) => {
		if (!res.ok) throw new Error("Failed to fetch data");
		return res.json();
	});
