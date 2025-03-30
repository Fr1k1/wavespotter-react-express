import { Switch } from "./switch";
import { Label } from "./label";
import { getCharacteristics } from "@/api/characteristics";
import { useEffect, useState } from "react";
import { Characteristic } from "@/types/Characteristic";
import { UseFormReturn } from "react-hook-form";

interface CharacteristicsProps {
  form?: UseFormReturn<any>;
}

const Characteristics: React.FC<CharacteristicsProps> = ({ form }) => {
  const [characteristics, setCharacteristics] = useState<Characteristic[]>([]);
  const [selectedCharacteristics, setSelectedCharacteristics] = useState<
    string[]
  >([]);

  const fetchCharacteristics = async () => {
    const response = await getCharacteristics();
    setCharacteristics(response);
  };

  useEffect(() => {
    fetchCharacteristics();
  }, []);

  useEffect(() => {
    if (form) {
      const currentValues = form.getValues("characteristics") || [];
      console.log("Current characteristics from form:", currentValues);
      setSelectedCharacteristics(currentValues.map((id: number) => String(id)));
    }
  }, [form, form?.watch("characteristics")]);

  const handleCharacteristicChange = (
    characteristicId: string,
    isChecked: boolean
  ) => {
    const currentCharacteristics = [...selectedCharacteristics];
    let newCharacteristics;

    if (isChecked) {
      newCharacteristics = [...currentCharacteristics, characteristicId];
    } else {
      newCharacteristics = currentCharacteristics.filter(
        (id: string) => id !== characteristicId
      );
    }

    setSelectedCharacteristics(newCharacteristics);

    const numericCharacteristics = newCharacteristics.map((id) => Number(id));
    //Dirty- the value has been changed from its initial default value
    form?.setValue("characteristics", numericCharacteristics, {
      shouldDirty: true,
      shouldValidate: true,
    });
    console.log("Nove karakteristike su: ", numericCharacteristics);
  };

  return (
    <div className="grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-7 lg:gap-6">
      {characteristics.map((characteristic: Characteristic) => {
        const isSelected = selectedCharacteristics.includes(
          String(characteristic.id)
        );

        return (
          <div key={characteristic.id} className="flex items-center space-x-2">
            <Switch
              id={`characteristic-${characteristic.id}`}
              checked={isSelected}
              onCheckedChange={(checked) =>
                handleCharacteristicChange(String(characteristic.id), checked)
              }
            />
            <Label htmlFor={`characteristic-${characteristic.id}`}>
              {characteristic.name}
            </Label>
          </div>
        );
      })}
    </div>
  );
};

export default Characteristics;
