import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel as ReactCarousel } from "react-responsive-carousel";
import "./Carousel.scss";
import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";
import { getBeachImages } from "@/api/beaches";
import { Image } from "@/common/types";

const Carousel = ({ beachId }: { beachId: string }) => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBeachImages();
  }, [beachId]);

  const fetchBeachImages = async () => {
    try {
      setLoading(true);
      const beachImages = await getBeachImages(beachId);
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
