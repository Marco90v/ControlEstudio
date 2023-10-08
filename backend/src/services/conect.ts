// import mysql, { Connection, ConnectionConfig, Pool, PoolConfig, QueryOptions } from 'mysql2';
import mysql, { PoolOptions } from 'mysql2'
import { createTables } from './createTablas';
import { createDataDemo } from './insertDataDemo';

const config:PoolOptions = {
    host: 'localhost',
    user: 'admin',
    password: 'admin',
    port:3306,
    connectionLimit : 10,
    database: 'controlestudio'
}

// const conn:Pool = mysql.createPool(config);
const conn = mysql.createPool(config);

// console.log(conn.state);

// export const conectar = () =>{
//     conn.connect(err=>{
//         if(err){
//             console.log("Error al Conectar base de datos");
//             return;
//         }
//         console.log('se conecto a la base de datos');
//     });
// }

// export const desconectar = () => {
//     conn.end(err=>{
//         if(err){
//             console.log("Error al cerrar base de datos");
//             return;
//         }
//         console.log('base de datos desconectada');
//     });
// }


const InitialDB = (ini) => {
    // createTables(conn,ini); // <--crea tablas si no existen
    // createDataDemo(conn); // <--agrega datos a las tablas para usar como base de prueba
    ini(); // <-- si desea ejecutar el sistema sin verificar la existencia de las tablas ni crear registros, comente las 2 lineas anteriores y descomente esta.
}

// export {conectar,desconectar}
export { conn, InitialDB }