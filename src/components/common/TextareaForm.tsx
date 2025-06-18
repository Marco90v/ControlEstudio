import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Textarea } from "../ui/textarea";

type Props = {
  name: string;
  label: string;
  rows?: number;
};

const TextareaForm = (props: Props) => {
  const { name, label, rows=0 } = props;
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