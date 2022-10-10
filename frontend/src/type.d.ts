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
type classeStore = {
    status:string,
    data: classe[]
}
type professionStore = {
    status:string,
    data: profession[]
}
type store = {
    sidebar: visibleSide,
    classes: classeStore,
    profession: professionStore
}