import { useEffect, useState } from "react";

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
          console.log(userDetail.firstName);
          setUserInfo(userDetail.firstName);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  return (
    <div className="flex flex-col h-24 w-42">
      <h3  className="font-bold text-3xl "  > {userInfo}</h3>
    </div>
  );
}
