import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Navigate } from "react-router-dom";


const Privateroute = ({children}) => {
    const{user} = useContext(AuthContext);
    if (user){
        return children;
    }
    return <Navigate to="/Login"></Navigate>
};

export default Privateroute;