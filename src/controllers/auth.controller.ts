import { Request, Response } from 'express';
import User from '../models/user.model';
import * as validator from 'validator';
import sanitize from 'mongo-sanitize';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/token.utils';

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const sanitizedBody = sanitize(req.body);
      const { name, email, password } = sanitizedBody;

      if (!name || !email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Name, email, and password are required.'
        });
      }

      if (!validator.isLength(name, { min: 2, max: 50 })) {
        return res.status(400).json({
          success: false,
          message: 'Name must be between 2 and 50 characters.'
        });
      }

      if (!validator.isEmail(email)) {
        return res.status(400).json({
          success: false,
          message: 'Please provide a valid email address.'
        });
      }

      if (!validator.isLength(password, { min: 6 })) {
        return res.status(400).json({
          success: false,
          message: 'Password must be at least 6 characters long.'
        });
      }

      const existingUser = await User.findOne({ email: email.toLowerCase() });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'User with this email already exists.'
        });
      }

      const user = new User({
        name,
        email: email.toLowerCase(),
        password
      });

      await user.save();

      const accessToken = generateAccessToken(user._id.toString());
      const refreshToken = generateRefreshToken(user._id.toString());

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      });

      const userResponse = {
        _id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      };

      res.status(201).json({
        success: true,
        message: 'User registered successfully.',
        user: userResponse,
        accessToken
      });
    } catch (error: any) {
      console.error('Registration error:', error);
      res.status(500).json({
        success: false,
        message: 'Registration failed. Please try again.'
      });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const sanitizedBody = sanitize(req.body);
      const { email, password } = sanitizedBody;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Email and password are required.'
        });
      }

      if (!validator.isEmail(email)) {
        return res.status(400).json({
          success: false,
          message: 'Please provide a valid email address.'
        });
      }

      const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password.'
        });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password.'
        });
      }

      const accessToken = generateAccessToken(user._id.toString());
      const refreshToken = generateRefreshToken(user._id.toString());

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
      });

      const userResponse = {
        _id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      };

      res.status(200).json({
        success: true,
        message: 'Login successful.',
        user: userResponse,
        accessToken
      });
    } catch (error: any) {
      console.error('Login error:', error);
      res.status(500).json({
        success: false,
        message: 'Login failed. Please try again.'
      });
    }
  }

  static async refresh(req: Request, res: Response) {
    try {
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        return res.status(401).json({
          success: false,
          message: 'Refresh token not found.'
        });
      }

      const decoded = verifyRefreshToken(refreshToken);
      if (!decoded) {
        return res.status(401).json({
          success: false,
          message: 'Invalid or expired refresh token.'
        });
      }

      const user = await User.findById(decoded.userId);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'User not found.'
        });
      }

      const newAccessToken = generateAccessToken(user._id.toString());

      res.status(200).json({
        success: true,
        accessToken: newAccessToken
      });
    } catch (error: any) {
      console.error('Refresh token error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to refresh token.'
      });
    }
  }

  static async logout(req: Request, res: Response) {
    try {
      res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });

      res.status(200).json({
        success: true,
        message: 'Logged out successfully.'
      });
    } catch (error: any) {
      console.error('Logout error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to logout.'
      });
    }
  }
}