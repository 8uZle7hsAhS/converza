import { create } from "zustand";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingUp: false,
  isUpdatingProfile: false,

  isCheckingAuth: true,
}));
