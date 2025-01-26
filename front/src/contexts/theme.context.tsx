import { createContext, ReactNode, useState } from "react";
import { Toolbar } from "../components/Toolbar/toolbar";
import React from "react";

// Creates the new context
const ThemeContext = createContext("light");

interface ThemeProviderType {
    children: ReactNode;
}
export const ThemeProviders = ({ children }: ThemeProviderType) => {
    const [theme, setTheme] = useState("light");

    const toggleTheme = () => {
        setTheme(theme === "" ? "dark dark:bg-cool-blue dark:text-white" : "");
    };

    return (
        <>
            <ThemeContext.Provider value={theme}>
                <Toolbar toggleTheme={toggleTheme} />
                <div className={theme}> {children}</div>
            </ThemeContext.Provider>
        </>
    );
};

export default ThemeContext;
