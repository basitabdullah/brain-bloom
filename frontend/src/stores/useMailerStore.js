import { create } from "zustand";
import axios from "../lib/axios";
import { successToast } from "../lib/toast";

export const useMailerStore = create((set, get) => ({
  loading: false,
  sendMail: async (name, email, phone, message) => {
    try {
      set({ loading: true });

      const res = await axios.post("/mail", {
        name,
        email,
        phone,
        message,
      });
      set({ loading: false });
      return res.data;
    } catch (error) {
      errorToast(error.response?.data?.message || "Something went wrong");
      set({ loading: false });
      return null;
    }
  },
  verifyMail: async (email) => {
    try {
      set({ loading: true });

      const res = await axios.post("auth/verify-email", {
        email,
      });
      successToast(res.data.message)
      set({ loading: false });
      return res.data;
    } catch (error) {
      errorToast(error.response?.data?.message || "Something went wrong");
      set({ loading: false });
      return null;
    }
  },
}));
