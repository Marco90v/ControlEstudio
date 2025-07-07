import { Card, CardContent } from "@/components/ui/card"
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useFormContext } from "react-hook-form";
import { useLoadProfessions } from "@/hooks/useLoadProfessions";
// import { getAllProfessions } from "@/services/supabase";
import useProfessions from "@/store/useProfessions";
// import { useEffect } from "react";
// import { mockProfessions } from '@/data/mockData';
import { useShallow } from "zustand/react/shallow";


const ProfessionSelector = () => {
  const { professions } = useProfessions(useShallow((state=>({
    professions: state.professions,
  }))));

  // useEffect(() => {
  //   if(professions.length === 0){
  //     getAllProfessions().then((data)=>{
  //       if(data){
  //         setProfessions(data);
  //       }
  //     });
  //   }
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
   useLoadProfessions();

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
                      {
                        professions.map((profession) => (
                          <SelectItem key={profession.id} value={profession.id}>
                            {profession.names}
                          </SelectItem>
                        ))
                      }
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