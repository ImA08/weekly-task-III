const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
const urlGenre = 'https://api.themoviedb.org/3/genre/movie/list?language=en'
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZmM3ZWNhZjdjYjAzMTk3MmM4ODFhYzA5Y2MzNGE2YSIsIm5iZiI6MTc0MTMxMzM1OS45NjcsInN1YiI6IjY3Y2E1NTRmNzQ3OWQ4Yzg0OTJiM2Q2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GrBEVi__prOYL5AB5KMgbg0dvTc3I6Ar6cEfl29M5yE'
  }
};

const getMovies = async () => {
  try {
    const res = await fetch(url, options)
    if (!res.ok) throw new Error(res.statusText);
    
    const json = await res.json()
    const data = json.results

    const movieData = Promise.all(
      data.map((el) => {
        return getGenres(el)
      })
    )

    const result  = await movieData

    const movieCarousel = document.querySelector(".movies-carousel")
    result.forEach((movie) => {
          const movieCard = document.createElement("div")
          movieCard.classList.add("movie-card")
          
          const movieMenuHover = document.createElement("div")
          movieMenuHover.classList.add("movies-menu-hover")
          const anchorDetails = document.createElement("a")
          const buttonDetails = document.createElement("button")
          const anchorBuyTicket = document.createElement("a")
          const buttonBuyTicket = document.createElement("button")
          anchorDetails.href = "../detail/detail.html"
          buttonDetails.textContent = "Details"
          anchorBuyTicket.href = "../order/order.html"
          buttonBuyTicket.textContent = "Buy Tickets"
          anchorDetails.append(buttonDetails)
          anchorBuyTicket.append(buttonBuyTicket)
          movieMenuHover.append(anchorDetails)
          movieMenuHover.append(anchorBuyTicket)

          const img = document.createElement("img")
          img.src = 'https://image.tmdb.org/t/p/original' + movie.img
          img.alt = movie.title
          img.width = "240"
          img.height = "369"

          const title = document.createElement("a")
          title.href = "./detail/detail.html"
          title.textContent = movie.title

          const ul = document.createElement("ul")
          movie.genres.forEach((genre) => {
            const li = document.createElement("li")
            li.textContent = genre
            ul.appendChild(li)
          })

          movieCard.append(movieMenuHover)
          movieCard.append(img)
          movieCard.append(title)
          movieCard.append(ul)

          movieCarousel.append(movieCard)
    })
  
  } catch (error) {
      if (error instanceof Error) console.log(error.message)
  }
}

const getGenres = async ({title, poster_path, genre_ids}) => {
  try {
    const res = await fetch(urlGenre, options)
    if (!res.ok) throw new Error(res.statusText);
    
    const json = await res.json()
    const genres = json.genres
    const movieGenres = []
    for (const genre of genres) {
      for (const genre_id of genre_ids) {
        if (genre.id === genre_id) {
          movieGenres.push(genre.name)
        }
      }
    }

    return {
      title,
      img: poster_path,
      genres: movieGenres
    }
  } catch (error) {
    if (error instanceof Error) console.log(error.message)
    
  }
}

getMovies()