import { Typography } from "@material-tailwind/react/components/Typography";
import MyCalendar from "../../components/Event/Calendar";
import { NavbarEvents } from "../../components/Event/NavbarEvents";
import Navbar from "../../components/Navbar/Navbar";
import React from "react";

export const EventsPage = () => {
    return (
        <>
            <main>
                <Navbar />
                <Typography
                    variant="h4"
                    color="blue-gray"
                    className="mb-2 text-cool-blue text-center pt-4"
                    placeholder={undefined}
                >
                    Mes événements
                </Typography>
                <NavbarEvents />

                <MyCalendar />
            </main>
        </>
    );
};
