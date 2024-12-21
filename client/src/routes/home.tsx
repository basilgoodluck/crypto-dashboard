import Hero from '../components/hero';
import FAQs from '../components/faq';
import WhyWe from '../components/whywe';
import HowItWorks from '../components/howitworks';
import Reviews from '../components/review';

const Home: React.FC = () => {
  return (
    <div className='background-container overflow-x-hidden' id='background-container'>
      <Hero />
      <WhyWe />
      <HowItWorks />
      <Reviews />
      <FAQs />
    </div>
  )
}

export default Home