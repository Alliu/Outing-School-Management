import { SurveyInterface } from "../../interfaces/SurveyInterface";
export const getAllSurveys = async () => {
    try {
        const response = surveysfakers.datas;
        return response;
    } catch (error) {
        return error;
    }
};

export const createSurvey = async (
    survey: SurveyInterface
): Promise<SurveyInterface> => {
    try {
        const data = await surveysfakers.datas;
        console.log(data);
        return survey;
    } catch (error) {
        return error;
    }
};

export const getUserSurveys = async () => {
    try {
        const response = await userSurveysfakers.datas;
        return response;
    } catch (error) {
        return error;
    }
};

export const getSurveyById = async (id: number) => {
    try {
        const data = surveysfakers.datas;
        if (data) {
            const response = data.find((survey) => survey.id == id);
            return response;
        }
    } catch (error) {
        return error;
    }
};
