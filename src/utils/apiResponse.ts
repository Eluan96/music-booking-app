export interface ApiResponse {
    success: boolean;
    message?: string;
    data?: any;
    count?: number;
    pagination?: {
      total: number;
      page: number;
      pages: number;
    };
    error?: string;
  }
  
  export const successResponse = (
    data: any,
    message = 'Success',
    statusCode = 200
  ): ApiResponse => ({
    success: true,
    message,
    data,
  });
  
  export const errorResponse = (
    message = 'Error',
    statusCode = 500,
    error?: string
  ): ApiResponse => ({
    success: false,
    message,
    error,
  });