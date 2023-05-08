function fieldNotEmptied<T> (object:T):boolean {
    let r:boolean = true;
    for (const key in object) {
        if(object[key] === 0 || object[key] === ""){
            r=false;
            break;
        }
    }
    return r;
}

export { fieldNotEmptied }