import express from 'express';
import { createSettings, getSettingsData } from '../controllers/settingsController.js';


const router = express.Router();


router.route('/').get(getSettingsData);
router.route('/new').post(createSettings);

export default router;