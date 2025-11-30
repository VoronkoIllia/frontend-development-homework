import type { Post } from "./types";

const baseUrl = "https://jsonplaceholder.typicode.com/posts";

export const fetchPosts = async (): Promise<Post[]> => {
  const response = await fetch(baseUrl);
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return response.json();
};
