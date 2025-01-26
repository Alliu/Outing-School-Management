import { Button } from "@material-tailwind/react";

export const RecreateEventButton = (props) => {
    const { title, id, fillEventProps, results } = props;

    const getEventById = (id: number) => {
        return results.find((result) => result.id == id);
    };
    const copyEventProps = () => {
        const event = getEventById(id);
        //    console.log(event);
        fillEventProps(event);
    };

    return (
        <>
            <Button
                type="button"
                color="gray"
                size="sm"
                className="bg-cool-blue border-0 w-50 text-sm mx-auto normal-case my-2"
                fullWidth
                placeholder={undefined}
                onClick={copyEventProps}
            >
                {title}
            </Button>
        </>
    );
};
