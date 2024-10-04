import Subtitle from "@/components/ui/Subtitle";
import Title from "@/components/ui/Title";
import { Info, MapPin } from "@phosphor-icons/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Rating } from "react-simple-star-rating";

const AddBeachReview = () => {
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      beach_name: "",
      beach_address: "",
    },
  });
  return (
    <div className="flex flex-col gap-4">
      <Title className="">Beach Zlatni rat</Title>
      <div className="flex items-center bg-primary-800 rounded-lg px-4 py-2 w-fit">
        <MapPin weight="duotone" className="mr-2" size={32} color="white" />
        <div className="text-white">
          <p>Brač, Croatia</p>
          <p className="text-xs">24120, Bol</p>
        </div>
      </div>
      <Subtitle>Review</Subtitle>
      <div className="flex items-center gap-3">
        <Info size={16} color="#0E7490" />
        <p>Your name will be shown with the review and everyone can see it</p>
      </div>

      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="beach_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title (max 20 characters) </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter title..." {...field} />
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
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="shadcn" {...field} />
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
                  <div className="flex flex-col gap-2">
                    <FormLabel>Leave rating</FormLabel>
                    <FormControl>
                      <Rating size={40} transition allowFraction {...field} />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end ">
              <Button type="submit" className="px-24 mb-6">
                Add review
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddBeachReview;
