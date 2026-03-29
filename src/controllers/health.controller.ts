import { Request, Response } from 'express';
import mongoose from 'mongoose';

/**
 * Health check controller for monitoring backend status
 */
export class HealthController {
  /**
   * GET /health - Basic health check endpoint
   * @route GET /health
   * @group Health - Health check operations
   * @returns {object} 200 - Health status
   * @returns {Error} 503 - Service unavailable
   */
  static async checkHealth(req: Request, res: Response) {
    try {
      // Check MongoDB connection
      const dbState = mongoose.connection.readyState;
      const isDbConnected = dbState === 1; // 1 = connected
      
      const healthStatus = {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        database: {
          connected: isDbConnected,
          status: isDbConnected ? 'connected' : 'disconnected'
        },
        memory: {
          rss: Math.round(process.memoryUsage().rss / 1024 / 1024) + ' MB',
          heapTotal: Math.round(process.memoryUsage().heapTotal / 1024 / 1024) + ' MB',
          heapUsed: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + ' MB'
        },
        version: process.env.npm_package_version || '1.0.0'
      };

      const statusCode = isDbConnected ? 200 : 503;
      
      if (!isDbConnected) {
        healthStatus.status = 'unhealthy';
      }

      res.status(statusCode).json(healthStatus);
    } catch (error) {
      console.error('Health check error:', error);
      res.status(503).json({
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: 'Health check failed'
      });
    }
  }

  /**
   * GET /health/details - Detailed health check with system metrics
   * @route GET /health/details
   * @group Health - Health check operations
   * @returns {object} 200 - Detailed health status
   */
  static async detailedHealth(req: Request, res: Response) {
    try {
      const dbState = mongoose.connection.readyState;
      
      const detailedStatus = {
        service: 'Zentask Backend API',
        status: dbState === 1 ? 'operational' : 'degraded',
        timestamp: new Date().toISOString(),
        version: process.env.npm_package_version || '1.0.0',
        uptime: process.uptime(),
        pid: process.pid,
        platform: process.platform,
        arch: process.arch,
        nodeVersion: process.version,
        environment: process.env.NODE_ENV || 'development',
        database: {
          connected: dbState === 1,
          readyState: dbState,
          host: mongoose.connection.host,
          name: mongoose.connection.name,
          port: mongoose.connection.port
        },
        system: {
          memory: {
            total: Math.round(require('os').totalmem() / 1024 / 1024 / 1024) + ' GB',
            free: Math.round(require('os').freemem() / 1024 / 1024 / 1024) + ' GB',
            used: Math.round((require('os').totalmem() - require('os').freemem()) / 1024 / 1024 / 1024) + ' GB',
            processRss: Math.round(process.memoryUsage().rss / 1024 / 1024) + ' MB',
            processHeap: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + ' MB'
          },
          cpu: {
            cores: require('os').cpus().length,
            loadAverage: require('os').loadavg()
          }
        }
      };

      res.status(200).json(detailedStatus);
    } catch (error) {
      console.error('Detailed health check error:', error);
      res.status(503).json({
        status: 'error',
        timestamp: new Date().toISOString(),
        error: 'Detailed health check failed'
      });
    }
  }
}