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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FileInput from "@/components/ui/FileInput";
import { PlusCircle } from "@phosphor-icons/react";
import Characteristics from "@/components/ui/Characteristics";
import BeachTips from "@/components/ui/BeachTips";
import Title from "@/components/ui/Title";
import Subtitle from "@/components/ui/Subtitle";

const formSchema = z.object({
  beach_name: z.string().min(2, {
    message: "Beach name must be at least 2 characters.",
  }),
  beach_address: z.string().min(2, {
    message: "Beach address must be at least 2 characters.",
  }),
});

function onSubmit(values: z.infer<typeof formSchema>) {
  // Do something with the form values.
  // ✅ This will be type-safe and validated.
  console.log(values);
}

const AddNewBeach = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      beach_name: "",
      beach_address: "",
    },
  });
  return (
    <div className="flex flex-col gap-4">
      <Title>Add new beach</Title>
      <Subtitle>Basic info</Subtitle>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className=" grid grid-cols-2 gap-6">
            <div className=" flex flex-col gap-4">
              <FormField
                control={form.control}
                name="beach_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Beach name </FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="beach_address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Latitude</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="beach_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Beach country</FormLabel>
                    <FormControl>
                      <Select value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose beach country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Beach countries</SelectLabel>

                            <SelectItem value="1">Croatia</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="beach_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Water type</FormLabel>
                    <FormControl>
                      <Select value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose water type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Water types</SelectLabel>

                            <SelectItem value="1">Salted</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="beach_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Beach depth</FormLabel>
                    <FormControl>
                      <Select value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose beach depth" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Beach depths</SelectLabel>

                            <SelectItem value="1">Very deep</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="beach_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Beach address</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="beach_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Longitude</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="beach_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Beach city</FormLabel>
                    <FormControl>
                      <Select value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose beach city" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Beach cities</SelectLabel>

                            <SelectItem value="1">Dubrovnik</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="beach_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Beach type</FormLabel>
                    <FormControl>
                      <Select value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose beach type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Beach types</SelectLabel>

                            <SelectItem value="1">Sandy</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="beach_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Beach working hours</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name="beach_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Beach description</FormLabel>
                <FormControl>
                  <Textarea placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className=" w-2/4 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <Subtitle>Images</Subtitle>
              <PlusCircle size={32} weight="fill" />
            </div>

            <div>
              <FormLabel>Beach images</FormLabel>
              <FileInput />
              <FileInput />
            </div>
          </div>

          <div>
            <div>
              <Subtitle>Featured info (up to 5 items)</Subtitle>
              <div className="flex flex-row justify-between gap-6">
                <FormField
                  control={form.control}
                  name="beach_name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Beach city</FormLabel>
                      <FormControl className="">
                        <Select value={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose beach city" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Beach cities</SelectLabel>

                              <SelectItem value="1">Dubrovnik</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="beach_name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Beach city</FormLabel>
                      <FormControl>
                        <Select value={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose beach city" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Beach cities</SelectLabel>

                              <SelectItem value="1">Dubrovnik</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="beach_name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Beach city</FormLabel>
                      <FormControl>
                        <Select value={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose beach city" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Beach cities</SelectLabel>

                              <SelectItem value="1">Dubrovnik</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="beach_name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Beach city</FormLabel>
                      <FormControl>
                        <Select value={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose beach city" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Beach cities</SelectLabel>

                              <SelectItem value="1">Dubrovnik</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="beach_name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Beach city</FormLabel>
                      <FormControl>
                        <Select value={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose beach city" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Beach cities</SelectLabel>

                              <SelectItem value="1">Dubrovnik</SelectItem>
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
          </div>

          <div>
            <Subtitle className="mb-6">Characteristics</Subtitle>
            <Characteristics />
          </div>
          <BeachTips />
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
