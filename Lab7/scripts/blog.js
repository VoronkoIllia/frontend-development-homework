//параметри фільтрації
const filterParams = {
  category: null,
  title: "",
};

//статті
const articles = [
  {
    id: 1,

    title: "Основи JavaScript",

    author: "Olha Shutylieva",

    date: "2025-10-10",

    category: "JavaScript",

    tags: ["JavaScript", "Basics", "ES6"],

    content:
      "Коротко про синтаксис, змінні та типи даних. З чого почати роботу з JS.",
  },

  {
    id: 2,

    title: "Гнучкі макети з Flexbox",

    author: "Dmytro Kovalenko",

    date: "2025-10-08",

    category: "CSS",

    tags: ["CSS", "Flexbox", "Layout"],

    content: "Flexbox допомагає будувати адаптивні макети з мінімумом коду.",
  },

  {
    id: 3,

    title: "Семантика HTML5",

    author: "Iryna Chorna",

    date: "2025-10-05",

    category: "HTML",

    tags: ["HTML", "Semantic"],

    content:
      "Навіщо використовувати семантичні теги та як правильно це зробити.",
  },

  {
    id: 4,

    title: "Методи масивів у JavaScript",

    author: "Roman Hrytsenko",

    date: "2025-10-13",

    category: "JavaScript",

    tags: ["JavaScript", "Array", "map", "filter", "find"],

    content:
      "Практика з map, filter, reduce, find, sort на реальних прикладах.",
  },
];

//пошук категорій
const getCategories = () =>
  Array.from(new Set(articles.map((a) => a.category))).sort();

//фільтрація статей
const filterArticles = (category, title) =>
  articles.filter(
    (article) =>
      (filterParams.category === null || article.category === category) &&
      article.title.toLowerCase().startsWith(title.toLowerCase())
  );

//рендеринг статті
const renderArticle = (article) => `<li>
            <article class="post-item">
              <h3 class="post-title">${article.title}</h3>
              <dl class="post-meta">
                <dt>Автор:</dt>
                <dd><strong>${article.author}</strong></dd>
                <dt>Категорія:</dt>
                <dd><em>${article.category}</em></dd>
                <dt>Дата:</dt>
                <dd>${new Date(article.date).toLocaleDateString("uk-UA")}</dd>
              </dl>
              <p class="post-content">${article.content}</p>
              <ul class="post-tags">
              ${article.tags
                .map((tag) => `<li class="post-tag">#${tag}</li>`)
                .join("")}
              </ul>
            </article>
          </li>`;

//рендеринг списку статей
const renderArticles = (list = articles) => {
  //рендеримо кількість знайдених статей
  const counter = document.getElementById("posts-count");
  counter.textContent = `Знайдено статей: ${list.length}`;

  //рендеримо статті
  const postsList = document.getElementById("post-list");
  postsList.innerHTML =
    list.map(renderArticle).join("") || "<p>Нічого не знайдено</p>";
};

// рендеринг категорій
const renderCategories = () => {
  //відображаємо категорії
  const categories = getCategories();
  const categoriesBtnGroup = document.getElementById("categories");
  categoriesBtnGroup.innerHTML =
    `<button class="category-button active">Усі</button>` +
    categories
      .map(
        (category) =>
          `<button class="category-button" data-filter="${category}">${category}</button>`
      )
      .join("");

  //додаємо обробники кліків на кнопки категорій
  categoriesBtnGroup.querySelectorAll(".category-button").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      //виділяємо обрану категорію
      e.target.classList.add("active");
      categoriesBtnGroup.querySelectorAll(".category-button").forEach((b) => {
        if (b !== e.target) b.classList.remove("active");
      });
      //фільтруємо статті за обраною категорією
      filterParams.category = btn.dataset.filter || null;
      renderArticles(filterArticles(...filterParams));
    });
  });
};

//обробник подій для кнопки "Знайти"
const searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", () => {
  const searchInput = document.getElementById("search-input");
  filterParams.title = searchInput.value;
  renderArticles(filterArticles(...filterParams));
});

//початковий рендер категорій
renderCategories();

//початковий рендер статей
renderArticles(articles);
