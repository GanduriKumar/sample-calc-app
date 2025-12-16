import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

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

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const calculatorAPI = {
    add: async (data: CalculationRequest): Promise<number> => {
        try {
            const response = await api.post<CalculationResponse>('/add', data);
            return response.data.result;
        } catch (error: any) {
            if (error.response?.data?.error) {
                throw new Error(error.response.data.error);
            }
            throw new Error('Error calculating addition');
        }
    },

    subtract: async (data: CalculationRequest): Promise<number> => {
        try {
            const response = await api.post<CalculationResponse>('/subtract', data);
            return response.data.result;
        } catch (error: any) {
            if (error.response?.data?.error) {
                throw new Error(error.response.data.error);
            }
            throw new Error('Error calculating subtraction');
        }
    },

    multiply: async (data: CalculationRequest): Promise<number> => {
        try {
            const response = await api.post<CalculationResponse>('/multiply', data);
            return response.data.result;
        } catch (error: any) {
            if (error.response?.data?.error) {
                throw new Error(error.response.data.error);
            }
            throw new Error('Error calculating multiplication');
        }
    },

    divide: async (data: CalculationRequest): Promise<number> => {
        try {
            const response = await api.post<CalculationResponse>('/divide', data);
            if ('error' in response.data) {
                throw new Error((response.data as any).error);
            }
            return response.data.result;
        } catch (error: any) {
            if (error.response?.data?.error) {
                throw new Error(error.response.data.error);
            }
            throw new Error('Error calculating division');
        }
    },
};

// Legacy functions (kept for backward compatibility)
export const fetchData = async (endpoint: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${endpoint}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const postData = async (endpoint: string, data: any) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/${endpoint}`, data);
        return response.data;
    } catch (error) {
        console.error('Error posting data:', error);
        throw error;
    }
};

export const calculateAddition = async (data: { a: number; b: number }) => {
    return calculatorAPI.add(data);
};

export const calculateSubtraction = async (data: { a: number; b: number }) => {
    return calculatorAPI.subtract(data);
};

export const calculateMultiplication = async (data: { a: number; b: number }) => {
    return calculatorAPI.multiply(data);
};

export const calculateDivision = async (data: { a: number; b: number }) => {
    return calculatorAPI.divide(data);
};
