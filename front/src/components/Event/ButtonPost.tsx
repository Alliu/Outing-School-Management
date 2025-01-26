import { Button } from "@material-tailwind/react";
import React from "react";

export const ButtonPost = (props: { title: string }) => {
    return (
        <>
            <Button
                type="submit"
                color="gray"
                size="sm"
                className="bg-cool-blue border-0 w-20 ml-10 shadow-lg shadow-gray-600 text-base mb-8 normal-case"
                fullWidth
                placeholder={undefined}
            >
                {props.title}
            </Button>
        </>
    );
};
