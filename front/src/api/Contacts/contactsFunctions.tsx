import { ContactInterface, Role } from "../../interfaces/ContactsInterface";

import { useApi } from "../../hook/useApi/useApi";
const api = useApi();

export const getUserContacts = async (
    id: number
): Promise<ContactInterface> => {
    try {
        const { data } = await api.get(`/user/contact?userid=${id}`);
        const teachers = data.teachers.map((teacher) => {
            return {
                id: teacher.id,
                firstname: teacher.firstname,
                lastname: teacher.lastname,
                role: Role.teacher,
                schoolName: teacher.teacher_school[0].school["name"],
            };
        });
        const parents = data.parents.map((parent) => {
            return {
                id: parent.id,
                firstname: parent.firstname,
                lastname: parent.lastname,
                role: Role.parent,
            };
        });
        return { isTeacher: teachers, isParent: parents };
    } catch (error: any) {
        return error;
    }
};

export async function contactsById(lastname: string, firstname?: string) {
    try {
        const { data } = await api.get(
            `user/contact?lastname=${lastname}&firstname=${
                firstname ? firstname : ""
            }`
        );
        return data;
    } catch (error) {
        return new Error("Contacts not found");
    }
}
