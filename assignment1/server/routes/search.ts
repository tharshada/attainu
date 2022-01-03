import express = require('express');
import controller from '../controllers/search';
import extractFirebaseInfo from '../middleware/extractFirebaseInfo';

const router = express.Router();

router.post('/restaurants', extractFirebaseInfo, controller.restaurants);
router.post('/create', controller.create);
export = router;