import { getBeaches } from "@/api/beaches";
import BeachRequestsCard from "@/components/ui/beachRequestsCard";
import Title from "@/components/ui/title";
import { useEffect, useState } from "react";

const BeachRequests = () => {
  const [beachRequests, setBeachRequests] = useState([]);

  const fetchBeachRequests = async () => {
    try {
      const response = await getBeaches(1, 12, 0);
      setBeachRequests(response);
    } catch (error) {
      console.error("Error while fetching", error);
    }
  };

  useEffect(() => {
    fetchBeachRequests();
  }, []);
  return (
    <div className="flex flex-col gap-6">
      <Title>Beach requests</Title>
      <div className="grid grid-cols-2 gap-2 mb-6">
        {beachRequests.map((request, index) => (
          <BeachRequestsCard request={request} />
        ))}
      </div>
    </div>
  );
};

export default BeachRequests;
