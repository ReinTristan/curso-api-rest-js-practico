import {
	getMovieById,
	getMoviesByCategory,
	getMoviesBySearch,
	getTrendingCategoriesPreview,
	getTrendingMovies,
	getTrendingMoviesPreview,
} from './main.js'
import {
	arrowBtn,
	categoriesPreviewSection,
	genericSection,
	headerCategoryTitle,
	headerSection,
	headerTitle,
	movieDetailSection,
	searchForm,
	searchFormBtn,
	searchFormInput,
	trendingBtn,
	trendingPreviewSection,
} from './nodes.js'

window.addEventListener('hashchange', navigator, false)
window.addEventListener('DOMContentLoaded', navigator, false)

searchFormBtn.addEventListener('click', () => {
	searchMovie()
})

trendingBtn.addEventListener('click', () => {
	location.hash = '#trends'
})
arrowBtn.addEventListener('click', () => {
	history.back()
})
searchForm.addEventListener('submit', (e) => e.preventDefault())
searchForm.addEventListener('keyup', (e) => {
	if (e.key === 'Enter') {
		searchMovie()
	}
})
function searchMovie() {
	const searchValue = searchFormInput.value
	if (searchValue.length < 1) {
		searchFormInput.setAttribute('placeholder', 'Escribe algo...')
		return
	}
	location.hash = `#search=${searchValue}`
}

function navigator() {
	if (location.hash.startsWith('#trends')) {
		trendsPage()
	} else if (location.hash.startsWith('#search=')) {
		searchPage()
	} else if (location.hash.startsWith('#movie=')) {
		movieDetailsPage()
	} else if (location.hash.startsWith('#category=')) {
		categoriesPage()
	} else {
		homePage()
	}
	window.scrollTo(0, 0)
}

function homePage() {
	console.log('home')

	headerSection.classList.remove('header-container--long')
	headerSection.style.background = ''
	arrowBtn.classList.add('inactive')
	arrowBtn.classList.remove('header-arrow--white')

	headerTitle.classList.remove('inactive')
	headerCategoryTitle.classList.add('inactive')
	searchForm.classList.remove('inactive')

	trendingPreviewSection.classList.remove('inactive')
	categoriesPreviewSection.classList.remove('inactive')
	genericSection.classList.add('inactive')
	movieDetailSection.classList.add('inactive')

	getTrendingMoviesPreview()
	getTrendingCategoriesPreview()
}
function categoriesPage() {
	console.log('categories')

	headerSection.classList.remove('header-container--long')
	headerSection.style.background = ''
	arrowBtn.classList.remove('inactive')
	arrowBtn.classList.remove('header-arrow--white')

	headerTitle.classList.add('inactive')
	headerCategoryTitle.classList.remove('inactive')
	searchForm.classList.add('inactive')

	trendingPreviewSection.classList.add('inactive')
	categoriesPreviewSection.classList.add('inactive')
	genericSection.classList.remove('inactive')
	movieDetailSection.classList.add('inactive')

	const [_, categoryData] = location.hash.split('=')
	const [categoryId, categoryName] = categoryData.split('-')
	headerCategoryTitle.textContent = decodeURI(categoryName)
	getMoviesByCategory(categoryId)
}
function movieDetailsPage() {
	console.log('movies')

	headerSection.classList.add('header-container--long')
	// headerSection.style.background = ''
	arrowBtn.classList.remove('inactive')
	arrowBtn.classList.add('header-arrow--white')
	headerTitle.classList.add('inactive')
	headerCategoryTitle.classList.add('inactive')
	searchForm.classList.add('inactive')

	trendingPreviewSection.classList.add('inactive')
	categoriesPreviewSection.classList.add('inactive')
	genericSection.classList.add('inactive')
	movieDetailSection.classList.remove('inactive')

	const [_, movieId] = location.hash.split('=')
	console.log(decodeURI(movieId))
	getMovieById(decodeURI(movieId))
}
function searchPage() {
	console.log('search')

	headerSection.classList.remove('header-container--long')
	headerSection.style.background = ''
	arrowBtn.classList.remove('inactive')
	arrowBtn.classList.remove('header-arrow--white')

	headerTitle.classList.add('inactive')
	headerCategoryTitle.classList.add('inactive')
	searchForm.classList.remove('inactive')

	trendingPreviewSection.classList.add('inactive')
	categoriesPreviewSection.classList.add('inactive')
	genericSection.classList.remove('inactive')
	movieDetailSection.classList.add('inactive')

	const [_, query] = location.hash.split('=')
	console.log(decodeURI(query))
	getMoviesBySearch(decodeURI(query))
}
function trendsPage() {
	console.log('trends')

	headerSection.classList.remove('header-container--long')
	headerSection.style.background = ''
	arrowBtn.classList.remove('inactive')
	arrowBtn.classList.remove('header-arrow--white')

	headerTitle.classList.add('inactive')
	headerCategoryTitle.classList.remove('inactive')
	searchForm.classList.add('inactive')

	trendingPreviewSection.classList.add('inactive')
	categoriesPreviewSection.classList.add('inactive')
	genericSection.classList.remove('inactive')
	movieDetailSection.classList.add('inactive')

	headerCategoryTitle.textContent = 'Tendencias'
	getTrendingMovies()
}
