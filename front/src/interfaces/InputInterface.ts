export interface InputInterface {
    title: string;
    id: string;
    type: string;
    name: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent) => void;
    value?: string | number;
    role?: string;
}
