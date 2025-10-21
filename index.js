const form = document.getElementById("movie-form")
const movieList = document.getElementById("movie-list")
let watchListArr = []

form.addEventListener("submit", searchForMovie)

function searchForMovie(e){
    e.preventDefault()
    const formData = new FormData(form)
    const movie = formData.get("search-box")

    fetch(`http://www.omdbapi.com/?apikey=c881fa24&s=${movie}`)
    .then(res => res.json())
    .then(data => renderMovieList(data.Search))
}

function generateMovieHtml(arr){
    return arr.map(movie=> {
      return  ` <div class="movie" id=${movie.imdbID}>
      
                <img src="${movie.Poster}" class="movie-poster">
                <div class="movie-info">

                    <div class="intro">
                        <p> ${movie.Title} </p>
                        <p class="rating"> </p>
                    </div>

                    <div class="middle">
                        <p class="runtime"> </p>   
                        <p class="genre"> </p>
                        <button data-id=${movie.imdbID}> + Watchlist </button>
                    </div>

                    <p class="plot"> </p>   
                </div>
                </div> `
    }).join(" ")
}

function renderMovieList(MovieArr) {
    const list = generateMovieHtml(MovieArr)
    movieList.innerHTML = list

}