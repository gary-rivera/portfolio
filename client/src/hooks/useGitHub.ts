import useSWR from 'swr'
import { fetcher, fetchGithubRepositoryGQL, fetchGithubRepositoriesGQL } from '../services/api'

export const useGitHubRepoData = (username: string, repoName: string) => {
  const { data, error } = useSWR([username, repoName], ([user, repo]) =>
    fetchGithubRepositoryGQL(user, repo)
  )

  return {
    repo: data,
    isLoading: !error && !data,
    isError: error
  }
}
export const useGitHubReposGQL = (repos: string[]) => {
  const { data, error } = useSWR([repos], ([repos]) =>
    fetchGithubRepositoriesGQL(repos),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      errorRetryCount: 3,
    }
  )

  return {
    repos: data,
    isLoading: !error && !data,
    isError: error
  }
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
