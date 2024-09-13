import HeroImage from "../../assets/hero_image.png";

const Hero = () => {
  return (
    <div className="grid grid-cols-2">
      <div>
        <img src={HeroImage} alt="" className="w-full" />
      </div>
      <div>
        <div className="flex bg-red-700 flex-col">
          <h2 className="nerko-one-regular text-256px">Beach,</h2>
          <h2 className="nerko-one-regular text-256px">please!</h2>
        </div>

        <p>Find your perfect sandy spot in seconds</p>
      </div>
    </div>
  );
};

export default Hero;
