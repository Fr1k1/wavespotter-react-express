import CardItem from "./cardItem";
import Beach1 from "../../assets/beach_1.png";
import Beach2 from "../../assets/beach_2.png";
import Beach3 from "../../assets/beach_3.png";

//nebude se tu fetchalo

const CardsGrid = () => {
  const cardData = [
    { title: "Beautiful Beach", image: Beach1 },
    { title: "Mountain Retreat", image: Beach2 },
    { title: "City Skyline", image: Beach3 },
    { title: "Island Paradise", image: Beach1 },
    { title: "Desert Oasis", image: Beach1 },
    { title: "Tropical Forest", image: Beach1 },
  ];

  return (
    <div>
      <h3 className="font-extrabold text-2xl text-gray-800">
        Top picks for this season
      </h3>

      <div className="grid grid-cols-3 gap-4 ">
        {cardData.map((data, index) => (
          <CardItem key={index} data={data} />
        ))}
      </div>
    </div>
  );
};

export default CardsGrid;
