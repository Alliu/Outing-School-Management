import { Button } from "@material-tailwind/react";

export const ButtonClickYellow = ({ title, onclick }: any) => {
    return (
        <>
            <Button
                type="button"
                color="gray"
                size="md"
                className="w-auto px-4 py-2 text-base normal-case border-0 shadow-lg text-cool-blue bg-cool-yellow shadow-gray-600"
                fullWidth
                placeholder={undefined}
                onClick={onclick}
            >
                {title}
            </Button>
        </>
    );
};
