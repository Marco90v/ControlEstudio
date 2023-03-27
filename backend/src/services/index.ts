import { MysqlError, PoolConnection } from 'mysql';
import { transformData } from '../transform';
import { allStudents, dbPersons, scores } from '../types';
import { conn } from './conect';


export const getAllAdmin = () => {
    return new Promise((resolve,reject) => {
        conn.getConnection((MySqlErr:MysqlError, connection:PoolConnection) => {
            if(MySqlErr){
                reject(`Error al conectar a MySQL: ${MySqlErr}`);
                return;
            }
            connection.query('SELECT \
                admin.id AS "IdAdmin", \
                admin.IdPersons AS "IdPerson", \
                persons.names, \
                persons.lastNames, \
                persons.sex, \
                persons.email, \
                persons.phone, \
                persons.photo \
                FROM admin \
                INNER JOIN persons ON persons.id = admin.IdPersons;', (QueryErr,result)=>{
                if(QueryErr) reject( `Error en consulta Admin: ${QueryErr}`);
                if(result) resolve(result);
                connection.release();
            });
        });
    });
}


export const getAll = (table:string) => {
    return new Promise((resolve, reject)=>{
        conn.getConnection((MySqlErr:MysqlError,connection:PoolConnection)=>{
            if(MySqlErr){
                reject(`Error al conectar a MySQL: ${MySqlErr}`);
                return;
            }
            connection.query(`SELECT * FROM ${table}`, (QueryErr,result)=>{
                if(QueryErr) reject( `Error en consulta a tabla ${table}: ${QueryErr}`);
                if(result) resolve(result);
                connection.release();
            });
        });
    });
}

export const getPerson = (id:number) => {
    return new Promise((resolve, reject)=>{
        conn.getConnection((MySqlErr:MysqlError,connection:PoolConnection)=>{
            if(MySqlErr){
                reject(`Error al conectar a MySQL: ${MySqlErr}`);
                return;
            }
            connection.query(`SELECT * FROM persons WHERE id = ?`, id, (QueryErr,result)=>{
                if(QueryErr) reject( `Error en consulta a tabla Persons: ${QueryErr}`);
                if(result) resolve(result);
                connection.release();
            });
        });
    });
}


export const insertSingle = (table,data) => {
    return new Promise((resolve, reject)=>{
        conn.getConnection((MySqlErr:MysqlError,connection:PoolConnection)=>{
            if(MySqlErr){
                reject(`Error al conectar a MySQL: ${MySqlErr}`);
                return;
            }
            connection.query(`INSERT INTO ${table} set ?`, data, (QueryErr,result)=>{
                if(QueryErr) reject( `Error en consulta a tabla ${table}: ${QueryErr}`);
                if(result) resolve(result);
                connection.release();
            });
        });
    });
}

export const updateSingle = (table,data) => {
    return new Promise((resolve, reject)=>{
        const {id,...d} = data;
        conn.getConnection((MySqlErr:MysqlError,connection:PoolConnection)=>{
            if(MySqlErr){
                reject(`Error al conectar a MySQL: ${MySqlErr}`);
                return;
            }
            connection.query(`UPDATE ${table} set ? where id = ?`, [d,id], (QueryErr,result)=>{
                if(QueryErr) reject( `Error en consulta a tabla ${table}: ${QueryErr}`);
                if(result) resolve(result);
                connection.release();
            });
        });
    });
}

export const deleteSingle = (table,data) => {
    return new Promise((resolve, reject)=>{
        conn.getConnection((MySqlErr:MysqlError,connection:PoolConnection)=>{
            if(MySqlErr){
                reject(`Error al conectar a MySQL: ${MySqlErr}`);
                return;
            }
            // DELETE FROM classes WHERE `classes`.`id` = 61"
            connection.query(`DELETE FROM ${table} WHERE id = ?`, data.id, (QueryErr,result)=>{
                if(QueryErr) reject( `Error al eliminar id=${data.id} en la tabla ${table}: ${QueryErr}`);
                if(result) resolve(result);
                connection.release();
            });
        });
    });
}

