import { Button } from "@/components/ui/button";
import Filter from "@/components/ui/filter";
import Pagination from "@/components/ui/Pagination/Pagination";
import { Faders, MapPin } from "@phosphor-icons/react";
import { useState } from "react";

const PlacePage = () => {
  const [isToggledFilter, setIsToggledFilter] = useState(false);
  return (
    <div className="flex flex-col gap-6">
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
      <div className="flex gap-4">
        <div className="bg-secondary rounded-xl text-white px-3 py-1 text-sm">
          <p>Sea</p>
        </div>
        <div className="bg-secondary rounded-xl text-white px-3 py-1 text-sm">
          <p>Sand</p>
        </div>
        <div className="bg-secondary rounded-xl text-white px-3 py-1 text-sm">
          <p>Free parking</p>
        </div>
        <div className="bg-secondary rounded-xl text-white px-3 py-1 text-sm">
          <p>Restaurants</p>
        </div>
        <div className="bg-secondary rounded-xl text-white px-3 py-1 text-sm">
          <p>Free entry</p>
        </div>
        <div className="bg-secondary rounded-xl text-white px-3 py-1 text-sm">
          <p>Something other</p>
        </div>
      </div>
      <Pagination setPage={() => {}} totalPages={2} />
    </div>
  );
};

export default PlacePage;
