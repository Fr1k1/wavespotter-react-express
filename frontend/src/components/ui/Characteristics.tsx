import { Switch } from "./switch";
import { Label } from "./label";
import { getCharacteristics } from "@/api/characteristics";
import { useEffect, useState } from "react";
import { Characteristic } from "@/types/Characteristic";

const Characteristics = () => {
  const [characteristics, setCharacteristics] = useState<Characteristic[]>([]);

  const fetchCharacteristics = async () => {
    const response = await getCharacteristics();
    setCharacteristics(response);
  };

  useEffect(() => {
    fetchCharacteristics();
  }, []);
  return (
    <div className="grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-7 lg:gap-6">
      {characteristics.map((characteristic: Characteristic, index) => (
        <div key={index} className="flex items-center space-x-2">
          <Switch id={`airplane-mode-${index}`} />
          <Label htmlFor={`airplane-mode-${index}`}>
            {characteristic.name}
          </Label>
        </div>
      ))}
    </div>
  );
};

export default Characteristics;
