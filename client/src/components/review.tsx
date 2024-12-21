import React, { useEffect, useRef } from 'react';

const Reviews: React.FC = () => {
  const reviews = [
    { id: 1, text: 'Amazing platform for tracking Ethereum prices!', author: 'Alice' },
    { id: 2, text: 'Very intuitive and user-friendly.', author: 'Bob' },
    { id: 3, text: 'A must-have tool for crypto enthusiasts!', author: 'Charlie' },
    { id: 4, text: 'Live prices and analytics are top-notch!', author: 'Diana' },
    { id: 5, text: 'Helped me make better investment decisions.', author: 'Eve' },
  ];

  const scrollRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    const content = contentRef.current;

    if (!scrollContainer || !content) return;

    const clonedContent = content.cloneNode(true);
    scrollContainer.appendChild(clonedContent);

    const scroll = () => {
      if (!scrollContainer) return;

      if (scrollContainer.scrollLeft >= content.offsetWidth) {
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollLeft += 1;
      }
    };

    const interval = setInterval(scroll, 10);

    const handleMouseEnter = () => clearInterval(interval);
    const handleMouseLeave = () => setInterval(scroll, 30);

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearInterval(interval);
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section className="py-12 bg-white text-text">
      <h2 className="text-3xl font-bold text-center mb-8">What Our Users Say</h2>
      <div
        ref={scrollRef}
        className="flex overflow-hidden whitespace-nowrap relative"
      >
        <div ref={contentRef} className="flex scroll-smooth">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-gray-200 rounded-lg shadow-lg p-4 min-w-[250px] mx-2 text-center flex-shrink-0"
            >
              <p className="text-sm mb-2">{review.text}</p>
              <p className="text-sm font-bold text-primary-dark">- {review.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;