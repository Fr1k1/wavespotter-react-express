import { Switch } from "./switch";
import { Label } from "./label";
import { getCharacteristics } from "@/api/characteristics";
import { useEffect, useState } from "react";
import { Characteristic } from "@/types/Characteristic";
import { UseFormReturn } from "react-hook-form";

interface CharacteristicsProps {
  form: UseFormReturn<any>;
}

const Characteristics: React.FC<CharacteristicsProps> = ({ form }) => {
  const [characteristics, setCharacteristics] = useState<Characteristic[]>([]);

  const fetchCharacteristics = async () => {
    const response = await getCharacteristics();
    setCharacteristics(response);
  };

  useEffect(() => {
    fetchCharacteristics();
  }, []);

  const handleCharacteristicChange = (
    characteristicId: string,
    isChecked: boolean
  ) => {
    const currentCharacteristics = form.getValues("characteristics") || [];
    let newCharacteristics;

    if (isChecked) {
      newCharacteristics = [...currentCharacteristics, characteristicId];
    } else {
      newCharacteristics = currentCharacteristics.filter(
        (id: string) => id !== characteristicId
      );
    }

    form.setValue("characteristics", newCharacteristics);
    console.log("Nove karakteristike su: ", newCharacteristics);
  };

  return (
    <div className="grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-7 lg:gap-6">
      {characteristics.map((characteristic: Characteristic) => (
        <div key={characteristic.id} className="flex items-center space-x-2">
          <Switch
            id={`characteristic-${characteristic.id}`}
            onCheckedChange={(checked) =>
              handleCharacteristicChange(characteristic.id, checked)
            }
          />
          <Label htmlFor={`characteristic-${characteristic.id}`}>
            {characteristic.name}
          </Label>
        </div>
      ))}
    </div>
  );
};

export default Characteristics;
