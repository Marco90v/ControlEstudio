import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import useProfessions from "@/store/useProfessions";
import { useShallow } from "zustand/react/shallow";

interface Props {
  IdProfession: string;
}

const TabsSemeter = ({IdProfession}: Props) => {

  const { professions } = useProfessions(useShallow((state=>({ 
    professions: state.professions,
  }))));

  const semesters = professions.find(p => p.id === IdProfession)?.totalSemesters || 0;

  return (
    <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
      {
        Array.from({ length: semesters }, (_, i) => {
          return (
            <TabsTrigger key={i} value={(1+i).toString()}>
              Sem {i + 1}
            </TabsTrigger>
          );
        })
      }
    </TabsList>
  );
};

export default TabsSemeter;