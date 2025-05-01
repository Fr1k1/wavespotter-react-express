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
import { getBeachById, getBeachImages, updateBeach } from "@/api/beaches";
import { supabase } from "../supabaseClient";
import { notifySuccess } from "@/components/ui/toast";
import { useParams } from "react-router-dom";
import { Image } from "@/common/types";
import { checkAuth } from "@/common/globals";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Beach name must be at least 2 characters.",
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

  working_hours: z.string().min(2, {
    message: "Working hours must be at least 2 characters.",
  }),

  description: z.string().min(2, {
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

  featured_items: z.array(z.string().optional()).default([]),

  approved: z.boolean().optional(),
  userId: z.string().min(1, {
    message: "User id must not be null.",
  }),

  images: z.array(z.string()).optional(),
});

const ConfirmBeachRequest = () => {
  const { id } = useParams<{ id?: string }>();
  const [loading, setLoading] = useState(true);
  const [, setDataLoaded] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [, setIsLoggedIn] = useState(false);
  const [, setIsAdmin] = useState(false);

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
    checkAuth(setIsLoggedIn, setIsAdmin);
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
  const [featuredItems, setFeaturedItems] = useState<string[]>([]);

  useEffect(() => {
    form.setValue("featured_items", featuredItems);
  }, [featuredItems, form]);

  const openNewWindow = (imagePath: string) => {
    const newTab = window.open("", "_blank");
    if (newTab) {
      newTab.document.body.innerHTML = `
  <html>
    <head>
      <title>Image Preview</title>
      <style>
        body { margin: 0; display: flex; justify-content: center; align-items: center; height: 100vh; }
        img { max-width: 100%; max-height: 100vh; object-fit: contain; }
      </style>
    </head>
    <body>
      <img src="${imagePath}" alt="Image Preview">
    </body>
  </html>
`;
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("Updateane vrijednosti su", values);
    if (!id) return;

    try {
      const updatedValues = {
        ...values,
        approved: true,
        featured_items: values.featured_items.filter(Boolean) as string[],
      };

      await updateBeach(id, updatedValues);
      if (images?.length) {
        await uploadImages(images, id);
      }

      notifySuccess("Beach request successfully updated!");
    } catch (error) {
      console.error("Error updating beach data:", error);
    }
  };

  //duplicate function, will reuse
  const uploadImages = async (images: File[], beachId: string) => {
    const uploadedImageIds: string[] = [];

    for (const file of images) {
      const { data, error } = await supabase.storage
        .from("beach_images")
        .upload(`beaches/${beachId}/${file.name}`, file, {
          cacheControl: "3600",
          upsert: false,
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
  //duplicate function, will reuse

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
    const fetchAllData = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const [
          typesRes,
          texturesRes,
          depthsRes,
          countriesRes,
          characteristicsRes,
          beachData,
          beachImagesRes,
        ] = await Promise.all([
          getBeachTypes(),
          getBeachTextures(),
          getBeachDepths(),
          getCountries(),
          getCharacteristics(),
          getBeachById(id),
          getBeachImages(id),
        ]);

        setBeachTypes(typesRes);
        setBeachTextures(texturesRes);
        setBeachDepths(depthsRes);
        setCountries(countriesRes);
        setFeaturedCharacteristics(characteristicsRes);

        if (beachData) {
          console.log("Beach data na confirmu je", beachData);
          const regularCharacteristics: number[] = [];

          const featuredItems: string[] = [];

          if (
            beachData.characteristics &&
            beachData.characteristics.length > 0
          ) {
            console.log("Karakteristike su", beachData.characteristics);
            beachData.characteristics.forEach(
              (characteristic: Characteristic) => {
                if (
                  characteristic.beach_has_characteristics &&
                  characteristic.beach_has_characteristics.featured
                ) {
                  featuredItems.push(characteristic.id.toString());
                } else {
                  console.log("Pusham u regularne", characteristic.id);
                  regularCharacteristics.push(Number(characteristic.id));
                }
              }
            );
          }

          if (beachData.city?.country?.id) {
            const citiesRes = await getCitiesByCountry(
              beachData.city.country.id.toString()
            );
            setCities(citiesRes);
          }

          form.reset({
            ...beachData,
            beachTypeId: String(beachData.beachTypeId || ""),
            beachTextureId: String(beachData.beachTextureId || ""),
            beachDepthId: String(beachData.beachDepthId || ""),
            beach_country: String(beachData.city.country.id || ""),
            cityId: String(beachData.cityId || ""),
            characteristics: regularCharacteristics,
            featured_items: featuredItems,
          });

          setFeaturedItems(featuredItems);
        }

        // Process images
        if (beachImagesRes && beachImagesRes.length > 0) {
          const signedUrlPromises = beachImagesRes.map(async (image: Image) => {
            const { data, error } = await supabase.storage
              .from("beach_images")
              .createSignedUrl(image.path, 7200);

            if (error) {
              console.error("Error creating URL:", error);
              return null;
            }

            return data.signedUrl;
          });

          const urls = await Promise.all(signedUrlPromises);
          const validUrls = urls.filter((url) => url !== null) as string[];
          setImageUrls(validUrls);
          console.log("Image urls su", validUrls);
        }
        setDataLoaded(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [id, form]);

  const [fileInputs, setFileInputs] = useState([0]);

  //duplicate function, will reuse

  const addFileInput = () => {
    setFileInputs((prev) => [...prev, prev.length]);
  };
  //duplicate function, will reuse

  const handleFileChange = (files: FileList | null) => {
    if (files) {
      setImages((prevImages) => [...prevImages, ...Array.from(files)]);
    }
  };

  const handleSubmit = form.handleSubmit(onSubmit, (errors) => {
    console.error("Validation Errors:", errors);
  });

  //duplicate
  const [featuredItemFields] = useState([
    { name: "featured_item_1", label: "Featured Item" },
    { name: "featured_item_2", label: "Featured Item" },
    { name: "featured_item_3", label: "Featured Item" },
    { name: "featured_item_4", label: "Featured Item" },
    { name: "featured_item_5", label: "Featured Item" },
  ]);

  if (loading) {
    return <div className="p-8 text-center">Loading beach data...</div>;
  }

  return (
    <div className="flex flex-col gap-4 p-4 lg:p-0">
      <Title>Update Beach Request</Title>
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
                disabled={!isCountryChanged && !cities.length}
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

            {imageUrls.length > 0 && (
              <div className="mb-4">
                <FormLabel>Existing Images</FormLabel>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                  {imageUrls.map((imagePath, id) => (
                    <div key={id} className="relative">
                      <a
                        target="_blank"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          openNewWindow(imagePath);
                        }}
                      >
                        <img
                          src={imagePath}
                          alt={`Beach image ${id + 1}`}
                          className="w-full h-32 object-cover rounded-md"
                        />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <FormLabel>Add New Images</FormLabel>
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
                      if (value) {
                        newItems[index] = value.toString();
                      } else {
                        newItems.splice(index, 1);
                      }
                      const filteredItems = newItems.filter(Boolean);
                      setFeaturedItems(filteredItems);
                      form.setValue("featured_items", filteredItems);
                    }}
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

          <div className="flex justify-end">
            <Button type="submit" className="px-24 mb-6">
              Update Beach
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ConfirmBeachRequest;
