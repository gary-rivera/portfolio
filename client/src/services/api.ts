import { graphql, GraphqlResponseError } from '@octokit/graphql'
import type { GraphQlQueryResponseData } from "@octokit/graphql";

const VITE_GH_API_TOKEN = import.meta.env.VITE_GH_API_TOKEN
const GH_USERNAME = "gary-rivera"

const GitHubGQLConfig = graphql.defaults({
  headers: {
    authorization: `token ${VITE_GH_API_TOKEN}`,
  },
})

export const fetchGithubRepositoryGQL = async (username: string, repoName: string) => {
  const query = `
    query ($username: String!, $repoName: String!) {
      repository(owner: $username, name: $repoName) {
        name
        description
        stargazerCount
        createdAt
        languages(first: 5) {
          edges {
            node {
              name
            }
          }
        }
        owner {
          login
          avatarUrl
        }
        primaryLanguage {
          name
        }
      }
    }
  `

  const variables = { username, repoName }
  const { repository }: GraphQlQueryResponseData = await GitHubGQLConfig(query, variables)
  return repository
}
export const fetchGithubRepositoriesGQL = async (repoNames: string[]) => {
  const queries = repoNames.map((repoName) => `
    ${repoName}: repository(owner: "${GH_USERNAME}", name: "${repoName}") {
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
    }
  `).join("\n")
  const query = `query { ${queries} }`

  try {
    const data: GraphQlQueryResponseData = await GitHubGQLConfig(query)
    return data
  } catch (error) {
    if (error instanceof GraphqlResponseError) {
      // do something with the error, allowing you to detect a graphql response error,
      // compared to accidentally catching unrelated errors.

      // server responds with an object like the following (as an example)
      // class GraphqlResponseError {
      //  "headers": {
      //    "status": "403",
      //  },
      //  "data": null,
      //  "errors": [{
      //   "message": "Field 'bioHtml' doesn't exist on type 'User'",
      //   "locations": [{
      //    "line": 3,
      //    "column": 5
      //   }]
      //  }]
      // }

      console.error("[api][fetchRepositoriesData][graphql] request failed: ", error.request); // { query, variables: {}, headers: { authorization: 'token secret123' } }
      console.error("[api][fetchRepositoriesData][graphql] with message: ", error.message); // Field 'bioHtml' doesn't exist on type 'User'
    } else {
      // @ts-ignore
      console.error("[api][fetchRepositoriesData] request failed: ", error.request);
      // @ts-ignore
      console.error("[api][fetchRepositoriesData] with message: ", error.message);
    }
  }
}
// url, createdAt, total commits for repo, total commits for user (maybe more?)

export const fetcher = (url: string) =>
  fetch(url, {
    headers: {
      Authorization: `token ${VITE_GH_API_TOKEN}`,
    },
  }).then((res) => {
    if (!res.ok) throw new Error('Failed to fetch data')
    return res.json()
  })
