import type { Post } from "./types";

export const articles: Post[] = [
  {
    id: 1,

    title: "Основи JavaScript",

    body: "Коротко про синтаксис, змінні та типи даних. З чого почати роботу з JS.",

    createdAt: new Date("2025-10-10"),
  },

  {
    id: 2,

    title: "Гнучкі макети з Flexbox",

    body: "Flexbox допомагає будувати адаптивні макети з мінімумом коду.",

    createdAt: new Date("2025-10-08"),
  },

  {
    id: 3,

    title: "Семантика HTML5",

    body: "Навіщо використовувати семантичні теги та як правильно це зробити.",

    createdAt: new Date("2025-10-05"),
  },

  {
    id: 4,

    title: "Методи масивів у JavaScript",

    body: "Практика з map, filter, reduce, find, sort на реальних прикладах.",

    createdAt: new Date("2025-10-13"),
  },
];
