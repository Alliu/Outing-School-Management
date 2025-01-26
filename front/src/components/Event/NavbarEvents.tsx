import { NavLink } from "react-router-dom";

export const NavbarEvents = () => {
    return (
        <>
            <nav className="flex flex-row justify-between items-center font-bold border p-4">
                <NavLink
                    to="/events"
                    className={({ isActive }) =>
                        isActive
                            ? "activeLink bg-cool-blueClaire p-2"
                            : undefined
                    }
                >
                    Agenda
                </NavLink>
                <NavLink
                    to="/events/suggestions"
                    className={({ isActive }) =>
                        isActive
                            ? "activeLink bg-cool-blueClaire p-2"
                            : undefined
                    }
                >
                    Suggestions
                </NavLink>
                <NavLink
                    to="/surveys"
                    className={({ isActive }) =>
                        isActive
                            ? "activeLink bg-cool-blueClaire p-2"
                            : undefined
                    }
                >
                    Sondages
                </NavLink>
            </nav>
        </>
    );
};
