import { createSignupForm } from "./signupForm.ts";
import "./style.css";

document.querySelector<HTMLDivElement>("#app")!.appendChild(createSignupForm());
