import { create } from "zustand";
import axios from "../lib/axios";
import { errorToast, successToast } from "../lib/toast";

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

  cancelSubscription: async (id) => {
    try {
      set({ loading: true });

      const res = await axios.put("/subscribe/cancel-subscription", { id });

      successToast(res.data.message);

      set({ loading: false });
    } catch (error) {
      errorToast(error.response?.data?.message || "Something went wrong");
      console.log(error);

      set({ loading: false });

      return null;
    }
  },
}));
