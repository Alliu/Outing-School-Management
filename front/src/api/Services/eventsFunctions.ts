import { EventInterface } from "../../interfaces/EventInterface";
import { useApi } from "../../hook/useApi/useApi";
import { AxiosError } from "axios";

const api = useApi();

export const getAllEvents = async (
    userid: number
): Promise<EventInterface[] | []> => {
    try {
        const { data } = await api.get(`/event?userid=${userid}`);
        return data.map((event: EventInterface) => event);
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new AxiosError(error.message);
        }
        throw new Error("Une erreur inconnue est survenue.");
    }
};

export const createEvent = async (event: EventInterface) => {
    try {
        const { data } = await api.post("/event", event.event);
        console.log("event du back", data);
        return (event = { event: data });
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new AxiosError(error.message);
        }
        throw new Error("Une erreur inconnue est survenue.");
    }
};

export const getUserEvents = async (
    id: number
): Promise<EventInterface[] | []> => {
    try {
        const { data } = await api.get(`/user/event?userid=${id}`);
        return data.map((event: EventInterface) => event);
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new AxiosError(error.message);
        }
        throw new Error("Une erreur inconnue est survenue.");
    }
};

export const deleteUserEvent = async (eventId: number) => {
    try {
        const { data } = await api.delete(`/event?id=${eventId}`);
        console.log(data);
        return data;
    } catch (error) {
        return error;
    }
};
