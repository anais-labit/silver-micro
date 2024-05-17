import React from "react";
import { useNavigate } from "react-router-dom";

const PATH = import.meta.env.VITE_PATH;
const LogoutButton = ({style}) => {
    
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.clear();
        navigate("/")
        console.log(localStorage.getItem("user"));
    };
    
    return (
        <button className={style} onClick={handleLogout}>Logout</button>
    );


}

export default LogoutButton;