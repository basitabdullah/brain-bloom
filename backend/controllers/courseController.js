import Course from "../models/courseModel.js";

export const createCourse = async (req, res) => {
  try {
    const {
      title,
      category,
      description,
      duration,
      level,
      instructor,
      image,
      rating,
      reviews,
      youtubeLink,
      abyssLinks,
    } = req.body;

    const course = await Course.create({
      title,
      category,
      description,
      duration,
      level,
      instructor,
      image,
      rating,
      reviews,
      youtubeLink,
      abyssLinks,
    });

    res.status(200).json({
      message: "Added Course Successfully!",
      course,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || "Internal Server Error!",
    });
  }
};

export const getAllPremiumCourses = async (req, res) => {
  try {
    const courses = await Course.find();

    res.status(201).json({
      message: "Found Courses Successfully!",
      courses,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || "Internal Server Error!",
    });
  }
};
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().select("-abyssLinks");

    res.status(201).json({
      message: "Found Courses Successfully!",
      courses,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || "Internal Server Error!",
    });
  }
};
export const updateCourse = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    category,
    description,
    duration,
    level,
    instructor,
    image,
    rating,
    reviews,
    youtubeLink,
    abyssLinks,
  } = req.body;
  try {
    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({ message: "Course not found!" });
    }
    course.title = title || course.title;
    course.category = category || course.category;
    course.description = description || course.description;
    course.duration = duration || course.duration;
    course.level = level || course.level;
    course.instructor = instructor || course.instructor;
    course.image = image || course.image;
    course.rating = rating || course.rating;
    course.reviews = reviews || course.reviews;
    course.youtubeLink = youtubeLink || course.youtubeLink;
    course.abyssLinks = abyssLinks || course.abyssLinks;

    await course.save();

    res.status(201).json({
      message: "Updated The Course Successfully!",
      course,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || "Internal Server Error!",
    });
  }
};
export const deleteCourse = async (req, res) => {
  const { id } = req.params;

  try {
    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({
        message: "Course Not Found!",
      });
    }
    await course.deleteOne({ _id: id });

    res.status(201).json({
      message: "Deleted Course Successfully!",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || "Internal Server Error!",
    });
  }
};

export const getSingleCourse = async (req, res) => {
  const { id } = req.params;
  try {
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({
        message: "No Course Found!",
      });
    }

    res.status(201).json({
      message: "Found Single Course Successfully!",
      course,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || "Internal Server Error!",
    });
  }
};
