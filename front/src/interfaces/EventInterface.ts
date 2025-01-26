export interface taskInterface {
    title: string;
    description: string;
}

export interface EventInterface {
    event: {
        id?: number;
        organiser_id?: number;
        title: string;
        date_start: Date;
        date_end?: Date;
        place: string;
        address?: string | null;
        description: string;
        budget: number;
        detail?: string;
        task?: [] | taskInterface[];
        theme: Category;
        created_at?: Date;
        updated_at?: Date;
        askHelp: boolean;
        path?: string;
    };
}

export enum Category {
    CULTUREL = 0,
    SPORT = 1,
    CULINAIRE = 2,
    FETE = 3,
    VENTE = 4,
    EXCURSION = 5,
}

export interface EventClasseInterface {
    id: number;
    title: string;
    date: string | Date;
    imgPath: string;
}
