import { create } from "zustand";
import axios from "../lib/axios";

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
}));
