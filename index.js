const form = document.getElementById("movie-form")
const movieList = document.getElementById("movie-list")
let movieDataarr =[]
let watchListArr = []

form.addEventListener("submit", searchForMovie)

function searchForMovie(e){
    e.preventDefault()
    const formData = new FormData(form)
    const movie = formData.get("search-box")

    fetch(`https://www.omdbapi.com/?apikey=c881fa24&s=${encodeURIComponent(movie)}`)
    .then(res => res.json())
    .then(data => {
        movieDataarr = data.Search || []
        renderMovieList(movieDataarr)})
}

function generateMovieHtml(arr){
    return arr.map(movie=> {
      return  ` <div class="movie" data-imdb="${movie.imdbID}">
      
                <img src="${movie.Poster}" class="movie-poster">
                <div class="movie-info">

                    <div class="intro">
                        <p> ${movie.Title} </p>
                        <p class="rating"> </p>
                    </div>

                    <div class="middle">
                        <p class="runtime"> </p>   
                        <p class="genre"> </p>
                        <button data-add=${movie.imdbID}> + Watchlist </button>
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

movieList.addEventListener("mouseover", getMovieDetails);

function getMovieDetails(e) {
  const movieContainer = e.target.closest(".movie");
  if (!movieContainer) return;

  const movieId = movieContainer.dataset.imdb;
  if (!movieId || movieContainer.dataset.loaded === "true") return;

  fetch(`https://www.omdbapi.com/?apikey=c881fa24&i=${movieId}&plot=short`)
    .then(res => res.json())
    .then(data => {
      movieContainer.dataset.loaded = "true";

      const rating  = movieContainer.querySelector('.rating');
      const runtime = movieContainer.querySelector('.runtime');
      const genre   = movieContainer.querySelector('.genre');
      const plot    = movieContainer.querySelector('.plot');

      if (rating)  rating.textContent  = data.imdbRating || "";
      if (runtime) runtime.textContent = data.Runtime    || "";
      if (genre)   genre.textContent   = data.Genre      || "";
      if (plot)    plot.textContent    = data.Plot       || "";
    });
}

movieList.addEventListener("click" , addToMovieArr)

function addToMovieArr(e){
    if(e.target.matches(`[data-add]`)){
        const id = e.target.dataset.add
        watchListArr.push(id)
        console.log(watchListArr)

    }
}