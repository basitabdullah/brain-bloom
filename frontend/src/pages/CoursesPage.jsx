import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCourseStore } from "../stores/useCourseStore";

const CoursesPage = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const { courses, getAllCourses, loading } = useCourseStore();

  useEffect(() => {
    getAllCourses();
  }, []);

  console.log(courses);

  

  const filters = [
    { id: "all", name: "All Courses" },
    { id: "development", name: "Development" },
    { id: "science", name: "Science" },
    { id: "political-science", name: "Political-science" },
    { id: "language", name: "Language" },
    { id: "reasoning", name: "Reasoning" },
    { id: "commerce", name: "Commerce" },
    { id: "advance", name: "Advance" },
  ];

  const filteredCourses =
    activeFilter === "all"
      ? courses
      : courses.filter((course) => course.category === activeFilter);

if(loading){
  return <div>loading courses...</div>
}


  return (
    <div className="courses-page">
      <div className="container">
        <h1 className="courses-page__title">Explore Our Courses</h1>

        <div className="courses-page__filters">
          {filters.map((filter) => (
            <button
              key={filter.id}
              className={`filter-btn ${
                activeFilter === filter.id ? "active" : ""
              }`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.name}
            </button>
          ))}
        </div>

        <div className="courses-page__grid">
          {filteredCourses?.map((course) => (
            <div key={course._id} className="courses-page__card">
              <img
                src={course.image}
                alt={course.title}
                className="courses-page__card-image"
              />
              <div className="courses-page__card-content">
                <span className="courses-page__card-category">
                  {course.category}
                </span>
                <h3 className="courses-page__card-title">{course.title}</h3>
                <p className="courses-page__card-description">
                  {course.description}
                </p>

                <div className="courses-page__card-details">
                  <span>{course.duration}</span>
                  <span>{course.level}</span>
                </div>

                <div className="courses-page__card-instructor">
                  <img
                    src={course.instructor.image}
                    alt={course.instructor.name}
                  />
                  <span>{course.instructor.name}</span>
                </div>

                <div className="courses-page__card-footer">
                  <div className="rating">
                    <FaStar color="#FFD700" />
                    <span>
                      {course.rating} ({course.reviews} reviews)
                    </span>
                  </div>
                </div>

                <Link
                  to={`/watch/${course._id}`}
                  className="btn btn--primary btn--full"
                >
                  Watch Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
