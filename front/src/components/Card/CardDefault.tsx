import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
} from "@material-tailwind/react";
import { Role } from "../../interfaces/UserProfileInterface";
import { useContext } from "react";
import UserContext from "../../contexts/user.context";

function CardDefault(props: any) {
    const { user } = useContext(UserContext);
    const {
        title,
        theme,
        date,
        description,
        imgPath,
        alt,
        detail,
        deleteEvent,
    } = props;
    const handleUserEvents = () => {
        deleteEvent(detail.id);
        alert("Evenement supprimé!");
    };
    return (
        <Card className="" placeholder={undefined}>
            <CardHeader
                className="relative shadow-none w-screen max-w-80 m-0 rounded-xl pb-2 "
                placeholder={undefined}
            >
                <img src={imgPath} alt={alt} />
            </CardHeader>
            <CardBody
                className="py-0 px-0 text-cool-blue"
                placeholder={undefined}
            >
                <Typography placeholder={undefined}>
                    {theme} <br />
                </Typography>
                <p className="font-bold text-black text-lg"> {title}</p>

                {detail ? (
                    <ul className="flex flex-col gap-2 overflow pl-4 text-gray-800">
                        <li>Description : {detail.description}</li>{" "}
                        <li>Lieu : {detail.place}</li>
                        <li>Budget (euros/pers) : {detail.budget}</li>
                        <li>
                            {" "}
                            {user.role === Role.TEACHER ? (
                                <span className="text-black">
                                    Parent accompagnateurs : <ul></ul>
                                </span>
                            ) : (
                                ""
                            )}{" "}
                        </li>
                        <li>
                            <button
                                onClick={handleUserEvents}
                                type="button"
                                className="p-2 bg-red-400 rounded-sm"
                            >
                                Annuler la sortie
                            </button>
                        </li>
                        {}
                        {user.role == Role.PARENT ? (
                            <li>
                                <button
                                    onClick={handleUserEvents}
                                    type="button"
                                    className="p-2 bg-red-400 rounded-sm"
                                >
                                    Retirer ma participation
                                </button>
                            </li>
                        ) : (
                            ""
                        )}
                    </ul>
                ) : (
                    <></>
                )}
            </CardBody>

            <CardFooter className="py-0 px-0" placeholder={undefined}>
                <Typography placeholder={undefined}>
                    {date} <br />
                    {description}
                </Typography>
            </CardFooter>
        </Card>
    );
}
export default CardDefault;
