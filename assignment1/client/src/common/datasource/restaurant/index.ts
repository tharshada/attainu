import axios from 'axios';
import config from '../../../config/config';
import logging from '../../../config/logging';
import { IAddress, IDictionary, IRestaurant } from '../../interfaces';

const NAMESPACE = 'Restaurant';

export const Search = async (accessToken: string, requestBody: ISearchPayload, callback: (error: string | null, result: IRestaurant[] | null) => void) => {
    try {
        let response = await axios({
            method: 'POST',
            url: `${config.server.url}/search/restaurants`,
            headers: { Authorization: `Bearer ${accessToken}` },
            data: { ...requestBody }
        });

        if (response.status === 200 || response.status === 201 || response.status === 304) {
            logging.info('Successfully fetched restaurants.', NAMESPACE);
            console.log('response');
            console.log(response);
            callback(null, response.data.results);
        } else {
            logging.warn('Unable to fetch results.', NAMESPACE);
            callback('Unable to fetch results.', null);
        }
    } catch (error) {
        logging.error(error, NAMESPACE);
        callback('Unable to fetch results.', null);
    }
};

export interface ISearchPayload {
    sortByPrice?: number,
    place?: IDictionary,
    cuisine?: string;
    name?: string;
}