import axios, { AxiosError } from "axios";
import { useApi } from "../../hook/useApi/useApi";
import { SigninInterface } from "../../interfaces/SigninInterface";
import {
    Role,
    UserProfileInterface,
} from "../../interfaces/UserProfileInterface";
import {
    SignUpParentInterface,
    SignUpTeacherInterface,
} from "../../interfaces/SignUpTeacherInterface";

export interface deleteNotifInterface {
    userid: string;
    notifid: string;
}

export interface NotifInterface {
    userid: string;
    id: number;
    photo: string;
    profile: string;
    role: Role;
    mediaId?: string;
    eventId?: number;
    contactId?: number;
    type: NotifType;
}
const enum NotifType {
    CONTACT = "CONTACT",
    EVENT = "EVENT",
    SURVEY = "SURVEY",
    FILE = "FILE",
    MESSAGE = "MESSAGE",
}
const api = useApi();
//import axios from "axios";

type UserProfileResponse = {
    data: UserProfileInterface;
    userError: string | [] | null;
};

export const signIn = async (
    body: SigninInterface
): Promise<UserProfileResponse> => {
    try {
        const { data } = await api.post("/auth/signin", body);
        if (data.access_token) {
            localStorage.setItem("access_token", data.access_token);
        }
        return {
            data: data.user,
            userError: null,
        };
    } catch (error) {
        const userError = error.response.data.message;
        return {
            data: {
                id: 0,
                lastname: "",
                firstname: "",
                role: Role.PARENT,
                isLogged: false,
            },
            userError: userError,
        };
    }
};

export const signOut = async () => {
    try {
        const { data } = await api.get("/auth/logout");
        //  console.log(data);
        return data;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new AxiosError(error.message);
        }
        throw new Error("Une erreur inconnue est survenue.");
    }
};

type retrieveProfileResponse = {
    data: UserProfileInterface;
    userError: string | [] | null;
};
export const getUserProfile = async (): Promise<retrieveProfileResponse> => {
    try {
        const { data } = await api.get("/auth/profile");
        console.log(data.user);
        return {
            data: data.user,
            userError: null,
        };
    } catch (error) {
        signOut();
        const userError = error.response.data.message;
        return {
            data: {
                id: 0,
                lastname: "",
                firstname: "",
                role: Role.PARENT,
                isLogged: false,
            },
            userError: userError,
        };
    }
};

type SignupResponse = {
    data: number;
    signupError: string | [] | null;
};
export const signupTeacher = async (
    user: SignUpTeacherInterface
): Promise<SignupResponse> => {
    try {
        const { data } = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/auth/signup_teacher`,
            user
        );
        //  console.log(data.user);
        return {
            data: data.user,
            signupError: null,
        };
    } catch (error) {
        const signupError = error.response.data.message;
        return {
            data: 0,
            signupError: signupError,
        };
    }
};

export const signupParent = async (
    body: SignUpParentInterface
): Promise<SignupResponse> => {
    try {
        const { data } = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/auth/signup_parent`,
            body
        );
        //console.log(data.user);
        return {
            data: data.user,
            signupError: null,
        };
    } catch (error) {
        const signupError = error.response.data.message;
        return {
            data: 0,
            signupError: signupError,
        };
    }
};

export const getUserMessages = async (
    user_id: number,
    contact_id: number
): Promise<[]> => {
    try {
        const { data } = await axios.get(
            `${
                import.meta.env.VITE_API_BASE_URL
            }/user/messages?userid=${user_id}&contactid=${contact_id}`
        );
        return data;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new AxiosError(error.message);
        }
        throw new Error("Une erreur inconnue est survenue.");
    }
};

export const getUserFullname = async (
    id: string | undefined
): Promise<string> => {
    try {
        const { data } = await api.get(`/user/profile?contactid=${id}`);

        return data.firstname + " " + data.lastname;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new AxiosError(error.message);
        }
        throw new Error("Une erreur inconnue est survenue.");
    }
};

export const getUserNotif = async (user_id: number): Promise<[]> => {
    try {
        const { data } = await axios.get(
            `${
                import.meta.env.VITE_API_BASE_URL
            }/user/notifications?userid=${user_id}`
        );
        console.log(data);
        return data.map((notif) => {
            return {
                userid: user_id,
                id: notif.notification.id,
                photo: notif.notification.media_id,
                profile: "",
                role: "PARENT",
                mediaId: notif.notification.media_id,
                eventId: notif.notification.event_id,
                contactId: notif.notification.contact_id,
                type: notif.notification.type,
            };
        });
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new AxiosError(error.message);
        }
        throw new Error("Une erreur inconnue est survenue.");
    }
};

export const deleteNotif = async (
    body: NotifInterface
): Promise<deleteNotifInterface> => {
    try {
        const { data } = await api.post(`/notifications`, body);
        return data;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new AxiosError(error.message);
        }
        throw new Error("Une erreur inconnue est survenue.");
    }
};
