import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import {Link} from "react-router-dom"

const CoursesPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const courses = [
    {
      id: 1,
      title: 'Introduction to Web Development',
      category: 'Development',
      description: 'Learn the basics of HTML, CSS, and JavaScript to build modern websites.',
      duration: '8 weeks',
      level: 'Beginner',
      instructor: {
        name: 'John Smith',
        image: 'https://randomuser.me/api/portraits/men/1.jpg'
      },
      rating: 4.8,
      reviews: 124,
      image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 2,
      title: 'Advanced React Patterns',
      category: 'Development',
      description: 'Master advanced React concepts and patterns for building scalable applications.',
      duration: '6 weeks',
      level: 'Advanced',
      instructor: {
        name: 'Sarah Johnson',
        image: 'https://randomuser.me/api/portraits/women/1.jpg'
      },
      rating: 4.9,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 3,
      title: 'Data Science Fundamentals',
      category: 'Data Science',
      description: 'Learn the core concepts of data science, statistics, and machine learning.',
      duration: '10 weeks',
      level: 'Intermediate',
      instructor: {
        name: 'Michael Chen',
        image: 'https://randomuser.me/api/portraits/men/2.jpg'
      },
      rating: 4.7,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 4,
      title: 'UX/UI Design Principles',
      category: 'Design',
      description: 'Master the principles of user experience and interface design.',
      duration: '8 weeks',
      level: 'Beginner',
      instructor: {
        name: 'Emily Rodriguez',
        image: 'https://randomuser.me/api/portraits/women/2.jpg'
      },
      rating: 4.6,
      reviews: 98,
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 5,
      title: 'Mobile App Development with Flutter',
      category: 'Development',
      description: 'Build cross-platform mobile applications using Flutter and Dart.',
      duration: '9 weeks',
      level: 'Intermediate',
      instructor: {
        name: 'David Kim',
        image: 'https://randomuser.me/api/portraits/men/3.jpg'
      },
      rating: 4.8,
      reviews: 112,
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 6,
      title: 'Digital Marketing Strategies',
      category: 'Marketing',
      description: 'Learn effective digital marketing strategies for business growth.',
      duration: '6 weeks',
      level: 'Beginner',
      instructor: {
        name: 'Jessica Taylor',
        image: 'https://randomuser.me/api/portraits/women/3.jpg'
      },
      rating: 4.5,
      reviews: 78,
      image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    }
  ];

  const filters = [
    { id: 'all', name: 'All Courses' },
    { id: 'Development', name: 'Development' },
    { id: 'Design', name: 'Design' },
    { id: 'Data Science', name: 'Data Science' },
    { id: 'Marketing', name: 'Marketing' }
  ];

  const filteredCourses = activeFilter === 'all' 
    ? courses 
    : courses.filter(course => course.category === activeFilter);

  return (
    <div className="courses-page">
      <div className="container">
        <h1 className="courses-page__title">Explore Our Courses</h1>
        
        <div className="courses-page__filters">
          {filters.map(filter => (
            <button 
              key={filter.id}
              className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.name}
            </button>
          ))}
        </div>
        
        <div className="courses-page__grid">
          {filteredCourses.map(course => (
            <div key={course.id} className="courses-page__card">
              <img 
                src={course.image} 
                alt={course.title} 
                className="courses-page__card-image" 
              />
              <div className="courses-page__card-content">
                <span className="courses-page__card-category">{course.category}</span>
                <h3 className="courses-page__card-title">{course.title}</h3>
                <p className="courses-page__card-description">{course.description}</p>
                
                <div className="courses-page__card-details">
                  <span>{course.duration}</span>
                  <span>{course.level}</span>
                </div>
                
                <div className="courses-page__card-instructor">
                  <img src={course.instructor.image} alt={course.instructor.name} />
                  <span>{course.instructor.name}</span>
                </div>
                
                <div className="courses-page__card-footer">
                  <div className="rating">
                    <FaStar color="#FFD700" />
                    <span>{course.rating} ({course.reviews} reviews)</span>
                  </div>
                </div>
                
                <Link to={"/watch/8934317"} className="btn btn--primary btn--full">Watch Now</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;