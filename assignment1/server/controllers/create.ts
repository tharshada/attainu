import { NextFunction, Request, Response } from 'express';
import mongoose = require('mongoose');
import logging from '../config/logging';
import { IRestaurant, IRestaurantSeachRequestBody } from '../interfaces/restaurant';
import Restaurant from '../models/restaurants';

const restaurant = (req: Request, res: Response, next: NextFunction) => {
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
    restaurant
};