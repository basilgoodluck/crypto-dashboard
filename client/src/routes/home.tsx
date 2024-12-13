import { Link } from 'react-router-dom';
import playstoreLogo from "../assets/playstoreLogo.png";
import appstoreLogo from "../assets/appstore.png"
import mobileImage from "../assets/ETH.DB.png"
import { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import AnimatedButton from '../components/animatedButton';
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
    <div className='background-container overflow-x-hidden' id='background-container'>
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
          <h1 className='text-3xl md:text-4xl font-semibold underline underline-offset-8 text-accent' style={{lineHeight:"3.5rem"}}>Secure Your Portfolio with Confidence</h1>
          <p className='text-sm text-text-semiLight'>Track and manage your Ethereum assets seamlessly. Monitor tokens, coins, and NFTs in real-time, all from a single intuitive dashboard</p>
          <Link className='' to="/dashboard" ><AnimatedButton e={"Get started"} /></Link>
        </div>
        <div className='' >
          <div className='w-11/12 md:w-4/5 mx-auto flex flex-col justify-between items-center py-4'>
            <div className='w-full'>
              <img src={mobileImage} alt='mobile image' className='shadow-md shadow-gray-100 w-full rounded-t-[30px]' />
            </div>
            <div className="text-text-dark w-full flex justify-center gap-5 items-center mt-4">
              <Link to="https://play.google.com/store" target="_blank" className="flex items-center bg-secondary rounded-2xl text-sm p-3 h-14 gap-2">
                <img src={playstoreLogo} alt="Download on Google Play" className="w-10" />
                Google Play
              </Link>
              <Link to="https://www.apple.com/app-store/" target="_blank" className="bg-secondary rounded-2xl text-sm p-3 flex items-center h-14 gap-2">
                <img src={appstoreLogo} alt="Download on the App Store" className="w-10" />
                App Store
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div>
        <FAQs />
      </div>
    </div>
  )
}

export default Home