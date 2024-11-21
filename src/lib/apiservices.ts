// src/lib/api.service.ts


const API_URL = import.meta.env.VITE_API_ENDPOINT;

async function getAuthHeader() {
  try {
    const session = await fetchAuthSession();
    return {
      Authorization: `Bearer ${session.tokens?.accessToken.toString()}`
    };
  } catch (error) {
    console.error('Error getting auth header:', error);
    return {};
  }
}

export const api = {
  async get(endpoint: string) {
    const headers = await getAuthHeader();
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) throw new Error('API request failed');
    return response.json();
  },

  async post(endpoint: string, data: any) {
    const headers = await getAuthHeader();
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('API request failed');
    return response.json();
  }
};
