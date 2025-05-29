import { getFilteredBeaches } from "@/api/beaches";
import { getCitiesByCountry } from "@/api/cities";
import { getCountryById } from "@/api/countries";
import { City, FilteredBeaches } from "@/common/types";
import { Button } from "@/components/ui/button";
import CardsGrid from "@/components/ui/cardsGrid";
import Filter from "@/components/ui/filter";
import MapSearcher from "@/components/ui/mapSearcher";
import Pagination from "@/components/ui/Pagination/Pagination";
import { Faders, MapPin } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router";

interface CountryData {
  id: number;
  name: string;
}

interface CityData {
  id: number;
  name: string;
}

const CountryPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isToggledFilter, setIsToggledFilter] = useState(false);
  const [filteredBeaches, setFilteredBeaches] = useState<FilteredBeaches[]>([]);
  const [countryData, setCountryData] = useState<CountryData | null>(null);
  const [cityData, setCityData] = useState<CityData | null>(null);

  const fetchFilteredBeaches = async (page = currentPage) => {
    if (!id) return;

    const searchParams = new URLSearchParams(location.search);
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

    try {
      const [beachResponse, countryResponse] = await Promise.all([
        getFilteredBeaches(id, filters, page, 9),
        getCountryById(id),
      ]);

      setFilteredBeaches(beachResponse.data);
      setTotalPages(beachResponse.totalPages);
      setCountryData(countryResponse);
      const cityId = new URLSearchParams(location.search).get("city");
      if (cityId) {
        const citiesResponse = await getCitiesByCountry(id);
        const selectedCity = citiesResponse.find(
          (city: City) => city.id.toString() === cityId
        );
        setCityData(selectedCity);
      } else {
        setCityData(null);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleMapSearch = () => {
    setCurrentPage(1);
  };

  useEffect(() => {
    fetchFilteredBeaches();
  }, [currentPage, id, location.search]);

  if (!id) {
    return (
      <div className="flex flex-col gap-6">
        <MapSearcher hasMap={true} onSearch={handleMapSearch} />
      </div>
    );
  }

  const parsedCountryId = parseInt(id);
  if (isNaN(parsedCountryId)) {
    return (
      <div className="flex flex-col gap-6">
        <MapSearcher hasMap={true} onSearch={handleMapSearch} />
      </div>
    );
  }

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
          {cityData
            ? `${cityData.name}, ${countryData?.name}`
            : countryData?.name || "Loading..."}
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

      <MapSearcher hasMap={false} onSearch={handleMapSearch} />

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

      {totalPages > 1 && (
        <Pagination setPage={setCurrentPage} totalPages={totalPages} />
      )}
    </div>
  );
};

export default CountryPage;
