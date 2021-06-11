// global constants for API and urls
const api_url = 'https://api.themoviedb.org/3'
const api_key = '831004296f374b1a0723bb4e809b453a'

// query selectors + getElements for search movies functions
const searchQuery = document.getElementById("search").value;
const searchKey = document.getElementById("search");
const searchedMovies = document.getElementById("search-movies");
const searchLoad = document.getElementById("search-show-more");
// query selectors + getElements for clear button
const clearButton = document.getElementById("clearBtn");
// query selectors + getElements for now playing movies functions
const nowPlaying = document.getElementById('now-playing');
const nowPlayingLoadDiv = document.getElementById("now-show-more");

// query selectors + getElements for loading more buttons
const nowloadmoreBtn = document.getElementById("now-load-more");
const searchloadmoreBtn = document.getElementById("search-load-more");

const now_playing_title = document.getElementById("nowTitle");
const search_title = document.getElementById("searchTitle");

const slider = document.querySelector(".movie-slide-container");
// variable for page number
var page = 1;

// function to implement search bar
document.getElementById('search').addEventListener('keyup', function(event){
    if(event.keyCode ===13){
        const searchQuery = document.getElementById("search").value;
        event.preventDefault();
        console.log(searchQuery);
        // hide display of now playing movies and load button
        nowPlaying.style.display ="none";
        nowPlayingLoadDiv.style.display = "none";
        nowloadmoreBtn.style.display ="none";
        searchloadmoreBtn.style.display = "block";
        // display clear button option
        clearButton.style.display = "block";
        // call search movies functions
        searchMovies();
        // clear previous searched movies 
        searchedMovies.innerHTML = '';
        searchLoad.innerHTML = '';
        // display searched movies results
        searchedMovies.style.display = "block";
        searchloadmoreBtn.style.display = "block";
        searchLoad.style.display = "block";

        // display and hide now playing and search results title
        search_title.style.display = "block";
        now_playing_title.style.display = "none";

        slider.style.display = "none";
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
        <img src="https://image.tmdb.org/t/p/w400${result.poster_path}" alt="${result.title}" id="img" overview="${result.overview}" release-date ="${result.release_date}" 
        title ="${result.title}" vote ="${result.vote_average}" backdrop ="${result.backdrop_path}"/>
        <h3 id="container-title">${result.title}</h3>
        <h3>⭐${result.vote_average}</h3>
    </div>
    `,
    ); 
    nowplayingDiv.innerHTML += movieContainer;
    document.getElementById("now-playing").append(nowplayingDiv);
    
    let nowPlayingPopup = document.querySelectorAll('#currentplayingMovies');
    
    for (var i =0; nowPlayingPopup.length; i++){
        nowPlayingPopup[i].addEventListener('click', function(e){
            var nowPlayingOverview = e.target.getAttribute("overview");
            var nowPlayingDate = e.target.getAttribute("release-date");
            var nowPlayingTitle= e.target.getAttribute("title");
            var nowPlayingRating = e.target.getAttribute("vote");
            var nowPlayingBackDrop = e.target.getAttribute("backdrop");
           
            nowPopContainer = document.createElement("div");
            nowPopContainer.innerHTML =`
                <div id="modal">
                    <div id="modal-content">
                        <button id="close-btn"> X </button>
                        <img src="https://image.tmdb.org/t/p/w400${nowPlayingBackDrop}" id="pop-img" alt="${nowPlayingTitle}"/>
                        <h1>${nowPlayingTitle}</h1>
                        <span>${nowPlayingDate}</span>
                        <span>⭐${nowPlayingRating}</span>
                        <p>${nowPlayingOverview}</p>
                    </div>
                   
                </div>
            `
            document.body.append(nowPopContainer);
            let closeBtnLoop = document.querySelectorAll("#close-btn");
            let closeModal = document.querySelectorAll("#modal");
            for(var i =0; closeBtnLoop.length; i++){
                closeBtnLoop[i].addEventListener("click", function(){
                    for(var i=0; closeModal.length; i++){
                        closeModal[i].style.display = "none";
                    }
                })
            }
        })

        }
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
            <img src="https://image.tmdb.org/t/p/w400${result.poster_path}" alt="${result.title}" id="img" overview="${result.overview}" release-date ="${result.release_date}" 
            title ="${result.title}" vote ="${result.vote_average}" backdrop ="${result.backdrop_path}"/>
            <h3 id="nowLoad">${result.title}</h3>
            <h3>⭐${result.vote_average}</h3>
        </div>
        `);
        nowloadDiv.innerHTML += nowloadContainer;
        document.getElementById("now-show-more").append(nowloadDiv);

        let nowPlayingLoadPopup = document.querySelectorAll('#nowplayingContainer');
        for (var i =0; nowPlayingLoadPopup.length; i++){
            nowPlayingLoadPopup[i].addEventListener('click', function(e){
                var nowPlayingLoadOverview = e.target.getAttribute("overview");
                var nowPlayingLoadDate = e.target.getAttribute("release-date");
                var nowPlayingLoadTitle= e.target.getAttribute("title");
                var nowPlayingLoadRating = e.target.getAttribute("vote");
                var nowPlayingLoadBackDrop = e.target.getAttribute("backdrop");
               
                nowPopLoadContainer = document.createElement("div");
                nowPopLoadContainer.innerHTML =`
                    <div id="modal">
                        <div id="modal-content">
                        <button id="close-btn"> X </button>
                        <img src="https://image.tmdb.org/t/p/w400${nowPlayingLoadBackDrop}" id="pop-img" alt="${nowPlayingLoadTitle}"/>
                        <h1>${nowPlayingLoadTitle}</h1>
                        <span>${nowPlayingLoadDate}</span>
                            <span>⭐${nowPlayingLoadRating}</span>
                            <p>${nowPlayingLoadOverview}</p>
                        </div>
                       
                    </div>
                `
                document.body.append(nowPopLoadContainer);
                let closeBtnLoop = document.querySelectorAll("#close-btn");
                let closeModal = document.querySelectorAll("#modal");
                for(var i =0; closeBtnLoop.length; i++){
                    closeBtnLoop[i].addEventListener("click", function(){
                        for(var i=0; closeModal.length; i++){
                            closeModal[i].style.display = "none";
                    }
                })
            }
            })
            
            }
        }
    loadNowPlaying();
})

