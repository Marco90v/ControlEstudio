import mysql, { Connection, ConnectionConfig, QueryOptions } from 'mysql';
import { createTables } from './createTablas';

const config:ConnectionConfig = {
    host: 'localhost',
    user: 'admin',
    password: 'admin',
    // database: 'controlestudio'
}

const conn:Connection = mysql.createConnection(config);

export const conectar = () =>{
    conn.connect(err=>{
        if(err){
            console.log("Error al Conectar base de datos");
            return;
        }
        console.log('se conecto a la base de datos');
    });
}

export const desconectar = () => {
    conn.end(err=>{
        if(err){
            console.log("Error al cerrar base de datos");
            return;
        }
        console.log('base de datos desconectada');
    });
}


export const InitialDB = () => {
    createTables(conn);
}

// export {conectar,desconectar}