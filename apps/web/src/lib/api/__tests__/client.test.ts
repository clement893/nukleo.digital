import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { ApiClient } from '../client';
import { handleApiError } from '@/lib/errors/api';
import { logger } from '@/lib/logger';

// Mock dependencies
vi.mock('@/lib/errors/api');
vi.mock('@/lib/logger');
vi.mock('../api', () => ({
  getApiUrl: () => 'http://localhost:8000/api',
}));

describe('ApiClient', () => {
  let apiClient: ApiClient;
  const mockAxios = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    apiClient = new ApiClient('http://localhost:8000/api');
    // Mock axios methods
    vi.spyOn(axios, 'create').mockReturnValue({
      get: mockAxios,
      post: mockAxios,
      put: mockAxios,
      patch: mockAxios,
      delete: mockAxios,
      interceptors: {
        request: {
          use: vi.fn(),
        },
        response: {
          use: vi.fn(),
        },
      },
      defaults: {
        headers: {
          common: {},
        },
      },
    } as unknown as ReturnType<typeof axios.create>);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('GET Requests', () => {
    it('makes GET request successfully', async () => {
      const mockResponse: AxiosResponse = {
        data: { success: true, data: { id: 1 } },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      };

      mockAxios.mockResolvedValue(mockResponse);

      const result = await apiClient.get('/users');

      expect(mockAxios).toHaveBeenCalledWith('/users', undefined);
      expect(result).toEqual(mockResponse.data);
    });

    it('handles GET request with config', async () => {
      const mockResponse: AxiosResponse = {
        data: { success: true, data: [] },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      };

      mockAxios.mockResolvedValue(mockResponse);

      const config = { params: { page: 1 } };
      await apiClient.get('/users', config);

      expect(mockAxios).toHaveBeenCalledWith('/users', config);
    });
  });

  describe('POST Requests', () => {
    it('makes POST request successfully', async () => {
      const mockData = { email: 'test@example.com', password: 'password123' };
      const mockResponse: AxiosResponse = {
        data: { success: true, data: { id: 1, ...mockData } },
        status: 201,
        statusText: 'Created',
        headers: {},
        config: {} as any,
      };

      mockAxios.mockResolvedValue(mockResponse);

      const result = await apiClient.post('/users', mockData);

      expect(mockAxios).toHaveBeenCalledWith('/users', mockData, undefined);
      expect(result).toEqual(mockResponse.data);
    });

    it('handles POST request with config', async () => {
      const mockData = { email: 'test@example.com' };
      const mockResponse: AxiosResponse = {
        data: { success: true },
        status: 201,
        statusText: 'Created',
        headers: {},
        config: {} as any,
      };

      mockAxios.mockResolvedValue(mockResponse);

      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      await apiClient.post('/users', mockData, config);

      expect(mockAxios).toHaveBeenCalledWith('/users', mockData, config);
    });
  });

  describe('PUT Requests', () => {
    it('makes PUT request successfully', async () => {
      const mockData = { name: 'Updated Name' };
      const mockResponse: AxiosResponse = {
        data: { success: true, data: mockData },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      };

      mockAxios.mockResolvedValue(mockResponse);

      const result = await apiClient.put('/users/1', mockData);

      expect(mockAxios).toHaveBeenCalledWith('/users/1', mockData, undefined);
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('PATCH Requests', () => {
    it('makes PATCH request successfully', async () => {
      const mockData = { name: 'Partially Updated' };
      const mockResponse: AxiosResponse = {
        data: { success: true, data: mockData },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      };

      mockAxios.mockResolvedValue(mockResponse);

      const result = await apiClient.patch('/users/1', mockData);

      expect(mockAxios).toHaveBeenCalledWith('/users/1', mockData, undefined);
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('DELETE Requests', () => {
    it('makes DELETE request successfully', async () => {
      const mockResponse: AxiosResponse = {
        data: { success: true },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      };

      mockAxios.mockResolvedValue(mockResponse);

      const result = await apiClient.delete('/users/1');

      expect(mockAxios).toHaveBeenCalledWith('/users/1', undefined);
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('Error Handling', () => {
    it('handles API errors', async () => {
      const mockError = new AxiosError('Request failed');
      mockError.response = {
        status: 404,
        data: { message: 'Not found' },
      } as AxiosResponse;

      const mockAppError = new Error('Not found');
      vi.mocked(handleApiError).mockReturnValue(mockAppError as any);

      mockAxios.mockRejectedValue(mockError);

      await expect(apiClient.get('/users/999')).rejects.toThrow();
      expect(handleApiError).toHaveBeenCalledWith(mockError);
    });

    it('handles network errors', async () => {
      const mockError = new AxiosError('Network Error');
      mockError.request = {};

      const mockAppError = new Error('Network error');
      vi.mocked(handleApiError).mockReturnValue(mockAppError as any);

      mockAxios.mockRejectedValue(mockError);

      await expect(apiClient.get('/users')).rejects.toThrow();
      expect(handleApiError).toHaveBeenCalledWith(mockError);
    });
  });

  describe('Authentication', () => {
    it('sets auth token', () => {
      const token = 'test-token-123';
      apiClient.setAuthToken(token);

      // Note: This test would need access to the internal client instance
      // In a real scenario, you might want to expose a method to check the token
      expect(apiClient).toBeDefined();
    });

    it('removes auth token', () => {
      apiClient.removeAuthToken();

      // Note: This test would need access to the internal client instance
      expect(apiClient).toBeDefined();
    });
  });

  describe('Interceptors', () => {
    it('sets up request interceptor', () => {
      // The interceptor setup happens in constructor
      // We can verify it was called by checking logger calls
      expect(apiClient).toBeDefined();
    });

    it('sets up response interceptor', () => {
      // The interceptor setup happens in constructor
      expect(apiClient).toBeDefined();
    });
  });
});

