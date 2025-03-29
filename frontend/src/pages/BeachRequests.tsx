import { getBeaches } from "@/api/beaches";
import BeachRequestsCard from "@/components/ui/beachRequestsCard";
import Title from "@/components/ui/title";
import { useEffect, useState } from "react";

const BeachRequests = () => {
  const [beachRequests, setBeachRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBeachRequests = async () => {
    try {
      const response = await getBeaches(1, 12, 0);
      setBeachRequests(response);
    } catch (error) {
      console.error("Error while fetching", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBeachRequests();
  }, []);

  if (loading) {
    return <div>Loading beach requests...</div>;
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
