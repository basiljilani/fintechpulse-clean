import { create } from 'zustand';


interface AuthState {
  isAuthenticated: boolean;
  user: any | null;
  loading: boolean;
  signIn: (username: string, password: string) => Promise<any>;
  signUp: (username: string, password: string, email: string) => Promise<void>;
  signOut: () => Promise<void>;
  checkAuth: () => Promise<void>;
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
      const { isSignUpComplete } = await signUp({
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
  }
}));