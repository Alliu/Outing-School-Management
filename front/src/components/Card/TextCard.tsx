import { Card, CardBody, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { ButtonClickBlue } from "../buttonsClick/ButtonClickBlue";

export function TextCard(props: any) {
    const { title, numberOfInterestedPerson } = props;

    return (
        <>
            <Card
                className="flex flex-col w-80 mx-auto"
                placeholder={undefined}
            >
                <CardBody
                    className="flex flex-col items-start pb-4"
                    placeholder={undefined}
                >
                    <Typography placeholder={undefined}>
                        <span className="font-pop font-bold text-black text-sm">
                            {" "}
                            {title}
                        </span>
                    </Typography>
                    <Typography placeholder={undefined}>
                        <span className="text-gray-500 text-sm font-pop">
                            {" "}
                            Nombre d'interessés {numberOfInterestedPerson}
                        </span>
                    </Typography>
                    <Link className="pt-2" to="/add_event">
                        <ButtonClickBlue title="J'organise" />
                    </Link>
                </CardBody>
            </Card>
        </>
    );
}
