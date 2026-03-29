import { Request, Response, NextFunction } from 'express';
// @ts-ignore
import { verifyAccessToken, verifyRefreshToken } from '../utils/token.utils';
import User from '../models/user.model';

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

/**
 * JWT Authentication Middleware
 * Verifies JWT token and attaches user to request
 */
export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }

    // Verify access token
    const decoded = verifyAccessToken(token);
    
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired token.'
      });
    }
    
    // Find user and attach to request
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token. User not found.'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(500).json({
      success: false,
      message: 'Authentication failed.'
    });
  }
};

/**
 * Optional Authentication Middleware
 * Same as authenticateToken but doesn't require token
 * Attaches user if token is valid, continues if not
 */
export const optionalAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return next();
    }

    // Verify access token
    const decoded = verifyAccessToken(token);
    
    if (!decoded) {
      return next(); // Continue without authentication if token is invalid
    }
    
    const user = await User.findById(decoded.userId).select('-password');
    
    if (user) {
      req.user = user;
    }
    
    next();
  } catch (error) {
    // Silently continue without user if token is invalid
    next();
  }
};

/**
 * Authorization Middleware
 * Checks if user has required role/permission
 */
export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. Authentication required.'
      });
    }

    // For now, all authenticated users have access
    // Can be extended for role-based access control
    next();
  };
};