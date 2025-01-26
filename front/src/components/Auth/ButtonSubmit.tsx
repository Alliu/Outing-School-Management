import { Button } from "@material-tailwind/react";
import React from "react";

export const ButtonSubmit = (props: { title: string }) => {
    return (
        <>
            <Button
                data-cy="submit"
                type="submit"
                color="gray"
                size="md"
                className="mt-12 bg-cool-blue border-0 w-56 mx-auto shadow-lg shadow-gray-600 text-base mb-8 normal-case"
                fullWidth
                placeholder={undefined}
            >
                {props.title}
            </Button>
        </>
    );
};
