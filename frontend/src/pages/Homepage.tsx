import { getBeachByType } from "@/api/beaches";
import CardsGrid from "@/components/ui/cardsGrid";
import Hero from "@/components/ui/hero";
import MapSearcher from "@/components/ui/mapSearcher";
import { useEffect, useState } from "react";

const Homepage = () => {
  const [riverBeaches, setRiverBeaches] = useState<any>(null);
  const [seaBeaches, setSeaBeaches] = useState<any>(null);

  const fetchRiverBeaches = async () => {
    const response = await getBeachByType(1);
    setRiverBeaches(response);
  };

  const fetchSeaBeaches = async () => {
    const response = await getBeachByType(2);
    setSeaBeaches(response);
  };

  useEffect(() => {
    fetchRiverBeaches();
    fetchSeaBeaches();
  }, []);

  return (
    <div>
      <Hero />
      <div className=" flex flex-col gap-6">
        <CardsGrid
          hasMoreButton
          title="Top picks this season"
          cardData={riverBeaches}
        />
        <MapSearcher />
        <CardsGrid
          hasMoreButton
          title="Best rated sea beaches"
          cardData={seaBeaches}
        />
        <CardsGrid
          hasMoreButton
          title="Best rated river beaches"
          cardData={riverBeaches}
        />
      </div>
    </div>
  );
};

export default Homepage;
