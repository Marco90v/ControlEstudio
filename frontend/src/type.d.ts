type visibleSide = {
    status:boolean
  }
type classe = {
    id:number,
    names:string
}
type profession = {
    id:number,
    names:string
}
type pensum = {
    IdSemesters: number,
    Name_Semesters: string,
    Classes: classes[]
}
type semesters = {
    id:number,
    names:string
}

type classeStore = {
    status:string,
    selctClasses:number,
    data: classe[]
}
type professionStore = {
    status:string,
    data: profession[]
}
type pensumStore = {
    status:string,
    selectPensum:number,
    data: pensum[]
}
type semestersStore = {
    status:string,
    selectSemester:number
    data:semesters[]
}

type store = {
    sidebar: visibleSide,
    classes: classeStore,
    profession: professionStore,
    pensum: pensumStore,
    semesters: semestersStore
}