import Carousel from "@/components/ui/Carousel/carousel";
import { MapPin } from "@phosphor-icons/react";
import { Rating } from "react-simple-star-rating";
import BeachDetailsFeaturedCard from "@/components/ui/beachDetailsFeaturedCard";
import BeachFeaturesCheck from "@/components/ui/beachFeaturesCheck";
import BaechDetailsAccordion from "@/components/ui/beachDetailsAccordion";
import BeachDetailsReviews from "@/components/ui/beachDetailsReviews";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getBeachById } from "@/api/beaches";
import { BeachDetailsData, Review } from "@/common/types";

const BeachDetails = () => {
  const { id } = useParams();
  const [beach, setBeach] = useState<BeachDetailsData>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBeach();
  }, [id]);

  const fetchBeach = async () => {
    try {
      setLoading(true);
      const response = await getBeachById(id);
      console.log("Beach data:", response);
      setBeach(response);
    } catch (err) {
      console.error("Error fetching beach:", err);
    } finally {
      setLoading(false);
    }
  };

  const calculateAverageRating = () => {
    if (!beach || !beach.reviews || beach.reviews.length === 0) {
      return 0;
    }

    const totalRating = beach.reviews.reduce(
      (sum: number, review: Review) => sum + review.rating,
      0
    );

    return totalRating / beach.reviews.length;
  };

  const getReviewCount = () => beach?.reviews?.length ?? 0;
  const averageRating = calculateAverageRating();
  const reviewCount = getReviewCount();

  if (loading) {
    return (
      <div className="flex justify-center p-8">Loading beach details...</div>
    );
  }

  if (!beach || Object.keys(beach).length === 0) {
    return (
      <div className="flex justify-center p-8">Loading beach details...</div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col-reverse lg:grid lg:grid-cols-2">
        <div>{id && <Carousel beachId={id} />}</div>
        <div className="flex flex-col gap-6 lg:p-6">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-col gap-1">
              <h2 className="font-extrabold text-3xl">{beach.name}</h2>
              <div className="flex items-center gap-1">
                <Rating
                  size={25}
                  transition
                  allowFraction
                  initialValue={averageRating}
                />
                <p>{reviewCount} reviews</p>
              </div>
            </div>

            {beach.city && (
              <div className="flex items-center bg-primary-800 rounded-lg p-2">
                <MapPin
                  weight="duotone"
                  className="mr-2"
                  size={32}
                  color="white"
                />
                <div className="text-white">
                  <p>
                    {beach.city.name}, {beach.city.country?.name}
                  </p>
                  {beach.address && <p className="text-xs">{beach.address}</p>}
                </div>
              </div>
            )}
          </div>

          <div>
            <p className="text-md">{beach.description}</p>
          </div>

          <div className="text-lg font-bolder flex flex-col gap-4">
            {beach.beach_texture && (
              <div className="flex items-center gap-3">
                <p>Type: {beach.beach_texture.name}</p>

                <img
                  src={beach.beach_texture.img_url}
                  alt=""
                  className="rounded-xl h-8 w-12"
                />
              </div>
            )}
            <p>Depth: {beach.beach_depth.description}</p>

            <p>Best time to visit: {beach.best_time_to_visit}</p>
          </div>
          {beach.characteristics && beach.characteristics.length > 0 && (
            <div className="flex gap-2">
              {beach.characteristics
                .filter((char) => char.beach_has_characteristics?.featured)
                .map((characteristic, index) => (
                  <BeachDetailsFeaturedCard
                    key={index}
                    name={characteristic.name}
                    iconUrl={characteristic.icon_url}
                  />
                ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col-reverse lg:grid lg:grid-cols-2">
        {beach.characteristics && (
          <BeachFeaturesCheck beachCharacteristics={beach?.characteristics} />
        )}
        <BaechDetailsAccordion
          bestTimeToVisit={beach?.best_time_to_visit}
          localWildlife={beach?.local_wildlife}
          restaurantsAndBars={beach?.restaurants_and_bars_nearby}
        />
      </div>

      <div>
        {beach.reviews && <BeachDetailsReviews reviews={beach.reviews} />}
      </div>
    </div>
  );
};

export default BeachDetails;
