import { TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Props {
  semesterData: {
    semester: number;
    classes: {
        class: {
            code: string;
            id: string;
            name: string;
            credits: number;
            description?: string | undefined;
        };
        semester: number;
        id: string;
        professionId: string;
        classId: string;
        isElective: boolean;
    }[];
  }[];
}

const TabsSemeter = ({semesterData}: Props) => {
  return (
    <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
      {semesterData.map((sem) => (
        <TabsTrigger key={sem.semester} value={sem.semester.toString()}>
          Sem {sem.semester}
        </TabsTrigger>
      ))}
    </TabsList>
  );
};

export default TabsSemeter;