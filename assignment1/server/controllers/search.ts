import { NextFunction, Request, Response } from 'express';
import mongoose = require('mongoose');
import logging from '../config/logging';
import { IRestaurant, IRestaurantSeachRequestBody } from '../interfaces/restaurant';
import Restaurant from '../models/restaurants';

const restaurants = (req: Request, res: Response, next: NextFunction) => {

    const { name, place, cuisine, sortByPrice } = req.body as IRestaurantSeachRequestBody;
    logging.info(`Looking for restaurants with ${name} ${place} ${cuisine}`);
    let query = { };
    if(name) {
        query = {...query, name: name}
    }
    if(place) {
        query = {...query, ...place}
    }
    if(cuisine) {
        query = {...query, cuisines: cuisine}
    }
    console.log(query);
    Restaurant.find(query).sort(sortByPrice ? {"pricePerPerson.value": sortByPrice > 0 ? 1:-1}:{})
        .exec()
        .then((result) => {
            return res.status(200).json({
                results: result
            });
        })
        .catch((error) => {
            logging.error(error.message);

            return res.status(500).json({
                error: error.message
            });
        });
};

const create = (req: Request, res: Response, next: NextFunction) => {
    logging.info('Attempting to onboard restaurant...');

    const restaurant = new Restaurant({
        _id: new mongoose.Types.ObjectId(),
        ...req.body as IRestaurant
    });

    return restaurant
        .save()
        .then((newRestaurant) => {
            logging.info(`New restaurant onboarded`);

            return res.status(201).json({ restaurant: newRestaurant });
        })
        .catch((error) => {
            logging.error(error.message);

            return res.status(500).json({
                message: error.message
            });
        });
};

export default {
    restaurants,
    create
};