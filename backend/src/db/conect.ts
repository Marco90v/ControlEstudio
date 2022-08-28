import mysql, { Connection, ConnectionConfig, QueryOptions } from 'mysql';
import { createTables } from './createTablas';
import { createDataDemo } from './insertDataDemo';

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
    // createTables(conn); // <--crea tablas si no existen
    // createDataDemo(conn); // <--agrega datos a las tablas para usar como base de prueba
}

// export {conectar,desconectar}