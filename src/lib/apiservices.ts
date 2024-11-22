// src/lib/apiservices.ts

const API_URL = import.meta.env.VITE_API_ENDPOINT;

async function getAuthHeader(token?: string): Promise<Record<string, string>> {
  try {
    if (!token) {
      throw new Error("Authorization token is missing.");
    }
    return {
      Authorization: `Bearer ${token}`, // Pass the token dynamically
      'Content-Type': 'application/json',
    };
  } catch (error) {
    console.error('Error getting auth header:', error);
    // Return only the Content-Type header if token is missing
    return { 'Content-Type': 'application/json' };
  }
}

export const api = {
  async get(endpoint: string, token?: string) {
    try {
      const headers = await getAuthHeader(token);
      const response = await fetch(`${API_URL}${endpoint}`, {
        headers, // Ensure headers include dynamic token if provided
      });
      if (!response.ok) {
        throw new Error(`GET request failed with status ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error(`GET request failed for endpoint ${endpoint}:`, error);
      throw error;
    }
  },

  async post(endpoint: string, data: any, token?: string) {
    try {
      const headers = await getAuthHeader(token);
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers, // Ensure headers include dynamic token if provided
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`POST request failed with status ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error(`POST request failed for endpoint ${endpoint}:`, error);
      throw error;
    }
  },
};
