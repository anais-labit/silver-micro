import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserMenu from "./UserMenu";

const PATH = import.meta.env.VITE_PATH;

export default function UserCard() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");
    if (jwtToken) {
      fetch(PATH + "/user", {
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
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  return (
    <div className="flex flex-row gap-6  bg-green-100  ">
      <div>

        <h3 className="font-bold text-3xl "> {userInfo}</h3>
      </div>

      <div className="mt-1">
      < UserMenu />
      </div>
    </div>
  ); 
}
