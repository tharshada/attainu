import React, { useState } from "react";
import { INITIAL_STAGE, ISeachBoxState, ISearchBoxProps } from "./SearchBox.types";

export const SearchBox: React.FunctionComponent<ISearchBoxProps> = (props) => {
  const [state, setState] = useState<ISeachBoxState>(INITIAL_STAGE);

  const handleClick = (event: any) => {
    event.preventDefault();
    props.onClick(event, { ...state });
  };
  const handleChangeOption = (event: any) => {
    event.preventDefault();
    setState({ option: event.target.value, keyword: state.keyword });
  };

  const handleOnChangeInput = (event: any) => {
    event.preventDefault();
    setState({ option: state.option, keyword: event.target.value });
  };
  const { options, buttonText } = props;
  return (
    <>
      <select
        name="searchType"
        id="searchOptions"
        value={state.option}
        onChange={handleChangeOption}
        className={"commonClass"}
      >
        {options.map((item, index) => (
          <option className={"options"} value={item.key} key={index.toString()}>
            {item.value}
          </option>
        ))}
      </select>
      <input
        type={"text"}
        maxLength={40}
        value={state.keyword}
        onChange={handleOnChangeInput}
        className={"inputBox commonClass"}
        placeholder={"Type in here"}
      ></input>
      <button className={"button"} onClick={handleClick}>
        {buttonText}
      </button>
    </>
  );
};
