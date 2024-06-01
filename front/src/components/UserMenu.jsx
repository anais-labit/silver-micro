import user from "../assets/user.png";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import { useState, useEffect } from "react";

export default function UserMenu() {
	const PATH = import.meta.env.VITE_PATH;

	const [userInfo, setUserInfo] = useState(null);
	const [userRole, setUserRole] = useState(null);

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
					setUserRole(userDetail.role);
				})
				.catch((error) => {
					console.error(error);
				});
		}
	}, []);

	return (
		<>
			<div className="flex flex-row gap-6 bg-green-100 p-4">
				<div>
					<h3 className="font-bold text-3xl">{userInfo}</h3>
				</div>

				<div className="mt-1">
					<div className="relative inline-block text-left">
						<div className="group">
							<button
								type="button"
								className=""
								id="options-menu"
								aria-haspopup="true">
								<img src={user} alt="" />
							</button>
							<div className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
								<div
									className="py-1"
									role="menu"
									aria-orientation="vertical"
									aria-labelledby="options-menu">
									<Link to="/user">
										<button
											type="submit"
											className="block w-full text-left px-4 py-2 text-xl text-gray-700 hover:bg-gray-100"
											role="menuitem">
											Profil
										</button>
									</Link>
									{userRole && userRole === "user" && (
										<Link to="/restaurants">
											<button
												type="submit"
												className="block w-full text-left px-4 py-2 text-xl text-gray-700 hover:bg-gray-100"
												role="menuitem">
												Voir les restaurants
											</button>
										</Link>
									)}
									{userRole &&
										(userRole === "owner" || userRole === "root") && (
											<Link to={`/${userRole}/panel`}>
												<button
													type="submit"
													className="block w-full text-left px-4 py-2 text-xl text-gray-700 hover:bg-gray-100"
													role="menuitem">
													Tableau de bord
												</button>
											</Link>
										)}
									<LogoutButton style="block w-full text-left px-4 py-2 text-xl text-gray-700 hover:bg-gray-100" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
