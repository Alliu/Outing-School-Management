import { Button } from "@material-tailwind/react";

export const ButtonClickBlue = ({title}:any) => {
    return (
        <>
            <Button
                type="button"
                color="gray"
                size="md"
                className="w-auto px-4 py-2 mx-auto text-base text-white normal-case border-0 shadow-lg bg-cool-blue shadow-gray-600"
                fullWidth
                placeholder={undefined}
            >
                {title}
            </Button>
        </>
    );
};