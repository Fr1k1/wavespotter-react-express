import CardItem from "./cardItem";
import Beach1 from "../../assets/beach_1.png";
import Beach2 from "../../assets/beach_2.png";
import Beach3 from "../../assets/beach_3.png";
import { Link } from "react-router-dom";
import Title from "./Title";

//nebude se tu fetchalo, ovo budu koristile ostale komponente, svaka sa svojim drugim datasetom

const CardsGrid = ({ hasMoreButton }: { hasMoreButton: boolean }) => {
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
      <div className="flex items-center justify-between">
        <Title>Top picks for this season</Title>
        {hasMoreButton && (
          <Link to={"/more"}>
            <h4 className="text-primary-800 underline text-base mb-6">More</h4>
          </Link>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4 ">
        {cardData.map((data, index) => (
          <CardItem key={index} data={data} />
        ))}
      </div>
    </div>
  );
};

export default CardsGrid;
