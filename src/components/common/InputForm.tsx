import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type Props = {
  name: string;
  label: string;
  type?: 'text' | 'number' | 'url' | 'email' | 'password';
  min?: number;
  max?: number;
  disabled?: boolean;
  placeholder?: string;
};

const InputForm = (props: Props) => {
  const { name, label, type='text', min, max, ...other } = props;
  const formClass = useFormContext();
  return (
    <FormField
      control={formClass.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor={field.name}>{label}</FormLabel>
          <FormControl>
            <Input
              {...field}
              type={type}
              min={min}
              max={max}
              {...other}
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

export default InputForm;