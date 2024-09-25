import { CheckCircle, XCircle } from "@phosphor-icons/react";

const BeachFeaturesCheck = () => {
  const amenitiesWithCheck = Array(20).fill("Market");
  const amenitiesWithX = Array(20).fill("Market");

  return (
    <div className="flex flex-row flex-wrap gap-x-4 gap-y-1">
      {amenitiesWithCheck.map((amenity, index) => (
        <div key={`check-${index}`} className="flex items-center gap-2">
          <CheckCircle size={32} weight="fill" color="#16A34A" />
          <p>{amenity}</p>
        </div>
      ))}

      {amenitiesWithX.map((amenity, index) => (
        <div key={`x-${index}`} className="flex items-center gap-x-2">
          <XCircle size={32} weight="fill" color="#F04D4D" />
          <p>{amenity}</p>
        </div>
      ))}
    </div>
  );
};

export default BeachFeaturesCheck;
