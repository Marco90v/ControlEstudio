import { MysqlError, PoolConnection } from 'mysql';
import { conn } from './conect';

export const getClasses = () => {
    return new Promise((resolve, reject)=>{
        conn.getConnection((MySqlErr:MysqlError,connection:PoolConnection)=>{
            if(MySqlErr) reject(`Error al conectar a MySQL: ${MySqlErr}`);
            connection.query('SELECT * FROM classes', (QueryErr,result)=>{
                if(QueryErr) reject( `Error al recuperar Classes. getClasses(): ${QueryErr}`);
                if(result) resolve(result);
                connection.release();
            });
        });
    });
}

export const getSemesters = () => {
    return new Promise((resolve, reject)=>{
        conn.getConnection((MySqlErr:MysqlError,connection:PoolConnection)=>{
            if(MySqlErr) reject(`Error al conectar a MySQL: ${MySqlErr}`);
            connection.query('SELECT * FROM semesters', (QueryErr,result)=>{
                if(QueryErr) reject( `Error al recuperar Classes. getSemesters(): ${QueryErr}`);
                if(result) resolve(result);
                connection.release();
            });
        });
    })
}
