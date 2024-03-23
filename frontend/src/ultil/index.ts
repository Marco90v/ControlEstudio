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
    return key !== "__typename" && key !== "id" && key !== "photo" && key !== "role" && key !== "sex"
}