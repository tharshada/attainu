export interface ISortButtonProps{
    onClick:(event: any, data: number)=>void;
    initialState?: SortStates;
};

export type SortStates = 'NONE' | 'ASC' | 'DSC';