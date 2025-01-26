import { useApi } from "../../hook/useApi/useApi";
import { AxiosError } from "axios";

const api = useApi();

export const uploadFile = async (
    file: string,
    user_id: string,
    child_id?: string
): Promise<string> => {
    try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("owner_id", user_id);
        if (child_id) formData.append("child_id", child_id);
        console.log(file);
        const { data } = await api.post("/upload/miscellaneous", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return data;
    } catch (error: any) {
        if (error instanceof AxiosError) {
            throw new AxiosError(error.message);
        }
        if (error.response) {
            console.error("Erreur API :", error.response.data);
            console.error("Statut :", error.response.status);
            console.error("Headers :", error.response.headers);
        } else {
            console.error("Erreur sans réponse :", error.message);
        }
        throw error;
    }
};
