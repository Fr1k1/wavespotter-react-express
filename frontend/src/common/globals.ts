import { supabase } from "@/supabaseClient";
import { UseFormReturn } from "react-hook-form";
import { Review, Image } from "./types";
import { getBeachImages } from "@/api/beaches";

export const checkAuth = async (
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,
  setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setIsLoggedIn(!!user);

    if (user) {
      const { data } = await supabase
        .from("users")
        .select("is_admin")
        .eq("id", user.id)
        .single();

      setIsAdmin(data?.is_admin || false);
    } else {
      setIsAdmin(false);
    }
  } catch (error) {
    console.error("Error checking authentication:", error);
    setIsLoggedIn(false);
    setIsAdmin(false);
  }
};

export const getUserId = async (
  setUserId: React.Dispatch<React.SetStateAction<string>>,
  form: UseFormReturn
) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    setUserId(user.id);
    form.setValue("userId", user.id);
  }
};

export const calculateAverageRating = (data) => {
  if (data?.avgRating && data?.avgRating != null) {
    return data.avgRating;
  }
  console.log("Data za izracunati average rating je", data);
  if (data?.reviews && data?.reviews?.length > 0) {
    const totalRating = data.reviews.reduce(
      (sum: number, review: Review) => sum + review.rating,
      0
    );
    return totalRating / data.reviews.length;
  }
  return 0;
};

export const fetchBeachImages = async (data, setLoading, setImageUrls) => {
  try {
    setLoading(true);
    const beachImages = await getBeachImages(data.id);
    if (beachImages && beachImages.length > 0) {
      const signedUrlPromises = beachImages.map(async (image: Image) => {
        const { data, error } = await supabase.storage
          .from("beach_images")
          .createSignedUrl(image.path, 7200);

        if (error) {
          console.error("Error creating URL:", error);
          return null;
        }

        return data.signedUrl;
      });

      const urls = await Promise.all(signedUrlPromises);
      const validUrls = urls.filter((url) => url !== null);

      setImageUrls(validUrls);
    }
  } catch (error) {
    console.error("Error fetching beach images:", error);
  } finally {
    setLoading(false);
  }
};
