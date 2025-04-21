import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import { useCourseStore } from "../stores/useCourseStore";
import { useUserStore } from "../stores/useUserStore";
import { errorToast } from "../lib/toast";

const Courses = () => {
  const { getAllCourses, courses: courseData } = useCourseStore();
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

  return (
    <section id="courses" className="courses section">
      <div className="container">
        <h2 className="section-title">Popular Courses</h2>
        <div className="courses__grid">
          {courseData?.map((course) => (
            <motion.div
              key={course._id}
              className="courses__card"
              whileHover={{
                scale: 1.05,
                rotateX: 5,
                rotateY: 5,
                boxShadow: "0px 20px 30px rgba(255, 255, 255, 0.2)",
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                duration: 0.3,
              }}
            >
              <img
                src={course.image}
                alt={course.title}
                className="courses__card-image"
              />
              <div className="courses__card-content">
                <span className="courses__card-category">
                  {course.category}
                </span>
                <h3 className="courses__card-title">{course.title}</h3>
                <div className="courses__card-instructor">
                  <img
                    src={course.instructor.image}
                    alt={course.instructor.name}
                  />
                  <span>{course.instructor.name}</span>
                </div>
                <div className="courses__card-footer">
                  <div className="rating">
                    ★★★★★
                    <span>{course.rating}</span>
                  </div>
                  {user ? (
                    <div className="watch-now">
                      <Link
                        to={`/watch/${course._id}`}
                        className="courses__card-button"
                        onClick={handleClick}
                      >
                        Watch Now
                      </Link>
                    </div>
                  ) : (
                    <button
                      onClick={handleLockClick}
                      className="watch-now-lock"
                    >
                      Watch Now ! <FaLock />{" "}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <Link to={"/courses"} className="btn btn--primary">
            View All Courses
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Courses;
