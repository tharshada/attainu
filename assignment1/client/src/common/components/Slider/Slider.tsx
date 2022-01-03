import React, { useState } from "react";
import { ISliderProps } from "./Slider.types";
import "./Slider.css";

export const Slider: React.FunctionComponent<ISliderProps> = (props) => {
  // key ??
  const [imgIndex, SetImgIndex] = useState<number>(0);

  const { items } = props;

  const onClick = (event: any) => {
    event.preventDefault();
    const { id } = event.target;
    if (id === "back" && imgIndex > 0) {
      SetImgIndex(imgIndex - 1);
    } else if (id === "next" && imgIndex + 1 < items.length) {
      SetImgIndex(imgIndex + 1);
    }
  };

  const item = items[imgIndex];

  return (
    <div className={"slider-wrapper"}>
      <a className={"prev" + (imgIndex===0?" disabled":"")} onClick={onClick} href=" " id="back">
        &uarr;
      </a>
      <div className={"image-container"}>
        {item.renderer(item.item, imgIndex)}
      </div>
      <a className={"next" + (imgIndex===items.length-1?" disabled":"")} onClick={onClick} href=" " id="next">
        &darr;
      </a>
    </div>
  );
};
