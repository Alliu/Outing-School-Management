export interface SignUpTeacherInterface {
    lastname: string;
    firstname: string;
    teacher_email: string;
    password: string;
    school_name: string;
    school_cp: string;
    school_address: string;
    terms: boolean;
}

export interface SignUpParentInterface {
    lastname: string;
    firstname: string;
    email: string;
    password: string;
    terms: boolean;
}
