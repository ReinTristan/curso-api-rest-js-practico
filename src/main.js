import { API_KEY } from './secrets.js'

const IMG_BASE = 'https://image.tmdb.org/t/p/w300'
const api = axios.create({
	baseURL: 'https://api.themoviedb.org/3/',
	headers: {
		'Content-type': 'application/json;charset=utf-8',
	},
	params: {
		api_key: API_KEY,
	},
})

async function getTrendingMoviesPreview() {
	const { data } = await api(`trending/movie/day`)
	const movies = data.results
	const trendingPreviewMoviesContainer = document.querySelector(
		'#trendingPreview .trendingPreview-movieList'
	)
	movies.forEach((movie) => {
		const movieContainer = document.createElement('div')
		movieContainer.classList.add('movie-container')

		const movieImg = document.createElement('img')
		movieImg.classList.add('movie-img')
		movieImg.setAttribute('alt', movie.title)
		movieImg.setAttribute('src', `${IMG_BASE}${movie.poster_path}`)

		movieContainer.append(movieImg)
		trendingPreviewMoviesContainer.append(movieContainer)
	})
}

async function getTrendingCategoriesPreview() {
	const { data } = await api(`genre/movie/list`)
	console.log(data)
	const categories = data.genres

	const previewCategoriesContainer = document.querySelector(
		'#categoriesPreview .categoriesPreview-list'
	)
	categories.forEach((category) => {
		const categoryContainer = document.createElement('div')
		categoryContainer.classList.add('category-container')

		const categoryTitle = document.createElement('h3')
		categoryTitle.classList.add('category-title')
		categoryTitle.setAttribute('id', `id${category.id}`)

		const categoryTitleText = document.createTextNode(category.name)

		categoryTitle.append(categoryTitleText)
		categoryContainer.append(categoryTitle)
		previewCategoriesContainer.append(categoryContainer)
	})
}

getTrendingMoviesPreview()
getTrendingCategoriesPreview()

export { getTrendingCategoriesPreview, getTrendingMoviesPreview }
