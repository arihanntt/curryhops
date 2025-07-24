import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import About from '@/components/about';
import Gallery from '@/components/Gallery';
import FoodMenuHero from '@/components/food';
import HomeMenuSection from '@/components/HomeMenuSection';

export default function Home() {
  return (
    <>
      <Header />
      
      <main>
        <Hero />
        <About />
        <Gallery />
        <FoodMenuHero />
        <HomeMenuSection />
      </main>
      <Footer />
    </>
  );
}