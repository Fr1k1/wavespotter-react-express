import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel as ReactCarousel } from "react-responsive-carousel";
import "./Carousel.scss";
import { useEffect, useState } from "react";
import { fetchBeachImages } from "@/common/globals";

const Carousel = ({ beachId }: { beachId: string }) => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBeachImages(Number(beachId), setLoading, setImageUrls);
  }, [beachId]);

  if (loading) {
    return <div>Loading images...</div>;
  }

  return (
    <div className="relative">
      <ReactCarousel
        autoPlay={true}
        infiniteLoop={true}
        dynamicHeight={false}
        showArrows={true}
        swipeable
        emulateTouch
        showStatus={false}
      >
        {imageUrls.map((url, index) => (
          <div key={index} className="h-[550px]">
            <img
              src={url}
              className="w-full h-full object-cover"
              alt="Beach image"
            />
          </div>
        ))}
      </ReactCarousel>
    </div>
  );
};

export default Carousel;
