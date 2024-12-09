import { Link } from 'react-router-dom';
import heroImage from "../assets/hero.png";
import { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import AnimatedButton from '../components/animatedButton';
import { FaCheckDouble } from "react-icons/fa";
import FAQs from '../components/faq';

function Home() {
  useEffect(() => {
    const container = document.getElementById('background-container');
    if (container) {
      const numOfRaindrops = 100;
      for (let i = 0; i < numOfRaindrops; i++) {
        const drop = document.createElement('div');
        drop.classList.add('raindrop');
        drop.style.left = `${Math.random() * 100}%`;
        drop.style.animationDuration = `${Math.random() * 2 + 1}s`;
        container.appendChild(drop);
      }

      const numOfStars = 200;
      for (let i = 0; i < numOfStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDuration = `${Math.random() * 10 + 5}s`;
        container.appendChild(star);
      }
    }
  }, []);
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
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 300 },
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
    <div className='background-container overflow-x-hidden' id='background-container'>
      <div className=' bg-background-dark flex justify-start items-center gap-12 pt-12 flex-col md:flex-row w-11/12 md:w-4/5 mx-auto'>
        <div className=' text-text-dark pt-12 flex flex-col gap-y-4 '>
          <animated.h1
            style={typingAnimation}
            className="text-xl md:text-2xl font-semibold text-text-semiLight"
          >
            {displayedText}
          </animated.h1>
          <p className='text-sm text-text-semiLight'>Track and manage your Ethereum assets seamlessly. Monitor tokens, coins, and NFTs in real-time, all from a single intuitive dashboard...</p>
          <Link className='' to="/dashboard" ><AnimatedButton e={"Get started"} /></Link>
        </div>
        <div className=' shadow-md shadow-text-semiLight bg-accent-dark p-2 rounded-md' >
          <img src={heroImage} alt='hero image'/>
        </div>
      </div>
      <div className='bg-secondary-light shadow-sm shadow-gray-300 w-11/12 md:w-4/5 mx-auto mt-12 p-6 rounded-sm text-text-dark flex items-center gap-4'>
        <div className='relative w-[120px] h-[120px] p-[10px] bg-white rounded-full'>
          <div className='bg-secondary-light w-full relative h-full border-white rounded-full flex justify-center items-center font-bold '>
            100%
          </div>
          <div className='spinElement absolute w-[20px] h-[20px] g-secondary-dark rounded-full'></div>
        </div>
        <div>
          <ul className='text-sm'>
            <li><FaCheckDouble className='inline text-secondary-dark' /> Fast and secure dashboard</li>
            <li><FaCheckDouble className='inline text-secondary-dark' /> Seamless user experience</li>
            <li><FaCheckDouble className='inline text-secondary-dark' /> Customizable features</li>
            <li><FaCheckDouble className='inline text-secondary-dark' /> Reliable customer support</li>
          </ul>
        </div>
      </div>
      <div>
        <FAQs />
      </div>
    </div>
  )
}

export default Home