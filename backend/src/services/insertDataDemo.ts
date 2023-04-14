import { Connection, MysqlError, Pool, PoolConnection } from "mysql";
import { dbAdmin, dbClasses, dbLogin, dbPersons, dbProfession, dbRoles, dbSections, dbSemesters, dbShifts } from "../types";

export const createDataDemo = (conn:Pool):void =>{

    let connection:PoolConnection;

    const actionQuery = (datas:any[], table:string ) => {
        datas.forEach(data => {
            connection.query(`INSERT INTO ${table} set ?`, data, (err,result)=>{
                const msg:string = err ? 
                    `Error al ingresar el valor: "${data.names || data.IdPersons}" en la Tabla: "${table}"` : 
                    `Registro: "${data.names || data.IdPersons}" agregado a la Tabla "${table}"`;
                console.log(msg);
            });
        });
    }

    const precargaSemesters = () => {
        const data: dbSemesters[] = [
            {names:'PRIMER SEMESTRE'},
            {names:'SEGUNDO SEMESTRE'},
            {names:'TERCER SEMESTRE'},
            {names:'CUARTO SEMESTRE'},
            {names:'QUINTO SEMESTRE'},
            {names:'SEXTO SEMESTRE'},
            {names:'SÉPTIMO SEMESTRE'},
            {names:'OCTAVO SEMESTRE'},
            {names:'NOVENO SEMESTRE'},
            {names:'DÉCIMO SEMESTRE'}
        ];
        actionQuery(data,'semesters');
    }

    const precargaShifts = () => {
        const data:dbShifts[] = [
            {names:'MAÑANA'},
            {names:'TARDE'},
            {names:'NOCHE'}
        ];
        actionQuery(data,'shifts');
    }

    const precargaRoles = () => {
        const data:dbRoles[] = [
            {names:'Administrador'},
            {names:'Profesor'},
            {names:'Estudiante'},
            {names:'Egresado'}
        ];
        actionQuery(data,'roles');
    }

    const precargaClasses = () => {
        const data:dbClasses[] = [
            {names:'Geometría Plana y Trigonometría'},{names:'Matemática Básica'},{names:'Introducción a la Informática'},{names:'Comprensión y Producción de Textos'},{names:'Identidad, Liderazgo y Compromiso I'},
            {names:'Cálculo I '},{names:'Lógica Computacional '},{names:'Algoritmos y Programación I '},{names:'Identidad, Liderazgo y Compromiso II'},{names:'Cálculo II'},
            {names:'Física General'},{names:'Matemáticas Discretas'},{names:'Algoritmos y Programación II'},{names:'Cálculo III'},{names:'Laboratorio de Física Eléctrica'},
            {names:'Física Eléctrica'},{names:'Estructura del Computador'},{names:'Algoritmos y Programación III'},{names:'Ecología, Ambiente y Sustentabilidad'},{names:'Cálculo IV'},
            {names:'Circuitos Electrónicos'},{names:'Sistemas de Operación'},{names:'Ingeniería del Software'},{names:'Interacción Humano Computador'},{names:'Cálculo Numérico'},
            {names:'Estadística y Probabilidades'},{names:'Arquitectura del Computador'},{names:'Redes de Computadores I'},{names:'Sistemas de Bases de Datos I'},{names:'Curso Servicio Comunitario'},
            {names:'Programación Lineal'},{names:'Redes de Computadores II'},{names:'Metodología del Software'},{names:'Sistemas de Bases de Datos II'},{names:'Contabilidad Financiera'},
            {names:'Inglés I'},{names:'Servicio Comunitario'},{names:'Investigación de Operaciones'},{names:'Redes de Computadores III'},{names:'Seminario de Trabajo de Grado'},
            {names:'Desarrollo de Software'},{names:'Ingeniería Económica'},{names:'Inglés II'},{names:'Seguridad Computacional'},{names:'Sistemas Distribuidos'},
            {names:'Innovación y Emprendimiento'},{names:'Electiva'},{names:'Inglés Técnico'},{names:'Pasantía'},{names:'Ética Profesional'},
            {names:'Evaluación de Sistemas Informáticos'},{names:'Gestión de Proyectos de Software'},{names:'Trabajo de Grado'}
        ];
        actionQuery(data,'classes');
    }

    const precargaPersons = () => {
        const data:dbPersons[] = [
            {names:'Leonardo Jenaro',lastNames:'Cuéllar Marquez',sex:'M',email:'LeonadoCuellar@email.com',phone:123456789,photo:null,role:1},
            {names:'Alma',lastNames:'Franco Capdevila',sex:'F',email:'AlmaFranco@email.com',phone:123456789,photo:null,role:1},
            {names:'Rafa Abraham',lastNames:'Cózar Zabaleta',sex:'M',email:'RafaCozar@email.com',phone:123456789,photo:null,role:2},
            {names:'Odalys',lastNames:'Madrigal Jimenez',sex:'F',email:'LeonadoCuellar@email.com',phone:123456789,photo:null,role:2},
            {names:'Ángel',lastNames:'Navas Méndez',sex:'M',email:'AngelNavas@email.com',phone:123456789,photo:null,role:3},
            {names:'Tatiana',lastNames:'Echeverría Gallo',sex:'F',email:'TatianaEcheverria@email.com',phone:123456789,photo:null,role:3},
        ];
        actionQuery(data,'persons');
    }

    const precargaProfession = () => {
        const data:dbProfession[] = [
            {names:'INGENIERÍA INFORMÁTICA'},
        ];
        actionQuery(data,'profession');
    }

    const precargaAdmin = () => {
        const data:dbAdmin[] = [
            {IdPersons:1},
            {IdPersons:2},
        ];
        actionQuery(data,'admin');
    }

    const precargaLogin = () => {
        const data:dbLogin[] = [
            {user:"LeonadoCuellar",pass:"1234",IdPersons:1},
            {user:"AlmaFranco",pass:"1234",IdPersons:2},
            {user:"RafaAbraham",pass:"1234",IdPersons:3},
            {user:"OdalysMadrigal",pass:"1234",IdPersons:4},
            {user:"AngelNavas",pass:"1234",IdPersons:5},
            {user:"TatianaEcheverría",pass:"1234",IdPersons:6},
        ];
        actionQuery(data,'login');
    }

    const precargaSections = () => {
        const data:dbSections[] = [
            {names:"A"},
            {names:"B"},
            {names:"C"}
        ]
        actionQuery(data,'sections');
    }

    conn.getConnection((MySqlErr:MysqlError,c:PoolConnection)=>{
        if(MySqlErr){
            console.log("Error al recuperar PoolConnection");
        }else{
            connection = c;
            connection.query('SELECT * FROM semesters LIMIT 1', (err,result)=>{
                if(result?.length === 0) precargaSemesters();
            });
        
            connection.query('SELECT * FROM shifts LIMIT 1', (err,result)=>{
                if(result?.length === 0) precargaShifts();
            });
            
            connection.query('SELECT * FROM roles LIMIT 1', (err,result)=>{
                if(result?.length === 0) precargaRoles();
            });
            
            connection.query('SELECT * FROM classes LIMIT 1', (err,result)=>{
                if(result?.length === 0) precargaClasses();
            });
            
            connection.query('SELECT * FROM persons LIMIT 1', (err,result)=>{
                if(result?.length === 0) precargaPersons();
            });    
            
            connection.query('SELECT * FROM profession LIMIT 1', (err,result)=>{
                if(result?.length === 0) precargaProfession();
            });
            
            connection.query('SELECT * FROM admin LIMIT 1', (err,result)=>{
                if(result?.length === 0) precargaAdmin();
            });
            
            connection.query('SELECT * FROM login LIMIT 1', (err,result)=>{
                if(result?.length === 0) precargaLogin();
            });
        
            connection.query('SELECT * FROM sections LIMIT 1', (err,result)=>{
                if(result?.length === 0) precargaSections();
            });
        }
        // connection.on('end', ()=> connection.release());
    });


    

}