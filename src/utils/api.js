import db from '../data/db.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export async function getGames({ search = '', page = 1, genre = '', ordering = '-rating', pageSize = 12 } = {}) {
  await delay(300)
  let results = [...db.games]

  if (search) {
    const query = search.toLowerCase()
    results = results.filter(game => game.name.toLowerCase().includes(query))
  }

  if (genre) {
    const genreObj = db.genres.find(g => 
      g.id === parseInt(genre) || 
      g.slug === genre || 
      g.name.toLowerCase() === genre.toLowerCase()
    )
    if (genreObj) {
      results = results.filter(game => game.genres.some(g => g.id === genreObj.id))
    } else {
      results = []
    }
  }

  if (ordering === '-rating') {
    results.sort((a, b) => b.rating - a.rating)
  } else if (ordering === 'rating') {
    results.sort((a, b) => a.rating - b.rating)
  } else if (ordering === '-released') {
    results.sort((a, b) => new Date(b.released) - new Date(a.released))
  } else if (ordering === 'name') {
    results.sort((a, b) => a.name.localeCompare(b.name))
  } else if (ordering === '-metacritic') {
    results.sort((a, b) => (b.metacritic || 0) - (a.metacritic || 0))
  }

  const start = (page - 1) * pageSize
  const paginatedResults = results.slice(start, start + pageSize)

  return {
    count: results.length,
    results: paginatedResults
  }
}

export async function getGameById(id) {
  await delay(300)
  const game = db.games.find(g => g.id === parseInt(id))
  return game || null
}

export async function getRelatedGames(id) {
  await delay(300)
  const game = db.games.find(g => g.id === parseInt(id))
  if (!game) return { results: [] }
  
  const genreIds = game.genres.map(g => g.id)
  const related = db.games.filter(g => g.id !== game.id && g.genres.some(gen => genreIds.includes(gen.id)))
  
  return { results: related }
}

export async function getGenres() {
  await delay(300)
  return { results: db.genres }
}

export function getStablePrice(game) {
  if (game.price) return game.price.toFixed(2)
  if (game.metacritic) return (game.metacritic * 0.7).toFixed(2)
  const seed = typeof game.id === 'string' ? game.id.split('').reduce((a, b) => a + b.charCodeAt(0), 0) : (game.id || 0)
  const pseudoRandom = (Math.abs(Math.sin(seed) * 10000) % 50) + 19.99
  return pseudoRandom.toFixed(2)
}

