import React from "react";
import DetailsEvents from "../../components/Event/DetailsEventsParents";
import Navbar from "../../components/Navbar/Navbar";

function EventsParentsDetails() {
    return (
        <>
            <main>
                <Navbar />
                <section>
                    <DetailsEvents />
                </section>
            </main>
        </>
    );
}

export default EventsParentsDetails;
