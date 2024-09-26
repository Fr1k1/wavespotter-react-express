import Subtitle from "./Subtitle";
import { Textarea } from "./textarea";

const BeachTips = () => {
  return (
    <div className=" flex flex-col gap-6 ">
      <Subtitle>Beach tips</Subtitle>
      <div className="grid grid-cols-2 items-center">
        <h3>Best time to come?</h3>
        <Textarea />
      </div>
      <div className="grid grid-cols-2 items-center">
        <h3>Local wildlife?</h3>
        <Textarea />
      </div>

      <div className="grid grid-cols-2 items-center">
        <h3>Restarunts and bars nearby?</h3>
        <Textarea />
      </div>
    </div>
  );
};

export default BeachTips;
