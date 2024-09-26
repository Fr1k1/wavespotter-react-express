import BeachRequestsCard from "@/components/ui/BeachRequestsCard";
import Title from "@/components/ui/Title";

const BeachRequests = () => {
  return (
    <div className="flex flex-col gap-6">
      <Title>Beach requests</Title>
      <div className="grid grid-cols-2 gap-2 mb-6">
        <BeachRequestsCard />
        <BeachRequestsCard />
        <BeachRequestsCard />
        <BeachRequestsCard />
        <BeachRequestsCard />
        <BeachRequestsCard />
        <BeachRequestsCard />
        <BeachRequestsCard />
        <BeachRequestsCard />
      </div>
    </div>
  );
};

export default BeachRequests;
