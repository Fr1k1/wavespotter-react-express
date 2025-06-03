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
import { getBeachTypes } from "@/api/beachTypes";
import { getBeachTextures } from "@/api/beachTextures";
import { getBeachDepths } from "@/api/beachDepths";
import { getCountries } from "@/api/countries";
import { getCitiesByCountry } from "@/api/cities";
import { getCharacteristics } from "@/api/characteristics";
import FormFieldCustom from "@/components/ui/formFieldCustom";
import SelectFieldCustom from "@/components/ui/selectFieldCustom";
import { addBeach } from "@/api/beaches";
import { supabase } from "../supabaseClient";
import { notifyFailure, notifySuccess } from "@/components/ui/toast";
import { getUserId } from "@/common/globals";
import {
  BeachDepth,
  BeachTexture,
  BeachType,
  Characteristic,
  City,
  Country,
} from "@/common/types";
import { useNavigate } from "react-router";

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Beach name must be at least 2 characters.",
    })
    .max(80, {
      message: "Name must not exceed 80 characters",
    }),
  address: z.string().min(2, {
    message: "Beach address must be at least 2 characters.",
  }),
  beachTypeId: z.string().min(1, {
    message: "Beach type must be selected.",
  }),

  beachDepthId: z.string().min(1, {
    message: "Beach depth must be selected.",
  }),

  beach_country: z.string().min(1, {
    message: "Beach country must be selected.",
  }),

  beachTextureId: z.string().min(1, {
    message: "Beach texture must be selected.",
  }),

  cityId: z.string().min(1, {
    message: "Beach city must be selected.",
  }),

  working_hours: z
    .string()
    .min(2, {
      message: "Working hours must be at least 2 characters.",
    })
    .max(80, {
      message: "Working hours must not exceed 80 characters",
    }),

  description: z.string().min(2, {
    message: "Beach description must be at least 2 characters.",
  }),
  best_time_to_visit: z
    .string()
    .min(2, {
      message: "Best time to visit must be at least 2 characters.",
    })
    .max(100, {
      message: "Best time to visit must not exceed 100 characters",
    }),
  local_wildlife: z.string().min(2, {
    message: "Local wildlife must be at least 2 characters.",
  }),
  restaurants_and_bars_nearby: z.string().min(2, {
    message: "Beach and bars nearby must be at least 2 characters.",
  }),
  characteristics: z.array(z.number()).optional(),

  featured_items: z.array(z.string()).default([]),

  approved: z.boolean().optional(),
  userId: z.string().min(1, {
    message: "User id must not be null.",
  }),

  images: z.array(z.string()).optional(),
});

