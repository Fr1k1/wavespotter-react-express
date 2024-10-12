import { apiUrl } from "./api";

export async function getBeachDepths() {
  const response = await fetch(`${apiUrl}/beach-depths`);
  const data = await response.json();

  if (!response.ok) {
    console.log(data.error);
    return data.error;
  }
  return data;
}
