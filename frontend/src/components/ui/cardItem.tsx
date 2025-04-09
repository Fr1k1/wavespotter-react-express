import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Rating } from "react-simple-star-rating";
import { Button } from "./button";
import { Link } from "react-router-dom";
import { CardData } from "@/common/types";
import { useEffect, useState } from "react";

import { calculateAverageRating, fetchBeachImages } from "@/common/globals";

const CardItem = ({ data }: { data: CardData }) => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBeachImages(data, setLoading, setImageUrls);
  }, [data.id]);

  if (loading) {
    return <div>Loading images...</div>;
  }

  const averageRating = calculateAverageRating(data);
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
                  {data.city && (
                    <>
                      {data.city.name}, {data.city.country?.name}
                    </>
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
        <CardContent>
          <img src={imageUrls[0]} alt="" className="w-full h-full" />
        </CardContent>
      </Card>
    </div>
  );
};

export default CardItem;
