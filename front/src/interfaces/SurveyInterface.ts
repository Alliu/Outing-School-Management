import { Category } from "./EventInterface";

export interface SurveyInterface {
    id: number;
    title: string;
    date: string | Date;
    category: Category;
    place: string;
    author: string;
    budget: number;
    description: string;
    imgPath: string;
    numberOfInterestedPerson: number;
}
