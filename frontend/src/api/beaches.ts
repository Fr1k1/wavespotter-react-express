import { BeachData } from "@/common/types";
import { apiUrl } from "./api";

// dodaj neki auth
export async function addBeach(beachData: BeachData) {
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

export async function updateBeach(id: string, beachData: BeachData) {
  console.log("Updating beach with ID:", id, "Data:", beachData);
  const response = await fetch(`${apiUrl}/beaches/${id}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(beachData),
  });

  const data = await response.json();

  if (!response.ok) {
    console.log(data.error);
    return data.error;
  }
  return data;
}

export async function getBeachById(id: string | undefined) {
  const response = await fetch(`${apiUrl}/beaches/${id}`);

  const data = await response.json();

  if (!response.ok) {
    console.log(data.error);
    return data.error;
  }
  return data;
}

export async function getBeachImages(id: string | number) {
  const response = await fetch(`${apiUrl}/beaches/${id}/images`);

  const data = await response.json();

  if (!response.ok) {
    console.log(data.error);
    return data.error;
  }
  return data;
}

export async function getBeachByType(id: number) {
  const response = await fetch(`${apiUrl}/beaches/type/${id}`);

  const data = await response.json();

  if (!response.ok) {
    console.log(data.error);
    return data.error;
  }
  return data;
}

export async function getBeaches(
  page = 1,
  pageSize = 12,
  approved: number | null = null
) {
  const response = await fetch(
    `${apiUrl}/beaches?page=${page}&pageSize=${pageSize}&approved=${approved}`
  );

  const data = await response.json();

  if (!response.ok) {
    console.log(data.error);
    return data.error;
  }
  return data;
}
