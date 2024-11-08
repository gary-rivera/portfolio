import { graphql } from '@octokit/graphql'
import type { GraphQlQueryResponseData } from "@octokit/graphql";

const VITE_GH_API_TOKEN = import.meta.env.VITE_GH_API_TOKEN
const GH_USERNAME = "gary-rivera"

const GitHubGQLConfig = graphql.defaults({
  headers: {
    authorization: `token ${VITE_GH_API_TOKEN}`,
  },
})

export const fetchRepositoryData = async (username: string, repoName: string) => {
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
export const fetchRepositoriesData = async (repoNames: string[]) => {
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

  const data: GraphQlQueryResponseData = await GitHubGQLConfig(query)
  return data
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
