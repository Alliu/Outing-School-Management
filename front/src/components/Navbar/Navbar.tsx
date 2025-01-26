import { GoCalendar, GoPeople } from "react-icons/go";
import MenuParent from "../Menu/MenuParent";
import { RxEnvelopeClosed } from "react-icons/rx";
import { NavLink } from "react-router-dom";
import { items } from "../Menu/items";
import React, { useContext } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import UserContext from "../../contexts/user.context";
import { BsFillPersonFill } from "react-icons/bs";
import { url } from "../../types/vite-env";
export default function Navbar() {
    const { user } = useContext(UserContext);
    return (
        <>
            <header className="relative w-full">
                <nav className="flex gap-8 bg-white p-4 border-b-2 justify-evenly border-cool-blue">
                    <MenuParent itemList={items} />
                    <img src="assets/img/design/logo.png" />
                    <div className="relative inline-block object-cover object-center rounded-full h-14 w-14 text-cool-blue">
                        {user.path ? (
                            <div>
                                <img
                                    src={`${
                                        import.meta.env.VITE_API_BASE_URL
                                    }/${user.path}`}
                                />
                            </div>
                        ) : (
                            <BsFillPersonFill />
                        )}
                    </div>
                </nav>
            </header>

            <footer className="fixed bottom-0 left-0 z-10 w-full h-20">
                <nav className="flex pb-6 p-4 bg-white border-t-2 justify-evenly text-cool-blue border-cool-blue">
                    <NavLink
                        to="/events"
                        className={({ isActive }) =>
                            isActive ? "activeLink" : undefined
                        }
                    >
                        <GoCalendar className="w-16 h-16" />
                    </NavLink>
                    <NavLink
                        to="/add_event"
                        className={({ isActive }) =>
                            isActive ? "activeLink" : undefined
                        }
                    >
                        <AiOutlinePlus className="h-16 w-16 ml-0" />
                    </NavLink>
                    <NavLink
                        to="/messagerie"
                        className={({ isActive }) =>
                            isActive ? "activeLink" : undefined
                        }
                    >
                        <RxEnvelopeClosed className="w-16 h-16" />
                    </NavLink>
                    <NavLink
                        to="/contactsparent"
                        className={({ isActive }) =>
                            isActive ? "activeLink" : undefined
                        }
                    >
                        <GoPeople className="w-16 h-16 " />
                    </NavLink>
                </nav>
            </footer>
        </>
    );
}
