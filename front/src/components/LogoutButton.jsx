import React from "react";

const PATH = import.meta.env.VITE_PATH;

const LogoutButton = ({style}) => {


    const handleLogout = () => {
        localStorage.clear();
        window.location.reload(PATH);
        console.log(localStorage.getItem("user"));
    };
    
    return (
        <button className={style} onClick={handleLogout}>Logout</button>
    );


}

export default LogoutButton;