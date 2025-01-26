import { useContext } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { ListWithAvatarNotif } from "../../components/notifications/ListWithAvatarNotif";
import { ListWithAvatarNotifOneButton } from "../../components/notifications/ListWithAvatarNotifOneButton";
import UserContext from "../../contexts/user.context";
import { Role } from "../../interfaces/UserProfileInterface";
import { deleteNotif, getUserNotif } from "../../api/User/Users";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";

const enum NotifType {
    CONTACT = "CONTACT",
    EVENT = "EVENT",
    SURVEY = "SURVEY",
    FILE = "FILE",
    MESSAGE = "MESSAGE",
}

export interface NotifInterface {
    userid: string;
    id: number;
    photo: string;
    profile: string;
    role: Role;
    mediaId?: string;
    eventId?: number;
    contactId?: number;
    type: NotifType;
}

export interface deleteNotifInterface {
    userid: string;
    notifid: string;
}

export default function NotificationsPage() {
    const { user } = useContext(UserContext);
    const queryClient = useQueryClient();
    const accept = () => {};
    const refuse = () => {};
    const { data: notifs } = useQuery<NotifInterface[]>({
        queryKey: ["notifs"],
        queryFn: async () => await getUserNotif(user.id),
        staleTime: 5000,
        enabled: true,
    });
    // console.log(notifs[1].type);
    const filter = notifs?.filter((notif) => notif.type == "EVENT");
    console.log(filter);

    // .map((fileNotif) => {
    //     console.log(fileNotif);
    // });
    const removeNotif = useMutation({
        mutationFn: (notif: NotifInterface) => deleteNotif(notif),
        onSuccess: (deletedNotif: deleteNotifInterface) => {
            const currentNotifs: NotifInterface[] = notifs || [];
            const updatedNotifs = [
                ...currentNotifs.filter(
                    (notification) => notification.id !== +deletedNotif.notifid
                ),
            ];
            queryClient.setQueryData(["notifs"], updatedNotifs);
            console.log(updatedNotifs);
        },
        // gestion des erreurs
        onError: (error: error) => {
            console.error("Erreur", error);
            alert("Erreur lors de la suppression de la notification!");
        },
    });

    const remove = async (notif: NotifInterface): Promise<void> => {
        removeNotif.mutate(notif);
    };
    return (
        <>
            <Navbar avatar="src\assets\img\avatars\robert.png" />
            <div className="pb-28">
                <h1 className="flex justify-center mt-4 mb-2 text-2xl text-cool-blue font-pop">
                    Notifications
                </h1>
                <h2 className="ml-6 font-semibold text-cool-blue font-pop ">
                    Demandes en contact
                </h2>
                {notifs
                    ?.filter((notif) => notif.type === NotifType.CONTACT)
                    .map((contactNotif) => (
                        <div className="flex flex-col gap-1 mx-4">
                            <ListWithAvatarNotif
                                photo="src\assets\img\avatars\christelle.png"
                                userName="Christelle Plas"
                                roleEcole="Enseignante, Ecole Pr St-Marie "
                                notif="Vous a envoyé une invitation"
                                handleAccept={() => {
                                    accept();
                                    remove(contactNotif);
                                }}
                                handleRefuse={() => {
                                    refuse();
                                    remove(contactNotif);
                                }}
                            />
                        </div>
                    ))}

                <h2 className="ml-6 font-semibold text-cool-blue font-pop">
                    Documents à signer
                </h2>

                {notifs
                    ?.filter((notif) => notif.type === NotifType.FILE)
                    .map((fileNotif) => (
                        <div className="flex flex-col gap-1 mx-4">
                            <ListWithAvatarNotifOneButton
                                photo="src\assets\img\avatars\christelle.png"
                                userName="Christelle Plas"
                                roleEcole="Enseignante, Ecole Pr St-Marie "
                                notif="Vous a envoyé un document"
                                onclick={() => {
                                    remove(fileNotif);
                                }}
                                linkTo={"/"}
                                title="Voir le document"
                            />
                        </div>
                    ))}

                <h2 className="ml-6 font-semibold text-cool-blue font-pop">
                    Sondages à réponre
                </h2>
                {notifs
                    ?.filter((notif) => notif.type === NotifType.SURVEY)
                    .map((contactNotif) => (
                        <div className="flex flex-col gap-1 mx-4">
                            <ListWithAvatarNotifOneButton
                                photo="src\assets\img\avatars\christelle.png"
                                userName="Christelle Plas"
                                roleEcole="Enseignante, Ecole Pr St-Marie "
                                notif="Vous a envoyé un document"
                                onclick={() => {
                                    remove(contactNotif);
                                }}
                                title="Voir le sondage"
                                linkTo={"/"}
                            />
                        </div>
                    ))}

                <h2 className="ml-6 font-semibold text-cool-blue font-pop">
                    Invitations aux événements
                </h2>
                <ListWithAvatarNotifOneButton
                    photo="src\assets\img\avatars\christelle.png"
                    userName="Christelle Plas"
                    roleEcole="Enseignante, Ecole Pr St-Marie "
                    notif="a publié un nouvel événement"
                />
                {notifs
                    ?.filter((notif) => notif.type == NotifType.EVENT)
                    .map((eventNotif) => (
                        <div className="flex flex-col gap-1 mx-4">
                            <ListWithAvatarNotifOneButton
                                photo="src\assets\img\avatars\christelle.png"
                                userName="Christelle Plas"
                                roleEcole="Enseignante, Ecole Pr St-Marie "
                                notif="a publié un nouvel événement"
                                onclick={() => {
                                    remove(eventNotif);
                                }}
                                title="Voir l'événement"
                                linkTo={`/events/${eventNotif.eventId}`}
                            />
                        </div>
                    ))}
            </div>
        </>
    );
}
