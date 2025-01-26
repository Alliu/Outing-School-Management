import { createContext, useState, ReactNode, useEffect } from "react";
import React from "react";
import { Role, UserProfileInterface } from "../interfaces/UserProfileInterface";
import { SigninInterface } from "../interfaces/SigninInterface";
import { getUserProfile, signIn, signOut } from "../api/User/Users";

interface UserContextType {
    user: UserProfileInterface;
    updateUser: (body: SigninInterface) => void;
    logout: () => void;
}

interface UserProviderType {
    children: ReactNode;
}

const UserContext = createContext<UserContextType>({
    user: {
        id: 0,
        lastname: "",
        firstname: "",
        role: Role.PARENT,
        isLogged: false,
        path: "",
    },
    updateUser: () => {},
    logout: () => {},
});

export function UserProvider({ children }: UserProviderType) {
    const [user, setUser] = useState<UserProfileInterface>({
        id: 0,
        lastname: "",
        firstname: "",
        role: Role.PARENT,
        isLogged: false,
        path: "",
    });

    // Fonction pour se déconnecter
    const logout = async () => {
        setUser({
            id: 0,
            lastname: "",
            firstname: "",
            role: Role.PARENT,
            isLogged: false,
        });
        await signOut();
    };

    async function updateUser(body: SigninInterface) {
        const findUser = await signIn(body);

        if (findUser.userError) {
            logout();
            throw new Error("Utilisateur inexistant");
        }

        const newUser = { ...findUser.data, isLogged: true };

        setUser({ ...newUser });
    }
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const userProfile = await getUserProfile();
                console.log("user recupéré");
                if (userProfile.userError) {
                    setUser({
                        id: 0,
                        lastname: "",
                        firstname: "",
                        role: Role.PARENT,
                        isLogged: false,
                    });
                } else {
                    setUser({
                        ...userProfile.data,
                        isLogged: true,
                    });
                }
            } catch (error) {
                logout();
                console.error(
                    "Impossible de récupérer le profil utilisateur :",
                    error
                );
            }
        };

        fetchUserProfile();
    }, []);
    return (
        <UserContext.Provider value={{ user, updateUser, logout }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContext;
