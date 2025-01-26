import { RxCross2 } from "react-icons/rx";
import { Input } from "@material-tailwind/react";
import { useState } from "react";

export function SearchInput(props) {
    const { handleSearch, handleResults, resetResults } = props;

    const [inputChange, setInputChange] = useState("");
    const handleChange = ({ target }) => {
        setInputChange(target.value);
        //    console.log("target :" + target.value, inputChange);
        handleSearch(inputChange);
        handleResults();
    };
    const reset = () => {
        console.log("cliké");
        setInputChange("");
        resetResults();
    };
    return (
        <div className="w-72 m-auto ">
            <h2 className="text-cool-blue text-md text-center font-bold">
                Rechercher un événement passé
            </h2>
            <Input
                value={inputChange ? inputChange : ""}
                label="rechercher par titre"
                icon={
                    inputChange ? (
                        <button type="button" onClick={reset}>
                            <RxCross2 />
                        </button>
                    ) : null
                }
                crossOrigin={undefined}
                onChange={handleChange}
            />
        </div>
    );
}
