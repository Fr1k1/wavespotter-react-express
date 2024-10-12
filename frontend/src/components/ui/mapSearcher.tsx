import Map from "./map";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "./button";
import Title from "./title";

//ovo treba biti neka forma kasnije

const MapSearcher = () => {
  return (
    <div className="px-4 lg:px-0">
      <Title className="mb-6">Find the perfect beach</Title>
      <div className="flex flex-col gap-5 lg:flex-row ">
        <div className="lg:w-4/6">
          <Map />
        </div>
        <div>
          <h2 className="text-gray-800 font-semibold text-xl mb-4">
            Start by selecting beach location
          </h2>

          <form action="" className=" flex flex-col gap-4">
            <div>
              <Select>
                <Label htmlFor="">Select a country</Label>

                <SelectTrigger>
                  <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Select>
                <Label htmlFor="">Select a city</Label>

                <SelectTrigger>
                  <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <Button variant={"secondary"}>Search</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MapSearcher;
