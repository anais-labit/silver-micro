import user from "../assets/user.png";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import { useEffect, useState } from "react";

const PATH = import.meta.env.VITE_PATH;

export default function UserMenu() {
  const [userInfo, setUserInfo] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");
    if (jwtToken) {
      fetch(`${PATH}/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("An error occurred");
          }
          return response.json();
        })
        .then((data) => {
          const userDetail = data.data;
          setUserInfo(userDetail.firstName);
          setUserRole(userDetail.role);



        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  const rolePath = {
    user: "/user",
    root: "/root/panel",
    owner: "/owner/panel"
  };

  console.log("User Role:", userRole);
  console.log("Redirect Path:", rolePath[userRole]);

  return (
    <>
      <div className="flex flex-row gap-6 bg-green-100">
        <div>
          <h3 className="font-bold text-3xl">{userInfo}</h3>
        </div>
      </div>
      <div className="relative inline-block text-left">
        <div className="group">
          <button type="button" className="" id="options-menu" aria-haspopup="true">
            <img src={user} alt="User" />
          </button>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 origin-top-right absolute right-0 mt-2 w-24 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              {userRole && (
                <Link to={rolePath[userRole]}>
                  <button type="button" className="block w-full text-left px-4 py-2 text-2xl text-gray-700 hover:bg-gray-100" role="menuitem">
                    Profil
                  </button>
                </Link>
              )}
              <LogoutButton style="block w-full text-left px-4 py-2 text-2xl text-gray-700 hover:bg-gray-100" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
