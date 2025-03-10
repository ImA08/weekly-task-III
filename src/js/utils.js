// FUNGSI VALIDASI EMAIL

export const validateEmail = (inputEmail) => {
  const email = inputEmail.trim(); // Hilangkan spasi di awal & akhir
  const atIndex = email.indexOf("@");
  const lastAtIndex = email.lastIndexOf("@");
  const lastDotIndex = email.lastIndexOf(".");
  const errors = [];

  // Cek apakah '@' ada dan tidak di awal atau akhir
  if (atIndex <= 0 || lastAtIndex > lastDotIndex) errors.push(1);

  // Cek apakah ada '.' setelah '@'
  if (lastDotIndex <= atIndex + 1 || lastDotIndex === email.length - 1)
    errors.push(1);

  // Cek apakah email tidak diawali atau diakhiri dengan '.'
  if (email.startsWith(".") || email.endsWith(".")) errors.push(1);

  // Cek apakah ada dua titik berturut-turut
  if (email.includes("..")) errors.push(1);

  if (errors.length > 0) {
    return false;
  }
  return true;
};

// FUNGSI VALIDASI PASWORD

export const validatePwd = (inputPwd) => {
  let hasLetter = false;
  let hasSpecialChar = false;
  let hasNumber = false;
  const specialChars = ["_", "-", "@", "$"];
  const errors = [];

  // Memeriksa setiap karakter dalam password
  for (let i = 0; i < inputPwd.length; i++) {
    const char = inputPwd.charAt(i);

    // Memeriksa jika karakter adalah huruf
    if ((char >= "a" && char <= "z") || (char >= "A" && char <= "Z")) {
      hasLetter = true;
    }

    // Memeriksa jika karakter adalah angka
    if (char >= "0" && char <= "9") {
      hasNumber = true;
    }

    // Memeriksa jika karakter adalah salah satu karakter spesial
    if (specialChars.includes(char)) {
      hasSpecialChar = true;
    }
  }

  // Memeriksa panjang minimal password (6 karakter)
  const isValidLength = inputPwd.length >= 6;

  if (!isValidLength) errors.push();
  if (!hasLetter) errors.push();
  if (!hasSpecialChar) errors.push();
  if (!hasNumber) errors.push();

  if (errors.length > 0) {
    return false;
  }

  return true;
};

// PERIKSA DUPLIKAT EMAIL
export const checkDuplikat = (email) => {
  let users = JSON.parse(localStorage.getItem("signUpData")) || [];
  console.log(users);
  for (let i = 0; i < users.length; i++) {
    if (users.email === email) {
      return false;
    }
  }
};

// FETCHING

const url = "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNTNkMWZlYjBhNTExNmZmMWFmOTJlNzExNjI4Y2VlYSIsIm5iZiI6MTc0MTU0MjUzOS45NTYsInN1YiI6IjY3Y2RkNDhiM2MyNTQ0NDg4MmUyZDhlOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.a1oaVuI56M-4EmEXr-DhO5uATENpRrViM5aGSKR0XZo",
  },
};

export const getMovies = async () => {
  try {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(res.statusText);
    const dataJSON = await res.json();
    const dataMovies = dataJSON.results;

    const moviesExtractData = await Promise.all(
      dataMovies.map(async (el) => {
        const genreData = await getGenres(el);
        return {
          title: genreData.title,
          poster_path: genreData.poster_path, 
          genres: genreData.genres.map((g) => g.name).slice(0, 2), // Ambil nama genre dan hanya 2 pertama
        };
      })
    );

    return moviesExtractData;
  } catch (error) {
    console.log(error.message);
    return [];
  }
};






const urlGenre = 'https://api.themoviedb.org/3/genre/movie/list?language=en';
const optionsGenre = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNTNkMWZlYjBhNTExNmZmMWFmOTJlNzExNjI4Y2VlYSIsIm5iZiI6MTc0MTU0MjUzOS45NTYsInN1YiI6IjY3Y2RkNDhiM2MyNTQ0NDg4MmUyZDhlOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.a1oaVuI56M-4EmEXr-DhO5uATENpRrViM5aGSKR0XZo'
  }
};


const getGenres = async ({ title, poster_path, genre_ids }) => {
  try {
    const res = await fetch(urlGenre, optionsGenre);
    if (!res.ok) throw new Error(res.statusText);
    const dataJSON = await res.json();
    const genresList = dataJSON.genres;

    const genres = genre_ids.map(
      (id) => genresList.find((genre) => genre.id === id)
    );

    return {
      title,
      poster_path,
      genres, 
    };
  } catch (error) {
    console.log(error.message);
    return { title, poster_path, genres: [] };
  }
};

const urlUpcoming = "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1";

export const getUpcomingMovies = async () => {
  try {
    const res = await fetch(urlUpcoming, options);
    if (!res.ok) throw new Error(res.statusText);
    const dataJSON = await res.json();
    const dataMovies = dataJSON.results;

    const moviesExtractData = await Promise.all(
      dataMovies.map(async (el) => {
        const genreData = await getGenres(el);
        return {
          title: genreData.title,
          poster_path: genreData.poster_path, 
          genres: genreData.genres.map((g) => g.name).slice(0, 2), // Ambil 2 genre pertama
        };
      })
    );

    return moviesExtractData;
  } catch (error) {
    console.log(error.message);
    return [];
  }
};
