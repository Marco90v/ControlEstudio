import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Checkbox } from "@/components/ui/checkbox";

interface Props {
  name: string;
  label: string;
}

const Check = (props: Props) => {
  const { name, label} = props;
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex items-center space-x-2">
          <FormControl>
            <Checkbox
              id="isElective"
              checked={field.value}
              onCheckedChange={(checked) => field.onChange(checked)}
            />
          </FormControl>
          <FormLabel htmlFor={field.name}>{label}</FormLabel>
          {!form.formState.errors[name] && (
            <div className="h-5"></div>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default Check;