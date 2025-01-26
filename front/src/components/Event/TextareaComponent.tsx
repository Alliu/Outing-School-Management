import { Textarea, Typography } from "@material-tailwind/react";

export const TextareaComponent = (props) => {
    const { title, id, name, onChange } = props;

    return (
        <div className="px-12 ">
            <label htmlFor="lastname">
                <Typography
                    variant="lead"
                    className="block mb-2 text-black"
                    placeholder={undefined}
                >
                    {title}
                </Typography>
            </label>

            <Textarea
                onChange={onChange}
                id={id}
                name={name}
                className="pt-0 pb-0 pl-2 placeholder:opacity-100 focus:border-t-primary"
            />
        </div>
    );
};
