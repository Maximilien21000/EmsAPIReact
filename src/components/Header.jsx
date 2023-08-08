import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/UseAuth";


const Header = () => {
  const { auth, setAuth } = useAuth();
  let navigate = useNavigate();

  const logout = () => {
    setAuth({})
    navigate('/login', {replace:true});
  }

  return (
    <div className="navbar bg-primary text-primary-content">
    <div className="flex-1">
        <Link className="btn btn-ghost normal-case text-xl" to="/">Energy Management System - NERC</Link>
        <span className="border-2 border-amber-500 p-1">
            {auth?.username?`Logged in as ${auth?.username} - ${auth.is_admin? 'false': 'Non Admin Account'}`:"Not logged in"}
        </span>
    </div>
       <div className="pr-8 font-semibold">
           
           <NavLink className={({ isActive }) =>
              isActive ? "active-link" : "p-4"
            } to="/"> Home </NavLink>
           
           <NavLink className={({ isActive }) =>
              isActive ? "active-link" : "p-4"
            } to="/devices"> Devices </NavLink>
           
           <NavLink className={({ isActive }) =>
              isActive ? "active-link" : "p-4"
            } to="/sensors"> Sensors </NavLink>
            
            <NavLink className={({ isActive }) =>
              isActive ? "active-link" : "p-4"} to='/login'> Login </NavLink>

            <NavLink className={({ isActive }) => isActive ? "active-link" : "p=4"} to='/register'> Register </NavLink>

            <NavLink className="mx-1"><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={logout}>
                    Logout <span className="font-semibold"></span></button></NavLink> 

            </div>         
       </div>
    
  )
}

export default Header