import { apiUrl } from "./api";

export async function getCities() {
  const response = await fetch(`${apiUrl}/cities`);
  const data = await response.json();

  if (!response.ok) {
    console.error(data.error);
    return data.error;
  }
  return data;
}

export async function getCitiesByCountry(countryId: string) {
  const response = await fetch(`${apiUrl}/cities/country/${countryId}`);
  const data = await response.json();

  if (!response.ok) {
    console.error(data.error);
    return data.error;
  }
  return data;
}
