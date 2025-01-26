import CardDefault from "../../components/Card/CardDefault";
import { useContext, useEffect, useState } from "react";
import { getUserEvents } from "../../api/Services/eventsFunctions";
import { EventInterface } from "../../interfaces/EventInterface";
import { useQuery } from "@tanstack/react-query";
import { Role } from "../../interfaces/UserProfileInterface";
import UserContext from "../../contexts/user.context";
import { ThemeProviders } from "../../contexts/theme.context";
import React from "react";
import { url } from "../../types/vite-env";
export default function HomePageParent() {
    const { user } = useContext(UserContext);
    const [notification, setNotifications] = useState<any>([]);
    useEffect(() => {
        // Ouvrir une connexion SSE au backend
        const eventSource = new EventSource(
            ` ${import.meta.env.VITE_API_BASE_URL}/notifications/event?id=${
                user.id
            }`
        );

        // Gestion des messages reçus
        eventSource.onmessage = (event) => {
            console.log("Notification reçue :", event.data);
            alert(event.data);
            setNotifications((prev) => [...prev, event.data]);
        };

        // Gestion des erreurs de connexion
        eventSource.onerror = (error) => {
            console.error("Erreur SSE :", error);
            eventSource.close(); // Fermer la connexion en cas d'erreur
        };

        // Nettoyage de la connexion SSE lors du démontage du composant
        return () => {
            eventSource.close();
            console.log("Connexion SSE fermée.");
        };
    }, [user.id]); // [] garantit que l'effet est exécuté seulement au montage/démontage

    const { data: events } = useQuery<EventInterface[]>({
        queryKey: ["events"],
        queryFn: () => getUserEvents(user.id),
        staleTime: 0,
        enabled: true,
        //  refetchOnMount: true,
    });
    //console.log(events);

    return (
        <>
            <ThemeProviders>
                <>
                    <div className="relative min-h-screen ">
                        <main className="flex flex-col gap-4 p-4 text-xl">
                            <div>
                                <p className="">
                                    Bienvenu(e)
                                    <span className="font-bold">
                                        {" "}
                                        {user.firstname} {user.lastname},
                                    </span>
                                    <br />
                                    <span>
                                        Vous êtes connecté(e) en tant que{" "}
                                        {user.role == Role.PARENT
                                            ? "Parent"
                                            : "Professeur"}
                                    </span>
                                </p>
                            </div>
                            <h2 className="text-cool-blue text-lg text-left font-bold dark:text-white">
                                Notifications
                            </h2>

                            {notification?.map((notif, index: number) => (
                                <div className="relative">
                                    <CardDefault
                                        index={index}
                                        theme={notif.type}
                                        title={notif.event}
                                    />
                                    <button
                                        type="button"
                                        className="text-sm absolute z-10 top-0 right-2 text-cool-blue
                                "
                                    >
                                        {" "}
                                        <a href="">Voir l'événement</a>
                                    </button>
                                </div>
                            ))}

                            <h2 className="text-cool-blue text-lg text-left font-bold dark:text-white">
                                Mes prochains évènements
                            </h2>
                            <div className="flex flex-row overflow-auto">
                                {events?.length ? (
                                    <div>
                                        {events.map((event, index: number) => (
                                            <CardDefault
                                                key={index}
                                                index={index}
                                                theme={event.event.theme}
                                                title={event.event.title}
                                                date={event.event.date_start}
                                                classLevel={""}
                                                imgPath={
                                                    `${
                                                        import.meta.env
                                                            .VITE_API_BASE_URL
                                                    }/` + event.event.path
                                                }
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <p>Aucun événement </p>
                                )}
                            </div>
                        </main>
                    </div>
                </>
            </ThemeProviders>
        </>
    );
}
