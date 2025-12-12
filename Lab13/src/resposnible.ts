import { BREAKPOINTS } from "./breakpoints";

const linksToOtherPages = document.querySelector<HTMLDivElement>(
  ".links-to-other-pages"
);
const aboutInfoContainer =
  document.querySelector<HTMLDivElement>("#about > div");
const aboutImage = document.querySelector<HTMLImageElement>("#about img");
const cards = document.querySelectorAll<HTMLDivElement>(".card");

if (!linksToOtherPages) {
  console.warn("Element '.links-to-other-pages' not found");
}
if (!aboutInfoContainer) {
  console.warn("Element '#about > div' not found");
}
if (!aboutImage) {
  console.warn("Element '#about img' not found");
}
if (cards.length === 0) {
  console.warn("Elements with class '.card' not found");
}

const mqlMobile = window.matchMedia(BREAKPOINTS.mobile);
const mqlTablet = window.matchMedia(BREAKPOINTS.tablet);
const mqlDesktop = window.matchMedia(BREAKPOINTS.desktop);
const mqlHuge = window.matchMedia(BREAKPOINTS.huge);

function applyResponsiveStyles(): void {
  if (mqlHuge.matches) {
    // Задаємо стилі для великого екрану

    // Стилі для body
    document.body.style.gridTemplateAreas = `
            "h h h h"
            "n n n n"
            "a m m m"
            "f f f f"
        `;

    // Стилі для контейнера з посиланнями
    linksToOtherPages!.style.flexDirection = "row";

    // Стилі для контейнера з інформацією про автора
    aboutInfoContainer!.style.flexDirection = "row";

    // Стилі для зображення автора
    aboutImage!.style.width = "40%";
    aboutImage!.style.alignSelf = "auto";

    // Стилі для карток
    cards.forEach((card) => {
      card.style.width = "32%";
    });
  } else if (mqlDesktop.matches) {
    // Стилі для body
    document.body.style.gridTemplateAreas = `
        "h h h h"
        "n n n n"
        "a m m m"
        "f f f f"
      `;

    // Стилі для контейнера з посиланнями
    linksToOtherPages!.style.flexDirection = "row";

    // Стилі для контейнера з інформацією про автора
    aboutInfoContainer!.style.flexDirection = "row";

    // Стилі для зображення автора
    aboutImage!.style.width = "40%";
    aboutImage!.style.alignSelf = "auto";

    // Стилі для карток
    cards.forEach((card) => {
      card.style.width = "48%";
    });
  } else if (mqlTablet.matches) {
    // Стилі для body
    document.body.style.gridTemplateAreas = `
        "h h h h"
        "n n n n"
        "a a a a"
        "m m m m"
        "f f f f"
      `;

    // Стилі для контейнера з посиланнями
    linksToOtherPages!.style.flexDirection = "column";

    // Стилі для контейнера з інформацією про автора
    aboutInfoContainer!.style.flexDirection = "row";

    // Стилі для зображення автора
    aboutImage!.style.width = "40%";
    aboutImage!.style.alignSelf = "auto";

    // Стилі для карток
    cards.forEach((card) => {
      card.style.width = "48%";
    });
  } else if (mqlMobile.matches) {
    // Стилі для body
    document.body.style.gridTemplateAreas = `
        "h h h h"
        "n n n n"
        "a a a a"
        "m m m m"
        "f f f f"
      `;

    // Стилі для контейнера з посиланнями
    linksToOtherPages!.style.flexDirection = "column";

    // Стилі для контейнера з інформацією про автора
    aboutInfoContainer!.style.flexDirection = "column";

    // Стилі для зображення автора
    aboutImage!.style.width = "80%";
    aboutImage!.style.alignSelf = "center";

    // Стилі для карток
    cards.forEach((card) => {
      card.style.width = "100%";
    });
  }
}

// Ініціалізація  адаптивних стилів при завантаженні сторінки
applyResponsiveStyles();

// Додавання слухачів подій для відстеження змін розміру вікна
mqlMobile.addEventListener("change", applyResponsiveStyles);
mqlTablet.addEventListener("change", applyResponsiveStyles);
mqlDesktop.addEventListener("change", applyResponsiveStyles);
mqlHuge.addEventListener("change", applyResponsiveStyles);
