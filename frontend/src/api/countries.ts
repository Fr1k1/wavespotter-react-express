import { apiUrl } from "./api";

export async function getCountries() {
  const response = await fetch(`${apiUrl}/countries`);
  const data = await response.json();

  if (!response.ok) {
    console.error(data.error);
    return data.error;
  }
  return data;
}

export async function getCountryById(id: string | number) {
  const response = await fetch(`${apiUrl}/countries/${id}`);
  const data = await response.json();

  if (!response.ok) {
    console.error(data.error);
    return data.error;
  }
  return data;
}
