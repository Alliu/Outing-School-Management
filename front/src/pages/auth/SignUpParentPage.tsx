import { useFormik } from "formik";
import { boolean, object, string } from "yup";
import { ButtonSubmit } from "../../components/Auth/ButtonSubmit";
import { InputComponent } from "../../components/Auth/InputComponent";
import { Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import { signupParent } from "../../api/User/Users";
import { SignUpParentInterface } from "../../interfaces/SignUpTeacherInterface";

export default function SignUpParentPage() {
    const [msg, setMsg] = useState<string>("");
    const userSchema = object({
        lastname: string().required("Champs obligatoire"),
        firstname: string().required("Champs obligatoire"),
        email: string()
            .email("Invalid email address")
            .required("Veuillez rentrer un email"),
        terms: boolean().isTrue(
            "Veuillez accepter les conditions pour la création du compte"
        ),
    });

    const formik = useFormik({
        initialValues: {
            lastname: "",
            firstname: "",
            email: "",
            password: "",
            terms: false,
        },
        validationSchema: userSchema,
        onSubmit: async (values: SignUpParentInterface) => {
            const user = {
                lastname: values.lastname,
                firstname: values.firstname,
                email: values.email,
                password: values.password,
                terms: values.terms,
            };
            const newParent = await signupParent(user);
            if (newParent.signupError) {
                if (typeof newParent.signupError === "string") {
                    setMsg(newParent.signupError);
                } else if (newParent.signupError.length) {
                    setMsg(newParent.signupError[0]);
                }
            } else {
                setMsg("Un email vous a été envoyé pour activer votre compte!");
            }
        },
    });

    return (
        <>
            <div className="relative h-screen">
                <section className="grid h-screen text-center">
                    <div className="m-auto w-80 pb-32 z-100 relative">
                        <Typography
                            variant="h4"
                            color="blue-gray"
                            className="pb-4 mb-2 text-cool-blue"
                            placeholder={undefined}
                        >
                            CREER MON COMPTE
                        </Typography>

                        <form
                            action="#"
                            className="text-left "
                            onSubmit={formik.handleSubmit}
                        >
                            <InputComponent
                                role="lastname"
                                title="Nom"
                                id="lastname"
                                type="name"
                                name="lastname"
                                placeholder=""
                                onChange={formik.handleChange}
                            />
                            {formik.touched.lastname ? (
                                <div className="text-center">
                                    {formik.errors.lastname}
                                </div>
                            ) : null}

                            <div className="">
                                <InputComponent
                                    role="firstname"
                                    title="Prénom"
                                    id="firstname"
                                    type="name"
                                    name="firstname"
                                    placeholder=""
                                    onChange={formik.handleChange}
                                />
                                {formik.touched.firstname ? (
                                    <div className="text-center">
                                        {formik.errors.firstname}
                                    </div>
                                ) : null}
                            </div>
                            <div className="">
                                <InputComponent
                                    role="email"
                                    title="Email"
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="@gmail.com"
                                    onChange={formik.handleChange}
                                />
                                {formik.touched.email ? (
                                    <div className="text-center">
                                        {formik.errors.email}
                                    </div>
                                ) : null}
                            </div>

                            <div className="">
                                <InputComponent
                                    title="Mot de passe"
                                    id="password"
                                    type="password"
                                    name="password"
                                    placeholder=""
                                    onChange={formik.handleChange}
                                />
                                {formik.touched.password ? (
                                    <div className="text-center">
                                        {formik.errors.password}
                                    </div>
                                ) : null}
                            </div>

                            <div className="mx-auto w-56 pt-0 pb-0 pl-2 border-t-gray-400">
                                <input
                                    id="terms"
                                    type="checkbox"
                                    name="terms"
                                    onChange={formik.handleChange}
                                />{" "}
                                J'accepte les{" "}
                                <a
                                    className="underline text-cool-blue"
                                    href="assets/img/CGU.pdf"
                                    target="_blank"
                                >
                                    conditions d'utilisation et la politique de
                                    confidentialité
                                </a>{" "}
                                {formik.touched.terms ? (
                                    <div
                                        data-cy="alert-falsy-term"
                                        className="text-left text-red-500"
                                    >
                                        {formik.errors.terms}
                                    </div>
                                ) : null}
                            </div>

                            {msg == "" ? (
                                ""
                            ) : (
                                <div className="w-56 my-2 p-4 mx-auto text-sm text-cool-blue font-pop text-center bg-cool-blueClaire bg-opacity-20 rounded-md">
                                    {msg}
                                </div>
                            )}

                            <ButtonSubmit
                                datacy="signup"
                                title="CREER MON COMPTE"
                            />
                        </form>

                        <Typography
                            variant="h5"
                            color="black"
                            className="!mt-4 text-center font-normal"
                            placeholder={undefined}
                        >
                            Je suis déjà inscrit(e)
                            <br />
                            Je souhaite{" "}
                            <a
                                data-cy="heading-signin"
                                href="/signin"
                                className="font-bold text-gray-900"
                            >
                                Me connecter
                            </a>
                        </Typography>
                    </div>
                </section>
            </div>
        </>
    );
}
