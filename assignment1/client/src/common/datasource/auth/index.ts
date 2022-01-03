import axios from 'axios';
import config from '../../../config/config';
import logging from '../../../config/logging';
import { IUser } from '../../interfaces';

const NAMESPACE = 'Auth';

export const Authorize = async (accessToken: string, callback: (error: string | null, user: IUser | null) => void) => {
    try {
        let response = await axios({
            method: 'GET',
            url: `${config.server.url}/user/authorize`,
            headers: { Authorization: `Bearer ${accessToken}` }
        });

        if (response.status === 200 || response.status === 201 || response.status === 304) {
            logging.info('Successfully authenticated.', NAMESPACE);
            callback(null, response.data.user);
        } else {
            logging.warn('Unable to authenticate.', NAMESPACE);
            callback('Unable to authenticate.', null);
        }
    } catch (error) {
        logging.error(error, NAMESPACE);
        callback('Unable to authenticate.', null);
    }
};