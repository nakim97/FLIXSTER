// global constants for API and urls
const api_url = 'https://api.themoviedb.org/3'
const api_key = '831004296f374b1a0723bb4e809b453a'
const image_url = 'https://image.tmdb.org/t/p'
const search_url = 'https://api.themoviedb.org/3/search/movie?api_key={api_key}&query='

// query selectors + getElements for search movies functions
const searchQuery = document.getElementById("search").value;
const searchKey = document.getElementById("search");
const searchedMovies = document.getElementById("search-movies");
// query selectors + getElements for clear button
const clearButton = document.getElementById("clearBtn");
// query selectors + getElements for now playing movies functions
const nowPlaying = document.getElementById('now-playing');
const nowPlayingLoadDiv = document.getElementById("now-show-more");

// query selectors + getElements for loading more buttons
const nowloadmoreBtn = document.getElementById("now-load-more");
const searchloadmoreBtn = document.getElementById("search-load-more");

// variable for page number
var page = 1;

// function to implement search bar
document.getElementById('search').addEventListener('keyup', function(event){
    if(event.keyCode ===13){
        const searchQuery = document.getElementById("search").value;
        event.preventDefault();
        console.log(searchQuery);
        nowPlaying.style.display ="none";
        nowPlayingLoadDiv.style.display = "none";
        nowloadmoreBtn.style.display ="none";
        searchloadmoreBtn.style.display = "block";
        clearButton.style.display = "block";
        searchMovies();
    }
  })

// function to display Now Playing movies on homepage
async function nowPlayingMovies(){
    const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}&page=${page}`);
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    let movieContainer = "";
    nowplayingDiv = document.createElement("div");
    nowplayingDiv.setAttribute("id", "currentplayingMovies");
    jsonResponse.results.map((result) =>
    movieContainer += `
    <div id= "movie-container">
        <img src="https://image.tmdb.org/t/p/w342${result.poster_path}">
        <h3>${result.title}</h3>
        <h3>⭐${result.vote_average}</h3>
    </div>
    `
    );
    nowplayingDiv.innerHTML += movieContainer;
    document.getElementById("now-playing").append(nowplayingDiv);
}

// function to implement and display more movies 
  document.getElementById("now-load-more").addEventListener("click", function(e){
    async function loadNowPlaying(){
        page++;
        const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}&page=${page}`);
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        let nowloadContainer = "";
        nowloadDiv = document.createElement("div");
        nowloadDiv.setAttribute("id", "nowplayingContainer");

        jsonResponse.results.map((result) =>
        nowloadContainer += `
        <div id="load-container">
            <img src="https://image.tmdb.org/t/p/w342${result.poster_path}">
            <h3>${result.title}</h3>
            <h3>⭐${result.vote_average}</h3>
        </div>
        `);
        nowloadDiv.innerHTML += nowloadContainer;
        document.getElementById("now-show-more").append(nowloadDiv);
        }
    loadNowPlaying();
})


// function to display searched Movies 
async function searchMovies(){
    const searchQuery = document.getElementById("search").value;
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${searchQuery}`);
    const jsonResponse = await response.json();
    let searchContainer = "";
    jsonResponse.results.map((result) =>
    searchContainer += `
    <div id="movie-container">
        <img src="https://image.tmdb.org/t/p/w342${result.poster_path}">
        <h3>${result.title}</h3>
        <h3>⭐${result.vote_average}</h3>
    </div>
    `
    )
    searchedMovies.innerHTML = searchContainer;

}

// function to implement and display more movies 
document.getElementById("search-load-more").addEventListener("click", function(e){
    async function loadmoreSearch(){
        page++;
        const searchQuery = document.getElementById("search").value;
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${searchQuery}&page=${page}`);
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        let searchloadContainer = "";
        searchDiv = document.createElement("div");
        searchDiv.setAttribute("id", "searchContainer");
        jsonResponse.results.map((result) =>
        searchloadContainer += `
        <div id="search-load-container">
            <img src="https://image.tmdb.org/t/p/w342${result.poster_path}">
            <h3>${result.title}</h3>
            <h3>⭐${result.vote_average}</h3>
        </div>
        `);
        searchDiv.innerHTML += searchloadContainer;
        document.getElementById("search-show-more").append(searchDiv);
        
        }
    loadmoreSearch();
})


document.getElementById("clearBtn").addEventListener("click", function(){
    // hide display of searched movies, search more movies button, and loaded searched movies
    searchedMovies.style.display = "none";
    searchloadmoreBtn.style.display = "none";
    // upon clicking, clear input value field
    document.getElementById("search").value = "";
    // display now playing movies, load more current movies button, and more current movies
    nowPlaying.style.display ="block";
    nowPlayingLoadDiv.style.display = "block";
    nowloadmoreBtn.style.display ="block";
    clearButton.style.display ="none";
    
    
})
// Display Now Playing Movies function
nowPlayingMovies();
