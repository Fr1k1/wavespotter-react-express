import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
} from "@/components/ui/select";
import { FieldValues, Path, useForm } from "react-hook-form";

interface Option {
  id: string | number;
  name: string;
}

interface SelectFieldCustomProps<T extends FieldValues> {
  form: ReturnType<typeof useForm<T>>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  options: Option[];
  onValueChange?: (value: string | number) => void;
}

const SelectFieldCustom = <T extends FieldValues>({
  form,
  name,
  label,
  placeholder = "Choose an option",
  options,
  onValueChange,
}: SelectFieldCustomProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Select
              value={field.value}
              onValueChange={(value) => {
                field.onChange(value);
                onValueChange?.(value); // optional callback
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder={placeholder}>
                  {options.find((option) => option.id == field.value)?.name ||
                    placeholder}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>{label}</SelectLabel>
                  {options.map((option) => (
                    <SelectItem key={option.id} value={option.id.toString()}>
                      {option.name}
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
  );
};

export default SelectFieldCustom;
