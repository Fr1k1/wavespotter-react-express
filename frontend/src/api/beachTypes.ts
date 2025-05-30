import { apiUrl } from "./api";

export async function getBeachTypes() {
  const response = await fetch(`${apiUrl}/beach-types`);
  const data = await response.json();

  if (!response.ok) {
    console.error(data.error);
    return data.error;
  }
  return data;
}
