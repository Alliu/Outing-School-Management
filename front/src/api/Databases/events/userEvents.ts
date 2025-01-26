import { EventInterface } from "../../../interfaces/EventInterface";
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export const findEventsByDate = (
    userEvents: EventInterface[],
    date: Date | Value
) => {
    return userEvents.filter(
        (event) =>
            new Date(event.event.date_start).getDate() ==
                new Date(+date).getDate() &&
            new Date(event.event.date_start).getMonth() ==
                new Date(+date).getMonth()
    );
};
