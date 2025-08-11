import { getBeachByType } from "@/api/beaches";
import { calculateAverageRating } from "@/common/globals";
import AiAssistantCard from "@/components/ui/aiAssistantCard";
import CardsGrid from "@/components/ui/cardsGrid";
import Hero from "@/components/ui/hero";
import Loader from "@/components/ui/loader";
import MapSearcher from "@/components/ui/mapSearcher";
import { ConversationProvider } from "@/providers/ConversationProvider";
import { useEffect, useState } from "react";

const Homepage = () => {
  const [riverBeaches, setRiverBeaches] = useState<any>(null);
  const [seaBeaches, setSeaBeaches] = useState<any>(null);
  const [bestRatedBeaches, setBestRatedBeaches] = useState<any>(null);

  const SEA_BEACH_TYPE = 1;

  const RIVER_BEACH_TYPE = 2;

  const fetchRiverBeaches = async () => {
    const response = await getBeachByType(RIVER_BEACH_TYPE);
    setRiverBeaches(response);
  };

  const fetchSeaBeaches = async () => {
    const response = await getBeachByType(SEA_BEACH_TYPE);
    setSeaBeaches(response);
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await Promise.all([fetchRiverBeaches(), fetchSeaBeaches()]);
      } catch (error) {
        console.error("Error fetching beaches:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (riverBeaches && seaBeaches) {
      const allBeaches = [...riverBeaches, ...seaBeaches];

      const beachesWithRating = allBeaches.map((beach) => ({
        ...beach,
        calculatedRating: calculateAverageRating(beach?.reviews),
      }));

      const sortedBeaches = beachesWithRating.sort(
        (a, b) => b.calculatedRating - a.calculatedRating
      );

      const topPicks = sortedBeaches.slice(0, 3);
      setBestRatedBeaches(topPicks);
    }
  }, [riverBeaches, seaBeaches]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="relative">
      <ConversationProvider>
        <AiAssistantCard />
      </ConversationProvider>
      <Hero />
      <div className=" flex flex-col gap-6">
        <CardsGrid
          hasMoreButton={false}
          title="Top picks this season"
          cardData={bestRatedBeaches}
        />
        <MapSearcher />
        <CardsGrid
          hasMoreButton={false}
          title="Sea beaches"
          cardData={seaBeaches}
        />
        <CardsGrid
          hasMoreButton={false}
          title="River beaches"
          cardData={riverBeaches}
        />
      </div>
    </div>
  );
};

export default Homepage;
