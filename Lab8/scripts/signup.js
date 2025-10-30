// функція для валідації форми
function isFormValid() {
  let isValid = false;
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const form = document.getElementById("signup-form");

  if (form.elements["username"].value.trim() === "") {
    // перевірка на порожнє ім'я користувача
    form.elements["username"].classList.add("invalid");
    form.elements["username"].setCustomValidity("Це поле є обов'язковим.");
    document.querySelector("#username + .error").textContent =
      "Це поле є обов'язковим.";
  } else if (!emailPattern.test(form.elements["email"].value)) {
    // перевірка на валідність email
    form.elements["email"].classList.add("invalid");
    form.elements["email"].setCustomValidity(
      "Будь ласка, введіть дійсну електронну адресу."
    );
    document.querySelector("#email + .error").textContent =
      "Будь ласка, введіть дійсну електронну адресу.";
  } else if (form.elements["password"].value.length < 8) {
    // перевірка на довжину пароля
    form.elements["password"].classList.add("invalid");
    form.elements["password"].setCustomValidity(
      "Пароль повинен містити щонайменше 8 символів."
    );
    document.querySelector("#password + .error").textContent =
      "Пароль повинен містити щонайменше 8 символів.";
  } else if (
    form.elements["confirm-password"].value !== form.elements["password"].value // перевірка на співпадіння паролів
  ) {
    form.elements["confirm-password"].classList.add("invalid");
    form.elements["confirm-password"].setCustomValidity(
      "Паролі не співпадають."
    );
    document.querySelector("#confirm-password + .error").textContent =
      "Паролі не співпадають.";
  } else if (form.elements["birthdate"].value === "") {
    // перевірка на заповнення дати народження
    form.elements["birthdate"].classList.add("invalid");
    form.elements["birthdate"].setCustomValidity(
      "Будь ласка, вкажіть дату народження."
    );
    document.querySelector("#birthdate + .error").textContent =
      "Будь ласка, вкажіть дату народження.";
  } else {
    isValid = true;
  }

  return isValid;
}

// завантаження збережених даних при завантаженні сторінки
document.addEventListener("DOMContentLoaded", () => {
  const savedData = JSON.parse(localStorage.getItem("userData"));
  if (savedData) {
    const form = document.getElementById("signup-form");
    for (const key in savedData) {
      if (form.elements[key].type === "checkbox") {
        form.elements[key].checked = savedData[key] === "on";
      } else {
        form.elements[key].value = savedData[key];
      }
    }
  }
});

// обробник подій для форми реєстрації
document.getElementById("signup-form").addEventListener("submit", function (e) {
  e.preventDefault();
  if (isFormValid()) {
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    localStorage.setItem("userData", JSON.stringify(data));
    alert("Реєстрація успішна! Дані збережено в localStorage.");
    e.target.reset();
  }
});

// очищення помилок при введенні даних
document.querySelectorAll(".input-with-error input").forEach((input) => {
  input.addEventListener("input", (e) => {
    e.target.classList.remove("invalid");
    e.target.setCustomValidity("");
    document.querySelector(`#${e.target.id} + .error`).textContent = "";
  });
});
