import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CoursesPage = () => {
  const courses = [
    {
      id: 1,
      title: 'Introduction to Web Development',
      category: 'Development',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      instructor: {
        name: 'John Smith',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
      },
      price: '$49.99',
      rating: 4.8,
      description: 'Learn the fundamentals of web development including HTML, CSS, and JavaScript.',
      duration: '12 weeks',
      level: 'Beginner'
    },
    {
      id: 2,
      title: 'Data Science Fundamentals',
      category: 'Data Science',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      instructor: {
        name: 'Sarah Johnson',
        avatar: 'https://randomuser.me/api/portraits/women/1.jpg'
      },
      price: '$59.99',
      rating: 4.9,
      description: 'Master the basics of data science and analytics with practical projects.',
      duration: '10 weeks',
      level: 'Intermediate'
    },
    {
      id: 3,
      title: 'Digital Marketing Masterclass',
      category: 'Marketing',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      instructor: {
        name: 'Michael Brown',
        avatar: 'https://randomuser.me/api/portraits/men/2.jpg'
      },
      price: '$39.99',
      rating: 4.7,
      description: 'Comprehensive guide to digital marketing strategies and implementation.',
      duration: '8 weeks',
      level: 'All Levels'
    },
    {
      id: 4,
      title: 'UX/UI Design Principles',
      category: 'Design',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      instructor: {
        name: 'Emily Davis',
        avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
      },
      price: '$49.99',
      rating: 4.6,
      description: 'Learn modern UI/UX design principles and tools used in the industry.',
      duration: '10 weeks',
      level: 'Intermediate'
    },
    {
      id: 5,
      title: 'Machine Learning for Beginners',
      category: 'AI & ML',
      image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      instructor: {
        name: 'David Wilson',
        avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
      },
      price: '$69.99',
      rating: 4.9,
      description: 'Introduction to machine learning concepts and practical applications.',
      duration: '14 weeks',
      level: 'Advanced'
    },
    {
      id: 6,
      title: 'Business Strategy & Leadership',
      category: 'Business',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      instructor: {
        name: 'Jessica Taylor',
        avatar: 'https://randomuser.me/api/portraits/women/3.jpg'
      },
      price: '$54.99',
      rating: 4.8,
      description: 'Learn essential business strategy and leadership skills for modern organizations.',
      duration: '12 weeks',
      level: 'Intermediate'
    }
  ];

  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', 'Development', 'Data Science', 'Marketing', 'Design', 'AI & ML', 'Business'];

  const filteredCourses = selectedCategory === 'All' 
    ? courses 
    : courses.filter(course => course.category === selectedCategory);

  return (
    <div className="courses-page">
      <div className="container">
        <h1 className="courses-page__title">All Courses</h1>
        
        <div className="courses-page__filters">
          {categories.map(category => (
            <button
              key={category}
              className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="courses-page__grid">
          {filteredCourses.map(course => (
            <motion.div 
              key={course.id}
              className="courses-page__card"
              whileHover={{ 
                scale: 1.05,
                rotateX: 5,
                rotateY: 5,
                boxShadow: "0px 20px 30px rgba(255, 255, 255, 0.2)"
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 20,
                duration: 0.3
              }}
            >
              <img src={course.image} alt={course.title} className="courses-page__card-image" />
              <div className="courses-page__card-content">
                <span className="courses-page__card-category">{course.category}</span>
                <h3 className="courses-page__card-title">{course.title}</h3>
                <p className="courses-page__card-description">{course.description}</p>
                <div className="courses-page__card-details">
                  <span>Duration: {course.duration}</span>
                  <span>Level: {course.level}</span>
                </div>
                <div className="courses-page__card-instructor">
                  <img src={course.instructor.avatar} alt={course.instructor.name} />
                  <span>{course.instructor.name}</span>
                </div>
                <div className="courses-page__card-footer">
                  <div className="rating">
                    ★★★★★
                    <span>{course.rating}</span>
                  </div>
                </div>
                <button className="btn btn--primary btn--full">Watch Now</button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;