import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  name: string;
  label: string;
  placeholder?: string;
  rows?: number;
};

const TextareaForm = (props: Props) => {
  const { name, label, placeholder="", rows=0 } = props;
  const formClass = useFormContext();
  return (
    <FormField
      control={formClass.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor={field.name}>{label}</FormLabel>
          <FormControl>
            <Textarea
              {...field}
              rows={rows}
              placeholder={placeholder}
            />
          </FormControl>
          {!formClass.formState.errors[name] && (
            <div className="h-5"></div>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TextareaForm;