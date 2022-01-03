import { IOption } from "../../interfaces";

export interface ISearchBoxProps {
    onClick: (event: any, data: ISeachBoxState) => void;
    buttonText: string;
    options: IOption[];
};

export interface ISeachBoxState {
    keyword: string;
    option: string;
}

export const INITIAL_STAGE: ISeachBoxState = { keyword: "", option: "restaurant" };