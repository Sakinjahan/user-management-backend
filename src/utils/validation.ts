import * as validator from 'validator';
import sanitize from 'mongo-sanitize';

export const validateEmail = (email: string): boolean => {
  return validator.isEmail(email);
};

export const validatePassword = (password: string): boolean => {
  return validator.isLength(password, { min: 6 });
};

export const validateFullName = (fullName: string): boolean => {
  return validator.isLength(fullName, { min: 2, max: 50 });
};

export const sanitizeInput = (input: any) => {
  return sanitize(input);
};

export const validateStringField = (field: string, minLength: number = 1, maxLength: number = 100): boolean => {
  return validator.isLength(field, { min: minLength, max: maxLength });
};