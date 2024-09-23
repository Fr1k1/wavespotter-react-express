import { Button } from "@/components/ui/button";
import Filter from "@/components/ui/filter";
import { Faders, MapPin } from "@phosphor-icons/react";
import { useState } from "react";

const PlacePage = () => {
  const [isToggledFilter, setIsToggledFilter] = useState(false);
  return (
    <div>
      {isToggledFilter && <Filter setIsToggledFilter={setIsToggledFilter} />}

      <div className="flex justify-between">
        <Button variant={"darkest"}>
          <MapPin weight="duotone" className="mr-2" size={32} />
          Brač, Croatia
        </Button>
        <Button
          variant={"secondary"}
          onClick={() => {
            setIsToggledFilter(true);
          }}
        >
          <Faders weight="duotone" className="mr-2" size={32} />
          Filter
        </Button>
      </div>
    </div>
  );
};

export default PlacePage;
