import React, { useEffect, useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { useCourseStore } from "../../stores/useCourseStore";
import { useParams } from "react-router-dom";

function UpdateCourse() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const { updateCourse, getSingleCourse, singleCourse } = useCourseStore();
  const { id } = useParams();

  useEffect(() => {
    getSingleCourse(id);
  }, []);

  const [courseData, setCourseData] = useState({
    title: "",
    category: "",
    description: "",
    duration: "",
    level: "beginner",
    instructor: {
      name: "",
      image: "",
    },
    image: "",
    rating: 0,
    reviews: 0,
    youtubeLink: "",
    abyssLinks: [""],
  });

  useEffect(() => {
    getSingleCourse(id);
  }, [id]);

  useEffect(() => {
    if (singleCourse) {
      setCourseData({
        title: singleCourse.title || "",
        category: singleCourse.category || "",
        description: singleCourse.description || "",
        duration: singleCourse.duration || "",
        level: singleCourse.level || "beginner",
        instructor: {
          name: singleCourse.instructor?.name || "",
          image: singleCourse.instructor?.image || "",
        },
        image: singleCourse.image || "",
        rating: singleCourse.rating || 0,
        reviews: singleCourse.reviews || 0,
        youtubeLink: singleCourse.youtubeLink || "",
        abyssLinks: singleCourse.abyssLinks?.length
          ? singleCourse.abyssLinks
          : [""],
      });
    }
  }, [singleCourse]);

  console.log("Single Course", singleCourse);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setCourseData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setCourseData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleAbyssLinkChange = (index, value) => {
    const newAbyssLinks = [...courseData.abyssLinks];
    newAbyssLinks[index] = value;
    setCourseData((prev) => ({
      ...prev,
      abyssLinks: newAbyssLinks,
    }));
  };

  const addAbyssLink = () => {
    setCourseData((prev) => ({
      ...prev,
      abyssLinks: [...prev.abyssLinks, ""],
    }));
  };

  const removeAbyssLink = (index) => {
    setCourseData((prev) => ({
      ...prev,
      abyssLinks: prev.abyssLinks.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: "", text: "" });
    updateCourse({ courseData, id });
    setIsSubmitting(false);
  };

  return (
    <div className="admin-panel">
      <div className="admin-panel__header">
        <h1>Update Course</h1>
        <p>Update the details of the course</p>
      </div>

      {message.text && (
        <div className={`admin-panel__message ${message.type}`}>
          {message.text}
        </div>
      )}

      <form className="admin-panel__form" onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>Basic Information</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="title">Course Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={courseData.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <input
                type="text"
                id="category"
                name="category"
                value={courseData.category}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={courseData.description}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="duration">Duration (in hours)</label>
              <input
                type="number"
                id="duration"
                name="duration"
                value={courseData.duration}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="level">Level</label>
              <select
                id="level"
                name="level"
                value={courseData.level}
                onChange={handleInputChange}
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Instructor Information</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="instructor.name">Instructor Name</label>
              <input
                type="text"
                id="instructor.name"
                name="instructor.name"
                value={courseData.instructor.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="instructor.image">Instructor Image URL</label>
              <input
                type="url"
                id="instructor.image"
                name="instructor.image"
                value={courseData.instructor.image}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Course Media</h3>
          <div className="form-group">
            <label htmlFor="image">Course Image URL</label>
            <input
              type="url"
              id="image"
              name="image"
              value={courseData.image}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="youtubeLink">YouTube Link</label>
            <input
              type="url"
              id="youtubeLink"
              name="youtubeLink"
              value={courseData.youtubeLink}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="form-section">
          <div className="form-section__header">
            <h3>Abyss Links</h3>
            <button
              type="button"
              className="btn btn--icon"
              onClick={addAbyssLink}
            >
              <FaPlus /> Add Link
            </button>
          </div>
          {courseData.abyssLinks.map((link, index) => (
            <div key={index} className="form-group form-group--with-remove">
              <input
                type="url"
                value={link}
                onChange={(e) => handleAbyssLinkChange(index, e.target.value)}
                placeholder={`Abyss Link ${index + 1}`}
              />
              <button
                type="button"
                className="btn--remove"
                onClick={() => removeAbyssLink(index)}
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>

        <div className="form-section">
          <h3>Course Statistics</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="rating">Rating (0-5)</label>
              <input
                type="number"
                id="rating"
                name="rating"
                min="0"
                max="5"
                step="0.1"
                value={courseData.rating}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="reviews">Number of Reviews</label>
              <input
                type="number"
                id="reviews"
                name="reviews"
                min="0"
                value={courseData.reviews}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="btn btn--primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner"></span>
                Updating Course...
              </>
            ) : (
              "Update Course"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateCourse;
