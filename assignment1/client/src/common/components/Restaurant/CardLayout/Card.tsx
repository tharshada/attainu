import React from "react";
import { Slider } from "../../Slider/Slider";
import "./Card.css";
import { ICardProps } from "./Card.types";
import { Image } from "../../Image/Image";
import { IItem } from "../../../interfaces";

export const Card: React.FunctionComponent<ICardProps> = (props) => {
  const { imageURLs, name, description, cuisines, pricePerPerson, address } =
    props;

  const onRenderSliderItems = (item: string, index: number) => (
    <Image imageURL={item} altText={`Image#${index}`} />
  );
  const sliderItems: IItem<string>[] = imageURLs.map((imageURL) => {
    return { item: imageURL, renderer: onRenderSliderItems };
  });

  return (
    <div className={"card-wrapper"}>
      <Slider items={sliderItems} />
      <div className={"card-details"}>
        <div className={"title"}>{name}</div>
        <h5 className="sub_title">{cuisines.join(", ")}</h5>
        <p className={"description"}>{description}</p>
        <div className={"post-meta"}>
          <span className={"price"}>
            {" "}
            <i>{pricePerPerson.unit}</i> {pricePerPerson.value}{" "}
            <small>per person approx.</small>
            <br />
          </span>
          <span className={"address"}>
            {address.buildingName}, {address.area}, {address.city},{" "}
            {address.country}
          </span>
        </div>
      </div>
    </div>
  );
};
