import { MysqlError, PoolConnection } from 'mysql';
import { transformData } from '../transform';
import { allStudents } from '../types';
import { conn } from './conect';


export const getAllAdmin = () => {
    return new Promise((resolve,reject) => {
        conn.getConnection((MySqlErr:MysqlError, connection:PoolConnection) => {
            if(MySqlErr){
                reject(`Error al conectar a MySQL: ${MySqlErr}`);
                return;
            }
            connection.query('SELECT \
                admin.id AS "IdAdmin", \
                admin.IdPersons AS "IdPerson", \
                persons.names, \
                persons.lastNames, \
                persons.sex, \
                persons.email, \
                persons.phone, \
                persons.photo \
                FROM admin \
                INNER JOIN persons ON persons.id = admin.IdPersons;', (QueryErr,result)=>{
                if(QueryErr) reject( `Error en consulta Admin: ${QueryErr}`);
                if(result) resolve(result);
                connection.release();
            });
        });
    });
}


export const getAll = (table:string) => {
    return new Promise((resolve, reject)=>{
        conn.getConnection((MySqlErr:MysqlError,connection:PoolConnection)=>{
            if(MySqlErr){
                reject(`Error al conectar a MySQL: ${MySqlErr}`);
                return;
            }
            connection.query(`SELECT * FROM ${table}`, (QueryErr,result)=>{
                if(QueryErr) reject( `Error en consulta a tabla ${table}: ${QueryErr}`);
                if(result) resolve(result);
                connection.release();
            });
        });
    });
}

export const getPerson = (id:number) => {
    return new Promise((resolve, reject)=>{
        conn.getConnection((MySqlErr:MysqlError,connection:PoolConnection)=>{
            if(MySqlErr){
                reject(`Error al conectar a MySQL: ${MySqlErr}`);
                return;
            }
            connection.query(`SELECT * FROM persons WHERE id = ?`, id, (QueryErr,result)=>{
                if(QueryErr) reject( `Error en consulta a tabla Persons: ${QueryErr}`);
                if(result) resolve(result);
                connection.release();
            });
        });
    });
}


export const insertSingle = (table,data) => {
    return new Promise((resolve, reject)=>{
        conn.getConnection((MySqlErr:MysqlError,connection:PoolConnection)=>{
            if(MySqlErr){
                reject(`Error al conectar a MySQL: ${MySqlErr}`);
                return;
            }
            connection.query(`INSERT INTO ${table} set ?`, data, (QueryErr,result)=>{
                if(QueryErr) reject( `Error en consulta a tabla ${table}: ${QueryErr}`);
                if(result) resolve(result);
                connection.release();
            });
        });
    });
}

export const insertMultiple = (table:string,datas:[]) => {
    return new Promise((resolve, reject)=>{
        conn.getConnection((MySqlErr:MysqlError,connection:PoolConnection)=>{
            if(MySqlErr){
                reject(`Error al conectar a MySQL: ${MySqlErr}`);
                return;
            }
            const newData = transformData(datas);
            connection.query(`INSERT INTO ${table} (IdProfession,IdSemesters,IdClasses) VALUES ?`, [newData],(QueryErr,result)=>{
                if(QueryErr) reject( `Error en consulta a tabla ${table}: ${QueryErr}`);
                if(result) resolve(true);
                connection.release();
            });
        });
    });
}

export const getPensum = (id:number) => {
    return new Promise((resolve, reject)=>{
        conn.getConnection((MySqlErr:MysqlError, connection:PoolConnection)=>{
            if(MySqlErr){
                reject(`Error al conectar a MySQL: ${MySqlErr}`);
                return;
            }
            const query = 'SELECT semesters.id AS "IdSemesters", \
                semesters.names AS "Name_Semesters", \
                classes.id AS "IdClasses", \
                classes.names AS "Name_Classes" \
                FROM classes \
                INNER JOIN pensum ON classes.id = pensum.IdClasses \
                INNER JOIN semesters ON pensum.IdSemesters = semesters.id \
                WHERE pensum.IdProfession = ?';
            connection.query(query, id, (queryErr,result)=>{
                if(queryErr) reject( `Error en consulta Pensum: ${queryErr}`);
                if(result) resolve(result);
                connection.release();
            });
        });
    })
}

export const getAllStudents = (page:number=0) => {
    return new Promise((resolve,reject)=>{
        conn.getConnection((MySqlErr:MysqlError,connection:PoolConnection)=>{
            if(MySqlErr){
                reject(`Error al conectar a MySQL: ${MySqlErr}`);
                return;
            }
            const query = 'SELECT COUNT(*) as "totalStudents" FROM students;';
            connection.query(query,(queryErr,result)=>{
                if(queryErr){
                    reject( `Error en consulta paginacion Students: ${queryErr}`);
                    connection.release();
                    return;
                }
                const totalStudents = result[0].totalStudents;
                let data:allStudents = {
                    totalStudents,
                    currentPage: page,
                    totalPages: Math.ceil(totalStudents / 20),
                    students:[]
                }

                const query = 'SELECT students.id AS "IdStudent", \
                    persons.names, \
                    persons.lastNames, \
                    persons.sex, \
                    persons.email, \
                    persons.phone, \
                    profession.names  AS "profession", \
                    semesters.names AS "semester" \
                    FROM students \
                    INNER JOIN persons ON students.IdPersons = persons.id \
                    INNER JOIN profession ON students.IdProfession = profession.id \
                    INNER JOIN semesters ON students.IdSemesters = semesters.id \
                    LIMIT ?,20;';
                connection.query(query, page, (queryErr,result)=>{
                    if(queryErr){
                        reject( `Error en consulta detallada Students: ${queryErr}`);
                        connection.release();
                        return;
                    }
                    data = {
                        ...data,
                        students: result
                    }
                    if(result){
                        resolve(data);
                        connection.release();
                    }
                });
            })
        });
    });
}

