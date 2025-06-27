import { Card, CardContent } from "@/components/ui/card"
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockProfessions } from '@/data/mockData';
import { useFormContext } from "react-hook-form";


const ProfessionSelector = () => {
  const formPensum = useFormContext();
  
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center space-x-4">
          <FormField
            control={formPensum.control}
            name="professionId"
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
                      {mockProfessions.map((profession) => (
                        <SelectItem key={profession.id} value={profession.id}>
                          {profession.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />

          {/* <SelectForm name='professionId' label='Profession' placeholder="Select a profession">
            {mockProfessions.map((profession) => (
              <SelectItem key={profession.id} value={profession.id}>
                {profession.name}
              </SelectItem>
            ))}
          </SelectForm> */}
        </div>
      </CardContent>
    </Card>
  )
}

export default ProfessionSelector