export const deleteTeacher = (table,data) => {
    return new Promise((resolve, reject)=>{
        conn.getConnection((MySqlErr:MysqlError,connection:PoolConnection)=>{
            if(MySqlErr){
                reject(`Error al conectar a MySQL: ${MySqlErr}`);
                return;
            }
            // DELETE FROM classes WHERE `classes`.`id` = 61"
            connection.query(`DELETE FROM ${table} WHERE idPersons = ?`, data.idPersons, (QueryErr,result)=>{
                if(QueryErr) reject( `Error al eliminar idPersons=${data.idPersons} en la tabla ${table}: ${QueryErr}`);
                if(result) resolve(result);
                connection.release();
            });
        });
    });
}

export const insertMultiple = (table:string,datas:[]) => {
    return new Promise((resolve, reject)=>{
        conn.getConnection((MySqlErr:MysqlError,connection:PoolConnection)=>{
            if(MySqlErr){
                reject(`Error al conectar a MySQL: ${MySqlErr}`);
                return;
            }
            const newData = transformData(datas);
            connection.query(`INSERT INTO ${table} (IdProfession,IdSemesters,IdClasses) VALUES ?`, [newData],(QueryErr,result)=>{
                if(QueryErr) reject( `Error en consulta a tabla ${table}: ${QueryErr}`);
                if(result) resolve(result);
                connection.release();
            });
        });
    });
}

export const insertMultipleTeacher = (table:string,datas:[]) => {
    return new Promise((resolve, reject)=>{
        conn.getConnection((MySqlErr:MysqlError,connection:PoolConnection)=>{
            if(MySqlErr){
                reject(`Error al conectar a MySQL: ${MySqlErr}`);
                return;
            }
            const newData = transformData(datas);
            connection.query(`INSERT INTO ${table} (IdPersons,IdProfession,IdSemesters,IdClasses,IdShifts,IdSections) VALUES ?`, [newData],(QueryErr,result)=>{
                if(QueryErr) reject( `Error en consulta a tabla ${table}: ${QueryErr}`);
                if(result) resolve(result);
                connection.release();
            });
        });
    });
}

export const getPensum = (id:number) => {
    return new Promise((resolve, reject)=>{
        conn.getConnection((MySqlErr:MysqlError, connection:PoolConnection)=>{
            if(MySqlErr){
                reject(`Error al conectar a MySQL: ${MySqlErr}`);
                return;
            }
            const query = 'SELECT pensum.id, \
                semesters.id AS "IdSemesters", \
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
                connection.release();
            });
        });
    })
}

export const getAllStudents = (page:number=0) => {
    return new Promise((resolve,reject)=>{
        conn.getConnection((MySqlErr:MysqlError,connection:PoolConnection)=>{
            if(MySqlErr){
                reject(`Error al conectar a MySQL: ${MySqlErr}`);
                return;
            }
            const query = 'SELECT COUNT(*) as "totalStudents" FROM students;';
            connection.query(query,(queryErr,result)=>{
                if(queryErr){
                    reject( `Error en consulta paginacion Students: ${queryErr}`);
                    connection.release();
                    return;
                }
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
                    if(queryErr){
                        reject( `Error en consulta detallada Students: ${queryErr}`);
                        connection.release();
                        return;
                    }
                    data = {
                        ...data,
                        students: result
                    }
                    if(result){
                        resolve(data);
                        connection.release();
                    }
                });
            })
        });
    });
}

export const getAllStudents2 = (page:number=0) => {
    return new Promise((resolve,reject)=>{
        conn.getConnection((MySqlErr:MysqlError,connection:PoolConnection)=>{
            if(MySqlErr){
                reject(`Error al conectar a MySQL: ${MySqlErr}`);
                return;
            }
            const query = 'SELECT * FROM students';
            connection.query(query,(queryErr,result)=>{
                if(queryErr){
                    reject( `Error en consulta paginacion Students: ${queryErr}`);
                    connection.release();
                    return;
                }
                if(result) resolve(result);
                connection.release();
            })
        });
    });
}

