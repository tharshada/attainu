import { IPageProps } from "../../interfaces";

export interface ISignOutPageProps extends IPageProps{};

export interface ISignoutPageState {
    pending: boolean;
    message: string;
};