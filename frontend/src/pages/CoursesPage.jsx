import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCourseStore } from "../stores/useCourseStore";
import { useUserStore } from "../stores/useUserStore";
import { errorToast } from "../lib/toast";
import { FaLock } from "react-icons/fa";
import { ClipLoader } from "react-spinners";

const CoursesPage = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const { courses, getAllCourses, loading } = useCourseStore();
  const { user } = useUserStore();
  useEffect(() => {
    getAllCourses();
  }, []);

  const handleClick = () => {
    if (user.role === "user") {
      errorToast("You need to Subscribe first to get full access!");
    }
  };
  const handleLockClick = () => {
    errorToast("You need to login first!");
  };
  const filters = [
    { id: "development", name: "Development" },
    { id: "business", name: "Business" },
    { id: "finance-accounting", name: "Finance & Accounting" },
    { id: "it-software", name: "IT & Software" },
    { id: "network", name: "Network" },
    { id: "ai", name: "AI" },
    { id: "hardware-electronics", name: "Hardware & Electronics" },
    { id: "game-development", name: "Game Development" },
    { id: "science-engineering", name: "Science & Engineering" },
    { id: "personal-development", name: "Personal Development" },
    { id: "workout-diet", name: "Workout and Diet" },
    { id: "sales-marketing", name: "Sales & Marketing" },
    { id: "language-learning", name: "Language Learning" },
    { id: "design-art", name: "Design & Art" }
  ]

  const filteredCourses =
    activeFilter === "all"
      ? courses
      : courses.filter((course) => course.category === activeFilter);

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ClipLoader color="#ffffff" />
      </div>
    );
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
          {filteredCourses.length <= 0 ? (
            <p style={{backgroundColor : "gray",padding : "5px", borderRadius : "10px"}}>No courses availabe in this category!</p>
          ) : (
            filteredCourses?.map((course) => (
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
                    <span>Duration {course.duration}/hrs</span>
                    <span
                      style={{
                        textTransform: "capitalize",
                        backgroundColor: "#000",
                        color: "white",
                        padding: "3px 10px",
                        borderRadius: "20px",
                      }}
                    >
                      {course.level}
                    </span>
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

                  {user ? (
                    <Link
                      to={`/watch/${course._id}`}
                      className="btn btn--primary btn--full"
                      onClick={handleClick}
                    >
                      Watch Now
                    </Link>
                  ) : (
                    <button
                      onClick={handleLockClick}
                      className="watch-now-lock"
                    >
                      Watch Now <FaLock />
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
