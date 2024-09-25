import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Rating } from "react-simple-star-rating";
import { Button } from "./button";
import { Link } from "react-router-dom";

interface CardData {
  title: string;
  image: string;
}

const CardItem = ({ data }: { data: CardData }) => {
  return (
    <div>
      <Card>
        <CardHeader className="">
          <div className=" flex flex-row items-center justify-between">
            <div className="">
              <CardTitle>{data?.title}</CardTitle>
              <div className=" flex items-center gap-2">
                <Rating
                  // onClick={handleRating1}
                  size={25}
                  transition
                  allowFraction
                  //showTooltip
                  // tooltipArray={tooltipArray}
                  // fillColorArray={fillColorArray}
                />
                <h4>Brač, Croatia</h4>
              </div>
            </div>
            <div>
              <Link to="/beach/1">
                <Button underlined variant={"darker"}>
                  More
                </Button>
              </Link>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <img src={data?.image} alt="" className="w-full h-full" />
        </CardContent>
      </Card>
    </div>
  );
};

export default CardItem;
