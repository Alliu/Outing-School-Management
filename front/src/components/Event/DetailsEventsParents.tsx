import {
    Card,
    CardHeader,
    CardBody,
    Typography,
} from "@material-tailwind/react";
import React from "react";

function DetailsEvents() {
    return (
        <>
            <Card className="mt-6 w-96">
                <CardHeader color="blue-gray" className="relative h-56">
                    <img
                        src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                        alt="card-image"
                    />
                </CardHeader>
                <CardBody>
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                        Can coffee make you a better developer?
                    </Typography>
                    <Typography>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Sed dolorem, et error fuga dolor quis nemo nulla placeat
                    </Typography>
                    <section className="mt-4">
                        <p className="mt-2">Paris</p>
                        <p className="mt-2">Culture</p>
                        <p className="mt-2">Thème</p>
                        <p className="mt-2">Tarif : 20€/enfant</p>
                    </section>
                    <div>
                        <img src="\assets\img\avatars\robert.png" />
                    </div>
                </CardBody>
            </Card>
        </>
    );
}

export default DetailsEvents;
