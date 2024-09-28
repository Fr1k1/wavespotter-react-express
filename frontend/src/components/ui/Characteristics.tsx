import { Switch } from "./switch";
import { Label } from "./label";

const Characteristics = () => {
  return (
    <div className="grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-7 lg:gap-6">
      {Array.from({ length: 50 }).map((_, index) => (
        <div key={index} className="flex items-center space-x-2">
          <Switch id={`airplane-mode-${index}`} />
          <Label htmlFor={`airplane-mode-${index}`}>Airplane Mode</Label>
        </div>
      ))}
    </div>
  );
};

export default Characteristics;
