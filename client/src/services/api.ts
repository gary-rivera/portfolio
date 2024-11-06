const VITE_GH_API_TOKEN = import.meta.env.VITE_GH_API_TOKEN

export const fetcher = (url: string) => fetch(url, {
  headers: {
    Authorization: `token ${VITE_GH_API_TOKEN}`
  }
}).then(res => {
  if (!res.ok) throw new Error('Failed to fetch data')
  return res.json()
})
