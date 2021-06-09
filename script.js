const api_url = 'https://api.themoviedb.org/3'
const api_key = '831004296f374b1a0723bb4e809b453a'
const image_url = 'https://image.tmdb.org/t/p'
const search_url = 'https://api.themoviedb.org/3/search/movie?api_key={api_key}&query='

const searchQuery = document.getElementById("search").value;
const searchKey = document.getElementById("search");
const displayMovies = document.getElementById("search-movies");

const nowPlaying = document.getElementById('now-playing');
const nowPlayingDiv = document.getElementById("now-playing");

var page = 1;
const loadmoreBtn = document.getElementById("now-load-more");


// function to implement search bar
document.getElementById('search').addEventListener('keyup', function(event){
    if(event.keyCode ===13){
        const searchQuery = document.getElementById("search").value;
        event.preventDefault();
        console.log(searchQuery);
        nowPlayingDiv.style.display ="none";
        searchMovies();
    }
  })

// function to display Now Playing movies on homepage
async function nowPlayingMovies(){
    const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}&page=${page}`);
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    let movieContainer = "";
    jsonResponse.results.map((result) =>
    movieContainer += `
    <div id= "movie-container">
        <img src="https://image.tmdb.org/t/p/w342${result.poster_path}">
        <h3>${result.title}</h3>
        <h3>⭐${result.vote_average}</h3>
    </div>
    `
    )
    nowPlaying.innerHTML = movieContainer;
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
        document.getElementById("show-more").append(nowloadDiv);
        
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
    displayMovies.innerHTML = searchContainer;

}

// Display Now Playing Movies function
nowPlayingMovies();