export const getStudent = (id:number) => {
    return new Promise ((resolve, reject) => {
        conn.getConnection((MySqlErr:MysqlError,connection:PoolConnection) => {
            if(MySqlErr){
                reject(`Error al conectar a MySQL: ${MySqlErr}`);
                return;
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
                    WHERE students.id = ?;';
                connection.query(query, id, (queryErr,result)=>{
                    if(queryErr){
                        reject( `Error en consulta detallada Students: ${queryErr}`);
                        connection.release();
                        return;
                    }
                    if(result){
                        resolve(result);
                        connection.release();
                    }
                });
        });
    });
}

export const getAllTeachers = (page:number=0) => {
    return new Promise ((resolve,reject)=>{
        conn.getConnection((MySqlErr:MysqlError,connection:PoolConnection)=>{
            if(MySqlErr){
                reject(`Error al conectar a MySQL: ${MySqlErr}`);
                return;
            }
            const query = 'SELECT \
                    teachers.IdPersons AS "idPerson", \
                    persons.names, \
                    persons.lastNames, \
                    persons.sex, \
                    persons.email, \
                    persons.phone, \
                    persons.photo, \
                    profession.id AS "idProfession", \
                    profession.names AS "profession", \
                    semesters.id AS "idSemester", \
                    semesters.names AS "semester", \
                    classes.id AS "idClasse", \
                    classes.names AS "classe", \
                    shifts.id AS "idShift", \
                    shifts.names AS "shift", \
                    sections.id AS "idSection", \
                    sections.names AS "section" \
                    FROM teachers \
                    INNER JOIN persons ON teachers.IdPersons = persons.id \
                    INNER JOIN profession ON teachers.IdProfession = profession.id \
                    INNER JOIN semesters ON teachers.IdSemesters = semesters.id \
                    INNER JOIN classes ON teachers.IdClasses = classes.id \
                    INNER JOIN shifts ON teachers.IdShifts = shifts.id \
                    INNER JOIN sections on teachers.IdSections = sections.id';
            connection.query(query, page, (queryErr,result)=>{
                if(queryErr){
                    reject( `Error en consulta detallada teachers: ${queryErr}`);
                    connection.release();
                    return;
                }
                if(result){
                    resolve(result);
                    connection.release();
                }
            });
        });
    });
}

export const getAllTeachers2 = () => {
    return new Promise ((resolve,reject)=>{
        conn.getConnection((MySqlErr:MysqlError,connection:PoolConnection)=>{
            if(MySqlErr){
                reject(`Error al conectar a MySQL: ${MySqlErr}`);
                return;
            }
            const query = 'SELECT * FROM teachers';
            connection.query(query, (queryErr,result)=>{
                if(queryErr){
                    reject( `Error en consulta detallada teachers: ${queryErr}`);
                    connection.release();
                    return;
                }
                if(result){
                    resolve(result);
                    connection.release();
                }
            });
        });
    });
}

export const getTeacher = (id:number) => {
    return new Promise ((resolve,reject)=>{
        conn.getConnection((MySqlErr:MysqlError,connection:PoolConnection)=>{
            if(MySqlErr){
                reject(`Error al conectar a MySQL: ${MySqlErr}`);
                return;
            }
            const query = 'SELECT \
                    teachers.IdPersons AS "idPerson", \
                    persons.names, \
                    persons.lastNames, \
                    persons.sex, \
                    persons.email, \
                    persons.phone, \
                    persons.photo, \
                    profession.id AS "idProfession", \
                    profession.names AS "profession", \
                    semesters.id AS "idSemester", \
                    semesters.names AS "semester", \
                    classes.id AS "idClasse", \
                    classes.names AS "classe", \
                    shifts.id AS "idShift", \
                    shifts.names AS "shift", \
                    sections.id AS "idSection", \
                    sections.names AS "section" \
                    FROM teachers \
                    INNER JOIN persons ON teachers.IdPersons = persons.id \
                    INNER JOIN profession ON teachers.IdProfession = profession.id \
                    INNER JOIN semesters ON teachers.IdSemesters = semesters.id \
                    INNER JOIN classes ON teachers.IdClasses = classes.id \
                    INNER JOIN shifts ON teachers.IdShifts = shifts.id \
                    INNER JOIN sections on teachers.IdSections = sections.id \
                    WHERE teachers.IdPersons = ? ';
            connection.query(query, id, (queryErr,result)=>{
                if(queryErr){
                    reject( `Error en consulta detallada teachers: ${queryErr}`);
                    connection.release();
                    return;
                }
                if(result){
                    resolve(result);
                    connection.release();
                }
            });
        });
    });
}

export const getTeacher2 = (id:number) => {
    return new Promise ((resolve,reject)=>{
        conn.getConnection((MySqlErr:MysqlError,connection:PoolConnection)=>{
            if(MySqlErr){
                reject(`Error al conectar a MySQL: ${MySqlErr}`);
                return;
            }
            const query = 'SELECT * FROM teachers WHERE IdPersons = ? ';
            connection.query(query, id, (queryErr,result)=>{
                if(queryErr){
                    reject( `Error en consulta detallada teachers: ${queryErr}`);
                    connection.release();
                    return;
                }
                if(result){
                    resolve(result);
                    connection.release();
                }
            });
        });
    });
}

export const getPersonByRole = (role:number) => {
    return new Promise ((resolve,reject)=>{
        conn.getConnection((MySqlErr:MysqlError,connection:PoolConnection)=>{
            if(MySqlErr){
                reject(`Error al conectar a MySQL: ${MySqlErr}`);
                return;
            }
            const query = 'SELECT * FROM persons WHERE role=?;';
            connection.query(query, role, (queryErr,result)=>{
                if(queryErr){
                    reject( `Error en consulta detallada personByRole: ${queryErr}`);
                    connection.release();
                    return;
                }
                if(result){
                    resolve(result);
                    connection.release();
                }
            });
        });
    });
}

export const updatePerson = (dataPerson:dbPersons) => {
    const { names, lastNames, sex, email, phone, photo, role, id } = dataPerson
    return new Promise ((resolve,reject)=>{
        conn.getConnection((MySqlErr:MysqlError,connection:PoolConnection)=>{
            if(MySqlErr){
                reject(`Error al conectar a MySQL: ${MySqlErr}`);
                return;
            }
            const query = `UPDATE persons SET names='${names}',lastNames='${lastNames}', sex='${sex}', email='${email}', phone=${phone}, photo='${photo}' WHERE id=${id}`;
            console.log(query);
            connection.query(query, (queryErr,result)=>{
                if(queryErr){
                    reject( `Error al actualizar datos, updatePerson: ${queryErr}`);
                    connection.release();
                    return;
                }
                if(result){
                    resolve(result);
                    connection.release();
                }
            });
        });
    });
}

export const deleteMultipleTeacher = (ids:number[]) => {
    return new Promise ((resolve,reject)=>{
        conn.getConnection((MySqlErr:MysqlError,connection:PoolConnection)=>{
            if(MySqlErr){
                reject(`Error al conectar a MySQL: ${MySqlErr}`);
                return;
            }
            const query = `DELETE FROM teachers WHERE id IN (?)`;
            // console.log(query);
            connection.query(query, [ids], (queryErr,result)=>{
                if(queryErr){
                    reject( `Error eliminar datos, deleteMultipleTeacher: ${queryErr}`);
                    connection.release();
                    return;
                }
                if(result){
                    resolve(result);
                    connection.release();
                }
            });
        });
    });
}

export const updateDataTeacher = (data:any) => {
    return new Promise ((resolve,reject)=>{
        conn.getConnection((MySqlErr:MysqlError,connection:PoolConnection)=>{
            if(MySqlErr){
                reject(`Error al conectar a MySQL: ${MySqlErr}`);
                return;
            }
            const query = `UPDATE teachers set ? where id = ?`;
            // console.log(query);
            connection.query(query, [data], (queryErr,result)=>{
                if(queryErr){
                    reject( `Error eliminar datos, updateDataTeacher: ${queryErr}`);
                    connection.release();
                    return;
                }
                if(result){
                    resolve(result);
                    connection.release();
                }
            });
        });
    });
}

export const getScoresByIdStudent = (data:number) => {
    return new Promise ((resolve,reject)=>{
        conn.getConnection((MySqlErr:MysqlError,connection:PoolConnection)=>{
            if(MySqlErr){
                reject(`Error al conectar a MySQL: ${MySqlErr}`);
                return;
            }
            const query = 'SELECT * FROM scores where IdStudents = ?';
            
            // console.log(query);
            connection.query(query, data, (queryErr,result)=>{
                if(queryErr){
                    reject( `Error recuperar datos, getScoresByIdStudent: ${queryErr}`);
                    connection.release();
                    return;
                }
                if(result){
                    resolve(result);
                    connection.release();
                }
            });
        });
    });
}

export const insertMultipleScores = (table:string,scores:scores[]) => {
    return new Promise((resolve, reject)=>{
        conn.getConnection((MySqlErr:MysqlError,connection:PoolConnection)=>{
            if(MySqlErr){
                reject(`Error al conectar a MySQL: ${MySqlErr}`);
                return;
            }
            const newData = transformData(scores);
            connection.query(`INSERT INTO ${table} (IdStudents,IdClasses,IdTeachers,IdShifts,IdSections,score) VALUES ?`, [newData],(QueryErr,result)=>{
                if(QueryErr) reject( `Error en consulta a tabla ${table}: ${QueryErr}`);
                if(result) resolve(result);
                connection.release();
            });
        });
    });
}

export const getTeachersByProfessionAndSemesters = (IdProfession:number,IdSemesters:number) => {
    return new Promise((resolve, reject)=>{
        conn.getConnection((MySqlErr:MysqlError,connection:PoolConnection)=>{
            if(MySqlErr){
                reject(`Error al conectar a MySQL: ${MySqlErr}`);
                return;
            }
            const query = 'SELECT \
                teachers.id, \
                teachers.IdPersons, \
                persons.names, \
                persons.lastNames, \
                teachers.IdClasses, \
                teachers.IdShifts, \
                teachers.IdSections \
                FROM teachers \
                INNER JOIN persons ON teachers.IdPersons = persons.id \
                WHERE IdProfession = ? AND IdSemesters = ?\
                ORDER BY IdPersons, IdClasses';
            connection.query(query, [IdProfession,IdSemesters],(QueryErr,result)=>{
                if(QueryErr) reject( `Error en consulta a tabla teachers(getTeachersByProfessionAndSemesters): ${QueryErr}`);
                if(result) resolve(result);
                connection.release();
            });
        });
    });
}

export const getClassesByProfessionAndSemesters = (IdProfession:number,IdSemesters:number) => {
    return new Promise((resolve, reject)=>{
        conn.getConnection((MySqlErr:MysqlError,connection:PoolConnection)=>{
            if(MySqlErr){
                reject(`Error al conectar a MySQL: ${MySqlErr}`);
                return;
            }
            const query = 'SELECT \
            pensum.IdClasses as id, \
            classes.names \
            FROM pensum \
            INNER JOIN classes ON classes.id = pensum.IdClasses \
            WHERE IdProfession = ? AND IdSemesters = ? \
            ORDER BY IdClasses';
            connection.query(query, [IdProfession,IdSemesters],(QueryErr,result)=>{
                if(QueryErr) reject( `Error en consulta a tabla pemsun(getTeachersByProfessionAndSemesters): ${QueryErr}`);
                if(result) resolve(result);
                connection.release();
            });
        });
    });
}