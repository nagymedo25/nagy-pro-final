const API_KEY = import.meta.env.VITE_RAWG_API_KEY
const BASE_URL = 'https://api.rawg.io/api'

async function fetchData(endpoint, params = {}) {
  const searchParams = new URLSearchParams({ key: API_KEY, ...params })
  const url = `${BASE_URL}${endpoint}?${searchParams.toString()}`
  const response = await fetch(url)
  if (!response.ok) throw new Error('Network response was not ok')
  return response.json()
}

export async function getGames({ search = '', page = 1, genre = '', ordering = '-rating', pageSize = 12 } = {}) {
  const params = { page, page_size: pageSize, ordering }
  if (search) params.search = search
  if (genre) params.genres = genre
  return fetchData('/games', params)
}

export async function getGameById(id) {
  return fetchData(`/games/${id}`)
}

export async function getRelatedGames(id) {
  return fetchData(`/games/${id}/game-series`)
}

export async function getGenres() {
  return fetchData('/genres')
}
