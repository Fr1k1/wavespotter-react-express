import { Link, useNavigate, useParams } from "react-router-dom";
import Title from "./title";
import { Button } from "./button";
import BeachDetailsReviewCard from "./beachDetailsReviewCard";

const BeachDetailsReviews = ({ reviews }: { reviews?: Array<any> }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  if (reviews === undefined) {
    return null;
  }

  const hasReviews = reviews && reviews.length > 0;

  return (
    <div>
      <div className="flex items-center justify-between mb-6 ">
        <Title>Reviews</Title>
      </div>

      {!hasReviews && (
        <p className="text-gray-500 mb-4">
          No reviews yet. Be the first to leave a review!
        </p>
      )}

      <div className="flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-3 ">
        {hasReviews &&
          reviews.map((review, index) => (
            <BeachDetailsReviewCard key={review.id || index} review={review} />
          ))}
      </div>

      <div className="flex flex-end justify-end mt-4">
        <Button
          variant={"darker"}
          underlined
          onClick={() => navigate(`/beach/${id}/add-review`)}
        >
          Leave a review
        </Button>
      </div>
    </div>
  );
};

export default BeachDetailsReviews;
