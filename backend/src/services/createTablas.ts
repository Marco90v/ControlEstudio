import { Connection } from "mysql";

export const createTables = (conn:Connection):void => {
    conn.connect(err=>{
        if (err) {
            console.log('Error al conectar', err);
            return;
        }
    });

    const actionQuery = (query:string,table:string) => {
        conn.query(query,(err)=>{
            const msg:string = err ? 
                `Error con crear Table "${table}"` :
                `Tabla "${table}" creada con exito`;
            console.log(msg);
        });
    }

    const createPersons = () => {
        const query:string = 'CREATE TABLE IF NOT EXISTS persons \
            (id int NOT NULL AUTO_INCREMENT PRIMARY KEY , \
            names varchar(50) NOT NULL , \
            lastNames varchar(50) NOT NULL , \
            sex char(1) NOT NULL , \
            email varchar(50) NOT NULL , \
            phone int(15) NOT NULL , \
            photo varchar(100) , \
        role int(1) NOT NULL)';
        actionQuery(query,'persons');
    }

    const createClasses = () => {
        const query:string = 'CREATE TABLE IF NOT EXISTS classes \
            (id int NOT NULL AUTO_INCREMENT PRIMARY KEY , \
            names varchar(50) NOT NULL)';
        actionQuery(query,'classes');
    }

    const createProfession = () => {
        const query:string = 'CREATE TABLE IF NOT EXISTS profession \
            (id int NOT NULL AUTO_INCREMENT PRIMARY KEY , \
            names varchar(50) NOT NULL)';
        actionQuery(query,'profession');
    }

    const createSemesters = () => {
        const query:string = 'CREATE TABLE IF NOT EXISTS semesters \
            (id int NOT NULL AUTO_INCREMENT PRIMARY KEY , \
            names varchar(50) NOT NULL)';
        actionQuery(query,'semesters');
    }

    const createPensum = () => {
        const query:string = 'CREATE TABLE IF NOT EXISTS pensum \
            (id int NOT NULL AUTO_INCREMENT PRIMARY KEY , \
            IdProfession int(5) NOT NULL , \
            IdSemesters int(5) NOT NULL , \
            IdClasses int(5) NOT NULL) ';
        actionQuery(query,'pensum');
    }

    const createShifts = () => {
        const query:string = 'CREATE TABLE IF NOT EXISTS shifts \
            (id int NOT NULL AUTO_INCREMENT PRIMARY KEY , \
            names varchar(50) NOT NULL)';
        actionQuery(query,'shifts');
    }

    const createSections = () => {
        const query:string = 'CREATE TABLE IF NOT EXISTS sections \
            (id int NOT NULL AUTO_INCREMENT PRIMARY KEY , \
            names varchar(50) NOT NULL)';
        actionQuery(query,'sections');
    }

    const createRoles = () => {
        const query:string = 'CREATE TABLE IF NOT EXISTS roles \
            (id int NOT NULL AUTO_INCREMENT PRIMARY KEY , \
            names varchar(50) NOT NULL)';
        actionQuery(query,'roles');
    }

    const createTeachers = () => {
        const query:string = 'CREATE TABLE IF NOT EXISTS teachers \
            (id int NOT NULL AUTO_INCREMENT PRIMARY KEY , \
            IdPersons int(5) NOT NULL , \
            IdProfession int(5) NOT NULL , \
            IdSemesters int(5) NOT NULL , \
            IdClasses int(5) NOT NULL , \
            IdShifts int(5) NOT NULL , \
            IdSections int(5) NOT NULL)';
        actionQuery(query,'teachers');
    }

    const createAdmin = () => {
        const query:string = 'CREATE TABLE IF NOT EXISTS admin \
            (id int NOT NULL AUTO_INCREMENT PRIMARY KEY , \
            IdPersons int(5) NOT NULL)';
        actionQuery(query,'admin');
    }

    const createStudents = () => {
        const query:string = 'CREATE TABLE IF NOT EXISTS students \
            (id int NOT NULL AUTO_INCREMENT PRIMARY KEY , \
            IdPersons int(5) NOT NULL , \
            IdProfession int(5) NOT NULL , \
            IdSemesters int(5) NOT NULL)';
        actionQuery(query,'students');
    }

    const createScores = () => {
        const query:string = 'CREATE TABLE IF NOT EXISTS scores \
            (id int NOT NULL AUTO_INCREMENT PRIMARY KEY , \
            IdStudents int(5) NOT NULL , \
            IdClasses int(5) NOT NULL , \
            IdTeachers int(5) NOT NULL , \
            IdShifts int(5) NOT NULL , \
            IdSections int(5) NOT NULL , \
            score int (2) NOT NULL)';
        actionQuery(query,'scores');
    }

    const createLogin = () => {
        const query:string = 'CREATE TABLE IF NOT EXISTS login \
            (id int NOT NULL AUTO_INCREMENT PRIMARY KEY , \
            user varchar(50) NOT NULL , \
            pass varchar(50) NOT NULL , \
            IdPersons int (5) NOT NULL)';
        actionQuery(query,'login');
    }

    conn.query('CREATE database IF NOT exists controlestudio',(err)=>{
        if (err) {
            console.log('Error al crear Base de datos "controlestudio"');
            return;
        }

        conn.query('USE controlestudio',(err,row)=>{
            const msg:string = err ? 'Error al seleccionar Base de Datos controlestudio' : 'Base de datos controlestudio seleccionada con Exito';
            console.log(msg);
        })

        createPersons();
        createClasses();        
        createProfession();        
        createSemesters();
        createPensum();        
        createShifts();        
        createSections();        
        createRoles();
        createTeachers();
        createAdmin();
        createStudents();
        createScores();       
        createLogin();

    });

}