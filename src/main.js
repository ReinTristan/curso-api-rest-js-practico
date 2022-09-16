import { API_KEY } from './secrets.js'
import './navigation.js'
import {
	categoriesPreviewList,
	categoriesPreviewSection,
	genericSection,
	headerSection,
	movieDetailCategoriesList,
	movieDetailDescription,
	movieDetailScore,
	movieDetailTitle,
	relatedMoviesContainer,
	trendingMoviesPreviewList,
} from './nodes.js'

const IMG_BASE = 'https://image.tmdb.org/t/p/'
const api = axios.create({
	baseURL: 'https://api.themoviedb.org/3/',
	headers: {
		'Content-type': 'application/json;charset=utf-8',
	},
	params: {
		api_key: API_KEY,
	},
})

// utils

/**
 * @param {any[]} movieList Array with the movie list
 * @param {HTMLElement} container DOM container to append
 */

function createMovies(movieList, container) {
	container.innerHTML = ''
	movieList.forEach((movie) => {
		const movieContainer = document.createElement('div')
		movieContainer.classList.add('movie-container')
		movieContainer.addEventListener('click', () => {
			location.hash = `#movie=${movie.id}`
		})

		const movieImg = document.createElement('img')
		movieImg.classList.add('movie-img')
		movieImg.setAttribute('alt', movie.title)
		movieImg.setAttribute('src', `${IMG_BASE}w300/${movie.poster_path}`)

		movieContainer.append(movieImg)
		container.append(movieContainer)
	})
}
/**
 * @param {any[]} movieList Array with the movie list
 * @param {HTMLElement} container DOM container to append
 */
function createCategories(categories, container) {
	container.innerHTML = ''
	categories.forEach((category) => {
		const categoryContainer = document.createElement('div')
		categoryContainer.classList.add('category-container')

		const categoryTitle = document.createElement('h3')
		categoryTitle.classList.add('category-title')
		categoryTitle.setAttribute('id', `id${category.id}`)
		categoryTitle.addEventListener(
			'click',
			() => (location.hash = `#category=${category.id}-${category.name}`)
		)

		const categoryTitleText = document.createTextNode(category.name)

		categoryTitle.append(categoryTitleText)
		categoryContainer.append(categoryTitle)
		container.append(categoryContainer)
	})
}
//api calls

async function getTrendingMoviesPreview() {
	const { data } = await api(`trending/movie/day`)
	const movies = data.results
	createMovies(movies, trendingMoviesPreviewList)
}

async function getTrendingCategoriesPreview() {
	const { data } = await api(`genre/movie/list`)
	const categories = data.genres
	createCategories(categories, categoriesPreviewList)
}
async function getMoviesByCategory(id) {
	const { data } = await api(`discover/movie`, {
		params: {
			with_genres: id,
		},
	})
	const movies = data.results
	createMovies(movies, genericSection)
}

async function getMoviesBySearch(query) {
	const { data } = await api(`search/movie`, {
		params: {
			query,
		},
	})
	const movies = data.results
	createMovies(movies, genericSection)
}

async function getTrendingMovies() {
	const { data } = await api(`trending/movie/day`)
	const movies = data.results
	createMovies(movies, genericSection)
}
async function getMovieById(id) {
	const { data: movie } = await api(`movie/${id}`)
	const movieImgUrl = `${IMG_BASE}w500/${movie.poster_path}`

	headerSection.style.background = `linear-gradient(
		180deg,
		rgba(0, 0, 0, 0.35) 19.27%,
		rgba(0, 0, 0, 0) 29.17%
	),url(${movieImgUrl})`

	movieDetailTitle.textContent = movie.title
	movieDetailDescription.textContent = movie.overview
	movieDetailScore.textContent = parseFloat(movie.vote_average).toFixed(1)

	createCategories(movie.genres, movieDetailCategoriesList)
	getRelatedMoviesById(id)
}
async function getRelatedMoviesById(id) {
	const { data } = await api(`movie/${id}/similar`)
	const relatedMovies = data.results
	createMovies(relatedMovies, relatedMoviesContainer)
	relatedMoviesContainer.scrollTo(0, 0)
}

export {
	getTrendingCategoriesPreview,
	getTrendingMoviesPreview,
	getMoviesByCategory,
	getMoviesBySearch,
	getTrendingMovies,
	getMovieById,
}
