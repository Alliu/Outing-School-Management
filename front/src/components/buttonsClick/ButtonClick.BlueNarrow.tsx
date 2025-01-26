import { Button } from "@material-tailwind/react";

export const ButtonClick = ({ title }: any) => {
    return (
        <>
            <Button
                type="button"
                color="gray"
                size="md"
                className="w-auto px-2 py-1 mx-auto text-base normal-case border-0 shadow-lg bg-cool-blueClaire text-cool-blue shadow-gray-600"
                fullWidth
                placeholder={undefined}
            >
                {title}
            </Button>
        </>
    );
};
