import { Typography } from "@material-tailwind/react";
import { EventInterface } from "../../interfaces/EventInterface";
import { NoResults } from "./Results";
import { RecreateEventButton } from "./RecreateEventButton";

interface ResultsInterface {
    results: EventInterface[] | undefined;
    handleResult: () => void;
    clicked: boolean;
    fillEventProps: (event: EventInterface) => void;
}

export default function SearchResults(props: ResultsInterface) {
    const { results, handleResult, clicked, fillEventProps } = props;

    if (results?.length == 0) {
        return <NoResults />;
    } else {
        return (
            <>
                <Typography
                    variant="h6"
                    color="blue-gray"
                    className="text-cool-blue mt-2"
                    placeholder={undefined}
                >
                    Résultat(s)
                </Typography>
                {results?.map((result: EventInterface, index: number) => (
                    <ul
                        className="border-2 rounded-md mx-6 my-4 py-2 "
                        key={index}
                    >
                        <li className="text-xl text-gray-900">
                            {result.title}
                        </li>
                        <li className="text-md text-gray-600">
                            A eu lieu le {result.date.toString()} à{" "}
                            {result.place}
                        </li>
                        <li>
                            <RecreateEventButton
                                title="Réorganiser cet événement"
                                fillEventProps={fillEventProps}
                                results={results}
                                id={result.id}
                            />
                        </li>
                    </ul>
                ))}
                <button
                    type="button"
                    className={clicked ? "hidden" : "underline"}
                    onClick={handleResult}
                >
                    Voir plus
                </button>
            </>
        );
    }
}
