import Carousel from "@/components/ui/Carousel/carousel";
import { MapPin } from "@phosphor-icons/react";
import { Rating } from "react-simple-star-rating";
import Gravel from "../assets/gravel.png";
import BeachDetailsFeaturedCard from "@/components/ui/beachDetailsFeaturedCard";
import BeachFeaturesCheck from "@/components/ui/beachFeaturesCheck";
import BaechDetailsAccordion from "@/components/ui/beachDetailsAccordion";
import BeachDetailsReviews from "@/components/ui/beachDetailsReviews";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getBeachById } from "@/api/beaches";

const BeachDetails = () => {
  const { id } = useParams();

  //kreiraj objekt plaza response
  const [beach, setBeach] = useState<any>(null);

  useEffect(() => {
    fetchBeach();
  }, []);

  const fetchBeach = async () => {
    const response = await getBeachById(id);
    setBeach(response);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col-reverse lg:grid lg:grid-cols-2">
        <div>
          <Carousel beachId={id} />
        </div>
        <div className=" flex flex-col gap-6 lg:p-6">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-col gap-1">
              <h2 className="font-extrabold text-3xl">Beach Zlatni Rat</h2>
              <div className="flex items-center gap-1">
                <Rating
                  // onClick={handleRating1}
                  size={25}
                  transition
                  allowFraction
                  //showTooltip
                  // tooltipArray={tooltipArray}
                  // fillColorArray={fillColorArray}
                />
                <p>2594 reviews</p>
              </div>
            </div>

            <div className="flex items-center bg-primary-800 rounded-lg p-2">
              <MapPin
                weight="duotone"
                className="mr-2"
                size={32}
                color="white"
              />
              <div className="text-white">
                <p>Brač, Croatia</p>
                <p className="text-xs">24120, Bol</p>
              </div>
            </div>
          </div>
          <div>
            <p className="text-md">
              Zlatni rât is probably the most famous beach on the Adriatic,
              located in Bol, on the southern coast of the island of Brač. Due
              to its unusualness and beauty, it is one of the most famous
              symbols of Croatian tourism. That phenomenon is a pebbly cape
              about a thousand meters long, lapped by a clear and transparent
              sea.
            </p>
          </div>

          <div className="text-lg font-bolder flex flex-col gap-4">
            {/*wrapper za type gravel i ove ostale dva*/}
            <div className="flex items-center gap-3">
              <p>Type: gravel</p>
              <img src={Gravel} alt="" />
            </div>
            <p>Depth: shallow</p>
            <p>Open: 0-24</p>
          </div>
          <div className="flex gap-2">
            <BeachDetailsFeaturedCard />
            <BeachDetailsFeaturedCard />
            <BeachDetailsFeaturedCard />
            <BeachDetailsFeaturedCard />
            <BeachDetailsFeaturedCard />
          </div>
        </div>
      </div>
      <div className="flex flex-col-reverse lg:grid lg:grid-cols-2">
        <BeachFeaturesCheck />
        <BaechDetailsAccordion />
      </div>

      <div>
        <BeachDetailsReviews />
      </div>
    </div>
  );
};

export default BeachDetails;
