import { create } from "zustand";
import axios from "../lib/axios";
import { successToast, errorToast } from "../lib/toast";

export const useSubscriptionStore = create((set, get) => ({
  data: null,

  subscribe: async () => {
    try {
      const res = await axios.get("/subscribe");
      set({ data: res.data });
      return res.data;
    } catch (error) {
      errorToast(error.response?.data?.message || "Something went wrong");
      return null;
    }
  },
}));
