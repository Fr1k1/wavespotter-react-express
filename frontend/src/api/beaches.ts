import { apiUrl } from "./api";

export async function addBeach(beachData) {
  console.log("Podaci su mi: ", beachData);
  const response = await fetch(`${apiUrl}/beaches`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`,
    },
    method: "POST",
    body: JSON.stringify(beachData),
  });

  const data = await response.json();

  if (!response.ok) {
    console.log(data.error);
    return data.error;
  }
  return data;
}
