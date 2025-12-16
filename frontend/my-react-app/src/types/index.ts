export interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  authorId: number;
}

// Calculator specific types
export interface CalculationRequest {
  a: number;
  b: number;
}

export interface CalculationResponse {
  result: number;
}

export interface ErrorResponse {
  error: string;
}