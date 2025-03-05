import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      content: "BrainBloom has completely transformed my learning experience. The courses are well-structured and the instructors are incredibly knowledgeable. I've gained skills that have directly impacted my career growth.",
      author: {
        name: 'Alex Thompson',
        position: 'Software Developer',
        avatar: 'https://randomuser.me/api/portraits/men/4.jpg'
      }
    },
    {
      id: 2,
      content: "As someone who was struggling to find quality educational content online, BrainBloom has been a game-changer. The interactive learning approach keeps me engaged, and the community support is fantastic.",
      author: {
        name: 'Sophia Martinez',
        position: 'Marketing Specialist',
        avatar: 'https://randomuser.me/api/portraits/women/4.jpg'
      }
    },
    {
      id: 3,
      content: "The certification I earned through BrainBloom helped me land my dream job. The curriculum is relevant to industry needs, and the projects provided practical experience that I could showcase to employers.",
      author: {
        name: 'James Wilson',
        position: 'Data Analyst',
        avatar: 'https://randomuser.me/api/portraits/men/5.jpg'
      }
    },
    {
      id: 4,
      content: "I've tried many online learning platforms, but BrainBloom stands out for its quality content and exceptional teaching methods. The flexibility to learn at my own pace has been invaluable for balancing work and studies.",
      author: {
        name: 'Emma Clark',
        position: 'UX Designer',
        avatar: 'https://randomuser.me/api/portraits/women/5.jpg'
      }
    }
  ];

  return (
    <section id="testimonials" className="testimonials section">
      <div className="container">
        <h2 className="section-title">What Our Students Say</h2>
        <div className="testimonials__grid">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="testimonials__item">
              <p className="testimonials__item-content">{testimonial.content}</p>
              <div className="testimonials__item-author">
                <img src={testimonial.author.avatar} alt={testimonial.author.name} />
                <div className="testimonials__item-author-info">
                  <h4>{testimonial.author.name}</h4>
                  <p>{testimonial.author.position}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;