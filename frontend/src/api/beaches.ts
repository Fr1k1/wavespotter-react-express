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

export async function getBeachById(id: string | undefined) {
  const response = await fetch(`${apiUrl}/beaches/${id}`);

  const data = await response.json();

  if (!response.ok) {
    console.log(data.error);
    return data.error;
  }
  return data;
}

export async function getBeachImages(id: string) {
  const response = await fetch(`${apiUrl}/beaches/${id}/images`);

  const data = await response.json();

  if (!response.ok) {
    console.log(data.error);
    return data.error;
  }
  return data;
}

//ovo bi vjerojatno trebalo prek namea, a ne prek id
//tu jos treba dodati da mi vrati sliku prvu od te plaze i city i country di je...vecinu ovih ostalih stvari ni ne trebam
export async function getBeachByType(id: number) {
  const response = await fetch(`${apiUrl}/beaches/type/${id}`);

  const data = await response.json();

  if (!response.ok) {
    console.log(data.error);
    return data.error;
  }
  return data;
}
