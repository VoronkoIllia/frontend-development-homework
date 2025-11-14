import type { UserData, UserDataValidationMap } from "./types";
import {
  maxLength,
  minLength,
  requiredField,
  validateAge,
  validateEmail,
  validateFormData,
} from "./validator";

export const createSignupForm = () => {
  const signupForm = document.createElement("form");

  const onSignupFormSubmit = (event: Event) => {
    // Вимикаємо відправку форми
    event.preventDefault();

    const form = event.target as HTMLFormElement;

    // Збираємо дані з форми
    const formData = new FormData(form);

    const userData: UserData = {
      username: formData.get("username") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      passwordConfirm: formData.get("passwordConfirm") as string,
      birth_year: Number(formData.get("birth_year")),
      about: formData.get("about") as string,
      agreeTerms: formData.get("agreeTerms") === "on",
    };

    // Визначаємо правила валідації для кожного поля
    const validationMap: UserDataValidationMap = {
      username: [requiredField, minLength(3), maxLength(20)],
      email: [requiredField, validateEmail],
      password: [requiredField, minLength(6)],
      passwordConfirm: [requiredField],
      birth_year: [requiredField, validateAge],
      about: [requiredField, minLength(10), maxLength(300)],
      agreeTerms: [requiredField],
    };

    // Валідуємо дані форми
    const validationErrors = validateFormData(userData, validationMap);

    // Виводимо помилки валідації, якщо вони є
    for (const field in validationErrors) {
      if (validationErrors[field as keyof UserData].length > 0) {
        const inputElement = form.querySelector(
          `[name="${field}"]`
        ) as HTMLElement;
        inputElement?.classList.add("invalid");
        const errorElement = form.querySelector(
          `.error[aria-describedby="${field}"]`
        ) as HTMLElement;

        errorElement.innerHTML = validationErrors[field as keyof UserData][0];
      }
    }
  };

  // Створюємо розмітку форми
  signupForm.innerHTML = `<h2>Реєстрація</h2>
      <div class="form-field">
        <label for="username">Нікнейм: </label>
        <div class="input-with-error">
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Як ми можемо до вас звертатись?"
          />
          <div
            class="error"
            aria-live="polite"
            aria-describedby="username"
          ></div>
        </div>
      </div>

      <div class="form-field">
        <label for="email">Електронна пошта:</label>
        <div class="input-with-error">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="example@test.com"
          />
          <div class="error" aria-live="polite" aria-describedby="email"></div>
        </div>
      </div>

      <div class="form-field">
        <label for="password">Пароль:</label>
        <div class="input-with-error">
          <input type="password" id="password" name="password" />
          <div
            class="error"
            aria-live="polite"
            aria-describedby="password"
          ></div>
        </div>
      </div>

      <div class="form-field">
        <label for="confirm-password">Підтвердження пароля:</label>
        <div class="input-with-error">
          <input
            type="password"
            id="confirm-password"
            name="passwordConfirm"
          />
          <div
            class="error"
            aria-live="polite"
            aria-describedby="passwordConfirm"
          ></div>
        </div>
      </div>

      <div class="form-field">
        <label for="birth_year">Рік народження</label>
        <div class="input-with-error">
          <input type="number" id="birth_year" name="birth_year" />
          <div
            class="error"
            aria-live="polite"
            aria-describedby="birth_year"
          ></div>
        </div>
      </div>

      <div class="form-field-about">
        <label for="about">Про себе:</label>
        <textarea
          name="about"
          id="about"
          rows="4"
          cols="30"
          placeholder="Який твій улюблений фільм?"
        ></textarea>  
        <div class="error" aria-live="polite" aria-describedby="about"></div>
      </div>

      <div>
        <div class="form-field-agrreement">
          <input type="checkbox" id="agreeTerms" name="agreeTerms" />
          <label for="agreeTerms">Погоджуюсь на обробку персональних даних</label>
        </div>
        <div class="error" aria-live="polite" aria-describedby="agreeTerms"></div>
      </div>

      <div class="button-group">
        <button type="submit">Sign Up</button>
        <button type="reset">Reset</button>
      </div>`;

  signupForm.noValidate = true;

  // Додаємо обробник події відправки форми
  signupForm.addEventListener("submit", onSignupFormSubmit);

  // Додаємо обробник події для очищення помилок при введенні даних
  for (const inputElement of signupForm.elements) {
    inputElement.addEventListener("input", () => {
      (inputElement as HTMLElement).classList.remove("invalid");
      const errorElement = signupForm.querySelector(
        `.error[aria-describedby="${(inputElement as HTMLInputElement).name}"]`
      ) as HTMLElement;
      errorElement.innerHTML = "";
    });
  }

  return signupForm;
};
