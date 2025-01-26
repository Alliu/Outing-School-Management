import { Typography } from "@material-tailwind/react";
import { ButtonSubmit } from "../../components/Auth/ButtonSubmit";
import { InputComponent } from "../../components/Auth/InputComponent";
import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import { object, string } from "yup";
import UserContext from "../../contexts/user.context";
import { Navigate, NavLink } from "react-router-dom";
import { SigninInterface } from "../../interfaces/SigninInterface";
import React from "react";
import { signIn } from "../../api/User/Users";
import CookieBanner from "../../components/cookie/cookie-banner";
//import { useQueryClient } from "@tanstack/react-query";

export default function SignInPage() {
    const [msg, setMsg] = useState<string>("");
    const { user, updateUser } = useContext(UserContext);
    const [form, setForm] = useState<SigninInterface>({
        email: "",
        password: "",
    });

    const cookie_accept: string | null = localStorage.getItem("cookie-accept");
    const acceptCookie = () => {
        localStorage.setItem("cookie-accept", "true");
    };

    const refuseCookie = () => {
        localStorage.setItem("cookie-accept", "false");
    };
    const handleForm = (form: SigninInterface) => {
        setForm(form);
        updateUser(form);
    };
    useEffect(() => {
        console.log(user);
    }, [user]);
    const userSchema = object({
        password: string().required("Champs obligatoire"),
        email: string()
            .email("Invalid email address")
            .required("Veuillez rentrer un email"),
    });
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: userSchema,
        onSubmit: async (values) => {
            const newForm = {
                password: values.password,
                email: values.email,
            };
            setForm({
                ...form,
                password: values.password,
                email: values.email,
            });
            handleForm(newForm);
            const user = await signIn(newForm);
            if (user.userError) {
                if (typeof user.userError === "string") {
                    setMsg(user.userError);
                } else if (user.userError.length) {
                    setMsg(user.userError[0]);
                }
            }
        },
    });

    return (
        <>
            {user.isLogged == true ? (
                <>
                    <Navigate
                        to="/home
        "
                    />{" "}
                </>
            ) : (
                <section className="grid h-screen relative">
                    <Typography
                        variant="h4"
                        color="blue-gray"
                        className="pb-4 mb-2 text-center text-cool-blue"
                        placeholder={undefined}
                    >
                        <a href="/home">CONNEXION</a>
                    </Typography>
                    <form
                        action=""
                        onSubmit={formik.handleSubmit}
                        className="w-96 mx-auto "
                    >
                        <InputComponent
                            role="email"
                            title="Email"
                            id="email"
                            type="email"
                            name="email"
                            placeholder="hello25@gmail.com"
                            onChange={formik.handleChange}
                        />
                        {formik.touched.email ? (
                            <div className="text-center">
                                {formik.errors.email}
                            </div>
                        ) : null}
                        <InputComponent
                            title="Mot de passe"
                            id="passeword"
                            type="password"
                            name="password"
                            placeholder="************"
                            onChange={formik.handleChange}
                        />
                        {formik.touched.password ? (
                            <div className="text-center">
                                {formik.errors.password}
                            </div>
                        ) : null}
                        <Typography
                            variant="h5"
                            color="black"
                            className="!mt-4 text-center font-normal text-red-500"
                            placeholder={undefined}
                        >
                            {msg == "" ? (
                                ""
                            ) : (
                                <div className="w-56 my-2 p-4 mx-auto text-sm text-cool-blue font-pop text-center bg-cool-blueClaire bg-opacity-20 rounded-md">
                                    {msg}
                                </div>
                            )}
                        </Typography>
                        <ButtonSubmit title="CONNEXION" />
                    </form>
                    {cookie_accept == "true" ? (
                        <div
                            data-cy="accept-text"
                            className="w-72 p-4 m-auto text-sm text-gray font-pop text-center border-2 border-gray-500 bg-opacity-20 rounded-md"
                        >
                            Vous avez accepté le stockage des cookies
                            utilisateurs
                        </div>
                    ) : (
                        <CookieBanner
                            handleAccept={acceptCookie}
                            handleRefuse={refuseCookie}
                        />
                    )}
                    <Typography
                        variant="h5"
                        color="black"
                        className="!mt-4 text-center font-normal"
                        placeholder={undefined}
                    >
                        Je n'ai pas encore mon compte
                        <br />
                        Je veux{" "}
                        <NavLink
                            to="/signup_teacher"
                            className="font-bold text-gray-900"
                        >
                            Créer mon Compte
                        </NavLink>
                        <br />
                        <br />
                        <a href="/reini_1" className="text-gray-900 ">
                            Mot de passe oublié
                        </a>
                    </Typography>{" "}
                </section>
            )}
        </>
    );
}
