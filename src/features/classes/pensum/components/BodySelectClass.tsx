import { SelectItem } from "@/components/ui/select"
import { mockClasses, mockPensum } from "@/data/mockData";

interface Props {
  selectedProfession: string
}

const BodySelectClass = ({selectedProfession}:Props) => {

  // const [selectedProfession, setSelectedProfession] = useState<string>('1');

  const professionPensum = mockPensum.filter(p => p.professionId === selectedProfession);

  const availableClasses = mockClasses.filter(cls => 
    !professionPensum.some(p => p.classId === cls.id)
  );

  return (
    <>
      {availableClasses.map((cls) => (
        <SelectItem key={cls.id} value={cls.id}>
          {cls.code} - {cls.name} ({cls.credits} credits)
        </SelectItem>
      ))}
    </>
  )
}

export default BodySelectClass