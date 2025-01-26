import { Input, Typography } from "@material-tailwind/react";
import { InputInterface } from "../../interfaces/InputInterface";
import React from "react";

export const InputComponent = (props: InputInterface) => {
    const { title, id, type, name, placeholder, onChange, role } = props;

    return (
        <div className="px-12 mt-4 mb-6">
            <label htmlFor="lastname">
                <Typography
                    variant="lead"
                    className="block mb-2 text-black"
                    placeholder={undefined}
                >
                    {title}
                </Typography>
            </label>

            <Input
                role={role}
                required
                onChange={onChange}
                id={id}
                type={type}
                name={name}
                color="gray"
                size="md"
                placeholder={placeholder}
                className="pt-0 pb-0 pl-2 placeholder:opacity-100 focus:border-t-primary border-t-gray-400"
                labelProps={{
                    className: "hidden",
                }}
                crossOrigin={undefined}
            />
        </div>
    );
};
