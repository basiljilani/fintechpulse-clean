import { create } from 'zustand';
import { signIn, signUp, signOut, getCurrentUser } from '@aws-amplify/auth';
import type { SignInOutput } from '@aws-amplify/auth';

interface AuthState {
  isAuthenticated: boolean;
  user: any | null;
  loading: boolean;
  signIn: (username: string, password: string) => Promise<SignInOutput>;
  signUp: (username: string, password: string, email: string) => Promise<void>;
  signOut: () => Promise<void>;
  checkAuth: () => Promise<void>;
  storeUserData: (token: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  loading: true,
  
  signIn: async (username: string, password: string) => {
    try {
      const output = await signIn({ username, password });
      if (output.isSignedIn) {
        const user = await getCurrentUser();
        
        // Get the session token
        const session = await output.tokens;
        if (session?.accessToken) {
          // Store user data in DynamoDB through API Gateway
          await useAuthStore.getState().storeUserData(session.accessToken);
        }
        
        set({ isAuthenticated: true, user });
      }
      return output;
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  },

  signUp: async (username: string, password: string, email: string) => {
    try {
      const { isSignUpComplete, nextStep } = await signUp({
        username,
        password,
        options: {
          userAttributes: {
            email
          }
        }
      });

      if (isSignUpComplete) {
        console.log('Sign up completed successfully');
      }
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  },

  signOut: async () => {
    try {
      await signOut();
      set({ isAuthenticated: false, user: null });
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  },

  checkAuth: async () => {
    try {
      const user = await getCurrentUser();
      set({ isAuthenticated: true, user, loading: false });
    } catch (error) {
      set({ isAuthenticated: false, user: null, loading: false });
    }
  },

  storeUserData: async (token: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/auth`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to store user data');
      }

      const data = await response.json();
      console.log('User data stored:', data);
    } catch (error) {
      console.error('Error storing user data:', error);
      throw error;
    }
  }
}));