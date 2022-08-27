import { Connection } from "mysql";

export const createTables = (conn:Connection) => {
    conn.connect(err=>{
        if (err) {
            console.log('Error al conectar', err);
            return;
        }
    });
    conn.query('CREATE database IF NOT exists controlestudio',(err)=>{
        let query:string;
        if (err) {
            console.log('Error al crear Base de datos "controlestudio"');
            return;
        }

        query = 'USE controlestudio';
        conn.query(query,(err,row)=>{
            const msg = err ? 'Error al seleccionar Base de Datos controlestudio' : 'Base de datos controlestudio seleccionada con Exito';
            console.log(msg);
        })

        query = 'CREATE TABLE IF NOT EXISTS persons \
            (id int NOT NULL AUTO_INCREMENT PRIMARY KEY , \
            names varchar(50) NOT NULL , \
            lastNames varchar(50) NOT NULL , \
            sex char(1) NOT NULL , \
            email varchar(50) NOT NULL , \
            phone int(15) NOT NULL , \
            photo varchar(100) NOT NULL , \
            role int(1) NOT NULL)';
        conn.query(query,(err)=>{
            const msg = err ? 'Error con crear Table "persons"' : 'Tabla "persons" creada con exito';
            console.log(msg);
        });

        query = 'CREATE TABLE IF NOT EXISTS classes \
            (id int NOT NULL AUTO_INCREMENT PRIMARY KEY , \
            names varchar(50) NOT NULL)';
        conn.query(query,(err)=>{
            const msg = err ? 'Error con crear Table "classes"' : 'Tabla "classes" creada con exito';
            console.log(msg);
        });

        query = 'CREATE TABLE IF NOT EXISTS profession \
            (id int NOT NULL AUTO_INCREMENT PRIMARY KEY , \
            names varchar(50) NOT NULL)';
        conn.query(query,(err)=>{
            const msg = err ? 'Error con crear Table "profession"' : 'Tabla "profession" creada con exito';
            console.log(msg);
        });

        query = 'CREATE TABLE IF NOT EXISTS semesters \
            (id int NOT NULL AUTO_INCREMENT PRIMARY KEY , \
            names varchar(50) NOT NULL)';
        conn.query(query,(err)=>{
            const msg = err ? 'Error con crear Table "semesters"' : 'Tabla "semesters" creada con exito';
            console.log(msg);
        });

        query = 'CREATE TABLE IF NOT EXISTS pensum \
            (id int NOT NULL AUTO_INCREMENT PRIMARY KEY , \
            IdProfession int(5) NOT NULL , \
            IdSemesters int(5) NOT NULL , \
            IdClasses int(5) NOT NULL) ';
        conn.query(query,(err)=>{
            const msg = err ? 'Error con crear Table "pensum"' : 'Tabla "pensum" creada con exito';
            console.log(msg);
        });

        query = 'CREATE TABLE IF NOT EXISTS shifts \
            (id int NOT NULL AUTO_INCREMENT PRIMARY KEY , \
            names varchar(50) NOT NULL)';
        conn.query(query,(err)=>{
            const msg = err ? 'Error con crear Table "shifts"' : 'Tabla "shifts" creada con exito';
            console.log(msg);
        });

        query = 'CREATE TABLE IF NOT EXISTS sections \
            (id int NOT NULL AUTO_INCREMENT PRIMARY KEY , \
            names varchar(50) NOT NULL)';
        conn.query(query,(err)=>{
            const msg = err ? 'Error con crear Table "sections"' : 'Tabla "sections" creada con exito';
            console.log(msg);
        });

        query = 'CREATE TABLE IF NOT EXISTS roles \
            (id int NOT NULL AUTO_INCREMENT PRIMARY KEY , \
            names varchar(50) NOT NULL)';
        conn.query(query,(err)=>{
            const msg = err ? 'Error con crear Table "roles"' : 'Tabla "roles" creada con exito';
            console.log(msg);
        });

        query = 'CREATE TABLE IF NOT EXISTS teachers \
            (id int NOT NULL AUTO_INCREMENT PRIMARY KEY , \
            IdPersons int(5) NOT NULL , \
            IdProfession int(5) NOT NULL , \
            IdSemesters int(5) NOT NULL , \
            IdClasses int(5) NOT NULL , \
            IdShifts int(5) NOT NULL , \
            IdSections int(5) NOT NULL)';
        conn.query(query,(err)=>{
            const msg = err ? 'Error con crear Table "teachers"' : 'Tabla "teachers" creada con exito';
            console.log(msg);
        });

        query = 'CREATE TABLE IF NOT EXISTS admin \
            (id int NOT NULL AUTO_INCREMENT PRIMARY KEY , \
            IdPersons int(5) NOT NULL)';
        conn.query(query,(err)=>{
            const msg = err ? 'Error con crear Table "admin"' : 'Tabla "admin" creada con exito';
            console.log(msg);
        });

        query = 'CREATE TABLE IF NOT EXISTS students \
            (id int NOT NULL AUTO_INCREMENT PRIMARY KEY , \
            IdPersons int(5) NOT NULL , \
            IdProfession int(5) NOT NULL , \
            IdSemesters int(5) NOT NULL)';
        conn.query(query,(err)=>{
            const msg = err ? 'Error con crear Table "students"' : 'Tabla "students" creada con exito';
            console.log(msg);
        });

        query = 'CREATE TABLE IF NOT EXISTS scores \
            (id int NOT NULL AUTO_INCREMENT PRIMARY KEY , \
            IdStudents int(5) NOT NULL , \
            IdClasses int(5) NOT NULL , \
            IdTeachers int(5) NOT NULL , \
            IdShifts int(5) NOT NULL , \
            IdSections int(5) NOT NULL , \
            score int (2) NOT NULL)';
        conn.query(query,(err)=>{
            const msg = err ? 'Error con crear Table "scores"' : 'Tabla "scores" creada con exito';
            console.log(msg);
        });

        query = 'CREATE TABLE IF NOT EXISTS login \
            (id int NOT NULL AUTO_INCREMENT PRIMARY KEY , \
            user varchar(50) NOT NULL , \
            pass varchar(50) NOT NULL , \
            IdPersons int (5) NOT NULL)';
        conn.query(query,(err)=>{
            const msg = err ? 'Error con crear Table "scores"' : 'Tabla "scores" creada con exito';
            console.log(msg);
        });

    });

}