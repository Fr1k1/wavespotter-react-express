import HeroImage from "../../assets/hero_image.svg";

const Hero = () => {
  return (
    <div className="grid grid-cols-2 max-w-screen-2xl m-auto p-4">
      <div>
        <img src={HeroImage} alt="" className="w-full" />
      </div>
      <div className="flex flex-col items-center justify-center gap-5">
        <div className="text-center">
          <h2 className="nerko-one-regular text-156px text-primary-800 leading-none">
            Beach,
          </h2>
          <h2 className="nerko-one-regular text-156px text-primary-800 leading-none -mt-10">
            please!
          </h2>
        </div>

        <p className="nerko-one-regular text-4xl text-primary leading-none font-semibold">
          Find your perfect sandy spot{" "}
        </p>
        <p className="nerko-one-regular text-4xl text-primary leading-none font-semibold -mt-3">
          in seconds
        </p>
      </div>
    </div>
  );
};

export default Hero;
