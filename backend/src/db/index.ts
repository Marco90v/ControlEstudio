import { MysqlError, PoolConnection } from 'mysql';
import { conn } from './conect';

// La siguiente funcion, tranforma un arreglo de objesto en matriz.
// Ejemplo [ { "valor1":1, "valor2":2 } , {"valor1":3, "valor2":4} ]  ->  [ [1,2] , [3,4] ]
const transformData = (datas:[]):Array<number[]> => {
    return datas.map(data => {
        return Object.keys(data).map(key=>data[key]);
    });
}

export const getAll = (table:string) => {
    return new Promise((resolve, reject)=>{
        conn.getConnection((MySqlErr:MysqlError,connection:PoolConnection)=>{
            if(MySqlErr) reject(`Error al conectar a MySQL: ${MySqlErr}`);
            connection.query(`SELECT * FROM ${table}`, (QueryErr,result)=>{
                if(QueryErr) reject( `Error en consulta a tabla ${table}: ${QueryErr}`);
                if(result) resolve(result);
                connection.release();
            });
        });
    });
}

export const insertSingle = (table,data) => {
    return new Promise((resolve, reject)=>{
        conn.getConnection((MySqlErr:MysqlError,connection:PoolConnection)=>{
            if(MySqlErr) reject(`Error al conectar a MySQL: ${MySqlErr}`);
            connection.query(`INSERT INTO ${table} set ?`, data, (QueryErr,result)=>{
                if(QueryErr) reject( `Error en consulta a tabla ${table}: ${QueryErr}`);
                if(result) resolve(true);
                connection.release();
            });
        });
    });
}

export const insertMultiple = (table:string,datas:[]) => {
    return new Promise((resolve, reject)=>{
        conn.getConnection((MySqlErr:MysqlError,connection:PoolConnection)=>{
            if(MySqlErr) reject(`Error al conectar a MySQL: ${MySqlErr}`);
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
        conn.getConnection((MysqlErr:MysqlError, connection:PoolConnection)=>{
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
            });
        });
    })
}

type detailStudents = {
    IdStudent: number,
    names: string,
    lastNames: string,
    sex: string,
    email: string,
    phone: number,
    profession: string,
    semester: string
}

type allStudents = {
    totalStudents: number,
    currentPage: number,
    totalPages: number,
    students: detailStudents[]
}

export const getAllStudents = (page:number=0) => {
    return new Promise((resolve,reject)=>{
        conn.getConnection((MysqlErr:MysqlError,connection:PoolConnection)=>{
            const query = 'SELECT COUNT(*) as "totalStudents" FROM students;';
            connection.query(query,(queryErr,result)=>{
                if(queryErr) reject( `Error en consulta Pensum: ${queryErr}`);
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
                    if(queryErr) reject( `Error en consulta Pensum: ${queryErr}`);
                    data = {
                        ...data,
                        students: result
                    }
                    if(result) resolve(data);
                });
            })
        });
    });
}