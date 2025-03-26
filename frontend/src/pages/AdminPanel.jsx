import React, { useState } from 'react';
import { FaPlus, FaSave, FaTimes } from 'react-icons/fa';

const AdminPanel = () => {
  const [course, setCourse] = useState({
    title: '',
    category: '',
    description: '',
    duration: '',
    level: '',
    instructor: {
      name: '',
      image: ''
    },
    image: '',
    rating: 0,
    reviews: 0,
    youtubeLink: '',
    abyssLinks: ['']
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setCourse(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setCourse(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleAbyssLinkChange = (index, value) => {
    const newAbyssLinks = [...course.abyssLinks];
    newAbyssLinks[index] = value;
    setCourse(prev => ({
      ...prev,
      abyssLinks: newAbyssLinks
    }));
  };

  const addAbyssLink = () => {
    setCourse(prev => ({
      ...prev,
      abyssLinks: [...prev.abyssLinks, '']
    }));
  };

  const removeAbyssLink = (index) => {
    setCourse(prev => ({
      ...prev,
      abyssLinks: prev.abyssLinks.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: '', text: '' });

    try {
      // Here you would typically make an API call to save the course
      console.log('Course data:', course);
      setMessage({ type: 'success', text: 'Course added successfully!' });
      setCourse({
        title: '',
        category: '',
        description: '',
        duration: '',
        level: '',
        instructor: {
          name: '',
          image: ''
        },
        image: '',
        rating: 0,
        reviews: 0,
        youtubeLink: '',
        abyssLinks: ['']
      });
    } catch (error) {
      setMessage({ type: 'error', text: 'Error adding course. Please try again.' });
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="admin-panel">
      <div className="container">
        <div className="admin-panel__header">
          <h1>Add New Course</h1>
          <p>Fill in the details to create a new course</p>
        </div>

        {message.text && (
          <div className={`admin-panel__message ${message.type}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="admin-panel__form">
          <div className="form-group">
            <label htmlFor="title">Course Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={course.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              id="category"
              name="category"
              value={course.category}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={course.description}
              onChange={handleChange}
              required
              rows="4"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="duration">Duration</label>
              <input
                type="text"
                id="duration"
                name="duration"
                value={course.duration}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="level">Level</label>
              <select
                id="level"
                name="level"
                value={course.level}
                onChange={handleChange}
                required
              >
                <option value="">Select Level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>

          <div className="form-section">
            <h3>Instructor Details</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="instructor.name">Instructor Name</label>
                <input
                  type="text"
                  id="instructor.name"
                  name="instructor.name"
                  value={course.instructor.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="instructor.image">Instructor Image URL</label>
                <input
                  type="url"
                  id="instructor.image"
                  name="instructor.image"
                  value={course.instructor.image}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="image">Course Image URL</label>
            <input
              type="url"
              id="image"
              name="image"
              value={course.image}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="rating">Rating</label>
              <input
                type="number"
                id="rating"
                name="rating"
                value={course.rating}
                onChange={handleChange}
                min="0"
                max="5"
                step="0.1"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="reviews">Number of Reviews</label>
              <input
                type="number"
                id="reviews"
                name="reviews"
                value={course.reviews}
                onChange={handleChange}
                min="0"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="youtubeLink">YouTube Link</label>
            <input
              type="url"
              id="youtubeLink"
              name="youtubeLink"
              value={course.youtubeLink}
              onChange={handleChange}
              required
            />
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

            {course.abyssLinks.map((link, index) => (
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
                  className="btn btn--icon btn--remove"
                  onClick={() => removeAbyssLink(index)}
                >
                  <FaTimes />
                </button>
              </div>
            ))}
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className="btn btn--primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="loading-spinner"></span>
              ) : (
                <>
                  <FaSave /> Save Course
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminPanel; 