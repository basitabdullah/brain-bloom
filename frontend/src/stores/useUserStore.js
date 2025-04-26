import { create } from "zustand";
import axios from "../lib/axios";
import { successToast, errorToast } from "../lib/toast";
export const useUserStore = create((set, get) => ({
  user: null,
  loading: false,
  checkingAuth: false,
  subscriber: null,
  users : null,

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
  register: async ({ name, email, password, phone }) => {
    try {
      const res = await axios.post("auth/register", {
        name,
        email,
        password,
        phone,
      });

      set({ user: res.data.user });
      successToast(res.data.message);
    } catch (error) {
      errorToast(error.response.data.message);
      console.log(error);
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

  updateUser: async (id, formData) => {
    set({ loading: true });
    try {
      const res = await axios.put(`auth/${id}`, formData);
      set({ user: res.data });
      set({ loading: false });
    } catch (error) {
      set({ loading: false });
      errorToast(error.response.data.message);
    }
  },

  getAllUsers: async () => {
    set({ loading: true });
    try {
      const res = await axios.get(`auth/allusers`);
      set({ users: res.data });
      set({ loading: false });
    } catch (error) {
      set({ loading: false });
      errorToast(error.response.data.message);
    }
  },
}));
