// src/Components/FAQSection.jsx
import React, { useState } from 'react';
import '../styles/FAQSection.css'; // Ensure you have the CSS file in the same directory

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'What vaccines are required for my child?',
      answer: 'Vaccines required for children include those for measles, mumps, rubella, chickenpox, and more. Check with your pediatrician for a complete list of recommended vaccines and their schedule.'
    },
    {
      question: 'How often should my child receive vaccinations?',
      answer: 'Vaccination schedules vary. Generally, children receive multiple doses of vaccines throughout their early years. Refer to your healthcare provider for specific timing and requirements for your child.'
    },
    {
      question: 'Are vaccines safe?',
      answer: 'Vaccines are rigorously tested for safety and efficacy before they are approved for use. They are essential in preventing serious diseases and protecting public health. Always consult with your healthcare provider for more information.'
    },
    {
      question: 'Can vaccines cause side effects?',
      answer: 'Yes, vaccines can cause mild side effects such as swelling or redness at the injection site, mild fever, or irritability. Serious side effects are rare. If you have concerns, consult your healthcare provider.'
    },
    {
      question: 'What should I do if I miss a vaccine dose?',
      answer: 'If you miss a dose, contact your healthcare provider as soon as possible to reschedule. They will provide guidance on how to get back on track with your child’s vaccination schedule.'
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-section">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <div className="faq-question" onClick={() => toggleFAQ(index)}>
              {faq.question}
              <span className={`arrow ${activeIndex === index ? 'active' : ''}`}>▼</span>
            </div>
            <div className={`faq-answer ${activeIndex === index ? 'visible' : ''}`}>
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
