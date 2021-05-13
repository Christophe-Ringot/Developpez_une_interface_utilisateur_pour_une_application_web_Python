class Carousel{
    constructor(category, pictures)
    {
        this.category = category
        this.pictures = pictures
        this.index = 0
        this.categoryMovies = []
        this.categoryModals = []
        this.displayedModals = []
        this.firstMovie = new Image()
        this.secondMovie = new Image()
        this.thirdMovie = new Image()
        this.fourthMovie = new Image()
    }

    fillCategoryMovies(pictures){
        let extendedPictures = pictures.concat(pictures, pictures, pictures)
        var i;
        for (i = 0; i < 7; i++)
        {
            this.categoryMovies.push(extendedPictures.slice(4 * i, 4 * i + 4))
        }
    }

    fillAllModals(modals){
        let extendedModals = modals.concat(modals, modals, modals)
        var x
        for (x = 0; x < 7; x++)
        {
            this.categoryModals.push(extendedModals.slice(4 * x, 4 * x + 4))
        }
    }

    fillMoviesList(movieCategory)
    {
        let categoryId = document.getElementById(movieCategory)
        let displayedMovies = this.categoryMovies[0]
        let movies = categoryId.querySelectorAll('img.movie')
        this.firstMovie = movies[0]
        this.secondMovie = movies[1]
        this.thirdMovie = movies[2]
        this.fourthMovie = movies[3]
        this.firstMovie.src = displayedMovies[0]
        this.secondMovie.src = displayedMovies[1]
        this.thirdMovie.src = displayedMovies[2]
        this.fourthMovie.src = displayedMovies[3]
    }

    moveRight(){
        this.index ++
        if (this.index > this.categoryMovies.length-1)
        {
            this.index=0
        }
        this.firstMovie.src = this.categoryMovies[this.index][0]
        this.secondMovie.src = this.categoryMovies[this.index][1]
        this.thirdMovie.src = this.categoryMovies[this.index][2]
        this.fourthMovie.src = this.categoryMovies[this.index][3]
        this.displayedModals = this.categoryModals[this.index]
        fillCategoryModals(this.displayedModals, '#' + this.category)
    }

    moveLeft()
    {
        this.index --
        if (this.index < 0)
        {
            this.index = this.categoryMovies.length-1
        }
        this.firstMovie.src = this.categoryMovies[this.index][0]
        this.secondMovie.src = this.categoryMovies[this.index][1]
        this.thirdMovie.src = this.categoryMovies[this.index][2]
        this.fourthMovie.src = this.categoryMovies[this.index][3]
        this.displayedModals = this.categoryModals[this.index]
        fillCategoryModals(this.displayedModals, '#' + this.category)
    }
}

function fillMovieDom(modal)
{
    return "<img class='movie' src='' onclick='openModal" +
        "(" + modal + ")'><div id='" + modal + "' class='modal'>"
    +"<div class='modal-content'><span class='close' onclick='" +
        "closeModal(" + modal + ")'>&times;</span>"
    +"<img class='modal-picture' src=''><p></p></div></div>"
}

function fillCarouselDom(modal1, modal2, modal3, modal4)
{
    return fillMovieDom(modal1) + fillMovieDom(modal2) +
        fillMovieDom(modal3) + fillMovieDom(modal4)
}

const bestMoviesCarousel = document.querySelector
("#best-rated-movies .carousel-movies")
const firstCategoryCarousel = document.querySelector
("#first-category .carousel-movies")
const secondCategoryCarousel = document.querySelector
("#second-category .carousel-movies")
const thirdCategoryCarousel = document.querySelector
("#third-category .carousel-movies")

bestMoviesCarousel.innerHTML= fillCarouselDom
('modal1', 'modal2', 'modal3', 'modal4')
firstCategoryCarousel.innerHTML= fillCarouselDom
('modal5', 'modal6', 'modal7', 'modal8')
secondCategoryCarousel.innerHTML= fillCarouselDom
('modal9', 'modal10', 'modal11', 'modal12')
thirdCategoryCarousel.innerHTML= fillCarouselDom
('modal13', 'modal14', 'modal15', 'modal16')

const modals = [modal1, modal2, modal3, modal4, modal5, modal6,
    modal7, modal7, modal8, modal9, modal10, modal11, modal12,
    modal13, modal14, modal15, modal16, modalBestMovie]

