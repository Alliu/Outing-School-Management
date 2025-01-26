export const enum Role {
    TEACHER = "TEACHER",
    PARENT = "PARENT",
}

export interface UserProfileInterface {
    id: number;
    lastname: string;
    firstname: string;
    role: Role;
    isLogged: boolean;
    path?: string;
}
