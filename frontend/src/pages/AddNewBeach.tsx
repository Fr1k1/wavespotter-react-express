import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FileInput from "@/components/ui/fileInput";
import { PlusCircle } from "@phosphor-icons/react";
import Characteristics from "@/components/ui/characteristics";
import BeachTips from "@/components/ui/beachTips";
import Title from "@/components/ui/title";
import Subtitle from "@/components/ui/subtitle";
import { useEffect, useState } from "react";
import { BeachType } from "@/types/BeachType";
import { BeachTexture } from "@/types/BeachTexture";
import { getBeachTypes } from "@/api/beachTypes";
import { getBeachTextures } from "@/api/beachTextures";
import { BeachDepth } from "@/types/BeachDepth";
import { getBeachDepths } from "@/api/beachDepths";
import { Country } from "@/types/Country";
import { getCountries } from "@/api/countries";
import { getCitiesByCountry } from "@/api/cities";
import { City } from "@/types/City";
import { getCharacteristics } from "@/api/characteristics";
import FormFieldCustom from "@/components/ui/formFieldCustom";
import SelectFieldCustom from "@/components/ui/selectFieldCustom";
import { Characteristic } from "@/types/Characteristic";

const formSchema = z.object({
  beach_name: z.string().min(2, {
    message: "Beach name must be at least 2 characters.",
  }),
  beach_address: z.string().min(2, {
    message: "Beach address must be at least 2 characters.",
  }),
  beach_type: z.string().min(1, {
    message: "Beach type must be selected.",
  }),

  beach_depth: z.string().min(1, {
    message: "Beach depth must be selected.",
  }),

  beach_country: z.string().min(1, {
    message: "Beach country must be selected.",
  }),

  beach_texture: z.string().min(1, {
    message: "Beach texture must be selected.",
  }),

  beach_city: z.string().min(1, {
    message: "Beach city must be selected.",
  }),

  beach_working_hours: z.string().min(2, {
    message: "Beach city must be at least 2 characters.",
  }),

  beach_description: z.string().min(2, {
    message: "Beach description must be at least 2 characters.",
  }),
  best_time_to_visit: z.string().min(2, {
    message: "Best time to visit must be at least 2 characters.",
  }),
  local_wildlife: z.string().min(2, {
    message: "Local wildlife must be at least 2 characters.",
  }),
  restaurants_and_bars_nearby: z.string().min(2, {
    message: "Beach and bars nearby must be at least 2 characters.",
  }),
  characteristics: z.array(z.number()).optional(),
});

