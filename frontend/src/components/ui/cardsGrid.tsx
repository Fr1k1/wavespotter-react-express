import CardItem from "./cardItem";
import Beach1 from "../../assets/beach_1.png";
import Beach2 from "../../assets/beach_2.png";
import Beach3 from "../../assets/beach_3.png";
import { Link } from "react-router-dom";
import Title from "./title";

//nebude se tu fetchalo, ovo budu koristile ostale komponente, svaka sa svojim drugim datasetom

const CardsGrid = ({
  title,
  hasMoreButton,
}: {
  title: string;
  hasMoreButton: boolean;
}) => {
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
      <div className="flex items-center justify-between mb-6 ">
        <Title>{title}</Title>
        {hasMoreButton && (
          <Link to={"/more"} className="text-primary-800 underline text-base ">
            More
          </Link>
        )}
      </div>

      <div className="flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-3 ">
        {cardData.map((data, index) => (
          <CardItem key={index} data={data} />
        ))}
      </div>
    </div>
  );
};

export default CardsGrid;
