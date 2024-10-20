import { Rating } from "react-simple-star-rating";
import { Card, CardHeader } from "./card";

// interface CardData {
//   title: string;
//   rating: string;
//   description: string;
//   user:string;
// }

const BeachDetailsReviewCard = () => {
  return (
    <Card>
      <div>
        <CardHeader>
          <div className="flex justify-between items-center">
            <h3 className="text-base font-semibold">It's awesome</h3>

            <Rating
              // onClick={handleRating1}
              size={25}
              transition
              allowFraction
              //showTooltip
              // tooltipArray={tooltipArray}
              // fillColorArray={fillColorArray}
            />
          </div>
          <div>
            <p className="text-sm mb-2">
              This is the beach ever. We are definitely coming back next Summer
              with our friends! Loved the beach bar with awesome music!
            </p>
            <p className="text-sm">Marko Markec</p>
          </div>
        </CardHeader>
      </div>
    </Card>
  );
};

export default BeachDetailsReviewCard;
