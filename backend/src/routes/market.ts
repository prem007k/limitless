// backend/src/routes/market.ts
import express from 'express';
import marketController from '../controllers/marketController';

const router = express.Router();

router.get('/symbols', marketController.getAvailableSymbols);
router.post('/replay', marketController.startReplay);

export default router;