function openModal(modal) {
    modal.style.display = "block"
}

function closeModal(modal) {
    modal.style.display = "none"
}

window.onclick = function(event)
{
    for (modal of modals)
    {
        if (event.target == modal)
        {
            modal.style.display = "none"
        }
    }
}

function sortMovies(array)
{
   return(array.sort(function(a, b)
   {
       if (b['imdb_score'] == a['imdb_score'])
       {
           return b['votes']-a['votes']}
       return b['imdb_score']-a['imdb_score']
   }))
}

function fetchCategoryMovies(categoryUrls){
    return categoryUrls.map(url => fetch(url))
}

async function requestCategoryMovies(categoryRequests)
{
    const firstResponse = await categoryRequests[0]
    const firstData = await firstResponse.json()
    const firstResults = await firstData.results
    const secondResponse = await categoryRequests[1]
    const secondData = await secondResponse.json()
    const secondResults = secondData.results
    const categoryMovies = firstResults.concat(secondResults.slice(0,2))
    const sortedCategoryMovies = sortMovies(categoryMovies)
    return sortedCategoryMovies
}

function extractMoviesPicturesUrls(sortedCategoryMovies)
{
    return sortedCategoryMovies.map(x => x['image_url'])
}

function fillCarousel(carousel, carouselCategory, sortedCategoryUrls)
{
    carousel.category = carouselCategory
    carousel.pictures = sortedCategoryUrls
    carousel.fillCategoryMovies(sortedCategoryUrls)
    carousel.fillMoviesList(carouselCategory)
}

function fillCarouselFromUrls(sortedCategoryMovies, carousel, carouselCategory)
{
    const sortedCategoryUrls = extractMoviesPicturesUrls(sortedCategoryMovies)
    fillCarousel(sortedCategoryUrls, carousel, carouselCategory)
}

function getBestMovieTitle(array)
{
    const bestMovieTitle = array[0].title
    document.querySelector('section h2').innerHTML = bestMovieTitle
}

function getBestMoviePicture(array)
{
    const bestMoviePicture = document.querySelector
    ('.best-movie-picture')
    const bestMovieModalPicture = document.querySelector
    ('.modal-picture')
    bestMoviePicture.src = array[0]
    bestMovieModalPicture.src = array[0]
}

async function getBestMovieDescription(array)
{
    const bestMovieUrl = array[0].url
    const requestBestMovie = await fetch(bestMovieUrl)
    const dataBestMovie = await requestBestMovie.json()
    const descriptionBestMovie = dataBestMovie.description
    document.getElementById('description')
        .innerHTML = descriptionBestMovie
    const bestMovieModal = document.querySelector('#modalBestMovie p')
    fillModalText(bestMovieModal, dataBestMovie)
}

function getBestMovieDetails(array1, array2)
{
    getBestMovieTitle(array1)
    getBestMoviePicture(array2)
    getBestMovieDescription(array1)
}

function fillModalText(element, data)
{
    element.innerHTML = "<b>Title: </b>" + data.title +
        "<br />" + "<b>Genres: </b>" + data.genres + "<br />"
    + "<b>Release Date: </b>" + data.date_published +
        "<br />" + "<b>Rated: </b>" + data.rated + "<br />"
    + "<b>Imdb score: </b>" + data.imdb_score +
        "<br />" + "<b>Directed by: </b>" + data.directors + "<br />"
    + "<b>Actors: </b>" + data.actors + "<br />" +
        "<b>Duration: </b>" + data.duration + "<br />"
    + "<b>Countries: </b>" + data.countries +
        "<br />" + "<b>Box-Office Result: </b>" + data.metascore + "<br />"
    + "<br />" + "<br />" + data.long_description + "<br />"
}

function fillModalPicture(img, data)
{
    img.src = data.image_url
}