const AddNewBeach = () => {
  const [userId, setUserId] = useState(String);

  const navigate = useNavigate();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!userId) {
      console.error("User not authenticated");
      return;
    }
    const filteredValues = {
      ...values,
      featured_items: values.featured_items.filter(Boolean),
    };
    try {
      const response = await addBeach(filteredValues);
      if (images?.length && response) {
        await uploadImages(images, response.data.id);
      }
      notifySuccess("Beach request successfully sent!");
      navigate("/");
    } catch (error) {
      notifyFailure("Something went wrong");
      console.error("Error sending data to backend:", error);
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      address: "",
      beach_country: "",
      cityId: "",
      beachTypeId: "",
      beachDepthId: "",
      beachTextureId: "",
      characteristics: [],
      approved: false,
      userId: "",
      description: "",
      best_time_to_visit: "",
      local_wildlife: "",
      restaurants_and_bars_nearby: "",
      working_hours: "",
      featured_items: [],
    },
  });

  useEffect(() => {
    getUserId(setUserId, form);
  }, []);

  const [beachTypes, setBeachTypes] = useState<BeachType[]>([]);
  const [beachTextures, setBeachTextures] = useState<BeachTexture[]>([]);
  const [beachDepths, setBeachDepths] = useState<BeachDepth[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [featuredCharacteristics, setFeaturedCharacteristics] = useState<
    Characteristic[]
  >([]);
  const [images, setImages] = useState<File[]>([]);

  const [isCountryChanged, setIsCountryChanged] = useState(false);

  const [featuredItems, setFeaturedItems] = useState<string[]>(
    Array(5).fill("")
  );
  const [selectedFeaturedIds, setSelectedFeaturedIds] = useState<string[]>([]);

  useEffect(() => {
    form.setValue("featured_items", featuredItems);
  }, [featuredItems, form]);

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

  const uploadImages = async (images: File[], beachId: string) => {
    const uploadedImageIds: string[] = [];

    for (const file of images) {
      const { data, error } = await supabase.storage
        .from("beach_images") // bucket name
        .upload(`beaches/${beachId}/${file.name}`, file, {
          cacheControl: "3600", // 1 hour
          upsert: false, // Do not overwrite
        });

      if (error) {
        console.error("Error uploading image:", error);
        continue;
      }

      const { error: insertError } = await supabase.from("images").insert({
        beach_id: beachId,
        path: data?.path,
      });

      if (insertError) {
        console.error("Error inserting image record:", insertError);
      } else {
        uploadedImageIds.push(data?.path);
      }
    }

    return uploadedImageIds;
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

  const [fileInputs, setFileInputs] = useState([0]);

  const MAX_IMAGE_INPUT = 5;

  const addFileInput = () => {
    setFileInputs((prev) => {
      if (prev.length >= MAX_IMAGE_INPUT) {
        return prev;
      }
      return [...prev, prev.length];
    });
  };

  const handleFileChange = (files: FileList | null) => {
    if (files) {
      setImages((prevImages) => [...prevImages, ...Array.from(files)]);
    }
  };

  const handleSubmit = form.handleSubmit(onSubmit, (errors) => {
    console.error("Validation Errors:", errors);
  });

  const [featuredItemFields] = useState([
    { name: "featured_item_1", label: "Featured Item" },
    { name: "featured_item_2", label: "Featured Item" },
    { name: "featured_item_3", label: "Featured Item" },
    { name: "featured_item_4", label: "Featured Item" },
    { name: "featured_item_5", label: "Featured Item" },
  ]);

  return (
    <div className="flex flex-col gap-4 p-4 lg:p-0">
      <Title>Add new beach</Title>
      <Subtitle>Basic info</Subtitle>
      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6">
            <div className="flex flex-col gap-4">
              <FormFieldCustom
                form={form}
                name="name"
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
                name="address"
                label="Beach address"
                placeholder="Enter beach address"
              />

              <SelectFieldCustom
                form={form}
                name="cityId"
                label="Beach city"
                placeholder="Choose beach city"
                options={cities}
                disabled={!isCountryChanged}
              />
            </div>

            <div className="flex flex-col gap-4">
              <SelectFieldCustom
                form={form}
                name="beachTypeId"
                label="Beach type"
                placeholder="Choose beach type"
                options={beachTypes}
              />

              <SelectFieldCustom
                form={form}
                name="beachTextureId"
                label="Beach texture"
                placeholder="Choose beach texture"
                options={beachTextures}
              />

              <FormFieldCustom
                form={form}
                name="working_hours"
                label="Beach working hours"
                placeholder="Enter beach working hours"
              />
              {/*because it has description and not name*/}
              <FormField
                control={form.control}
                name="beachDepthId"
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
                              (beachDepthId) => beachDepthId.id == field.value
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
            name="description"
            label="Beach description"
            placeholder="Enter beach description"
            textarea
          />
          <div className="w-2/4 flex flex-col gap-6">
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
                <FileInput
                  key={id}
                  id={`picture-${id}`}
                  onFileChange={handleFileChange}
                />
              ))}
            </div>
          </div>

          <div>
            <div>
              <Subtitle>Featured info (up to 5 items)</Subtitle>
              <div className="flex flex-col justify-between gap-6 lg:flex lg:flex-row">
                {featuredItemFields.map((field, index) => (
                  <SelectFieldCustom
                    key={index}
                    form={form}
                    name={`featured_items.${index}`}
                    label={field.label}
                    placeholder={`Choose ${field.label.toLowerCase()}`}
                    options={featuredCharacteristics}
                    onValueChange={(value) => {
                      const newItems = [...featuredItems];
                      const newSelectedIds = [...selectedFeaturedIds];

                      if (value) {
                        newItems[index] = value.toString();
                        newSelectedIds[index] = value.toString();
                      } else {
                        newItems[index] = "";
                        newSelectedIds[index] = "";
                      }

                      setFeaturedItems(newItems);
                      setSelectedFeaturedIds(newSelectedIds.filter(Boolean));
                      form.setValue("featured_items", newItems);
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div>
            <Subtitle className="mb-6">Characteristics</Subtitle>
            <Characteristics
              form={form}
              disabledCharacteristics={selectedFeaturedIds}
            />
          </div>
          <BeachTips form={form} />
          <div className="flex justify-end">
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
