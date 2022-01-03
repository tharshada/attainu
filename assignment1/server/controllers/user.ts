import { NextFunction, Request, Response } from 'express';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import logging from '../config/logging';
import IUser from '../interfaces/user';

const authorize = (req: Request, res: Response, next: NextFunction) => {
    const firebase_token : string = res.locals.firebase_token;

    const firebase_decoded_token: DecodedIdToken = res.locals.firebase_decoded_token;
    const user: IUser = { name: firebase_decoded_token.email || '', uid: firebase_decoded_token.uid};
    return res.status(200).json({ user, firebase_token });
};

export default {
    authorize
};