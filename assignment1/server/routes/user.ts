import express = require('express');
import controller from '../controllers/user';
import extractFirebaseInfo from '../middleware/extractFirebaseInfo';

const router = express.Router();

router.get('/authorize', extractFirebaseInfo, controller.authorize);

export = router;