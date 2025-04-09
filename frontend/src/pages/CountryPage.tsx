import { Button } from "@/components/ui/button";
import CardsGrid from "@/components/ui/cardsGrid";
import Filter from "@/components/ui/filter";
import MapSearcher from "@/components/ui/mapSearcher";
import Pagination from "@/components/ui/Pagination/Pagination";
import { Faders, MapPin } from "@phosphor-icons/react";
import { useState } from "react";

const CountryPage = () => {
  const [isToggledFilter, setIsToggledFilter] = useState(false);
  const [filteredBeaches, setFilteredBeaches] = useState([]);
  return (
    <div className="flex flex-col gap-6">
      {isToggledFilter && (
        <Filter
          setIsToggledFilter={setIsToggledFilter}
          setFilteredBeaches={setFilteredBeaches}
        />
      )}

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
      <MapSearcher hasMap={false} />
      <div className="grid grid-cols-3 gap-4 lg:flex ">
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

      <div>
        <CardsGrid
          hasMoreButton
          title="Top picks this season"
          cardData={filteredBeaches}
        />
      </div>

      <Pagination setPage={() => {}} totalPages={2} />
    </div>
  );
};

export default CountryPage;
