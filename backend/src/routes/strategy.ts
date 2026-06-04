// backend/src/routes/strategy.ts
import express from 'express';
import strategyController from '../controllers/strategyController';
// import authMiddleware from '../middleware/auth';   // ← Comment this out

const router = express.Router();

router.post('/', strategyController.createStrategy);           // No auth for now
router.get('/', strategyController.getUserStrategies);
router.get('/:id', strategyController.getStrategyById);
router.put('/:id', strategyController.updateStrategy);

export default router;