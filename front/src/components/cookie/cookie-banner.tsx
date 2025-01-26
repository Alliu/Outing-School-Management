import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import React from "react";

export default function CookieBanner({ handleAccept, handleRefuse }) {
    const [open, setOpen] = React.useState(true);
    const handleOpen = () => setOpen(!open);

    return (
        <>
            <Dialog data-cy="cookies" open={open} handler={handleOpen}>
                <DialogHeader>Utilisation des cookies utilisateur</DialogHeader>
                <DialogBody>
                    Nous utilisons des cookies sécurisés permettant de vous
                    authentifier et améliorer ainsi votre expérience
                    utilisateur. En poursuivant votre navigation, vous acceptez
                    l'utilisation de ces cookies.
                </DialogBody>
                <DialogFooter>
                    <Button
                        data-cy="accept"
                        variant="text"
                        color="blue"
                        onClick={() => {
                            handleOpen();
                            handleAccept();
                        }}
                        className="mr-1"
                    >
                        <span>Accepter</span>
                    </Button>
                    <Button
                        data-cy="refuse"
                        variant="gradient"
                        color="red"
                        onClick={() => {
                            handleOpen();
                            handleRefuse();
                        }}
                    >
                        <span>Refuser</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}
