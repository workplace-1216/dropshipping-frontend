import axios, { AxiosInstance, AxiosResponse } from 'axios';

// API Response types
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  status: number;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'ADMIN' | 'OPERATOR' | 'SUPPLIER' | 'SELLER';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: 'ADMIN' | 'OPERATOR' | 'SUPPLIER' | 'SELLER';
}

class ApiClient {
  private client: AxiosInstance;
  private baseURL: string;

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    
    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add auth token
    this.client.interceptors.request.use(
      (config) => {
        const token = this.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error) => {
        if (error.response?.status === 401) {
          this.removeToken();
          // Only redirect to login if NOT already on auth pages
          if (typeof window !== 'undefined') {
            const currentPath = window.location.pathname;
            const authPaths = ['/login', '/register', '/forgot-password'];
            const isOnAuthPage = authPaths.some(path => currentPath.startsWith(path));
            
            if (!isOnAuthPage) {
              window.location.href = '/login';
            }
          }
        }
        return Promise.reject(error);
      }
    );
  }

  // Token management
  private getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('access_token');
  }

  private setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', token);
    }
  }

  private removeToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
    }
  }

  // Auth methods
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await this.client.post<AuthResponse>('/auth/login', credentials);
    this.setToken(response.data.access_token);
    return response.data;
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    console.log('API Client: Sending registration request to:', `${this.baseURL}/auth/register`);
    console.log('API Client: Registration data:', { ...data, password: '***' });
    const response = await this.client.post<AuthResponse>('/auth/register', data);
    console.log('API Client: Registration response received:', response.data);
    this.setToken(response.data.access_token);
    console.log('API Client: Token stored successfully');
    return response.data;
  }

  async getProfile(): Promise<User> {
    const response = await this.client.get<User>('/auth/profile');
    return response.data;
  }

  async logout(): Promise<void> {
    this.removeToken();
  }

  // Generic methods
  async get<T>(url: string): Promise<T> {
    const response = await this.client.get<T>(url);
    return response.data;
  }

  async post<T>(url: string, data?: any): Promise<T> {
    const response = await this.client.post<T>(url, data);
    return response.data;
  }

  async put<T>(url: string, data?: any): Promise<T> {
    const response = await this.client.put<T>(url, data);
    return response.data;
  }

  async delete<T>(url: string): Promise<T> {
    const response = await this.client.delete<T>(url);
    return response.data;
  }
}

// Export singleton instance
export const apiClient = new ApiClient();
export default apiClient;


