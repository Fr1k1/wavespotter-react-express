import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Rating } from "react-simple-star-rating";
import { Button } from "./button";
import { Link } from "react-router-dom";
import { CardData, Review } from "@/common/types";
import { useEffect, useState } from "react";
import { getBeachImages } from "@/api/beaches";
import { supabase } from "@/supabaseClient";
import { Image } from "@/common/types";

const CardItem = ({ data }: { data: CardData }) => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBeachImages();
  }, [data.id]);

  const fetchBeachImages = async () => {
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

  if (loading) {
    return <div>Loading images...</div>;
  }

  const calculateAverageRating = () => {
    if (data.reviews.length > 0) {
      const totalRating = data.reviews.reduce(
        (sum: number, review: Review) => sum + review.rating,
        0
      );
      return totalRating / data.reviews.length;
    }
    return 0;
  };
  const averageRating = calculateAverageRating();
  return (
    <div>
      <Card>
        <CardHeader>
          <div className=" flex flex-row items-center justify-between">
            <div>
              <CardTitle>{data?.name}</CardTitle>
              <div className=" flex items-center gap-2">
                <Rating
                  size={25}
                  transition
                  allowFraction
                  initialValue={averageRating}
                />
                <h4>
                  {" "}
                  {data.city.name}, {data.city.country?.name}
                </h4>
              </div>
            </div>
            <div>
              <Link to={`/beach/${data.id}`}>
                <Button underlined variant={"darker"}>
                  More
                </Button>
              </Link>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <img src={imageUrls[0]} alt="" className="w-full h-full" />
        </CardContent>
      </Card>
    </div>
  );
};

export default CardItem;
