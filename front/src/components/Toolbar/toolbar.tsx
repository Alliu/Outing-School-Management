import { CgDarkMode } from "react-icons/cg";
import Navbar from "../Navbar/Navbar";
import React from "react";
interface themProps {
    toggleTheme: () => void;
}

export const Toolbar = ({ toggleTheme }: themProps) => {
    return (
        <div>
            <Navbar />

            <button onClick={toggleTheme} className="absolute top-2 right-0">
                <CgDarkMode className="text-cool-blue text-2xl" />
            </button>
        </div>
    );
};

//
