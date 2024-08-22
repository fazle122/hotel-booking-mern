import express from 'express';
import { getAllCabins,createCabin, deleteCabin, getCabinData, editCabin } from '../controllers/cabinController.js';


const router = express.Router();

router.route('/').get(getAllCabins);
router.route('/new').post(createCabin);
router.route('/:id').get(getCabinData).put(editCabin).delete(deleteCabin)

export default router;