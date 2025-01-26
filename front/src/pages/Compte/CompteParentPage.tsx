import React, { useContext } from "react";
import { ListWithIcon2 } from "../../components/listesComptes/ListWithIcon2";
import { ListWithIcon4 } from "../../components/listesComptes/ListWithIcon4";
import Navbar from "../../components/Navbar/Navbar";

import UserContext from "../../contexts/user.context";
import { BsFillPersonFill } from "react-icons/bs";

export default function CompteParentPage() {
    const { user } = useContext(UserContext);
    return (
        <>
            <Navbar />
            <h1 className="flex justify-center mt-4 mb-2 text-2xl text-cool-blue font-pop">
                Mon compte
            </h1>

            <div className="flex flex-row items-end justify-center ml-8">
                {user.path ? (
                    <div>
                        <img
                            src={`${import.meta.env.VITE_API_BASE_URL}/${
                                user.path
                            }`}
                        />
                    </div>
                ) : (
                    <BsFillPersonFill />
                )}
            </div>

            <main className="mt-2 ml-6">
                <h2 className="mt-2 mb-2 font-semibold text-cool-blue font-pop ">
                    Mes informations
                </h2>
                <section className="flex flex-row justify-between mr-10">
                    <ListWithIcon4
                        name={user.firstname + " " + user.lastname}
                        phone=""
                        email=""
                        adresse=""
                    />
                </section>
                <h2 className="mt-2 font-semibold text-cool-blue font-pop">
                    Mon / mes enfant(s)
                </h2>
                <section className="flex flex-row justify-between gap-2 ml-6 mr-10">
                    <div className="font-pop"></div>
                    <div className="font-pop"></div>
                </section>
                <h2 className="mt-2 font-semibold text-cool-blue font-pop">
                    Confidentialité
                </h2>
                <section className="flex flex-row justify-between mr-1 mb-20">
                    <ListWithIcon2
                        url={`${import.meta.env.VITE_API_BASE_URL}/auth/delete`}
                    />
                </section>
            </main>
        </>
    );
}
