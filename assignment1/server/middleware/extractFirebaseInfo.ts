import logging from '../config/logging';
import firebaseAdmin = require('firebase-admin');
import { Request, Response, NextFunction } from 'express';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

const extractFirebaseInfo = (req: Request, res: Response, next: NextFunction) => {
    logging.info('Validating firebase token');

    let token = req.headers.authorization?.split(' ')[1];

    if (token) {
        firebaseAdmin
            .auth()
            .verifyIdToken(token)
            .then((decodedToken: DecodedIdToken) => {
                if (decodedToken) {
                    res.locals.firebase_decoded_token = decodedToken;
                    res.locals.firebase_token = token;
                    logging.info('User authorized');
                    next();
                } else {
                    logging.warn('Token invalid, Unauthorized');

                    return res.status(401).json({
                        message: 'Unauthorized'
                    });
                }
            })
            .catch((error: any) => {
                logging.error(error);

                return res.status(401).json({
                    error,
                    message: 'Unauthorized'
                });
            });
    } else {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }
};

export default extractFirebaseInfo;