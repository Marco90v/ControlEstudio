import { MysqlError, PoolConnection } from 'mysql';
import { conn } from './conect';

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

export const insert = (table,data) => {
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
