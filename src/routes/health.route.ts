import { Router } from 'express';
import { HealthController } from '../controllers/health.controller';

const router = Router();

/**
 * @swagger
 * /health:
 *   get:
 *     tags: [Health]
 *     summary: Basic health check
 *     responses:
 *       200:
 *         description: Health status
 */
router.get('/', HealthController.checkHealth);

/**
 * @swagger
 * /health/details:
 *   get:
 *     tags: [Health]
 *     summary: Detailed health check
 *     responses:
 *       200:
 *         description: Detailed health status
 */
router.get('/details', HealthController.detailedHealth);

export const healthRoutes = router;