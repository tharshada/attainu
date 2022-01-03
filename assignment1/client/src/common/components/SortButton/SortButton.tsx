import React, { useState } from "react";
import { ISortButtonProps, SortStates } from "./SortButton.types";
import "./SortButton.css";

export const SortButton: React.FunctionComponent<ISortButtonProps> = (props) => {
    const [sort, setSort] = useState<SortStates>(props.initialState || 'NONE');
    const handleClick = (event: any)=>{
        if(sort === 'NONE' || sort === 'DSC') {
            setSort('ASC');
            props.onClick(event, 1);
        } else if (sort === 'ASC') {
            setSort('DSC');
            props.onClick(event, -1);
        }
    }
    const up = <b>&uarr;</b>;
    const down = <b>&darr;</b>;
    return <button className={"sortButton"} onClick={handleClick}>{"Price "}{sort ==='ASC' ? down: up }</button>;
}