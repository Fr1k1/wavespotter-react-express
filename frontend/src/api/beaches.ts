import { BeachData, Filters } from "@/common/types";
import { apiUrl } from "./api";

// dodaj neki auth
export async function addBeach(beachData: BeachData) {
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
    console.error(data.error);
    return data.error;
  }
  return data;
}

export async function updateBeach(id: string, beachData: BeachData) {
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
    console.error(data.error);
    return data.error;
  }
  return data;
}

export async function getBeachById(id: string | undefined) {
  const response = await fetch(`${apiUrl}/beaches/${id}`);

  const data = await response.json();

  if (!response.ok) {
    console.error(data.error);
    return data.error;
  }
  return data;
}

export async function getBeachImages(id: string | number) {
  const response = await fetch(`${apiUrl}/beaches/${id}/images`);

  const data = await response.json();

  if (!response.ok) {
    console.error(data.error);
    return data.error;
  }
  return data;
}

export async function getBeachByType(id: number, page = 1, pageSize = 4) {
  const response = await fetch(
    `${apiUrl}/beaches/type/${id}?page=${page}&pageSize=${pageSize}`
  );

  const data = await response.json();

  if (!response.ok) {
    console.error(data.error);
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
    console.error(data.error);
    return data.error;
  }
  return data;
}

export async function getBeachGeoDataById(id: string | undefined) {
  const response = await fetch(`${apiUrl}/beaches/${id}/geodata`);

  const data = await response.json();

  if (!response.ok) {
    console.error(data.error);
    return data.error;
  }
  return data;
}

export const getFilteredBeaches = async (
  countryId: string,
  filters: Filters,
  page = 1,
  pageSize = 9
) => {
  const baseUrl = `${apiUrl}/beaches/country/${countryId}`;
  const params = new URLSearchParams();

  params.append("page", page.toString());
  params.append("pageSize", pageSize.toString());

  if (filters.cityId) {
    params.append("city", filters.cityId);
  }

  if (filters.waterTypeId) {
    params.append("waterType", filters.waterTypeId);
  }

  if (filters.beachTextureId) {
    params.append("beachTexture", filters.beachTextureId);
  }

  if (filters.characteristicIds && filters.characteristicIds.length > 0) {
    params.append("characteristics", filters.characteristicIds.join(","));
  }

  const url = params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error fetching filtered beaches: ${response.statusText}`);
  }

  return await response.json();
};
