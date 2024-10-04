import { Link } from "react-router-dom";
import Title from "./Title";
import BeachDetailsReviewCard from "./BeachDetailsReviewCard";
import { Button } from "./button";

const BeachDetailsReviews = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6 ">
        <Title>Reviews</Title>
        <Link to={"/more"} className="text-primary-800 underline text-base ">
          More
        </Link>
      </div>

      <div className="flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-3 ">
        <BeachDetailsReviewCard />
        <BeachDetailsReviewCard />
        <BeachDetailsReviewCard />
        <BeachDetailsReviewCard />
        <BeachDetailsReviewCard />
      </div>

      <div className="flex flex-end justify-end">
        <Button variant={"darker"} underlined>
          Leave a review
        </Button>
      </div>
    </div>
  );
};

export default BeachDetailsReviews;
