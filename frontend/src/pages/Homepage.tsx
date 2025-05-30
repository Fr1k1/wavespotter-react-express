import { getBeachByType } from "@/api/beaches";
import { calculateAverageRating } from "@/common/globals";
import CardsGrid from "@/components/ui/cardsGrid";
import Hero from "@/components/ui/hero";
import { useLoading } from "@/components/ui/LoaderContext/loaderContext";
import MapSearcher from "@/components/ui/mapSearcher";
import { useEffect, useState } from "react";

const Homepage = () => {
  const [riverBeaches, setRiverBeaches] = useState<any>(null);
  const [seaBeaches, setSeaBeaches] = useState<any>(null);
  const [bestRatedBeaches, setBestRatedBeaches] = useState<any>(null);

  const fetchRiverBeaches = async () => {
    const response = await getBeachByType(1);
    setRiverBeaches(response);
  };

  const fetchSeaBeaches = async () => {
    const response = await getBeachByType(2);
    setSeaBeaches(response);
  };

  const { setIsLoading } = useLoading();

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
  }, [setIsLoading]);

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

      const topPicks = sortedBeaches.slice(0, 4);
      setBestRatedBeaches(topPicks);
    }
  }, [riverBeaches, seaBeaches]);

  return (
    <div>
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
