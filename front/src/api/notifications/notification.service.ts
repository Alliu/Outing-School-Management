import { AxiosError } from "axios";
import { useApi } from "../../hook/useApi/useApi";

const api = useApi();
export const notifiateUserContacts = async (
    body: EventNotification
): Promise<void> => {
    try {
        const { data } = await api.post("/notifications", body);
        return data;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new AxiosError(error.message);
        }
        throw new Error("Une erreur inconnue est survenue.");
    }
};

export interface EventNotification {
    userId: number;
    mediaId?: number;
    eventId?: number;
    contactId?: number;
    message: string;
}
