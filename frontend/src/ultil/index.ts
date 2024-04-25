interface pensumNotFormat {
    id: number
    IdSemesters: number
    Name_Semesters: string
    IdClasses: number
    Name_Classes: string
}

interface classesFormat {
    id: number
    IdClasses: number
    Name_Classes: string
}

interface pensumFormat {
    IdSemesters: number
    Name_Semesters: string
    Classes: classesFormat[]
}

export function fieldNotEmptied<T> (object:T):boolean {
    let r:boolean = true;
    for (const key in object) {
        if(object[key] === 0 || object[key] === ""){
            r=false;
            break;
        }
    }
    return r;
}

export function filter__typename<T>(data:any):T{
    const {__typename, ...rest} = data
    return rest
}

export function filterKeyColumn(key:any){
    return key !== "__typename" && key !== "id" && key !== "photo" && key !== "role" && key !== "sex" && key !== "nameRole" && key !== "userUID"
}

export function transfomDataPemsun(data:pensumNotFormat[]){
    const pensumFormat:pensumFormat[] = []
    const temp: number[] = []
    data.forEach((value: pensumNotFormat) => {
        const index = temp.indexOf(value.IdSemesters)
        if (index < 0) {
            pensumFormat.push({
            IdSemesters: value.IdSemesters,
            Name_Semesters: value.Name_Semesters,
            Classes: [
            {
                id: value.id,
                IdClasses: value.IdClasses,
                Name_Classes: value.Name_Classes
            }
            ]
        })
        temp.push(value.IdSemesters)
        } else {
            pensumFormat[index].Classes.push({
            id: value.id,
            IdClasses: value.IdClasses,
            Name_Classes: value.Name_Classes
        })
        }
    })
    return pensumFormat
}