import type {
  UserData,
  UserDataValidationErrors,
  UserDataValidationMap,
} from "./types";

// правило для мінімальної довжини рядка
export const minLength =
  (minLength: number) =>
  (value: string): string | undefined => {
    if (value.length < minLength) {
      return `Значення повинно містити не менше ${minLength} символів.`;
    }
  };

// правило для максимальної довжини рядка
export const maxLength =
  (maxLength: number) =>
  (value: string): string | undefined => {
    if (value.length > maxLength) {
      return `Значення повинно містити не більше ${maxLength} символів.`;
    }
  };

// валідація віку
export const validateAge = (birthYear: number): string | undefined => {
  const currentYear = new Date().getFullYear();
  const age = currentYear - birthYear;

  console.log(age);

  if (age < 13) {
    return "Вам повинно бути не менше 13 років для реєстрації.";
  }
  if (age > 120) {
    return "Будь ласка, введіть дійсний рік народження.";
  }
};

// правило обов'язкового заповнення поля
export const requiredField = (value: any): string | undefined => {
  if (
    value === null ||
    value === undefined ||
    (typeof value === "string" && value.trim() === "") ||
    (typeof value === "boolean" && value === false)
  ) {
    return "Це поле є обов'язковим для заповнення.";
  }
};

// валідація адреси електронної пошти
export const validateEmail = (email: string): string | undefined => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Будь ласка, введіть дійсну електронну адресу.";
  }
};

export const validateFormData = (
  userData: UserData,
  validationMap: UserDataValidationMap
): UserDataValidationErrors => {
  const errors: UserDataValidationErrors = {} as UserDataValidationErrors;

  for (const field in validationMap) {
    const fieldValidators = validationMap[field as keyof UserData];
    const fieldValue = userData[field as keyof UserData];
    const fieldErrors: string[] = [];

    for (const validator of fieldValidators) {
      const errorMessage = validator(fieldValue);
      if (errorMessage) {
        fieldErrors.push(errorMessage);
      }
    }
    errors[field as keyof UserData] = fieldErrors;
  }

  // Додаткова перевірка для passwordConfirm, щоб введені паролі співпадали
  if (userData.passwordConfirm !== userData.password) {
    errors.passwordConfirm.push("Паролі не співпадають.");
  }

  return errors;
};