const AddNewBeach = () => {
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Slal budem na backend", values);
  }
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      beach_name: "",
      beach_address: "",
      beach_country: "",
      beach_city: "",
      beach_type: "",
      beach_depth: "",
      beach_texture: "",
      characteristics: [],
    },
  });

  const [beachTypes, setBeachTypes] = useState<BeachType[]>([]);
  const [beachTextures, setBeachTextures] = useState<BeachTexture[]>([]);
  const [beachDepths, setBeachDepths] = useState<BeachDepth[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [featuredCharacteristics, setFeaturedCharacteristics] = useState<
    Characteristic[]
  >([]);

  const [isCountryChanged, setIsCountryChanged] = useState(false);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [
          typesRes,
          texturesRes,
          depthsRes,
          countriesRes,
          characteristicsRes,
        ] = await Promise.all([
          getBeachTypes(),
          getBeachTextures(),
          getBeachDepths(),
          getCountries(),
          getCharacteristics(),
        ]);
        setBeachTypes(typesRes);
        setBeachTextures(texturesRes);
        setBeachDepths(depthsRes);
        setCountries(countriesRes);
        setFeaturedCharacteristics(characteristicsRes);
      } catch (err) {
        console.error("Error fetching initial data:", err);
      }
    };

    fetchInitialData();
  }, []);

  const fetchCitiesByCountry = async (countryId: string) => {
    try {
      const citiesRes = await getCitiesByCountry(countryId);
      setCities(citiesRes);
    } catch (err) {
      console.error("Error fetching cities:", err);
      setCities([]);
    }
  };

  const [fileInputs, setFileInputs] = useState([0]);

  const addFileInput = () => {
    setFileInputs((prev) => [...prev, prev.length]);
  };

  const featuredItemFields = [
    { name: "featured_item_1", label: "Featured item" },
    { name: "featured_item_2", label: "Featured item" },
    { name: "featured_item_3", label: "Featured item" },
    { name: "featured_item_4", label: "Featured item" },
    { name: "featured_item_5", label: "Featured item" },
  ];

  const handleSubmit = form.handleSubmit(
    (data) => {
      console.log("Form is valid. Calling onSubmit with data:", data);
      onSubmit(data);
    },
    (errors) => {
      console.log("Form is invalid. Validation errors:", errors);
    }
  );

  return (
    <div className="flex flex-col gap-4 p-4 lg:p-0">
      <Title>Add new beach</Title>
      <Subtitle>Basic info</Subtitle>
      <Form {...form}>
        <form
          onSubmit={(e) => {
            console.log("Form submission triggered");
            console.log("Vrijednosti su", form.getValues());
            handleSubmit(e);
          }}
          className="space-y-8"
        >
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6">
            <div className=" flex flex-col gap-4">
              <FormFieldCustom
                form={form}
                name="beach_name"
                label="Beach name"
                placeholder="Enter beach name"
              />

              <SelectFieldCustom
                form={form}
                name="beach_country"
                label="Beach country"
                placeholder="Choose beach country"
                options={countries}
                onValueChange={(value) => {
                  setIsCountryChanged(true);
                  fetchCitiesByCountry(value.toString());
                }}
              />

              <FormFieldCustom
                form={form}
                name="beach_address"
                label="Beach address"
                placeholder="Enter beach address"
              />

              <SelectFieldCustom
                form={form}
                name="beach_city"
                label="Beach city"
                placeholder="Choose beach city"
                options={cities}
                disabled={!isCountryChanged}
              />
            </div>

            <div className="flex flex-col gap-4">
              <SelectFieldCustom
                form={form}
                name="beach_type"
                label="Beach type"
                placeholder="Choose beach type"
                options={beachTypes}
              />

              <SelectFieldCustom
                form={form}
                name="beach_texture"
                label="Beach texture"
                placeholder="Choose beach texture"
                options={beachTextures}
              />

              <FormFieldCustom
                form={form}
                name="beach_working_hours"
                label="Beach working hours"
                placeholder="Enter beach working hours"
              />
              {/*because it has description and not name*/}
              <FormField
                control={form.control}
                name="beach_depth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Beach depth</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={(value) => field.onChange(value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choose beach depth">
                            {beachDepths.find(
                              (beach_depth) => beach_depth.id == field.value
                            )?.description || "Choose beach depth"}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Beach depths</SelectLabel>

                            {beachDepths.map((beachDepth) => (
                              <SelectItem
                                key={beachDepth.id}
                                value={beachDepth.id}
                              >
                                {beachDepth.description}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormFieldCustom
            form={form}
            name="beach_description"
            label="Beach description"
            placeholder="Enter beach description"
            textarea
          />
          <div className=" w-2/4 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <Subtitle>Images</Subtitle>
              <PlusCircle
                size={32}
                weight="fill"
                color="#0E7490"
                onClick={addFileInput}
                style={{ cursor: "pointer" }}
              />
            </div>

            <div>
              <FormLabel>Beach images</FormLabel>
              {fileInputs.map((id) => (
                <FileInput key={id} id={`picture-${id}`} />
              ))}
            </div>
          </div>

          <div>
            <div>
              <Subtitle>Featured info (up to 5 items)</Subtitle>
              <div className="flex flex-col justify-between gap-6 lg:flex lg:flex-row ">
                {featuredItemFields.map((field, index) => (
                  <SelectFieldCustom
                    key={index}
                    form={form}
                    name={field.name}
                    label={field.label}
                    placeholder={`Choose ${field.label.toLowerCase()}`}
                    options={featuredCharacteristics}
                  />
                ))}
              </div>
            </div>
          </div>

          <div>
            <Subtitle className="mb-6">Characteristics</Subtitle>
            <Characteristics form={form} />
          </div>
          <BeachTips form={form} />
          <div className="flex justify-end ">
            <Button type="submit" className="px-24 mb-6">
              Create request
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddNewBeach;
