import Map from "./map";
import { Button } from "./button";
import Title from "./title";
import { FormEvent, useEffect, useState } from "react";
import { City } from "@/types/City";
import { Country } from "@/types/Country";
import { getCountries } from "@/api/countries";
import SelectFieldCustom from "./selectFieldCustom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getCitiesByCountry } from "@/api/cities";
import { Form } from "@/components/ui/form";
import { useLocation, useNavigate } from "react-router";

const formSchema = z.object({
  beach_country: z.string().min(2, {
    message: "Beach country must be at least 2 characters.",
  }),

  beach_city: z.string().min(2, {
    message: "Beach city must be at least 2 characters.",
  }),
});

const MapSearcher = ({ hasMap = true }: { hasMap?: boolean }) => {
  const searchParams = new URLSearchParams();
  const location = useLocation();
  const pathParts = location.pathname.split("/");
  const countryIdFromPath = pathParts.length > 2 ? pathParts[2] : "";
  const cityIdFromUrl = searchParams.get("city") || "";
  const [cities, setCities] = useState<City[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [isCountryChanged, setIsCountryChanged] = useState(false);
  const [selectedCityId, setSelectedCityId] = useState<string>(cityIdFromUrl);
  const [selectedCountryId, setSelectedCountryId] =
    useState<string>(countryIdFromPath);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      beach_country: countryIdFromPath || "",
      beach_city: cityIdFromUrl || "",
    },
  });

  const fetchCountries = async () => {
    const response = await getCountries();
    setCountries(response);
  };

  const fetchCitiesByCountry = async (countryId: string) => {
    try {
      setSelectedCountryId(countryId);
      const citiesRes = await getCitiesByCountry(countryId);
      setCities(citiesRes);
    } catch (err) {
      console.error("Error fetching cities:", err);
      setCities([]);
    }
  };

  useEffect(() => {
    fetchCountries();
    if (countryIdFromPath) {
      fetchCitiesByCountry(countryIdFromPath);
      setIsCountryChanged(true);
      form.setValue("beach_country", countryIdFromPath);
      if (cityIdFromUrl) {
        form.setValue("beach_city", cityIdFromUrl);
      }
    }
  }, [location]);

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (selectedCountryId) {
        const url = `/country/${selectedCountryId}`;

        if (selectedCityId) {
          searchParams.set("city", selectedCityId);
        } else {
          searchParams.delete("city");
        }

        const finalUrl = searchParams.toString()
          ? `${url}?${searchParams.toString()}`
          : url;
        navigate(finalUrl);
      }
    } catch (error) {
      console.log("Error happened", error);
    }
  };

  return (
    <div className="px-4 lg:px-0">
      {hasMap && <Title className="mb-6">Find the perfect beach</Title>}

      <div className="flex flex-col gap-5 lg:flex-row ">
        {hasMap && (
          <div className="lg:w-4/6">
            <Map cities={cities} />
          </div>
        )}

        <div>
          {hasMap && (
            <h2 className="text-gray-800 font-semibold text-xl mb-4">
              Start by selecting beach location
            </h2>
          )}

          <Form {...form}>
            <form
              action=""
              onSubmit={handleSearch}
              className={
                hasMap
                  ? " flex flex-col gap-4"
                  : " flex flex-flex-row items-end gap-4"
              }
            >
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
                  onValueChange={(value) => {
                    setSelectedCityId(value.toString());
                  }}
                />
              </div>

              <Button variant={"secondary"} type="submit">
                Search
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default MapSearcher;
