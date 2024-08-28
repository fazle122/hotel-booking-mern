import express from 'express'
import { getPaymet } from '../controllers/paymentController.js';



const router = express.Router();



router.post('/getPayment',getPaymet)

export default router;