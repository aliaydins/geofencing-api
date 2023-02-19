import express from 'express';
import { eventHandler, getAll, healthCheck } from '../controller';

const router = express.Router();

router.get('/health', healthCheck);
router.post('/event', eventHandler);
router.get('/', getAll);

export default router;
