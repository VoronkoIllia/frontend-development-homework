import "./style.css";
import type { Post } from "./types";
import { articles } from "./data";

// Функція для створення HTML-елементу поста
const renderPost = (post: Post): HTMLElement => {
  const postContainer = document.createElement("article");

  postContainer.classList.add("post-item");

  const postTitle = document.createElement("h3");
  postTitle.classList.add("post-title");
  postTitle.textContent = post.title;
  postContainer.appendChild(postTitle);

  const postMeta = document.createElement("dl");
  postMeta.classList.add("post-meta");

  const dateTerm = document.createElement("dt");
  dateTerm.textContent = "Дата:";
  postMeta.appendChild(dateTerm);

  const dateDesc = document.createElement("dd");
  dateDesc.textContent = post.createdAt.toLocaleDateString();
  postMeta.appendChild(dateDesc);
  postContainer.appendChild(postMeta);

  const postBody = document.createElement("p");
  postBody.classList.add("post-content");
  postBody.textContent = post.body;
  postContainer.appendChild(postBody);

  return postContainer;
};

// Оновлення лічильника постів
const updateCounter = () => {
  const counter = document.getElementById("posts-count")!;
  counter.textContent = "Знайдено статей: " + articles.length.toString();
};

// Оновлення списку постів
const updatePosts = () => {
  const postList = document.getElementById("post-list")!;
  postList.innerHTML = "";
  for (const article of articles) {
    const postItem = document.createElement("li");
    postItem.append(renderPost(article));
    postList.appendChild(postItem);
  }
  updateCounter();
};

// Очищення всіх постів
const clearPosts = () => {
  articles.length = 0;
  updatePosts();
};

// Показати або приховати форму додавання поста
const showAddPostForm = (isFormShowing: boolean) => {
  const modalContainer = document.querySelector(
    ".modal-window-container"
  ) as HTMLDivElement;
  modalContainer.style.display = isFormShowing ? "flex" : "none";
};

const addPostFormSubmit = (event: Event) => {
  event.preventDefault();
  const form: HTMLFormElement = event.target as HTMLFormElement;

  // Отримуємо дані з форми
  const formData = new FormData(form);

  const newPost: Post = {
    id: articles.length + 1,
    title: formData.get("postTitle") as string,
    body: formData.get("postContent") as string,
    createdAt: new Date(),
  };
  // Додаємо новий пост до масиву статей
  articles.unshift(newPost);
  // Оновлюємо відображення списку постів
  updatePosts();
  // Закриваємо форму та очищуємо її
  form.reset();
  showAddPostForm(false);
  // Показуємо повідомлення про успішне додавання
  alert("Пост успішно додано!");
};

// Ініціалізація подій після завантаження DOM
document.addEventListener("DOMContentLoaded", updatePosts);

// Прив'язка обробників подій до кнопок
document.getElementById("clearPostBtn")!.addEventListener("click", clearPosts);
document
  .getElementById("addPostBtn")!
  .addEventListener("click", () => showAddPostForm(true));

document
  .getElementById("closeFormBtn")!
  .addEventListener("click", () => showAddPostForm(false));

document
  .getElementById("addPostForm")!
  .addEventListener("submit", addPostFormSubmit);
