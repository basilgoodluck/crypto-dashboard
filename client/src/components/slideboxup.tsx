import React, { useEffect, useRef } from 'react';

const SlideBoxUp: React.FC<{ children: React.ReactNode, className: string }> = ({ children, className = '' }) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('slide-up-visible');
          } else {
            entry.target.classList.remove('slide-up-visible');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={elementRef} 
      className={`slide-up-hidden ${className}`}
    >
      {children}
    </div>
  );
};

export default SlideBoxUp;