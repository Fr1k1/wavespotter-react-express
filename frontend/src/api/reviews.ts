import { Review } from "@/common/types";
import { apiUrl } from "./api";

export async function addReview(reviewData: Review) {
  const response = await fetch(`${apiUrl}/reviews`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`,
    },
    method: "POST",
    body: JSON.stringify(reviewData),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error(data.error);
    return data.error;
  }
  return data;
}
