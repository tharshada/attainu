import mongoose = require('mongoose');
import { Schema } from 'mongoose';
import {IRestaurant} from '../interfaces/restaurant';

const RestaurantSchema: Schema = new Schema(
    {
        name: { type: String },
        description: { type: String },
        imageURLs: { type: [String] },
        address: { buildingName: {type: String}, area: {type: String}, city: {type: String}, country: {type: String} },
        location: {latitute: {type:Number}, longitude: {type: Number}},
        cuisines: { type: [String]},
        pricePerPerson: {value:{type:Number}, unit: {type: String}}
    }
);

export default mongoose.model<IRestaurant>('Restaurant', RestaurantSchema);