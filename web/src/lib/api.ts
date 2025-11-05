import axios from 'axios';
import { auth } from './firebase';

const API_URL = process.env.API_URL || 'http://localhost:5000/api/v1';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;

// API methods
export const authAPI = {
  register: (data: any) => apiClient.post('/auth/register', data),
  logout: () => apiClient.post('/auth/logout'),
};

export const examAPI = {
  getExams: (params?: any) => apiClient.get('/exams', { params }),
  getExamById: (id: string) => apiClient.get(`/exams/${id}`),
  startExam: (id: string) => apiClient.post(`/exams/${id}/start`),
  submitExam: (id: string, data: any) => apiClient.post(`/exams/${id}/submit`, data),
  getResults: (examId: string, userId: string) => apiClient.get(`/exams/${examId}/results/${userId}`),
};

export const userAPI = {
  getProfile: () => apiClient.get('/users/profile'),
  updateProfile: (data: any) => apiClient.put('/users/profile', data),
  getUserExams: () => apiClient.get('/users/exams'),
};

export const certificateAPI = {
  generate: (resultId: string) => apiClient.post('/certificates/generate', { resultId }),
  getCertificate: (id: string) => apiClient.get(`/certificates/${id}`),
};

