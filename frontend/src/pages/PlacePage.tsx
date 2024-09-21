import { Button } from "@/components/ui/button";
import { Faders, MapPin } from "@phosphor-icons/react";

const PlacePage = () => {
  return (
    <div>
      <div className="flex justify-between">
        <Button variant={"darkest"}>
          <MapPin weight="duotone" className="mr-2" size={32} />
          Brač, Croatia
        </Button>
        <Button variant={"secondary"}>
          <Faders weight="duotone" className="mr-2" size={32} />
          Filter
        </Button>
      </div>
    </div>
  );
};

export default PlacePage;
