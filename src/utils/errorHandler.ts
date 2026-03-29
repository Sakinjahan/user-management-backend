export interface ErrorResponse {
  success: boolean;
  message: string;
  error?: any;
}

export const createError = (statusCode: number, message: string, error?: any): ErrorResponse => {
  return {
    success: false,
    message,
    ...(error && { error })
  };
};

export const createSuccess = (message: string, data?: any) => {
  return {
    success: true,
    message,
    ...(data && { data })
  };
};