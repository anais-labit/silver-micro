import user from "../assets/user.png";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";

export default function UserMenu() {
        return (
          <div className="relative inline-block text-left">
            <div className="group">
              <button type="button" className="" id="options-menu" aria-haspopup="true">
                <img src={user} alt="" />
              </button>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 origin-top-right absolute right-0 mt-2 w-24 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  <Link to="/user">
                  <button type="submit" className="block w-full text-left px-4 py-2 text-2xl text-gray-700 hover:bg-gray-100" role="menuitem">
                      Profil
                    </button>
                    </Link>
                    <LogoutButton style ="block w-full text-left px-4 py-2 text-2xl text-gray-700 hover:bg-gray-100" />

                </div>
              </div>
            </div>
          </div>
        ); 
}