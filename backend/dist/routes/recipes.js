import { Router } from 'express';
import { getAll, search } from '../controllers/recipes.controller.js';
const router = Router();
router.get('/', getAll);
router.get('/search', search);
export default router;
