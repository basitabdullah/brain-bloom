import React from "react";
import {
  FaBook,
  FaGraduationCap,
  FaLaptopCode,
  FaClock,
  FaCertificate,
  FaUsers,
} from "react-icons/fa";
import  TrueFocus from "../../animatedTexts/TrueFocus/TrueFocus"


const Features = () => {
  const features = [
    {
      icon: <FaBook size={24} />,
      title: "Comprehensive Curriculum",
      description:
        "Access a wide range of courses designed by industry experts to help you master new skills.",
    },
    {
      icon: <FaGraduationCap size={24} />,
      title: "Expert Instructors",
      description:
        "Learn from the best in the field with our carefully selected instructors who are passionate about teaching.",
    },
    {
      icon: <FaLaptopCode size={24} />,
      title: "Interactive Learning",
      description:
        "Engage with interactive content, quizzes, and projects that make learning both effective and enjoyable.",
    },
    {
      icon: <FaClock size={24} />,
      title: "Flexible Schedule",
      description:
        "Study at your own pace with 24/7 access to course materials from any device, anywhere.",
    },
    {
      icon: <FaCertificate size={24} />,
      title: "Low Cost",
      description:
        "We offer a wide range of courses at an affordable price, making it easier than ever to learn new skills.",
    },
    {
      icon: <FaUsers size={24} />,
      title: "Community Support",
      description:
        "Join a community of learners and instructors who are ready to help you succeed in your learning journey.",
    },
  ];

  return (
    <section id="features" className="features section">
      <div className="container">
        <h2 className="section-title">
          <TrueFocus
            sentence="Why Choose BrainBloom"
            manualMode={false}
            blurAmount={5}
            borderColor="gray"
            animationDuration={2}
            pauseBetweenAnimations={1}
          />
        </h2>
        <div className="features__grid">
          {features.map((feature, index) => (
            <div key={index} className="features__item">
              <div className="features__item-icon">{feature.icon}</div>
              <h3 className="features__item-title">{feature.title}</h3>
              <p className="features__item-description">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
