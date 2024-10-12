import Subtitle from "./subtitle";
import { Textarea } from "./textarea";

const BeachTips = () => {
  return (
    <div className=" flex flex-col gap-6 ">
      <Subtitle>Beach tips</Subtitle>
      <div className="grid grid-cols-2 items-center">
        <h3>Best time to visit?</h3>
        <Textarea placeholder="Between 5 and 10 because there is not much people" />
      </div>
      <div className="grid grid-cols-2 items-center">
        <h3>Local wildlife?</h3>
        <Textarea placeholder="Many fish" />
      </div>

      <div className="grid grid-cols-2 items-center">
        <h3>Restarunts and bars nearby?</h3>
        <Textarea placeholder="A very good restaurant called Konoba Marija nearby" />
      </div>
    </div>
  );
};

export default BeachTips;
