import Map from "./map";

import { Button } from "./button";
import Title from "./title";
import { useEffect, useState } from "react";
import { City } from "@/types/City";
import { Country } from "@/types/Country";
import { getCountries } from "@/api/countries";
import SelectFieldCustom from "./selectFieldCustom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getCitiesByCountry } from "@/api/cities";
import { Form } from "@/components/ui/form";

const formSchema = z.object({
  beach_country: z.string().min(2, {
    message: "Beach country must be at least 2 characters.",
  }),

  beach_city: z.string().min(2, {
    message: "Beach city must be at least 2 characters.",
  }),
});

const MapSearcher = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);

  const [isCountryChanged, setIsCountryChanged] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      beach_country: "",
      beach_city: "",
    },
  });

  const fetchCountries = async () => {
    const response = await getCountries();
    setCountries(response);
  };

  const fetchCitiesByCountry = async (countryId: string) => {
    try {
      const citiesRes = await getCitiesByCountry(countryId);
      setCities(citiesRes);
    } catch (err) {
      console.error("Error fetching cities:", err);
      setCities([]);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <div className="px-4 lg:px-0">
      <Title className="mb-6">Find the perfect beach</Title>
      <div className="flex flex-col gap-5 lg:flex-row ">
        <div className="lg:w-4/6">
          <Map cities={cities} />
        </div>
        <div>
          <h2 className="text-gray-800 font-semibold text-xl mb-4">
            Start by selecting beach location
          </h2>
          <Form {...form}>
            <form action="" className=" flex flex-col gap-4">
              <div>
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
              </div>

              <div>
                <SelectFieldCustom
                  form={form}
                  name="beach_city"
                  label="Beach city"
                  placeholder="Choose beach city"
                  options={cities}
                  disabled={!isCountryChanged}
                />
              </div>

              <Button variant={"secondary"}>Search</Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default MapSearcher;
