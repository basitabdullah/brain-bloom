import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
      enum: ["Beginner", "Intermediate", "Advanced"],
    },
    instructor: {
      name: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    reviews: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    youtubeLink: {
      type: String,
      required: true,
    },
    abyssLinks: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);
const Course = mongoose.model("Course", courseSchema);

export default Course;
