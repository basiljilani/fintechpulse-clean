// src/lib/api.service.ts

const API_URL = import.meta.env.VITE_API_ENDPOINT;

// Placeholder function to simulate authentication headers
async function getAuthHeader() {
  try {
    // Replace with actual logic to fetch session tokens if needed
    return {
      Authorization: `Bearer placeholder-access-token`
    };
  } catch (error) {
    console.error('Error getting auth header:', error);
    return {}; // Return empty headers if authentication fails
  }
}

export const api = {
  async get(endpoint: string) {
    try {
      const headers = await getAuthHeader();
      const response = await fetch(`${API_URL}${endpoint}`, {
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
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
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error(`POST request failed for endpoint ${endpoint}:`, error);
      throw error;
    }
  }
};
