import { useDispatch, useSelector } from "react-redux";
import { change } from "../../store/module/visibleSideStore";
import { MyNavLink, Side, Ul } from "../../styled/style";
import arrow from "../../assets/left-arrow-solid-24.png";

const obj = {
    home:'/src/assets/home-solid-24.png',
    classes:'/src/assets/book-solid-24.png',
    profession:'/src/assets/graduation-solid-24.png',
    pensums:'/src/assets/data-solid-24.png',
    teachers:'/src/assets/male-female-regular-24.png',
    students:'/src/assets/child-regular-24.png',
    record:'/src/assets/folder-solid-24.png',
};

const Li = ({ruta,img}:any) => {
    return(
        <li>
            <MyNavLink to={`/dashboard/${ruta}`} style={({ isActive }:any) => ( isActive ? "active" : "" )}>
                <img src={img} />
                <span>{ruta}</span>
            </MyNavLink>
        </li>
    );
}

function Sidebar(){

    const dispatch = useDispatch();
    const visibleSide = useSelector((state:store) => state.sidebar)

    return(
        <Side id="sidebar" visibleSide={visibleSide.status} >
            <div id="title">
                <h1>{visibleSide.status ? "Universidad" : "U"}</h1>
                <button onClick={()=>dispatch(change())}><img src={arrow} /> </button>
            </div>
            <div id="admin">
                <Ul>
                    {
                        Object.entries(obj).map(([k,v],idx)=>{
                            return <Li key={idx} ruta={k} img={v} />
                        })
                    }
                </Ul>
            </div>
        </Side>
    )
}

export { Sidebar };