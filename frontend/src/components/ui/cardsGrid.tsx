import CardItem from "./cardItem";
import { Link } from "react-router-dom";
import Title from "./title";
import { useEffect } from "react";

const CardsGrid = ({
  title,
  hasMoreButton,
  cardData,
}: {
  title: string;
  hasMoreButton: boolean;
  cardData: [];
}) => {
  useEffect(() => {
    console.log("Cards grid ima data: ", cardData);
  });
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
        {cardData?.map((data, index) => (
          <CardItem key={index} data={data} />
        ))}
      </div>
    </div>
  );
};

export default CardsGrid;
