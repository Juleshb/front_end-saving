
import { useContext } from "react";
import { AuthContext } from "./authocontex";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { setAuthData } = useContext(AuthContext);
  const navigate = useNavigate();

 
    setAuthData(null); 
    localStorage.removeItem('token');
    navigate("/"); 
 

 };

 export default Logout;
