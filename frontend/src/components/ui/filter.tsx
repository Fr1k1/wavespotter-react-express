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
import { FormEvent, useEffect, useState } from "react";
import { BeachType } from "@/types/BeachType";
import { getBeachTypes } from "@/api/beachTypes";
import { getBeachTextures } from "@/api/beachTextures";
import { BeachTexture } from "@/types/BeachTexture";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation, useNavigate } from "react-router";
import { Form } from "@/components/ui/form";

const formSchema = z.object({
  beach_country: z.string().min(2, {
    message: "Beach country must be at least 2 characters.",
  }),

  beach_city: z.string().min(2, {
    message: "Beach city must be at least 2 characters.",
  }),
  characteristics: z.array(z.number()).optional(),
  waterType: z.string().optional(),
  beachTexture: z.string().optional(),
});

const Filter: React.FC<{
  setIsToggledFilter: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setIsToggledFilter }) => {
  const [beachTypes, setBeachTypes] = useState<BeachType[]>([]);
  const [beachTextures, setBeachTextures] = useState<BeachTexture[]>([]);

  const navigate = useNavigate();
  const location = useLocation();
  //da mogu dobiti i city od prije
  const searchParams = new URLSearchParams(location.search);
  const pathParts = location.pathname.split("/");
  const countryIdFromPath = pathParts.length > 2 ? pathParts[2] : "";
  const cityIdFromUrl = searchParams.get("city") || "";
  const waterTypeFromUrl = searchParams.get("waterType") || "";
  const beachTextureFromUrl = searchParams.get("beachTexture") || "";
  const characteristicsFromUrl = searchParams.get("characteristics");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      beach_country: "",
      beach_city: "",
      characteristics: characteristicsFromUrl
        ? characteristicsFromUrl.split(",").map((id) => Number(id))
        : [],
      waterType: waterTypeFromUrl,
      beachTexture: beachTextureFromUrl,
    },
  });

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const formValues = form.getValues();

      if (countryIdFromPath) {
        const url = `/country/${countryIdFromPath}`;

        const params = new URLSearchParams(location.search);

        if (cityIdFromUrl) {
          params.set("city", cityIdFromUrl);
        }

        if (formValues.waterType) {
          params.set("waterType", formValues.waterType);
        } else {
          params.delete("waterType");
        }

        if (formValues.beachTexture) {
          params.set("beachTexture", formValues.beachTexture);
        } else {
          params.delete("beachTexture");
        }

        if (
          formValues.characteristics &&
          formValues.characteristics.length > 0
        ) {
          console.log("karakteristike nisu nula");
          params.set("characteristics", formValues.characteristics.join(","));
        } else {
          params.delete("characteristics");
        }

        const finalUrl = params.toString()
          ? `${url}?${params.toString()}`
          : url;

        navigate(finalUrl);
        setIsToggledFilter(false);
      }
    } catch (error) {
      console.log("Error happened", error);
    }
  };

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

  useEffect(() => {
    form.setValue("beach_country", countryIdFromPath);
    form.setValue("beach_city", cityIdFromUrl);

    if (waterTypeFromUrl) {
      form.setValue("waterType", waterTypeFromUrl);
    }

    if (beachTextureFromUrl) {
      form.setValue("beachTexture", beachTextureFromUrl);
    }

    if (characteristicsFromUrl) {
      const characteristicIds = characteristicsFromUrl
        .split(",")
        .map((id) => Number(id));
      form.setValue("characteristics", characteristicIds);
    }
  }, [location]);

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
        <Form {...form}>
          <form action="" onSubmit={handleSearch}>
            <div className="flex flex-col lg:flex-row gap-6">
              <div className=" w-60">
                <div className="w-44">
                  <p className="text-white">Water type</p>
                  <Tabs
                    className=" bg-white p-1 rounded-lg"
                    defaultValue={form.getValues("waterType") || undefined}
                    onValueChange={(value) => form.setValue("waterType", value)}
                  >
                    <TabsList className="grid w-full grid-cols-2">
                      {beachTypes.map((beachType) => (
                        <TabsTrigger
                          key={beachType.id}
                          value={beachType.id.toString()}
                        >
                          {beachType.name}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </Tabs>
                </div>
                <div>
                  <Select
                    defaultValue={form.getValues("beachTexture") || undefined}
                    onValueChange={(value) =>
                      form.setValue("beachTexture", value)
                    }
                  >
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
                          <SelectItem
                            key={beachTexture.id}
                            value={beachTexture.id}
                          >
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
                <Characteristics form={form} />
              </div>
            </div>
            <div className="flex flex-end justify-end ">
              <Button className="w-80">Search</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Filter;
