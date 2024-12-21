import React from 'react'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import AnimatedButton from '../components/animatedButton';


const Hero: React.FC = () => {
    const headlines = [
        'Track your ETH on-chain tokens.',
        'Monitor real-time asset performance.',
        'Seamlessly manage tokens and NFTs.',
      ];
    
      const [currentIndex, setCurrentIndex] = useState(0);
      const [displayedText, setDisplayedText] = useState('');
    
      const typingSpeed = 100;
      const pauseBetweenHeadlines = 2000;
    
      const typingAnimation = useSpring({
        width: `${displayedText.length}ch`,
        from: { width: "0ch" },
        config: { duration: typingSpeed * displayedText.length },
      });
    
      useEffect(() => {
        let typingTimeout: NodeJS.Timeout;
        let clearTextTimeout: NodeJS.Timeout;
    
        const typeHeadline = (index: number) => {
          const fullText = headlines[index];
          let charIndex = 0;
    
          const type = () => {
            if (charIndex <= fullText.length) {
              setDisplayedText(fullText.slice(0, charIndex));
              charIndex++;
              typingTimeout = setTimeout(type, typingSpeed);
            } else {
              clearTextTimeout = setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % headlines.length);
              }, pauseBetweenHeadlines);
            }
          };
    
          type();
        };
    
        typeHeadline(currentIndex);
    
        return () => {
          clearTimeout(typingTimeout);
          clearTimeout(clearTextTimeout);
        };
      }, [currentIndex]);
  return (
    <div className=' bg-background-dark flex justify-start items-center gap-12 mt-12 pt-12 flex-col lg:flex-row w-11/12 md:w-4/5 mx-auto'>
        <div className=' text-text-dark pt-12 flex flex-col gap-y-4 '>
          <div className="typing-container">
            <animated.h1
              style={typingAnimation}
              className="text-[16px] lg:text-[18px] font-semibold text-text-semiLight typing-animation"
            >
              {displayedText}
            </animated.h1>
          </div>
          <h1 className='text-4xl md:text-5xl capitalize font-black text-accent' style={{lineHeight:"3.5rem"}}>Secure Your Portfolio with Confidence</h1>
          <p className='text-sm text-text-semiLight'>Track and manage your Ethereum assets seamlessly. Monitor tokens, coins, and NFTs in real-time, all from a single intuitive dashboard</p>
          <Link className='' to="/dashboard" ><AnimatedButton e={"Get started"} /></Link>
        </div>
      </div>
  )
}

export default Hero