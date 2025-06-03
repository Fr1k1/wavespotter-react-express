import { getBeaches } from "@/api/beaches";
import BeachRequestsCard from "@/components/ui/beachRequestsCard";
import Loader from "@/components/ui/loader";
import Title from "@/components/ui/title";
import { useEffect, useState } from "react";

const BeachRequests = () => {
  const [beachRequests, setBeachRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBeachRequests = async () => {
    setIsLoading(true);
    try {
      const response = await getBeaches(1, 12, 0);
      setBeachRequests(response);
    } catch (error) {
      console.error("Error while fetching", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBeachRequests();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (!beachRequests || beachRequests.length === 0) {
    return <div>No beach requests data available</div>;
  }
  return (
    <div className="flex flex-col gap-6">
      <Title>Beach requests</Title>
      <div className="grid grid-cols-2 gap-2 mb-6">
        {beachRequests.length > 0 ? (
          beachRequests.map((request, index) => (
            <BeachRequestsCard key={index} request={request} />
          ))
        ) : (
          <div>No beach requests found</div>
        )}
      </div>
    </div>
  );
};

export default BeachRequests;
