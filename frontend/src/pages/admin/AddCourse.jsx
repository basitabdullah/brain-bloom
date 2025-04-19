import React, { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { useCourseStore } from "../../stores/useCourseStore";

function AddCourse() {
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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const { createCourse } = useCourseStore();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: "", text: "" });
    createCourse({ courseData });
    setIsSubmitting(false);
  };

  return (
    <div className="admin-panel">
      <div className="admin-panel__header">
        <h1>Add New Course</h1>
        <p>Fill in the details to create a new course</p>
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
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                name="category"
                value={courseData.category}
                onChange={handleInputChange}
                required
                id="category"
              >
                <option value="development">Development</option>
                <option value="science">Science</option>
                <option value="math">Math</option>
                <option value="political-science">Political Science</option>
                <option value="language">Language</option>
                <option value="reasoning">Reasoning</option>
                <option value="commerce">Commerce</option>
                <option value="advance">Advance</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={courseData.description}
              onChange={handleInputChange}
              required
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
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="level">Level</label>
              <select
                id="level"
                name="level"
                value={courseData.level}
                onChange={handleInputChange}
                required
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
                required
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
                required
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
              required
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
              required
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
                required
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
                required
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
                required
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
                Adding Course...
              </>
            ) : (
              "Add Course"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddCourse;
