import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Rating } from "react-simple-star-rating";
import { Button } from "./button";

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
              <Button>More</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <img src={data?.image} alt="" />
        </CardContent>
      </Card>
    </div>
  );
};

export default CardItem;
