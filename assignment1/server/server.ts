import http = require('http');
import express = require('express');
import logging from './config/logging';
import config from './config/config';
import mongoose = require('mongoose');
import userRoutes = require('./routes/user');
import searchRoutes = require('./routes/search');
import createRoutes = require('./routes/create');
import { credential } from 'firebase-admin';
import * as firebaseAdmin from "firebase-admin";

const router = express();

/** Server Handling */
const httpServer = http.createServer(router);

/** Connect to Firebase */
const serviceAccount = require('./config/serviceAccountKey.json');

try {
    const firebaseAdminApp = firebaseAdmin.initializeApp({
        credential: credential.cert(serviceAccount),
        // databaseURL: 'https://<DATABASE_NAME>.firebaseio.com'
    });
} catch (error) {
    logging.error(error);
}

/** Connect to Mongo */
mongoose
    .connect(config.mongo.url, config.mongo.options)
    .then((result) => {
        logging.info('Mongo Connected');
    })
    .catch((error) => {
        logging.error(error);
    });

/** Log the request */
router.use((req, res, next) => {
    logging.info(`METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        logging.info(`METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    });

    next();
});

/** Parse the body of the request */
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

/** Rules of our API */
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});

/** Routes */
router.use('/user', userRoutes);
router.use('/search', searchRoutes);
router.use('/create', createRoutes);

/** Error handling */
router.use((req, res, next) => {
    const error = new Error('Not found');

    res.status(404).json({
        message: error.message
    });
});

/** Listen */
httpServer.listen(config.server.port, () => logging.info(`Server is running ${config.server.host}:${config.server.port}`));