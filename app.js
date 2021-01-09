const API_KEY = '6b2d48cf';

function myFunction(event) {
    var x = event.keyCode;
    if (x == 13) {  
      search();
    }
  }

function search() {
    const searchText = document.getElementById('search-text').value;
    
    axios.get(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${searchText}`)
        .then((response) => {
            var movies = response.data.Search;
            console.log(movies)
            var output = "";
            movies.forEach((movie) => {
                output += `
                    <div class="col-lg-3 col-md-4 col-sm-6">
                        <div class="well text-center">
                            <img src="${movie.Poster}">
                            <h6>${movie.Title}</h6>
                            <a onclick="movieSelected('${movie.imdbID}')" href="#" class="btn btn-outline-primary">More Details</a>
                        </div>
                    </div>
                `;
            });

            document.getElementById('movies').innerHTML = output;
        })
        .catch((error) => {
            console.log(error);
        })
};

function movieSelected(id) {
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
}

function getMovie(){
    var movieId = sessionStorage.getItem("movieId");
    axios.get(`http://www.omdbapi.com/?apikey=${API_KEY}&i=${movieId}`)
        .then((response) => {
            var movie = response.data;
            var output ="";
            console.log(movie);
            output += `
                <div class="row">
                    <div class="col-md-4">
                        <img src="${movie.Poster}" class="thumbnail">
                    </div>
                    <div class="col-md-8">
                        <h2>${movie.Title}</h2>
                        <ul class="list-group">
                            <li class="list-group-item"><strong>Type:</strong> ${movie.Type}</li>
                            <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
                            <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
                            <li class="list-group-item"><strong>Rating:</strong> ${movie.imdbRating} (${movie.imdbVotes})</li>
                            <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
                            <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
                            <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
                            <li class="list-group-item"><strong>Awards:</strong> ${movie.Awards}</li>
                        </ul>
                    </div>
                </div>
                <div class="row>
                    <div class="well">
                        <h3>Plot</h3>
                        <h6>${movie.Plot}</h6>
                        <hr>
                        <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-outline-success">View IMDB</a>
                        <a href="index.html" class="btn btn-outline-primary">Go To Search</a>
                    </div>
                </div>
            `;

            document.getElementById("movie").innerHTML= output;
        });
}