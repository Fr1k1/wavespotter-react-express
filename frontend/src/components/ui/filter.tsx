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
import { getBeachTypes } from "@/api/beachTypes";
import { getBeachTextures } from "@/api/beachTextures";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation, useNavigate, useParams } from "react-router";
import { Form } from "@/components/ui/form";
import { getFilteredBeaches } from "@/api/beaches";
import { BeachTexture, BeachType, FilteredBeaches } from "@/common/types";

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
  setFilteredBeaches: React.Dispatch<React.SetStateAction<FilteredBeaches[]>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setTotalPages: React.Dispatch<React.SetStateAction<number>>;
}> = ({
  setIsToggledFilter,
  setFilteredBeaches,
  setCurrentPage,
  setTotalPages,
}) => {
  const [beachTypes, setBeachTypes] = useState<BeachType[]>([]);
  const [beachTextures, setBeachTextures] = useState<BeachTexture[]>([]);

  const { id } = useParams();

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
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

  const updateUrl = (
    countryId: string | undefined,
    formValues: { [key: string]: any }
  ) => {
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

    if (formValues.characteristics && formValues.characteristics.length > 0) {
      params.set("characteristics", formValues.characteristics.join(","));
    } else {
      params.delete("characteristics");
    }

    const url = `/country/${countryId}`;
    const finalUrl = params.toString() ? `${url}?${params.toString()}` : url;
    navigate(finalUrl);
  };

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const formValues = form.getValues();

      if (id) {
        const filters = {
          cityId: cityIdFromUrl || undefined,
          waterTypeId: formValues.waterType || undefined,
          beachTextureId: formValues.beachTexture || undefined,
          characteristicIds:
            formValues.characteristics && formValues.characteristics.length > 0
              ? formValues.characteristics
              : undefined,
        };

        getFilteredBeaches(id, filters, 1, 9)
          .then((response) => {
            setFilteredBeaches(response.data);
            setTotalPages(
              response.totalPages || Math.ceil(response.length / 9)
            );
            setCurrentPage(1);
            setIsToggledFilter(false);
          })
          .catch((error) => {
            console.error("Error fetching filtered beaches:", error);
          });

        updateUrl(id, formValues);
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
    form.setValue("beach_country", id || "");
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

  const clearAllFilters = () => {
    form.reset({
      beach_country: id,
      beach_city: "",
      characteristics: [],
      waterType: "",
      beachTexture: "",
    });

    const url = `/country/${id}`;
    navigate(url);
  };

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
          <form action="" onSubmit={handleSearch} id="form">
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
          </form>
        </Form>
        <div className="flex flex-col items-end gap-4">
          <Button className="w-80" form="form">
            Search
          </Button>
          <Button
            className="w-80"
            variant={"secondary"}
            onClick={clearAllFilters}
          >
            Clear all filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
