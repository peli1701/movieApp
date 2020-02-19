const btn = document.querySelector(".submit");
const form = document.querySelector(".form");
const val = document.querySelector(".formData");
const movie = document.querySelector(".container");
const header = document.querySelector(".movieHeader");
const returnHome = document.querySelector(".returnHome");
const moreInfo = document.querySelector(".moreInfo");

window.addEventListener("load", () => {
  const trending =
    "https://api.themoviedb.org/3/trending/all/day?api_key=be08c1fc239f1ba04c69f4a35cbef48b";

  fetch(trending)
    .then(response => {
      return response.json();
    })
    .then(data => {
      let movies = data.results;
      let output = "";
      movies.forEach(movie => {
        if (movie.poster_path === null || movie.title === undefined) {
          return;
        }
        // console.log(movie);
        let releaseDate = movie.release_date.slice(0, 4);
        output += `
        <div class="movieContainer">
        <img class="movieImg" src="https://image.tmdb.org/t/p/original${movie.poster_path}" alt="">
          <h1 class="movieTitle"> ${movie.title}</h1>
          <h2 class="movieReleaseDate"> ${releaseDate}</h2>
          <a class="moreInfo" onclick="selectMovie(${movie.id})">More Info</a>
        </div>`;
      });
      movie.innerHTML = output;
    })
    .catch(err => alert(err));
});

form.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    event.preventDefault();
    let keyword = val.value;
    searchMovie(keyword);
    val.value = "";
  }
});

btn.addEventListener("click", () => {
  let keyword = val.value;
  searchMovie(keyword);
  val.value = "";
});

function searchMovie(keyword) {
  if (keyword == "") {
    alert("Please Enter Non-Empty Search Query");
    return;
  }
  const url = `https://api.themoviedb.org/3/search/movie?api_key=be08c1fc239f1ba04c69f4a35cbef48b&language=en-US&query=${keyword}&page=1&include_adult=false`;

  fetch(url)
    .then(response => {
      return response.json();
    })
    .then(data => {
      if (data.results.length == 0) {
        alert("No Results Found");
        return;
      }
      let movies = data.results;
      let output = "";
      movies.forEach(movie => {
        if (movie.poster_path === null || movie.title === undefined) {
          return;
        }
        let releaseDate = movie.release_date.slice(0, 4);
        output += `
        <div class="movieContainer">
          <img class="movieImg" src="https://image.tmdb.org/t/p/original${movie.poster_path}" alt="">
          <h1 class="movieTitle">  ${movie.title}       </h1>
          <h2 class="movieReleaseDate">  ${releaseDate} </h2>
          <a class="moreInfo" onclick="selectMovie(${movie.id})">More Info</a>
        </div>`;
        console.log(movie.id);
      });
      header.innerHTML = `Results for: ${keyword}`;
      returnHome.innerHTML = "Back to Trending";
      returnHome.addEventListener("click", () => location.reload());
      movie.innerHTML = output;
    })
    .catch(err => alert(err));
}

function selectMovie(id) {
  movie.innerHTML = "";

  const searchData = `https://api.themoviedb.org/3/movie/${id}?api_key=be08c1fc239f1ba04c69f4a35cbef48b&language=en-US`;

  fetch(searchData)
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);
      if (data == null) {
        return;
      }
      // output = "";
      let output = `
      <div class="infoContainer">
        <img class="poster" src="https://image.tmdb.org/t/p/original${data.poster_path}" alt="">
        <div class = "movieInfo">
          <h1 class="title"> ${data.original_title} </h1>
          <h2 class="tagline"> "${data.tagline}" </h2>
          <h2 class="li date"> Released: ${data.release_date} </h2>
          <h2 class="li genre"> Genre: ${data.genres[0].name} </h2>
          <h2 class="li producer"> Producer: ${data.production_companies[0].name} </h2>
          <h2 class="li runtime"> Runtime: ${data.runtime} Minutes </h2>
          <h2 class="li budget"> Budget: $${data.budget} </h2>
          <h2 class="li income"> Revenue: $${data.revenue} </h2>
          <h2 class="li plot"> Plot: ${data.overview} </h2>
        </div>
      </div>
      `;
      movie.innerHTML = output;
      header.innerHTML = "";
      returnHome.innerHTML = "Back to Trending";
      returnHome.addEventListener("click", () => location.reload());
    })
    .catch(err => alert(err));
}
