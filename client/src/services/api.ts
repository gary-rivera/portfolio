// api helper
import { Octokit } from '@octokit/rest'
import { graphql } from '@octokit/graphql'

const VITE_GH_API_TOKEN = import.meta.env.VITE_GH_API_TOKEN

export const octokitFetcher: Octokit = new Octokit({
  auth: VITE_GH_API_TOKEN,
  mediaType: {
    previews: ['inertia'], // Adjust this based on the fields you need
  },
})
export const octokitGQL = graphql.defaults({
  headers: {
    authorization: `token ${VITE_GH_API_TOKEN}`,
  },
})

export const fetcher = (url: string) =>
  fetch(url, {
    headers: {
      Authorization: `token ${VITE_GH_API_TOKEN}`,
    },
  }).then((res) => {
    if (!res.ok) throw new Error('Failed to fetch data')
    return res.json()
  })
