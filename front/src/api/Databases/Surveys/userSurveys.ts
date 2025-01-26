import { surveysfakers } from "./surveys";

const surveys = surveysfakers.datas;
const userSurveysId = [1, 2, 3, 4];

export const userSurveys = userSurveysId.map((surveyId) =>
    surveys.find((survey) => survey?.id == surveyId)
);

export const userSurveysfakers = {
    datas: userSurveys,
};
