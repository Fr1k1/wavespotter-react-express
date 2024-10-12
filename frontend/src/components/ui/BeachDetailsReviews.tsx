import { Link, useNavigate, useParams } from "react-router-dom";
import Title from "./title";
import BeachDetailsReviewCard from "./beachDetails";
import { Button } from "./button";
import { supabase } from "@/supaBaseClient";

const BeachDetailsReviews = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const conditionalRedirect = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser(); //returns the user only if there is an existing session
    if (user) {
      navigate(`/beach/${id}/add-review`);
    } else {
      navigate("/login");
    }
  };
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
        <Button
          variant={"darker"}
          underlined
          onClick={() => conditionalRedirect()}
        >
          Leave a review
        </Button>
      </div>
    </div>
  );
};

export default BeachDetailsReviews;
