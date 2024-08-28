import express from 'express';
import { getAllCabins,createCabin, deleteCabin, getCabinData, editCabin,uploadCabinImages, deleteCabinImage, getAvailableCabins, } from '../controllers/cabinController.js';
import {protect,adminProtect} from '../middleware/authMiddleware.js'


const router = express.Router();

router.route('/').get(getAllCabins);
router.route('/top').get(getAvailableCabins);
router.route('/new').post(createCabin);
router.route('/:id').get(getCabinData).put(editCabin).delete(deleteCabin)
router.route('/:id/upload_images').put(protect,adminProtect,uploadCabinImages);
router.route('/:id/delete_image').put(protect,adminProtect,deleteCabinImage);

export default router;