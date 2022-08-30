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

