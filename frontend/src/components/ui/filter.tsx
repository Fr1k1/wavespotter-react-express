import { X } from "@phosphor-icons/react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import Characteristics from "./characteristics";
import { useEffect, useState } from "react";
import { BeachType } from "@/types/BeachType";
import { getBeachTypes } from "@/api/beachTypes";
import { getBeachTextures } from "@/api/beachTextures";
import { BeachTexture } from "@/types/BeachTexture";

const Filter: React.FC<{
  setIsToggledFilter: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setIsToggledFilter }) => {
  const [beachTypes, setBeachTypes] = useState<BeachType[]>([]);
  const [beachTextures, setBeachTextures] = useState<BeachTexture[]>([]);

  const fetchBeachTypes = async () => {
    try {
      const response = await getBeachTypes();
      setBeachTypes(response);
    } catch {
      console.log("Error fetching beach types");
    }
  };

  const fetchBeachTextures = async () => {
    try {
      const response = await getBeachTextures();
      setBeachTextures(response);
    } catch {
      console.log("Error fetching beach textures");
    }
  };

  useEffect(() => {
    fetchBeachTypes();
    fetchBeachTextures();
  }, []);
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
        <div className="flex flex-col lg:flex-row gap-6">
          <div className=" w-60">
            <div className="w-44">
              <p className="text-white">Water type</p>
              <Tabs defaultValue="account" className=" bg-white p-1 rounded-lg">
                <TabsList className="grid w-full grid-cols-2">
                  {beachTypes.map((beachType) => (
                    <TabsTrigger key={beachType.id} value={beachType.name}>
                      {beachType.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
            <div>
              <Select>
                <Label htmlFor="" className="text-white">
                  Beach texture
                </Label>

                <SelectTrigger>
                  <SelectValue placeholder="Select beach texture" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Beach textures</SelectLabel>

                    {beachTextures.map((beachTexture: BeachTexture) => (
                      <SelectItem key={beachTexture.id} value={beachTexture.id}>
                        {beachTexture.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="text-white">
            <h2 className="mb-2">Characteristics</h2>
            <Characteristics />
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
