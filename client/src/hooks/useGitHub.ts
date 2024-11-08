import { fetcher, octokitFetcher, octokitGQL } from '../services/api'
import useSWR from 'swr'

type UserRepositoriesResponse = {
  user: {
    repositories: {
      nodes: Array<{
        name: string
        description: string
        stargazerCount: number
      }>
    }
  }
}

export const fetchRepositories = async (username: string) => {
  console.log('Authorization Header:', octokitGQL.defaults)

  const { user } = await octokitGQL<UserRepositoriesResponse>(
    `
    query ($username: String!) {
      user(login: $username) {
        repositories(first: 10) {
          nodes {
            name
            description
            stargazerCount
          }
        }
      }
    }
  `,
    { username }
  )

  return user.repositories.nodes
}

export const useGithubRepos = () => {
  const { data, error, isLoading } = useSWR(
    `https://api.github.com/user/repos?visibility=all&affiliation=owner&sort=created&per_page=80`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )

  return {
    repos: data,
    isLoading,
    isError: !!error,
  }
}

export const useGithubReposOctokit = () => {
  const { data, error, isLoading } = useSWR(
    'octokit-fetch-repos',
    async () => {
      const response = await octokitFetcher.rest.repos.listForAuthenticatedUser({
        visibility: 'all',
        affiliation: 'owner',
        sort: 'created',
        per_page: 80,
      })
      return response.data
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )

  return {
    repos: data,
    isLoading,
    isError: !!error,
  }
}

export const useGithubRepo = (repo: string) => {
  const { data, error, isLoading } = useSWR(
    `https://api.github.com/repos/gary-rivera/${repo}/contents`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )

  return {
    repo: data,
    isLoading,
    isError: !!error,
  }
}

export const useResumeRepo = () => {
  const { data, error, isLoading } = useSWR(
    'https://raw.githubusercontent.com/gary-rivera/resume-md/main/README.md',
    (url: string) => fetch(url).then((res) => res.text()),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      shouldRetryOnError: false,
    }
  )

  return {
    readmeContent: data,
    isLoading,
    isError: !!error,
  }
}
