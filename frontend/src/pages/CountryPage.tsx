import { getFilteredBeaches } from "@/api/beaches";
import { FilteredBeaches } from "@/common/types";
import { Button } from "@/components/ui/button";
import CardsGrid from "@/components/ui/cardsGrid";
import Filter from "@/components/ui/filter";
import MapSearcher from "@/components/ui/mapSearcher";
import Pagination from "@/components/ui/Pagination/Pagination";
import { Faders, MapPin } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const CountryPage = () => {
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    if (id && filteredBeaches.length > 0) {
      const searchParams = new URLSearchParams(window.location.search);
      const filters = {
        cityId: searchParams.get("city") || undefined,
        waterTypeId: searchParams.get("waterType") || undefined,
        beachTextureId: searchParams.get("beachTexture") || undefined,
        characteristicIds: searchParams.get("characteristics")
          ? searchParams
              .get("characteristics")!
              .split(",")
              .map((id) => Number(id))
          : undefined,
      };

      getFilteredBeaches(id, filters, currentPage, 9)
        .then((response) => {
          setFilteredBeaches(response.data);
          setTotalPages(response.totalPages);
        })
        .catch((error) => {
          console.error("Error fetching beaches for page:", error);
        });
    }
  }, [currentPage, id]);
  const [isToggledFilter, setIsToggledFilter] = useState(false);
  const [filteredBeaches, setFilteredBeaches] = useState<FilteredBeaches[]>([]);

  return (
    <div className="flex flex-col gap-6">
      {isToggledFilter && (
        <Filter
          setIsToggledFilter={setIsToggledFilter}
          setFilteredBeaches={setFilteredBeaches}
          setCurrentPage={setCurrentPage}
          setTotalPages={setTotalPages}
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
          hasMoreButton={false}
          title="Filtered results"
          cardData={filteredBeaches}
        />
      </div>

      <Pagination setPage={setCurrentPage} totalPages={totalPages} />
    </div>
  );
};

export default CountryPage;
