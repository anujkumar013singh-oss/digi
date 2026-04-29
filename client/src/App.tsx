import React from 'react';
import Navbar from './components/Navbar';
import HeroSectionDemo from './components/HeroSectionDemo';
import AboutUs from './components/AboutUs';
import CourseGrid from './components/CourseGrid';
import Testimonials from './components/Testimonials';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSectionDemo />
        <AboutUs />
        <CourseGrid />
        <Testimonials />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;
