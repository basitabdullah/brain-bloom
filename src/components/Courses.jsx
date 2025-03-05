import React from 'react';
import { motion } from 'framer-motion';

const Courses = () => {
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
      rating: 4.8
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
      rating: 4.9
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
      rating: 4.7
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
      rating: 4.6
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
      rating: 4.9
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
      rating: 4.8
    }
  ];

  return (
    <section id="courses" className="courses section">
      <div className="container">
        <h2 className="section-title">Popular Courses</h2>
        <div className="courses__grid">
          {courses.map(course => (
            <motion.div 
              key={course.id} 
              className="courses__card"
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
              <img src={course.image} alt={course.title} className="courses__card-image" />
              <div className="courses__card-content">
                <span className="courses__card-category">{course.category}</span>
                <h3 className="courses__card-title">{course.title}</h3>
                <div className="courses__card-instructor">
                  <img src={course.instructor.avatar} alt={course.instructor.name} />
                  <span>{course.instructor.name}</span>
                </div>
                <div className="courses__card-footer">
                  <div className="price">{course.price}</div>
                  <div className="rating">
                    ★★★★★
                    <span>{course.rating}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <a href="#" className="btn btn--primary">View All Courses</a>
        </div>
      </div>
    </section>
  );
};

export default Courses;