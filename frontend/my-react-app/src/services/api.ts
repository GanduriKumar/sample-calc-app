import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export interface CalculationRequest {
    a: number;
    b: number;
}

export interface SingleNumberRequest {
    x: number;
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
    // Basic operations
    add: async (data: CalculationRequest): Promise<number> => {
        try {
            const response = await api.post<CalculationResponse>('/add', data);
            return response.data.result;
        } catch (error: any) {
            throw new Error(error.response?.data?.detail || 'Error calculating addition');
        }
    },

    subtract: async (data: CalculationRequest): Promise<number> => {
        try {
            const response = await api.post<CalculationResponse>('/subtract', data);
            return response.data.result;
        } catch (error: any) {
            throw new Error(error.response?.data?.detail || 'Error calculating subtraction');
        }
    },

    multiply: async (data: CalculationRequest): Promise<number> => {
        try {
            const response = await api.post<CalculationResponse>('/multiply', data);
            return response.data.result;
        } catch (error: any) {
            throw new Error(error.response?.data?.detail || 'Error calculating multiplication');
        }
    },

    divide: async (data: CalculationRequest): Promise<number> => {
        try {
            const response = await api.post<CalculationResponse>('/divide', data);
            return response.data.result;
        } catch (error: any) {
            throw new Error(error.response?.data?.detail || 'Error calculating division');
        }
    },

    // Scientific operations (single number)
    sin: async (data: SingleNumberRequest): Promise<number> => {
        try {
            const response = await api.post<CalculationResponse>('/sin', data);
            return response.data.result;
        } catch (error: any) {
            throw new Error(error.response?.data?.detail || 'Error calculating sine');
        }
    },

    cos: async (data: SingleNumberRequest): Promise<number> => {
        try {
            const response = await api.post<CalculationResponse>('/cos', data);
            return response.data.result;
        } catch (error: any) {
            throw new Error(error.response?.data?.detail || 'Error calculating cosine');
        }
    },

    tan: async (data: SingleNumberRequest): Promise<number> => {
        try {
            const response = await api.post<CalculationResponse>('/tan', data);
            return response.data.result;
        } catch (error: any) {
            throw new Error(error.response?.data?.detail || 'Error calculating tangent');
        }
    },

    log: async (data: SingleNumberRequest): Promise<number> => {
        try {
            const response = await api.post<CalculationResponse>('/log', data);
            return response.data.result;
        } catch (error: any) {
            throw new Error(error.response?.data?.detail || 'Error calculating logarithm');
        }
    },

    log10: async (data: SingleNumberRequest): Promise<number> => {
        try {
            const response = await api.post<CalculationResponse>('/log10', data);
            return response.data.result;
        } catch (error: any) {
            throw new Error(error.response?.data?.detail || 'Error calculating log10');
        }
    },

    exp: async (data: SingleNumberRequest): Promise<number> => {
        try {
            const response = await api.post<CalculationResponse>('/exp', data);
            return response.data.result;
        } catch (error: any) {
            throw new Error(error.response?.data?.detail || 'Error calculating exponential');
        }
    },

    sqrt: async (data: SingleNumberRequest): Promise<number> => {
        try {
            const response = await api.post<CalculationResponse>('/sqrt', data);
            return response.data.result;
        } catch (error: any) {
            throw new Error(error.response?.data?.detail || 'Error calculating square root');
        }
    },

    power: async (data: CalculationRequest): Promise<number> => {
        try {
            const response = await api.post<CalculationResponse>('/power', data);
            return response.data.result;
        } catch (error: any) {
            throw new Error(error.response?.data?.detail || 'Error calculating power');
        }
    },

    factorial: async (data: SingleNumberRequest): Promise<number> => {
        try {
            const response = await api.post<CalculationResponse>('/factorial', data);
            return response.data.result;
        } catch (error: any) {
            throw new Error(error.response?.data?.detail || 'Error calculating factorial');
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
