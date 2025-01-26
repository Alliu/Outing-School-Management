import { useFormik } from "formik";
import { boolean, object, string } from "yup";
import { ButtonSubmit } from "../../components/Auth/ButtonSubmit";
import { InputComponent } from "../../components/Auth/InputComponent";
import { Typography } from "@material-tailwind/react";
import { signupTeacher } from "../../api/User/Users";
import React, { useState } from "react";
import { SignUpTeacherInterface } from "../../interfaces/SignUpTeacherInterface";

export default function SignUpTeacherPage() {
    const [msg, setMsg] = useState<string>("");
    const userSchema = object({
        lastname: string().required("Champs obligatoire"),
        firstname: string().required("Champs obligatoire"),
        teacher_email: string()
            .email("Invalid email address")
            .required("Veuillez rentrer un email"),
        password: string().required("Champs obligatoire"),
        school_name: string().required("Champs obligatoire"),
        school_cp: string().required("Champs obligatoire"),
        terms: boolean().isTrue(
            "Veuillez accepter les conditions pour la création du compte"
        ),
    });

    const formik = useFormik({
        initialValues: {
            lastname: "",
            firstname: "",
            teacher_email: "",
            password: "",
            school_name: "",
            school_cp: "",
            school_address: "",
            terms: false,
        },
        validationSchema: userSchema,
        onSubmit: async (values: SignUpTeacherInterface) => {
            const user = {
                lastname: values.lastname,
                firstname: values.firstname,
                teacher_email: values.teacher_email,
                password: values.password,
                school_name: values.school_name,
                school_cp: values.school_cp,
                school_address: values.school_address,
                terms: values.terms,
            };
            // console.log(values);
            const newTeacher = await signupTeacher(user);

            if (newTeacher.signupError) {
                if (typeof newTeacher.signupError === "string") {
                    setMsg(newTeacher.signupError);
                } else if (newTeacher.signupError.length) {
                    setMsg(newTeacher.signupError[0]);
                }
            } else {
                setMsg("Un email a été envoyé à votre école!");
            }
        },
    });

    return (
        <>
            <div className="relative h-full">
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
                                    id="teacher_email"
                                    type="teacher_email"
                                    name="teacher_email"
                                    placeholder="helga.t@gmail.com"
                                    onChange={formik.handleChange}
                                />
                                {formik.touched.teacher_email ? (
                                    <div className="text-center">
                                        {formik.errors.teacher_email}
                                    </div>
                                ) : null}
                            </div>
                            <div className="">
                                <InputComponent
                                    title="Mot de passe"
                                    id="password"
                                    type="password"
                                    name="password"
                                    placeholder="********"
                                    onChange={formik.handleChange}
                                />
                                {formik.touched.password ? (
                                    <div className="text-center">
                                        {formik.errors.password}
                                    </div>
                                ) : null}
                            </div>
                            <div className="">
                                <InputComponent
                                    title="Nom de l'école"
                                    id="school_name"
                                    type="school_name"
                                    name="school_name"
                                    placeholder="Hotel de Ville"
                                    onChange={formik.handleChange}
                                />
                                {formik.touched.school_name ? (
                                    <div className="text-center">
                                        {formik.errors.school_name}
                                    </div>
                                ) : null}
                            </div>
                            <div className="">
                                <InputComponent
                                    title="CP et Commune de l'école"
                                    id="school_cp"
                                    type="school_cp"
                                    name="school_cp"
                                    placeholder="27220 Saint-André-de-l'Eure"
                                    onChange={formik.handleChange}
                                />
                                {formik.touched.school_cp ? (
                                    <div className="text-center">
                                        {formik.errors.school_cp}
                                    </div>
                                ) : null}
                            </div>
                            <div className="">
                                <InputComponent
                                    title="Adresse de l'école"
                                    id="school_address"
                                    type="school_address"
                                    name="school_address"
                                    placeholder="2 rue des Ecoles"
                                    onChange={formik.handleChange}
                                />
                                {formik.touched.school_address ? (
                                    <div className="text-center">
                                        {formik.errors.school_address}
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
                                </a>
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
                            <ButtonSubmit title="CREER MON COMPTE" />
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
