import React from 'react';
import { IImageProps } from './Image.types';
import './Image.css';

export const Image: React.FunctionComponent<IImageProps> = (props)=>{
    const {imageURL, altText} = props;
    // key ??
    return <img src={imageURL} className={"Image-logo"} alt={altText || "Image"} />;
}
