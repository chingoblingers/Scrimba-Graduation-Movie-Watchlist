const form = document.getElementById("movie-form")

form.addEventListener("submit", searchForMovie)

function searchForMovie(e){
    e.preventDefault()
    const formData = new FormData(form)
    const movie = formData.get("search-box")

    fetch(`http://www.omdbapi.com/?apikey=c881fa24&t=${movie}`)
    .then(res => res.json())
    .then(data => console.log(data))
}
