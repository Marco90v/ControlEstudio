import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { filterClassSchema } from "@/features/classes/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import type { FilterClass } from "@/types";
import { useEffect } from "react";

interface Props {
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
}

const initinalValues: FilterClass = {
  search: '',
};

const Filter = ({setSearchTerm}: Props) => {
  const {register, watch} = useForm<FilterClass>({
    resolver: zodResolver(filterClassSchema),
    defaultValues: initinalValues,
  });

  const search = watch('search');

  useEffect(() => {
    if (search) setSearchTerm(search);
  
    return () => {}
  }, [search, setSearchTerm])
  

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search classes by name or code..."
            className="pl-10"
            {...register('search')}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default Filter;