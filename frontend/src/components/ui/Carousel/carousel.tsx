import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel as ReactCarousel } from "react-responsive-carousel";
import MainCarousel from "../../../assets/main_carousel_image.png";
import Beach1 from "../../../assets/beach_1.png";
import Beach2 from "../../../assets/beach_2.png";
import "./Carousel.scss";

const Carousel = () => {
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
        <div className="h-[550px]">
          <img
            src={MainCarousel}
            className="w-full h-full object-cover"
            alt="Main Carousel"
          />
        </div>
        <div className="h-[550px]">
          <img
            src={Beach1}
            className="w-full h-full object-cover"
            alt="Beach 1"
          />
        </div>
        <div className="h-[550px]">
          <img
            src={Beach2}
            className="w-full h-full object-cover"
            alt="Beach 2"
          />
        </div>
      </ReactCarousel>
    </div>
  );
};

export default Carousel;
