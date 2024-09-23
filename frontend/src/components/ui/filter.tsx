import { X } from "@phosphor-icons/react";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "./label";
import { Button } from "./button";

const Filter: React.FC<{
  setIsToggledFilter: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setIsToggledFilter }) => {
  return (
    <div className="bg-gradient-to-r from-primary-800 to-gray-800 z-50 absolute left-0 w-full  ">
      <div className="max-w-screen-2xl m-auto p-4 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h3 className="text-white text-2xl font-bold">Filter beaches</h3>
          <X
            size={32}
            color="#06B6D4"
            onClick={() => {
              setIsToggledFilter(false);
            }}
            className="cursor-pointer"
          />
        </div>
        <div className="flex gap-6">
          <div className=" w-60">
            <div className="w-44">
              <p className="text-white">Water type</p>
              <Tabs defaultValue="account" className=" bg-white p-1 rounded-lg">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="account">River</TabsTrigger>
                  <TabsTrigger value="password">Sea</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div>
              <Select>
                <Label htmlFor="" className="text-white">
                  Beach type
                </Label>

                <SelectTrigger>
                  <SelectValue placeholder="Select beach type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Beach types</SelectLabel>
                    <SelectItem value="sand">Sand</SelectItem>
                    <SelectItem value="gravel">Gravel</SelectItem>
                    <SelectItem value="rocks">Rocks</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="text-white">
            <h2>Characteristics</h2>
            <div className="grid grid-cols-7 gap-6">
              {Array.from({ length: 50 }).map((_, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Switch id={`airplane-mode-${index}`} />
                  <Label htmlFor={`airplane-mode-${index}`}>
                    Airplane Mode
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-end justify-end ">
          <Button className="w-80">Search</Button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
