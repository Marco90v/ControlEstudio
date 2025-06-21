import { FormField } from "@/components/ui/form"
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useFormContext } from "react-hook-form"
import { Select, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Props {
  name: string
  label: string
  // available: Class[]
  placeholder?: string
  children: React.ReactNode
}

const SelectForm = (props: Props) => {
  const { name, label, placeholder='', children} = props;
  const formPensum = useFormContext();
  return (
    <FormField
      control={formPensum.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor={field.name}>{label}</FormLabel>
          <FormControl>
            <Select
              value={field.value}
              onValueChange={field.onChange}
            >
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {children}
              </SelectContent>
            </Select>
          </FormControl>
          {/* <FormDescription>
            This is your public display name.
          </FormDescription> */}
          {!formPensum.formState.errors[name] && (
            <div className="h-5"></div>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default SelectForm