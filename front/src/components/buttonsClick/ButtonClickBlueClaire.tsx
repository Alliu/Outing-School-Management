import { Button } from "@material-tailwind/react";

export const ButtonClickBlueClaire = ({ title, onClick }: any) => {
    return (
        <>
            <Button
                type="button"
                color="gray"
                size="md"
                onClick={onClick}
                className="w-auto px-4 py-2 text-base normal-case border-0 shadow-lg bg-cool-blueClaire text-cool-blue shadow-gray-600"
                fullWidth
                placeholder={undefined}
            >
                {title}
            </Button>
        </>
    );
};
