class Carousel
{
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