import CardsGrid from "@/components/ui/cardsGrid";
import Hero from "@/components/ui/hero";
import MapSearcher from "@/components/ui/mapSearcher";

const Homepage = () => {
  return (
    <div>
      <Hero />
      <div className=" flex flex-col gap-6">
        <CardsGrid hasMoreButton title="Top picks this season" />
        <MapSearcher />
        <CardsGrid hasMoreButton title="Best rated sea beaches" />
        <CardsGrid hasMoreButton title="Best rated river beaches" />
      </div>
    </div>
  );
};

export default Homepage;
