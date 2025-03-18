import { create } from "zustand";
import axios from "../lib/axios";
import { successToast, errorToast } from "../lib/toast";
export const useUserStore = create((set, get) => ({
  user: null,
  loading: false,
  checkingAuth: false,

  login: async ({ email, password }) => {
    set({ loading: true });
    try {
      const res = await axios.post("auth/login", {
        email,
        password,
      });
      set({ user: res.data.user });
      successToast(res.data.message);
    } catch (error) {
      set({ loading: false });
      errorToast(error.response.data.message);
    }
  },
  register: async ({name,email,password,phone}) => {
    try {
      const res = await axios.post("auth/register");
      set({ user: res.data.user });
      successToast(res.data.message);
    } catch (error) {
      errorToast(error.response.data.message);
    }
  },
  logout: async () => {
    try {
      const res = await axios.post("auth/logout");
      set({ user: null });
      successToast(res.data.message);
    } catch (error) {
      errorToast(error.response.data.message);
    }
  },

  checkAuth: async () => {
    set({ checkingAuth: true });
    try {
      const res = await axios.get("auth/profile");
      set({ checkingAuth: false, user: res.data });
      successToast("Logged In Automatically!");
    } catch (error) {
      set({ checkingAuth: false });
    }
  },
}));