// function to display searched Movies 
async function searchMovies(){
    const searchQuery = document.getElementById("search").value;
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${searchQuery}`);
    const jsonResponse = await response.json();
    let searchContainer = "";

    searchedMoviesDiv = document.createElement("div");
    searchedMoviesDiv.setAttribute("id", "searchedMoviesContainer");

    jsonResponse.results.map((result) =>
    searchContainer += `
    <div id="movie-container">
        <img src="https://image.tmdb.org/t/p/w400${result.poster_path}" alt="${result.title}"  id="img" overview="${result.overview}" release-date ="${result.release_date}" 
        title ="${result.title}" vote ="${result.vote_average}" backdrop ="${result.backdrop_path}"/>
        <h3 id="search-title">${result.title}</h3>
        <h3>⭐${result.vote_average}</h3>
    </div>
    `
    )
    searchedMoviesDiv.innerHTML += searchContainer;
    document.getElementById("search-movies").append(searchedMoviesDiv);

    let searchPopup = document.querySelectorAll('#searchedMoviesContainer');
    
        for (var i =0; searchPopup.length; i++){
            searchPopup[i].addEventListener('click', function(e){
                var searchOverview = e.target.getAttribute("overview");
                var searchDate = e.target.getAttribute("release-date");
                var searchTitle= e.target.getAttribute("title");
                var searchRating = e.target.getAttribute("vote");
                var searchBackDrop = e.target.getAttribute("backdrop");
               
                searchPopContainer = document.createElement("div");
                searchPopContainer.innerHTML =`
                    <div id="modal">
                        <div id="modal-content">
                        <button id="close-btn"> X </button>
                        <img src="https://image.tmdb.org/t/p/w400${searchBackDrop}" id="pop-img" alt="${searchTitle}"/>
                        <h1>${searchTitle}</h1>
                        <span>${searchDate}</span>
                            <span>⭐${searchRating}</span>
                            <p>${searchOverview}</p>
                        </div>
                       
                    </div>
                `
                document.body.append(searchPopContainer);
                let closeBtnLoop = document.querySelectorAll("#close-btn");
                let closeModal = document.querySelectorAll("#modal");
                for(var i =0; closeBtnLoop.length; i++){
                        closeBtnLoop[i].addEventListener("click", function(){
                            for(var i=0; closeModal.length; i++){
                            closeModal[i].style.display = "none";
                    }
                })
            }
        
            })
            
            }
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
            <img src="https://image.tmdb.org/t/p/w400${result.poster_path}" alt="${result.title}"  id="img" overview="${result.overview}" release-date ="${result.release_date}" 
            title ="${result.title}" vote ="${result.vote_average}" backdrop ="${result.backdrop_path}"/>
            <h3 id="searchLoad">${result.title}</h3>
            <h3>⭐${result.vote_average}</h3>
        </div>
        `,
        );
        searchDiv.innerHTML += searchloadContainer;
        document.getElementById("search-show-more").append(searchDiv);
        
        let searchLoadPopup = document.querySelectorAll('#searchContainer');
        for (var i =0; searchLoadPopup.length; i++){
            searchLoadPopup[i].addEventListener('click', function(e){
                var searchLoadOverview = e.target.getAttribute("overview");
                var searchLoadDate = e.target.getAttribute("release-date");
                var searchLoadTitle= e.target.getAttribute("title");
                var searchLoadRating = e.target.getAttribute("vote");
                var searchLoadBackDrop = e.target.getAttribute("backdrop");
               
                searchLoadPopContainer = document.createElement("div");
                searchLoadPopContainer.innerHTML =`
                    <div id="modal">
                        <div id="modal-content">
                        <button id="close-btn"> X </button>
                        <img src="https://image.tmdb.org/t/p/w400${searchLoadBackDrop}" id="pop-img" alt="${searchLoadTitle}"/>
                        <h1>${searchLoadTitle}</h1>
                        <span>${searchLoadDate}</span>
                            <span>⭐${searchLoadRating}</span>
                            <p>${searchLoadOverview}</p>
                        </div>
                    </div>
                `
                document.body.append(searchLoadPopContainer);
                let closeBtnLoop = document.querySelectorAll("#close-btn");
                let closeModal = document.querySelectorAll("#modal");
                for(var i =0; closeBtnLoop.length; i++){
                    closeBtnLoop[i].addEventListener("click", function(){
                        for(var i=0; closeModal.length; i++){
                        closeModal[i].style.display = "none";
                    }
                })
            }
                
            })
            
            }
        
        }
    loadmoreSearch();
})

// Click event listener function for clear button
document.getElementById("clearBtn").addEventListener("click", function(){
    // hide display of searched movies, search more movies button, and loaded searched movies
    searchedMovies.style.display = "none";
    searchLoad.style.display = "none";
    searchloadmoreBtn.style.display = "none";
    // upon clicking, clear input value field
    document.getElementById("search").value = "";
    // display now playing movies, load more current movies button, and more current movies
    nowPlaying.style.display ="block";
    nowPlayingLoadDiv.style.display = "block";
    nowloadmoreBtn.style.display ="block";
    clearButton.style.display ="none";
    // display slider again after hiding container
    slider.style.display = "block";
    // clear data in searched movies container
    searchedMovies.innerHTML = '';
    searchLoad.innerHTML = '';
    // display and hide now playing and search titles
    search_title.style.display = "none";
    now_playing_title.style.display = "block";
    
})


// Display Now Playing Movies function
window.onload = function() {
   nowPlayingMovies();
   testie();
};

