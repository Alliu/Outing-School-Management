import { Typography } from "@material-tailwind/react/components/Typography";
import Navbar from "../../components/Navbar/Navbar";
import {
    Category,
    EventInterface,
    taskInterface,
} from "../../interfaces/EventInterface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { date, object, string, array, number } from "yup";
import { createEvent, getUserEvents } from "../../api/Services/eventsFunctions";
import { error } from "@material-tailwind/react/types/components/input";
import { InputComponent } from "../../components/Auth/InputComponent";
import { Button, Checkbox } from "@material-tailwind/react";
import { TextareaComponent } from "../../components/Event/TextareaComponent";
import { ButtonPost } from "../../components/Event/ButtonPost";
import { SelectInput } from "../../components/Event/SelectInput";
import { ButtonClickBlueClaire } from "../../components/buttonsClick/ButtonClickBlueClaire";
import { ButtonClickYellow } from "../../components/buttonsClick/ButtonClickYellow";
import { uploadFile } from "../../api/medias/services";
import DatePickerRange from "../../components/Event/dayRange";
import UserContext from "../../contexts/user.context";
import { useFormik } from "formik";
import { notifiateUserContacts } from "../../api/notifications/notification.service";
import React from "react";

export default function CreateEventProf() {
    const { user } = useContext(UserContext);
    // console.log(user);
    const queryClient = useQueryClient();
    const { data } = useQuery<EventInterface[]>({
        queryKey: ["events"],
        queryFn: () => getUserEvents(user.id),
        staleTime: 5000,
        enabled: true,
    });
    // console.log(data);

    const today = new Date();
    const [inputs, setInputs] = useState({
        askHelp: false,
        datePicked: today,
        range: "",
    });

    const handleDateRange = (date) => {
        setInputs({ ...inputs, range: date });
        console.log(inputs);
    };
    const handleCheck = (e) => {
        console.log(e.target.checked);
        setInputs({ ...inputs, askHelp: e.target.checked });
    };
    const handleAddTask = () => {
        const newTask = { title: "", description: "" };
        formik.setFieldValue("tasks", [...formik.values.tasks, newTask]);
    };

    const handleRemoveTask = (index) => {
        const updatedTasks = [...formik.values.tasks];
        updatedTasks.splice(index, 1);
        formik.setFieldValue("tasks", updatedTasks);
    };

    const eventSchema = object({
        title: string().required("Champs obligatoire").min(5),
        theme: string().required("Champs obligatoire"),
        date_range: object().shape({
            from: date().min(today, "La date ne peut être antérieure"),
            to: date().min(
                today,
                "La date ne peut être antérieure à la date de début"
            ),
        }),
        place: string().required("Champs obligatoire").min(5),
        budget: number().required("Veuillez rentrer un chiffre"),
        description: string().required("Champs obligatoire").min(5),
        tasks: array().of(
            object().shape({
                title: string().required("Titre requis"),
                description: string().required("Description requise"),
            })
        ),
    });

    const formik = useFormik({
        initialValues: {
            organiser_id: "",
            title: "",
            theme: Category.CULTUREL,
            date_range: "",
            place: "",
            address: "",
            budget: 0,
            description: "",
            detail: "",
            tasks: [],
            askHelp: false,
            file: "",
        },
        validationSchema: eventSchema,

        onSubmit: async (values) => {
            //    console.log(values.file);
            let filePath = "";
            if (values.file)
                filePath = await uploadFile(values.file, `${user.id}`);
            console.log(filePath);
            await addNewEvent(values, filePath);
        },
    });

    const addEvent = useMutation({
        mutationFn: (event: EventInterface) => createEvent(event),
        onSuccess: async (newEvent: EventInterface) => {
            const currentEvents: EventInterface[] = data || [];
            const updatedEvents = [...currentEvents, newEvent];
            queryClient.setQueryData(["events"], updatedEvents);
            // console.log(newEvent);
            alert("Votre événement a été crée avec succès!");
            notifiateUserContacts({
                userId: user.id,
                eventId: newEvent.event.id,
                message: `Un nouvel événement a été ajouté par ${user.firstname} ${user.lastname} !`,
            });
        },
        // gestion des erreurs
        onError: (error: error) => {
            console.error("Erreur", error);
            alert("Erreur lors de l’ajout de l'événement!");
        },
    });

    const addNewEvent = async (values, path: string): Promise<void> => {
        const start = new Date(values.date_range["from"]);
        start.setUTCDate(start.getUTCDate() + 1);
        const end = new Date(values.date_range["to"]);
        end.setUTCDate(end.getUTCDate() + 1);
        const newEvent = {
            event: {
                organiser_id: user.id,
                title: values.title,
                theme: values.theme,
                date_start: start,
                date_end: end,
                place: values.place,
                address: values.address,
                budget: +values.budget,
                description: values.description,
                detail: values.detail,
                askHelp: inputs.askHelp,
                task: values.tasks ? values.tasks : [],
                path: path,
            },
        };
        console.log(newEvent);

        addEvent.mutate(newEvent);
    };

    return (
        <>
            <Navbar />
            <section className="text-center h-screen p-2 overflow-auto overscroll-auto mb-20">
                <Typography
                    variant="h4"
                    color="blue-gray"
                    className="mb-2 text-cool-blue pb-4"
                    placeholder={undefined}
                >
                    Créer un événement
                </Typography>

                <div id="form_area" className="border-2 shadow-md mt-6 ">
                    <form
                        action="/upload"
                        method="POST"
                        encType="multipart/form-data"
                        className=" max-w-[24rem] text-left mx-auto"
                        onSubmit={formik.handleSubmit}
                    >
                        <div className="pt-2">
                            <InputComponent
                                title="Titre"
                                id="title"
                                type="title"
                                name="title"
                                placeholder=""
                                onChange={formik.handleChange}
                            />
                            {formik.touched.title ? (
                                <div className="text-center text-red-400">
                                    {formik.errors.title}
                                </div>
                            ) : null}
                        </div>

                        <div>
                            <SelectInput
                                id="theme"
                                name="theme"
                                title="Type d'activité"
                                onChange={(e) =>
                                    formik.setFieldValue("theme", e)
                                }
                                EnumProps={Category}
                            />
                        </div>
                        <div className="m-10">
                            <DatePickerRange
                                id="date_range"
                                selectedRange={formik.values.date_range}
                                onChange={(selectedRange) => {
                                    handleDateRange(selectedRange);
                                    formik.setFieldValue(
                                        "date_range",
                                        selectedRange
                                    );
                                }}
                            />
                            {formik.values.date_range["from"] ? (
                                formik.touched.date_range?.["from"] ? (
                                    <div className="text-center text-red-400">
                                        {formik.errors.date_range?.["from"]}
                                    </div>
                                ) : null
                            ) : null}
                        </div>

                        <div className="">
                            <InputComponent
                                title="Lieu"
                                id="place"
                                type="place"
                                name="place"
                                placeholder=""
                                onChange={formik.handleChange}
                            />
                            {formik.touched.place ? (
                                <div className="text-center text-red-400">
                                    {formik.errors.place}
                                </div>
                            ) : null}
                        </div>
                        <div className="">
                            <InputComponent
                                title="Adresse"
                                id="address"
                                type="address"
                                name="address"
                                placeholder=""
                                onChange={formik.handleChange}
                            />
                            {formik.touched.place ? (
                                <div className="text-center text-red-400">
                                    {formik.errors.place}
                                </div>
                            ) : null}
                        </div>
                        <div className="">
                            <InputComponent
                                title="Budget estimé (€/pers)"
                                id="budget"
                                type="budget"
                                name="budget"
                                placeholder=""
                                onChange={formik.handleChange}
                            />
                            {formik.touched.budget ? (
                                <div className="text-center text-red-400">
                                    {formik.errors.budget}
                                </div>
                            ) : null}
                        </div>

                        <div>
                            <TextareaComponent
                                id="description"
                                title="Description"
                                onChange={formik.handleChange}
                            />
                            {formik.touched.description ? (
                                <div className="text-center text-red-400">
                                    {formik.errors.description}
                                </div>
                            ) : null}
                        </div>
                        <div>
                            <TextareaComponent
                                id="detail"
                                name="detail"
                                title="Détails"
                                onChange={formik.handleChange}
                            />
                            {formik.touched.detail ? (
                                <div className="text-center text-red-400">
                                    {formik.errors.detail}
                                </div>
                            ) : null}
                        </div>
                        <Typography
                            variant="lead"
                            className="block my-4 text-black ml-12"
                            placeholder={undefined}
                        >
                            Image de l'événement
                        </Typography>
                        <div className="flex flex-col items-center">
                            <label className="block">
                                <input
                                    onChange={(event) => {
                                        formik.setFieldValue(
                                            "file",
                                            event.currentTarget.files[0]
                                        );
                                    }}
                                    id="file"
                                    name="avatar"
                                    type="file"
                                    accept=".jpg,.png,.pdf"
                                    className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100
    "
                                />
                            </label>
                        </div>

                        <Typography
                            variant="lead"
                            className="block my-4 text-black ml-12"
                            placeholder={undefined}
                        >
                            Liste des tâches
                        </Typography>
                        {formik.values.tasks.map(
                            (task: taskInterface, index) => (
                                <div key={index}>
                                    <InputComponent
                                        title={`Titre de la tâche ${index + 1}`}
                                        id={`tasks[${index}].title`}
                                        type="text"
                                        name={`tasks[${index}].title`}
                                        placeholder=""
                                        onChange={formik.handleChange}
                                    />

                                    {formik.touched.tasks?.[index]?.title ? (
                                        <div className="text-center text-red-400">
                                            {
                                                formik.errors.tasks?.[index]
                                                    ?.title
                                            }
                                        </div>
                                    ) : null}
                                    <InputComponent
                                        title={`Description de la tâche ${
                                            index + 1
                                        }`}
                                        id={`tasks[${index}].description`}
                                        type="text"
                                        name={`tasks[${index}].description`}
                                        placeholder=""
                                        onChange={formik.handleChange}
                                    />

                                    {formik.touched.tasks?.[index]
                                        ?.description ? (
                                        <div className="text-center text-red-400">
                                            {
                                                formik.errors.tasks?.[index]
                                                    ?.description
                                            }
                                        </div>
                                    ) : null}
                                    <div className="my-6 ml-12">
                                        {" "}
                                        <ButtonClickYellow
                                            title="Supprimer la tâche"
                                            onclick={() =>
                                                handleRemoveTask(index)
                                            }
                                        />
                                    </div>
                                </div>
                            )
                        )}
                        <div className="my-6 ml-12">
                            <ButtonClickBlueClaire
                                title=" Ajouter une tâche"
                                onClick={handleAddTask}
                            />
                        </div>

                        <div className="text-center">
                            <Checkbox
                                id="askHelp"
                                label="Demander de l'aide pour l'organisation"
                                crossOrigin={undefined}
                                onChange={handleCheck}
                            />
                        </div>
                        <div className="my-6 ml-12">
                            {" "}
                            <Button
                                type="reset"
                                color="gray"
                                size="md"
                                className="w-auto px-4 py-2 text-base normal-case border-0 shadow-lg text-cool-blue bg-cool-yellow shadow-gray-600"
                                fullWidth
                                placeholder={undefined}
                            >
                                Vider les champs
                            </Button>
                        </div>
                        <ButtonPost title="Poster" />
                    </form>
                </div>
            </section>
        </>
    );
}
