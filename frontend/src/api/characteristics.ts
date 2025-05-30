import { apiUrl } from "./api";

export async function getCharacteristics() {
  const response = await fetch(`${apiUrl}/characteristics`);
  const data = await response.json();

  if (!response.ok) {
    console.error(data.error);
    return data.error;
  }
  return data;
}
