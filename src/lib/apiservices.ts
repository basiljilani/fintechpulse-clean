// src/lib/apiservices.ts

const API_URL = import.meta.env.VITE_API_ENDPOINT;

async function getAuthHeader() {
  try {
    // Placeholder: return an empty header if no auth session
    return {
      Authorization: 'Bearer placeholder-token',
      'Content-Type': 'application/json',
    };
  } catch (error) {
    console.error('Error getting auth header:', error);
    return { 'Content-Type': 'application/json' };
  }
}

export const api = {
  async get(endpoint: string) {
    const headers = await getAuthHeader();
    const response = await fetch(`${API_URL}${endpoint}`, { headers });
    if (!response.ok) throw new Error('API request failed');
    return response.json();
  },

  async post(endpoint: string, data: any) {
    const headers = await getAuthHeader();
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('API request failed');
    return response.json();
  },
};
