import { create } from "zustand";
import axios from "../lib/axios";
import { errorToast } from "../lib/toast";

export const useSubscriptionStore = create((set, get) => ({
  data: null,
  loading: false,

  subscribe: async () => {
    try {
      set({ loading: true });
      const res = await axios.get("/subscribe");
      set({ data: res.data });
      set({ loading: false });
      return res.data;
    } catch (error) {
      errorToast(error.response?.data?.message || "Something went wrong");
      set({ loading: false });
      return null;
    }
  },
}));