async function fillCategoryModals(array, category)
{
    const requestFirstMovie = await fetch(array[0].url)
    const requestSecondMovie = await fetch(array[1].url)
    const requestThirdMovie = await fetch(array[2].url)
    const requestFourthMovie = await fetch(array[3].url)

    const dataFirstMovie = await requestFirstMovie.json()
    const dataSecondMovie = await requestSecondMovie.json()
    const dataThirdMovie = await requestThirdMovie.json()
    const dataFourthMovie = await requestFourthMovie.json()
    const dataMovies = [dataFirstMovie, dataSecondMovie,
        dataThirdMovie, dataFourthMovie]

    const categoryModalsText = document.querySelectorAll
    (category + ' p')
    const categoryModalsPictures = document.querySelectorAll
    (category + ' .modal-picture')
    const [firstMovieModalText, secondMovieModalText,
        thirdMovieModalText, fourthMovieModalText] = categoryModalsText
    const [firstMovieModalPic, secondMovieModalPic,
        thirdMovieModalPic, fourthMovieModalPic] = categoryModalsPictures

    for(i = 0; i <= 3; i++)
    {
        fillModalText(categoryModalsText[i], dataMovies[i])
        fillModalPicture(categoryModalsPictures[i], dataMovies[i])
    }
}

const bestMoviesUrls =
    ["http://localhost:8000/api/v1/titles/?sort_by=-imdb_score,-votes",
"http://localhost:8000/api/v1/titles/?page=2&sort_by=-imdb_score,-votes"]
const requestsBestMovies = fetchCategoryMovies(bestMoviesUrls)
let carousel1 = new Carousel()
requestCategoryMovies(requestsBestMovies).then(function(sortedBestMovies){
const sortedBestMoviesUrls = extractMoviesPicturesUrls(sortedBestMovies)
fillCarousel(carousel1, "best-rated-movies",
    sortedBestMoviesUrls)
carousel1.fillAllModals(sortedBestMovies)
carousel1.displayedModals = carousel1.categoryModals[0]
getBestMovieDetails(sortedBestMovies, sortedBestMoviesUrls)
fillCategoryModals(carousel1.displayedModals, '#best-rated-movies')})

const firstCategoryUrls =
    ["http://localhost:8000/api/v1/titles/" +
    "?&genre=thriller&sort_by=-imdb_score,-votes",
"http://localhost:8000/api/v1/titles/" +
"?page=2&genre=thriller&sort_by=-imdb_score,-votes"]
const requestsFirstCategory = fetchCategoryMovies(firstCategoryUrls)
let carousel2 = new Carousel()
requestCategoryMovies(requestsFirstCategory).then(
    function(sortedFirstCategory){
const sortedFirstCategoryUrls = extractMoviesPicturesUrls(sortedFirstCategory)
fillCarousel(carousel2, "first-category",
    sortedFirstCategoryUrls)
carousel2.fillAllModals(sortedFirstCategory)
carousel2.displayedModals = carousel2.categoryModals[0]
fillCategoryModals(carousel2.displayedModals, '#first-category')})

const secondCategoryUrls =
    ["http://localhost:8000/api/v1/titles/" +
    "?&genre=action&sort_by=-imdb_score,-votes",
"http://localhost:8000/api/v1/titles/" +
"?page=2&genre=action&sort_by=-imdb_score,-votes"]
const requestsSecondCategory = fetchCategoryMovies(secondCategoryUrls)
let carousel3 = new Carousel()
requestCategoryMovies(requestsSecondCategory).then(
    function(sortedSecondCategory){
const sortedSecondCategoryUrls = extractMoviesPicturesUrls
(sortedSecondCategory)
fillCarousel(carousel3, "second-category",
    sortedSecondCategoryUrls)
carousel3.fillAllModals(sortedSecondCategory)
carousel3.displayedModals = carousel3.categoryModals[0]
fillCategoryModals(carousel3.displayedModals, '#second-category')})

const thirdCategoryUrls =
    ["http://localhost:8000/api/v1/titles/" +
    "?&genre=adventure&sort_by=-imdb_score,-votes",
"http://localhost:8000/api/v1/titles/" +
"?page=2&genre=adventure&sort_by=-imdb_score,-votes"]
const requestsThirdCategory = fetchCategoryMovies(thirdCategoryUrls)
let carousel4 = new Carousel()
requestCategoryMovies(requestsThirdCategory).then(
    function(sortedThirdCategory){
const sortedThirdCategoryUrls = extractMoviesPicturesUrls(sortedThirdCategory)
fillCarousel(carousel4, "third-category",
    sortedThirdCategoryUrls)
carousel4.fillAllModals(sortedThirdCategory)
carousel4.displayedModals = carousel4.categoryModals[0]
fillCategoryModals(carousel4.displayedModals, '#third-category')})
