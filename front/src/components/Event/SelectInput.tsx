import { Select, Option, Typography } from "@material-tailwind/react";

export function SelectInput(props) {
    const { title, onChange, EnumProps, id, name } = props;
    const enumKeys = [];
    const enumProp = EnumProps;
    for (const value in enumProp) {
        enumKeys.push(value);
    }
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
            <Select
                name={name}
                id={id}
                label=""
                placeholder={undefined}
                onChange={onChange}
            >
                {enumKeys
                    .filter((enumKey) => isNaN(Number(enumKey)))
                    .map((enumString: string, index: number) => (
                        <Option key={index} value={enumString}>
                            {enumString}
                        </Option>
                    ))}
            </Select>
        </div>
    );
}
