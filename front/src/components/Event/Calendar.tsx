import { useContext, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import CardDefault from "../Card/CardDefault";
import { findEventsByDate } from "../../api/Databases/events/userEvents";
import { EventInterface } from "../../interfaces/EventInterface";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getUserEvents,
    deleteUserEvent,
} from "../../api/Services/eventsFunctions";
import UserContext from "../../contexts/user.context";
import React from "react";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function MyCalendar() {
    const { user } = useContext(UserContext);
    const [value, onChange] = useState<Value>(new Date());
    const queryClient = useQueryClient();
    const { data } = useQuery<EventInterface[] | []>({
        queryKey: ["userEvents"],
        queryFn: () => getUserEvents(user.id),
        staleTime: 5000,
        //  enabled: false,
    });

    const [eventSelected, setEventSelected] = useState<EventInterface[] | []>(
        []
    );
    const handleUserEvents = () => {
        if (data && value !== null) seeEvent(findEventsByDate(data, value));
    };

    const seeEvent = (event: EventInterface[]) => {
        setEventSelected(event);
    };

    const deleteSelectedUserEvent = useMutation({
        mutationFn: (eventId: number) => deleteUserEvent(eventId),
        onSuccess: (deleteEvent: EventInterface) => {
            const currentEvents: EventInterface[] = data || [];
            const updatedEvents = currentEvents.filter(
                (event) => event.event.id !== deleteEvent.event.id
            );
            queryClient.setQueryData(["userEvents"], updatedEvents);
            handleUserEvents();
            console.log(deleteEvent);
        },
        // gestion des erreurs
        onError: (error) => {
            console.error("Erreur", error);
            alert("Erreur lors de la suppression");
        },
    });

    const deleteEvent = async (id: number): Promise<void> => {
        // console.log(data);
        deleteSelectedUserEvent.mutate(id);
    };

    return (
        <div>
            <Calendar
                onClickDay={(value) => seeEvent(findEventsByDate(data, value))}
                onChange={onChange}
                value={value}
                className="font-pop m-auto shadow-lg w-screen"
                tileContent={({ date, view }) =>
                    data?.map((userEvent, index: number) =>
                        view === "month" &&
                        date.getDate() ===
                            new Date(userEvent.date_start).getDate() &&
                        date.getMonth() ===
                            new Date(userEvent.date_start).getMonth() ? (
                            <span
                                key={index}
                                className="text-cool-blueClaire font-semibold"
                            >
                                <br />
                                {userEvent.title}
                            </span>
                        ) : null
                    )
                }
            />

            <div className="overflow mb-24 p-4">
                {" "}
                <div className=" flex mx-auto overflow-auto">
                    {eventSelected.length ? (
                        eventSelected.map(
                            (event: EventInterface, index: number) => {
                                return (
                                    <ul key={index}>
                                        <li>
                                            <CardDefault
                                                deleteEvent={deleteEvent}
                                                imgPath={event.event.path}
                                                detail={event.event}
                                                theme={event.event.theme}
                                                title={event.event.title}
                                                className="overflow"
                                            />
                                        </li>
                                    </ul>
                                );
                            }
                        )
                    ) : (
                        <>Aucun événement sélectionné</>
                    )}
                </div>
            </div>
        </div>
    );
}
