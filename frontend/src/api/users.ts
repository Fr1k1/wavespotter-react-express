import { apiUrl } from "./api";

export async function getUsers() {
  const response = await fetch(`${apiUrl}/users`);
  const data = await response.json();

  if (!response.ok) {
    console.error(data.error);
    return data.error;
  }
  return data;
}
