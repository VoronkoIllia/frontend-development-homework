// Завантаження даних про фільми з JSON файлу
async function getMovies() {
  try {
    const response = await fetch("../data/movies.json");
    if (!response.ok) {
      throw new Error("Помилка при завантаженні даних про фільмів.");
    }
    const movies = await response.json();
    return movies;
  } catch (error) {
    console.error("Помилка при отриманні даних про фільми:", error);
    throw new Error(
      "Не вдалося завантажити дані про фільми. Спробуйте пізніше."
    );
  }
}

// Створення оверлею для картки фільму
const createMovieCardOverlay = ({ duration, rating, genre, year }) => {
  const durationTime = Number.parseInt(duration);
  const hours = Math.floor(durationTime / 60);
  const minutes = durationTime % 60;

  return `<div class="movie-overlay">
                <p class="movie-duration">${hours ? hours + "г" : ""} ${
    minutes !== 0 ? minutes + "м" : ""
  }</p>
                <button class="play-button"></button>
                <p class="movie-info">
                  <b class="imdb-mark">IMDb</b>
                  ${[`${rating}/10`, genre.join(", "), year].join(" &bull; ")}
                </p>
              </div>`;
};

// Створення картки фільму
const createMovieCard = ({ title, poster, ...additionalInfo }) => {
  return `
    <li class="movie-card">
            <div class="movie-thumbnail">
              <img
                src="${poster}"
                alt="Постер до ${title}"
              />
              ${createMovieCardOverlay(additionalInfo)}
            </div>
            <h3 class="movie-title">${title}</h3>
          </li>
    `;
};

// Відображення/приховування індикатора завантаження
const setLoading = (isLoading) => {
  const moviesList = document.getElementById("movies-list");
  moviesList.innerHTML = isLoading
    ? `<div class="loader">
            <img src="./assets/gifs/loading.gif" alt="Завантаження..." />
            <p>Бетмен вже біжить за кіно...</p>
          </div>`
    : "";
};

// Відображення повідомлення про помилку
const showError = (message) => {
  const moviesList = document.getElementById("movies-list");
  moviesList.innerHTML = `<div class="error">
            <h2>:(</h2>
            <p>${message}</p>
            <button id="reload-button">Спробувати ще раз</button>
          </div>`;
  const reloadButton = document.getElementById("reload-button");
  reloadButton.addEventListener("click", drawMovies);
};

// Відображення фільмів на сторінці
const drawMovies = async () => {
  try {
    setLoading(true); // Показати індикатор завантаження
    const movies = await getMovies(); // Завантажити дані про фільми
    setLoading(false); // Приховати індикатор завантаження після отримання відповіді на запит

    // Показати кількість знайдених фільмів
    const moviesCount = document.getElementById("movies-count");
    moviesCount.textContent = `Знайдено фільмів: ${movies.length}`;

    // Відобразити фільми на сторінці
    const moviesList = document.getElementById("movies-list");
    moviesList.innerHTML = movies
      .map((movie) => createMovieCard(movie))
      .join("");
  } catch (error) {
    // Обробка помилок
    setLoading(false);
    showError(error.message);
  }
};

// Завантаження та відображення фільмів після завантаження DOM
document.addEventListener("DOMContentLoaded", drawMovies);