export const getStudent = (id:number) => {
    return new Promise ((resolve, reject) => {
        conn.getConnection((MySqlErr:MysqlError,connection:PoolConnection) => {
            if(MySqlErr){
                reject(`Error al conectar a MySQL: ${MySqlErr}`);
                return;
            }
            const query = 'SELECT students.id AS "IdStudent", \
                    persons.names, \
                    persons.lastNames, \
                    persons.sex, \
                    persons.email, \
                    persons.phone, \
                    profession.names  AS "profession", \
                    semesters.names AS "semester" \
                    FROM students \
                    INNER JOIN persons ON students.IdPersons = persons.id \
                    INNER JOIN profession ON students.IdProfession = profession.id \
                    INNER JOIN semesters ON students.IdSemesters = semesters.id \
                    WHERE students.id = ?;';
                connection.query(query, id, (queryErr,result)=>{
                    if(queryErr){
                        reject( `Error en consulta detallada Students: ${queryErr}`);
                        connection.release();
                        return;
                    }
                    if(result){
                        resolve(result);
                        connection.release();
                    }
                });
        });
    });
}

export const getAllTeachers = (page:number=0) => {
    return new Promise ((resolve,reject)=>{
        conn.getConnection((MySqlErr:MysqlError,connection:PoolConnection)=>{
            if(MySqlErr){
                reject(`Error al conectar a MySQL: ${MySqlErr}`);
                return;
            }
            const query = 'SELECT \
                    teachers.IdPersons AS "idPerson", \
                    persons.names, \
                    persons.lastNames, \
                    persons.sex, \
                    persons.email, \
                    persons.phone, \
                    persons.photo, \
                    profession.id AS "idProfession", \
                    profession.names AS "profession", \
                    semesters.id AS "idSemester", \
                    semesters.names AS "semester", \
                    classes.id AS "idClasse", \
                    classes.names AS "classe", \
                    shifts.id AS "idShift", \
                    shifts.names AS "shift", \
                    sections.id AS "idSection", \
                    sections.names AS "section" \
                    FROM teachers \
                    INNER JOIN persons ON teachers.IdPersons = persons.id \
                    INNER JOIN profession ON teachers.IdProfession = profession.id \
                    INNER JOIN semesters ON teachers.IdSemesters = semesters.id \
                    INNER JOIN classes ON teachers.IdClasses = classes.id \
                    INNER JOIN shifts ON teachers.IdShifts = shifts.id \
                    INNER JOIN sections on teachers.IdSections = sections.id';
            connection.query(query, page, (queryErr,result)=>{
                if(queryErr){
                    reject( `Error en consulta detallada teachers: ${queryErr}`);
                    connection.release();
                    return;
                }
                if(result){
                    resolve(result);
                    connection.release();
                }
            });
        });
    });
}

export const getTeacher = (id:number) => {
    return new Promise ((resolve,reject)=>{
        conn.getConnection((MySqlErr:MysqlError,connection:PoolConnection)=>{
            if(MySqlErr){
                reject(`Error al conectar a MySQL: ${MySqlErr}`);
                return;
            }
            const query = 'SELECT \
                    teachers.IdPersons AS "idPerson", \
                    persons.names, \
                    persons.lastNames, \
                    persons.sex, \
                    persons.email, \
                    persons.phone, \
                    persons.photo, \
                    profession.id AS "idProfession", \
                    profession.names AS "profession", \
                    semesters.id AS "idSemester", \
                    semesters.names AS "semester", \
                    classes.id AS "idClasse", \
                    classes.names AS "classe", \
                    shifts.id AS "idShift", \
                    shifts.names AS "shift", \
                    sections.id AS "idSection", \
                    sections.names AS "section" \
                    FROM teachers \
                    INNER JOIN persons ON teachers.IdPersons = persons.id \
                    INNER JOIN profession ON teachers.IdProfession = profession.id \
                    INNER JOIN semesters ON teachers.IdSemesters = semesters.id \
                    INNER JOIN classes ON teachers.IdClasses = classes.id \
                    INNER JOIN shifts ON teachers.IdShifts = shifts.id \
                    INNER JOIN sections on teachers.IdSections = sections.id \
                    WHERE teachers.IdPersons = ? ';
            connection.query(query, id, (queryErr,result)=>{
                if(queryErr){
                    reject( `Error en consulta detallada teachers: ${queryErr}`);
                    connection.release();
                    return;
                }
                if(result){
                    resolve(result);
                    connection.release();
                }
            });
        });
    });
}