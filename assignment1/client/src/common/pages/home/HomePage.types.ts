import { ISeachBoxState, INITIAL_STAGE as SearchBox_INITIAL_STAGE } from "../../components/SerachBox/SearchBox.types";
import { IPageProps, IRestaurant } from "../../interfaces";

export interface IHomePageProps extends IPageProps { }

export interface IHomePageState {
    isLoading: boolean;
    restaurants: IRestaurant[];
    search: ISeachBoxState;
    filter: ISeachBoxState;
    sort: number;
}

export const INITIAL_STAGE: IHomePageState = {
    isLoading: true,
    restaurants: [],
    search: SearchBox_INITIAL_STAGE,
    filter: SearchBox_INITIAL_STAGE,
    sort: 1
};
