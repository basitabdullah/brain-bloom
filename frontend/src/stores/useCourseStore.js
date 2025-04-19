import { create } from "zustand";
import axios from "../lib/axios";
import { successToast, errorToast } from "../lib/toast";

export const useCourseStore = create((set, get) => ({
  courses: null,
  singleCourse: null,
  loading: false,

  createCourse: async ({ courseData }) => {
    try {
      const res = await axios.post("/course", courseData);
      set({ courses: res.data });
      successToast(res.data.message);
    } catch (error) {
      errorToast(error.response.data.message);
    }
  },
  getAllPremiumCourses: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("/course/premium");

      set({ courses: res.data.courses,loading: false });
    } catch (error) {
      errorToast(error.response.data.message);
      set({ loading: false });
    }
  },
  getAllCourses: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("/course");

      set({
        courses: res.data.courses,
        loading: false,
      });
    } catch (error) {
      errorToast(error.response.data.message);
      set({ loading: false });
    }
  },
  getSingleCourse: async (id) => {
    set({ loading: true });
    try {
      const res = await axios.get(`/course/${id}`);
      set({ singleCourse: res.data.course, loading: false });
    } catch (error) {
      errorToast(error.response.data.message);
      set({ loading: false });
    }
  },

  deleteCourse: async (id) => {
    set({ loading: true });
    try {
      const res = await axios.delete(`/course/${id}`);
      successToast(res.data.message);
      set({ loading: false });
    } catch (error) {
      errorToast(error.response.data.message);
      set({ loading: false });
    }
  },

  updateCourse: async ({ courseData, id }) => {
    set({ loading: true });

    try {
      const res = await axios.put(`/course/${id}`, courseData);
      successToast(res.data.message);
      set({ loading: false });
    } catch (error) {
      errorToast(error.response.data.message);
      set({ loading: false });
      console.log(error);
    }
  },
}));
