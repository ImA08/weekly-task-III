import { getMovies, getUpcomingMovies } from "./utils.js";

const setMovies = async () => {
  const dataMovies = await getMovies();

  if (!dataMovies || dataMovies.length < 4) return;

  for (let i = 0; i < 4; i++) {
    const movieElement = document.querySelector(
      `.movies .movie-list .movie:nth-child(${i + 1}) .img`
    );

    const titleElement = document.querySelector(
      `.movies .movie-list .movie:nth-child(${i + 1}) .desc .movie-title`
    );

    const genresElement = document.querySelector(
      `.movies .movie-list .movie:nth-child(${i + 1}) .desc .genres`
    );

    console.log("Movie Element:", movieElement);
    console.log("Title Element:", titleElement);
    console.log("Genres Element:", genresElement);

    if (movieElement) {
      movieElement.style.backgroundImage = `url("https://image.tmdb.org/t/p/w500/${dataMovies[i].poster_path}")`;
      movieElement.style.backgroundSize = "cover";
      movieElement.style.backgroundPosition = "center";
    }

    if (titleElement) {
      titleElement.textContent = dataMovies[i].title;
    }

    if (genresElement) {
      // Kosongkan genre sebelumnya
      genresElement.innerHTML = "";

      // Ambil dua genre pertama
      const firstTwoGenres = dataMovies[i].genres.slice(0, 2);

      // Tambahkan genre baru
      firstTwoGenres.forEach((genre) => {
        const genreTag = document.createElement("p");
        genreTag.textContent = genre;
        genresElement.appendChild(genreTag);
      });
    }
  }
};

setMovies();


const renderUpcomingMovies = async () => {
    const dataUpcomingMovies = await getUpcomingMovies();
    const upcomingMoviesContainer = document.querySelector(".upcomin-movies .movie-list");
  
    if (!upcomingMoviesContainer) return;
  
    upcomingMoviesContainer.innerHTML = "";
  
    dataUpcomingMovies.slice(0, 4).forEach((movie) => {
      const movieElement = document.createElement("div");
      movieElement.classList.add("movie");
  
      movieElement.innerHTML = `
        <div>
          <div class="img" style="background-image: url('https://image.tmdb.org/t/p/w500/${movie.poster_path}')">
            <div class="detail">
              <div><a href="">Details</a></div>
              <div><a href="">Buy Ticket</a></div>
            </div>
          </div>              
        </div>
        <div class="desc">
          <div class="movie-title">${movie.title}</div>
          <div class="genres">
            ${movie.genres.map((genre) => `<p>${genre}</p>`).join("")}
          </div>
        </div>
      `;
  
      upcomingMoviesContainer.appendChild(movieElement);
    });
  };
  
  renderUpcomingMovies();