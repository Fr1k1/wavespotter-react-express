import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./input";
import { useForm, FieldValues, Path } from "react-hook-form";

interface FormFieldCustomProps<T extends FieldValues> {
  form: ReturnType<typeof useForm<T>>;
  name: Path<T>; //for type safety
  label: string;
  placeholder?: string;
}

const FormFieldCustom = <T extends FieldValues>({
  form,
  name,
  label,
  placeholder = "",
}: FormFieldCustomProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormFieldCustom;
