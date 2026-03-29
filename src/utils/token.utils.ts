import jwt from 'jsonwebtoken';

interface TokenPayload {
  userId: string;
  type: 'access' | 'refresh';
  [key: string]: any;
}

/**
 * Generate access token
 * @param userId - User ID to include in token
 * @returns Access token string
 */
export const generateAccessToken = (userId: string): string => {
  const secret = process.env.JWT_ACCESS_SECRET || 'fallback_access_secret';
  const expiresIn = process.env.JWT_ACCESS_EXPIRES_IN || '15m'; // 15 minutes
  
  // @ts-ignore - Bypassing type checking for JWT library compatibility
  return jwt.sign({ userId, type: 'access' } as TokenPayload, secret, { expiresIn });
};

/**
 * Generate refresh token
 * @param userId - User ID to include in token
 * @returns Refresh token string
 */
export const generateRefreshToken = (userId: string): string => {
  const secret = process.env.JWT_REFRESH_SECRET || 'fallback_refresh_secret';
  const expiresIn = process.env.JWT_REFRESH_EXPIRES_IN || '7d'; // 7 days
  
  // @ts-ignore - Bypassing type checking for JWT library compatibility
  return jwt.sign({ userId, type: 'refresh' } as TokenPayload, secret, { expiresIn });
};

/**
 * Verify access token
 * @param token - Token to verify
 * @returns Decoded token payload or null if invalid
 */
export const verifyAccessToken = (token: string): any => {
  const secret = process.env.JWT_ACCESS_SECRET || 'fallback_access_secret';
  try {
    // @ts-ignore - Bypassing type checking for JWT library compatibility
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
};

/**
 * Verify refresh token
 * @param token - Token to verify
 * @returns Decoded token payload or null if invalid
 */
export const verifyRefreshToken = (token: string): any => {
  const secret = process.env.JWT_REFRESH_SECRET || 'fallback_refresh_secret';
  try {
    // @ts-ignore - Bypassing type checking for JWT library compatibility
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
};