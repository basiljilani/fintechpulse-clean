// src/lib/apiservices.ts

const API_URL = import.meta.env.VITE_API_ENDPOINT;

async function getAuthHeader(): Promise<Record<string, string>> {
  try {
    // Return a consistent header structure
    return {
      Authorization: 'Bearer placeholder-token', // Replace with real token logic when ready
      'Content-Type': 'application/json',
    };
  } catch (error) {
    console.error('Error getting auth header:', error);
    // Return only the Content-Type header if auth fails
    return { 'Content-Type': 'application/json' };
  }
}

export const api = {
  async get(endpoint: string) {
    try {
      const headers = await getAuthHeader();
      const response = await fetch(`${API_URL}${endpoint}`, {
        headers, // Consistent typing guaranteed
      });
      if (!response.ok) throw new Error(`API request failed with status ${response.status}`);
      return response.json();
    } catch (error) {
      console.error(`GET request failed for endpoint ${endpoint}:`, error);
      throw error;
    }
  },

  async post(endpoint: string, data: any) {
    try {
      const headers = await getAuthHeader();
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers, // Consistent typing guaranteed
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error(`API request failed with status ${response.status}`);
      return response.json();
    } catch (error) {
      console.error(`POST request failed for endpoint ${endpoint}:`, error);
      throw error;
    }
  },
};
