import React from 'react';
import { FaPlayCircle } from 'react-icons/fa';

const CourseCard = ({ course }) => {
  return (
    <div className="course-card">
      <div className="course-card__image">
        <img src={course.image} alt={course.title} />
      </div>
      <div className="course-card__content">
        <div className="course-card__category">{course.category}</div>
        <h3 className="course-card__title">{course.title}</h3>
        <div className="course-card__instructor">
          <img src={course.instructor.avatar} alt={course.instructor.name} />
          <span>{course.instructor.name}</span>
        </div>
        <button className="btn btn--primary btn--watch-now">
          <FaPlayCircle /> Watch Now
        </button>
      </div>
    </div>
  );
};

export default CourseCard; 