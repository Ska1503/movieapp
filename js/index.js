const API_KEY = '1dd508de-db3a-4160-a0d0-1a02fb175c5d'
const API_URL_POPULAR = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page='
const API_URL_SEARCH = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword='

getMovies(API_URL_POPULAR)

async function getMovies(url) {
  const resp = await fetch(url, {
    headers: {
      'Content-type': 'application/json',
      'X-API-KEY': API_KEY
    },
  })
  const respData = await resp.json()
  showMovies(respData)
}

function getClassByRating(ranking) {
  if (ranking >= 7) {
    return 'green'
  } else if (ranking > 5) {
    return 'orange'
  } else {
    return 'red'
  }
}

function showMovies(data) {
  const moviesEl = document.querySelector('.movies')

  document.querySelector('.movies').innerHTML = ''

  data.films.forEach((movie) => {
    const movieElem = document.createElement('div')
    movieElem.classList.add('movie')
    movieElem.innerHTML = `
    <div class="movie__cover-inner">
      <img class="movie__cover" src="${movie.posterUrlPreview}" alt="${movie.nameRu}">
    </div> 
      <div class="movie__info">
      <div class="movie__title">${movie.nameRu}</div>
      <div class="movie__category">${movie.genres.map(genre => `  ${genre.genre}`)}</div>
      <div class="movie__averange movie--${getClassByRating(movie.rating)}">${movie.rating}</div>
    </div>
    `
    moviesEl.appendChild(movieElem)
  })
}

const form = document.querySelector('form')
const search = document.querySelector('.header__search')

form.addEventListener('submit', (e) => {
  e.preventDefault()

  const apiSearchUrl = `${API_URL_SEARCH}${search.value}`

  if (search.value) {
    getMovies(apiSearchUrl)

    search.value = ''
  }
})

const pagination = document.querySelectorAll('.pagination a')

for (const item of pagination) {
  item.addEventListener('click', () => {
    pagination.forEach(items => items.classList.remove('active'))
    item.classList.add('active')

    const paginNum = +item.textContent
    const numUrl = `${API_URL_POPULAR}${paginNum}`

    if (paginNum) getMovies(numUrl)
  })
}

