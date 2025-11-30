import "./style.css";
import type { Post } from "./types";
import { fetchPosts } from "./postsApi";
import loadingGif from "./assets/gifs/loading.gif";
import noResults from "./assets/images/no-results.jpg";

// Відображення/приховування індикатора завантаження
const setLoading = (isLoading: boolean) => {
  const moviesList = document.getElementById("post-list");
  console.log(moviesList);
  moviesList!.innerHTML = isLoading
    ? `<div class="loader">
            <img src="${loadingGif}" alt="Завантаження..." />
          </div>`
    : "";
};

// Відображення повідомлення про відсутність постів
const showNotFound = () => {
  const postList = document.getElementById("post-list")!;
  postList.innerHTML = `<div class="not-found">
            <img src="${noResults}" alt="Пости не знайдено" />
            <p>Пости не знайдено</p>
            </div>`;
};

// Відображення повідомлення про помилку
const showError = (message: string) => {
  const postList = document.getElementById("post-list")!;
  postList.innerHTML = `<div class="error">
            <h2>:(</h2>
            <p>${message}</p>
            <button id="reload-button">Спробувати ще раз</button>
          </div>`;
  const reloadButton = document.getElementById("reload-button")!;
  reloadButton.addEventListener("click", updatePosts);
};

// Функція для створення HTML-елементу поста
const renderPost = (post: Post): HTMLElement => {
  const postContainer = document.createElement("article");

  postContainer.classList.add("post-item");

  const postTitle = document.createElement("h3");
  postTitle.classList.add("post-title");
  postTitle.textContent = post.title;
  postContainer.appendChild(postTitle);

  const postBody = document.createElement("p");
  postBody.classList.add("post-content");
  postBody.textContent = post.body;
  postContainer.appendChild(postBody);

  return postContainer;
};

// Оновлення лічильника постів
const updateCounter = (postCount: number) => {
  const counter = document.getElementById("posts-count")!;
  counter.textContent = "Знайдено статей: " + postCount;
};

// Оновлення списку постів
const updatePosts = async () => {
  setLoading(true);
  try {
    const posts = await fetchPosts();
    setLoading(false);

    updateCounter(posts.length);

    // Якщо пости не знайдені, показати відповідне повідомлення
    if (posts.length === 0) {
      showNotFound();
      return;
    }

    // Відображення постів
    const postList = document.getElementById("post-list")!;
    postList.innerHTML = "";
    for (const article of posts) {
      const postItem = document.createElement("li");
      postItem.append(renderPost(article));
      postList.appendChild(postItem);
    }
  } catch (error) {
    // Обробка помилки при завантаженні постів
    setLoading(false);
    updateCounter(0);
    showError((error as Error).message);
  }
};

// Ініціалізація подій після завантаження DOM
document.addEventListener("DOMContentLoaded", updatePosts);
