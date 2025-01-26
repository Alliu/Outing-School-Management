export interface ContactInterface {
    isTeacher: ProfContactInterface[] | [];
    isParent: ParentContactInterface[] | [];
}
export interface ProfContactInterface {
    id: number;
    firstname: string;
    lastname: string;
    role: Role.teacher;
    schoolName: string;
    imgPath?: string;
}
export enum Role {
    teacher,
    parent,
}

export interface ParentContactInterface {
    id: number;
    firstname: string;
    lastname: string;
    role: Role.parent;
    childFirsname?: string;
    childLastname?: string;
    schoolName?: string;
    level?: Level;
    imgPath?: string;
}

export enum Level {
    TPS,
    PS,
    MS,
    GS,
    CP,
    CE1,
    CE2,
    CM1,
    CM2,
}
