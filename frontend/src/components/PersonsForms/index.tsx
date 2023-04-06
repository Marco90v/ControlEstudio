import { SelectStyle } from "../../styled/style";
import { Select } from "../";

function PersonsForms({children, person, changeRole, changeDataPerson, roles, selectRole, wait, selectPerson, cancelEdit, save, type}:any){

    return(
        <form className="newPerson" onSubmit={(e)=>e.preventDefault()} >
            <div className="dataUser">
                <div className="names">
                    <label htmlFor="names">Nombre Completo</label>
                    <input type="text" name="names" id="names" value={person.names} onChange={e=>changeDataPerson(e)} disabled={wait} />
                </div>
                <div className="lastNames">
                    <label htmlFor="lastNames">Apellido Completo</label>
                    <input type="text" name="lastNames" id="lastNames" value={person.lastNames} onChange={e=>changeDataPerson(e)} disabled={wait} />
                </div>
                <div className="sex">
                    <label htmlFor="selectSex">Genero</label>
                    <SelectStyle name="sex" id="sex" value={person.sex} onChange={e=>changeDataPerson(e)} disabled={wait} >
                        <option value=""></option>
                        <option value="M">Masculino</option>
                        <option value="F">Femenino</option>
                    </SelectStyle>
                </div>
                <div className="data">
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" id="email" value={person.email} onChange={e=>changeDataPerson(e)} disabled={wait} />
                    <label htmlFor="phone">Telefono</label>
                    <input type="number" name="phone" id="phone" value={person.phone || ""} onChange={e=>changeDataPerson(e)} disabled={wait} />
                    <label htmlFor="role">Rol</label>
                    <Select identify="role" changeSelect={(e)=>changeRole(e)} value={selectRole} data={roles} disabled={true} />
                    <label htmlFor="photo">Foto</label>
                    <input type="file" name="photo" id="photo" disabled={true} />
                </div>
                {type === "students" && children}
            </div>
                {type === "teacher" && children}
                
            <div className="save">
                {
                    selectPerson === 0 ?
                    <button onClick={save} disabled={wait} >Guardar</button> :
                    <>
                        <button onClick={()=>cancelEdit()} className="cancel" disabled={wait} >Cancelar</button>
                        <button className="edit" onClick={save} disabled={wait} >Guardar cambios</button>
                    </>
                }
            </div>
        </form>
    );
}

export { PersonsForms };