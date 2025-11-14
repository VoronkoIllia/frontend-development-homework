// інтерфейс для збору даних з форми
export interface UserData {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
  birth_year: number;
  about: string;
  agreeTerms: boolean;
}

// тип об'єкта з правилами валідації для кожного поля
export type UserDataValidationMap = {
  [key in keyof UserData]: Array<(value: any) => string | undefined>;
};

// тип для об'єкта з помилками валідації
export type UserDataValidationErrors = {
  [key in keyof UserData]: Array<string>;
};
