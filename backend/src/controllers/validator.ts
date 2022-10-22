import { dbAdmin, dbClasses, dbId, dbPensum, dbPersons, dbProfession, dbRoles, dbSections, dbSemesters, dbShifts, dbStudensts, dbTeachers } from "../types";

const id = (object:any):dbId | false => {
    return 'id' in object && typeof(object.id) === 'number' ?
        {id:object.id} :
        false;
}

const classes = (object: any):dbClasses | false => {
    return 'names' in object && typeof(object.names) === 'string' ?
        {names:object.names} : 
        false;
}

const semesters = (object:any):dbSemesters | false => {
    return 'names' in object && typeof(object.names) === 'string' ?
        {names:object.names} : 
        false;
}

const profession = (object:any):dbProfession | false => {
    return 'names' in object && typeof(object.names) === 'string' ?
        {names:object.names} : 
        false;
}

const shifts = (object:any):dbShifts | false => {
    return 'names' in object && typeof(object.names) === 'string' ?
        {names:object.names} : 
        false;
}

const sections = (object:any):dbSections | false => {
    return 'names' in object && typeof(object.names) === 'string' ?
        {names:object.names} : 
        false;
}

const roles = (object:any):dbRoles | false => {
    return 'names' in object && typeof(object.names) === 'string' ?
        {names:object.names} : 
        false;
}

// Las funciones anteriores se pueden sinplificar en una sola, por el momento quedaran separas en dado caso que la estructura cambie durante el desarrollo.

const admin = (object:any):dbAdmin | false => {
    return 'IdPersons' in object 
        && typeof(object.names) === 'number' ?
        {
            IdPersons:object.IdPersons
        } : 
        false;
}

const persons = (object:any):dbPersons | false => {
    return 'names' && 'lastNames' && 'sex' && 'email' && 'phone' && 'photo' && 'role' in object 
        && typeof(object.names) === 'string'
        && typeof(object.lastNames) === 'string'
        && typeof(object.sex) === 'string'
        && typeof(object.email) === 'string'
        && typeof(object.phone) === 'number'
        && typeof(object.photo) === 'string'
        && typeof(object.role) === 'number' ?
        {
            names:object.names,
            lastNames:object.lastNames,
            sex:object.sex,
            email:object.email,
            phone:object.phone,
            photo:object.photo,
            role:object.role
        } : 
        false;
}

const teachers = (object:any):dbTeachers | false => {
    return 'IdPersons' && 'IdProfession' && 'IdSemesters' && 'IdClasses' && 'IdShifts' && 'IdSections' in object 
        && typeof(object.IdPersons) === 'number'
        && typeof(object.IdProfession) === 'number'
        && typeof(object.IdSemesters) === 'number'
        && typeof(object.IdClasses) === 'number'
        && typeof(object.IdShifts) === 'number'
        && typeof(object.IdSections) === 'number' ?
        {
            IdPersons:object.IdPersons,
            IdProfession:object.IdProfession,
            IdSemesters:object.IdSemesters,
            IdClasses:object.IdClasses,
            IdShifts:object.IdShifts,
            IdSections:object.IdSections
        } : 
        false;
}

const students = (object:any):dbStudensts | false => {
    return 'IdPersons' && 'IdProfession' && 'IdSemesters' in object 
        && typeof(object.IdPersons) === 'number'
        && typeof(object.IdProfession) === 'number'
        && typeof(object.IdSemesters) === 'number' ?
        {
            IdPersons:object.IdPersons,
            IdProfession:object.IdProfession,
            IdSemesters:object.IdSemesters
        } : 
        false;
}

const pensum = (objects:any):dbPensum[] | false => {
    let newData:dbPensum[] = [];
    for (const key in objects) {
        if('IdProfession' && 'IdSemesters' && 'IdClasses' in objects[key]
        && typeof(objects[key].IdProfession) === 'number'
        && typeof(objects[key].IdSemesters) === 'number'
        && typeof(objects[key].IdClasses) === 'number') {
            newData.push({
                IdProfession:objects[key].IdProfession,
                IdSemesters:objects[key].IdSemesters,
                IdClasses:objects[key].IdClasses
            })
        }else{
            return false;
        }
    }
    // console.log(newData)
    return newData;
}

export const validator = {
    id,
    classes,
    semesters,
    profession,
    shifts,
    sections,
    roles,
    persons,
    teachers,
    students,
    admin,
    pensum
}