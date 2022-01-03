import express = require('express');
import controller from '../controllers/create';
import extractFirebaseInfo from '../middleware/extractFirebaseInfo';

const router = express.Router();

router.post('/restaurant', controller.restaurant);
export = router;