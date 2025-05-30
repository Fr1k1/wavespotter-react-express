import { apiUrl } from "./api";

export async function getBeachTextures() {
  const response = await fetch(`${apiUrl}/beach-textures`);
  const data = await response.json();

  if (!response.ok) {
    console.error(data.error);
    return data.error;
  }
  return data;
}
