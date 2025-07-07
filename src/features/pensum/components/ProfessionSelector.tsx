import { Card, CardContent } from "@/components/ui/card"
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useFormContext } from "react-hook-form";
import SelectProfessions from "@/components/common/SelectProfessions";


const ProfessionSelector = () => {

  const formPensum = useFormContext();
  
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center space-x-4">
          <FormField
            control={formPensum.control}
            name="IdProfession"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-4">
                <Label htmlFor={field.name}>Select Profession:</Label>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectProfessions />
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default ProfessionSelector