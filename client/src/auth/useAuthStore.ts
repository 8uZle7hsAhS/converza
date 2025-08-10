import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';

interface AuthState {
  authUser: any;
  isSigningUp: boolean;
  isLoggingUp: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth: boolean;
  checkAuth: () => Promise<void>;
  signup: (data: any, navigate: any) => Promise<void>;
  login: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingUp: false,
  isUpdatingProfile: false,

  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get('/auth/check');
      set({ authUser: res.data });
    } catch (error) {
      console.log('error: ', error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data: any, navigate: any) => {
    set({ isSigningUp: true });

    try {
      const res = await axiosInstance.post('/auth/signup', data);

      console.log('this is my res', res);
      set({ authUser: res.data });
      navigate('/login');
    } catch (error: any) {
      navigate('/signup');
      if (error.response && error.response.data) {
        // to display OWN error prompt
        console.error(error.response.data.message);
      } else {
        console.error(error.message);
      }
    } finally {
      set({ isSigningUp: false });
    }
  },
  login: async () => {},
  logout: () => {},
}));
