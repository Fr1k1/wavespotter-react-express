import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Rating } from "react-simple-star-rating";
import { Button } from "./button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { calculateAverageRating, fetchBeachImages } from "@/common/globals";
import { CardData, FilteredBeaches } from "@/common/types";
import PlaceholderImage from "../../assets/no__image_placeholder.png";

type CardItemData = FilteredBeaches | CardData;

const CardItem = ({ data }: { data: CardItemData }) => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBeachImages(data.id, setLoading, setImageUrls);
  }, [data.id]);

  if (loading) {
    return <div>Loading images...</div>;
  }

  const firstImage = imageUrls[0];

  const image = firstImage ? firstImage : PlaceholderImage;
  const hasReviews = "reviews" in data;
  const hasAvgRating = "avgRating" in data;

  const rating = hasAvgRating
    ? data.avgRating
    : hasReviews
    ? calculateAverageRating(data.reviews)
    : 0;

  return (
    <div>
      <Card className="h-full flex flex-col">
        <CardHeader>
          <div className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>{data?.name}</CardTitle>
              <div className="flex items-center gap-2">
                <Rating
                  size={25}
                  transition
                  allowFraction
                  initialValue={rating}
                />
                <h4>
                  {"city" in data && data.city && (
                    <h4>
                      {data?.city?.name}, {data?.city.country?.name}
                    </h4>
                  )}
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
        <CardContent className="flex-1">
          <div className="w-full h-72 overflow-hidden">
            <img src={image} alt="" className="w-full h-full object-cover" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CardItem;
