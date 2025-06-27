import { SelectItem } from "@/components/ui/select"
import { mockProfessions } from "@/data/mockData";

interface Props {
  selectedProfession: string
}

const BodySelectProfession = ({selectedProfession}:Props) => {

  const selectedProfessionData = mockProfessions.find(p => p.id === selectedProfession);
  
  return (
    <>
      {Array.from({ length: selectedProfessionData?.totalSemesters || 8 }, (_, i) => (
        <SelectItem key={i + 1} value={(i + 1).toString()}>
          Semester {i + 1}
        </SelectItem>
      ))}
    </>
  )
}

export default BodySelectProfession