let savedIds = JSON.parse(localStorage.getItem('watchlist') || "[]")
const userList = document.getElementById("picked-list")

function renderWatchList(arr) {
  const promises = arr.map(id => 
    fetch(`https://www.omdbapi.com/?apikey=c881fa24&i=${id}&plot=short`)
      .then(res => res.json())
  );

  Promise.all(promises).then(movies => {
    const html = movies.map(movie => `
      <div class="movie" data-imdb="${movie.imdbID}">
        <img src="${movie.Poster}" class="movie-poster">
        <div class="movie-info">
          <div class="intro">
            <p>${movie.Title}</p>
            <p class="rating">${movie.imdbRating}</p>
          </div>
          <div class="middle">
            <p class="runtime">${movie.Runtime}</p>
            <p class="genre">${movie.Genre}</p>
            <button data-remove="${movie.imdbID}">- Remove</button>
          </div>
          <p class="plot">${movie.Plot}</p>
        </div>
      </div>
    `).join('');

    userList.innerHTML = html;
  });
}


userList.addEventListener('click', e => {
  if (e.target.matches('[data-remove]')) {
    const id = e.target.dataset.remove;
    removeMovie(id);
  }
});

function removeMovie(id) {
  const updated = savedIds.filter(movieId => movieId !== id);
  localStorage.setItem('watchlist', JSON.stringify(updated));
  savedIds = updated; 
  renderWatchList(savedIds);
}




renderWatchList(savedIds)
