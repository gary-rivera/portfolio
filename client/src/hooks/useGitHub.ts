import { fetcher } from '../services/api'
import useSWR from 'swr'

const ghUsername = 'gary-rivera'
export const useGithubRepos = () => {
  const { data, error, isLoading } = useSWR(
    `https://api.github.com/${ghUsername}/repos`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )

  return {
    repos: data,
    isLoading,
    isError: !!error
  }
}

export const useGithubRepo = (repo: string) => {
  const { data, error, isLoading } = useSWR(
    `https://api.github.com/repos/${ghUsername}/${repo}/contents`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )

  return {
    repo: data,
    isLoading,
    isError: !!error
  }
}

export const useGithubRepoWithReadme = (repoName: string) => {

  const { data: repoData, error: repoError, isLoading: isRepoLoading } = useSWR(
    repoName ? `https://api.github.com/repos/gary-rivera/${repoName}/contents` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )

  const readmeFile = repoData?.find((file: any) => file.name === 'README.md')

  const { data: readmeContent, error: readmeError, isLoading: isReadmeLoading } = useSWR(
    readmeFile?.download_url || null,
    (url: string) => fetch(url).then(res => res.text()),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )

  console.log({
    repoData,
    isRepoLoading,
    repoError,
    readmeContent,
    isReadmeLoading,
    readmeError
  })

  return {
    repoData,
    isRepoLoading,
    repoError,
    readmeContent,
    isReadmeLoading,
    readmeError
  }
}

export const useResumeRepo = () => {
  const { data, error, isLoading } = useSWR(
    'https://raw.githubusercontent.com/gary-rivera/resume-md/main/README.md',
    (url: string) => fetch(url).then(res => res.text()),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      shouldRetryOnError: false
    }
  )
  return {
    readmeContent: data,
    isLoading,
    isError: !!error
  }
}

export const useGitHubRepoContent = (downloadUrl?: string) => {
  const { data, error, isLoading } = useSWR(
    downloadUrl || null,
    (url: string) => fetch(url).then(res => res.text()),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      shouldRetryOnError: false
    }
  )

  return {
    readmeContent: data,
    isLoading,
    isError: !!error
  }
}