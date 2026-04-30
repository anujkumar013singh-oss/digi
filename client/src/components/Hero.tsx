import React from 'react';

const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-4 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
          Learn Digital Skills.<br />
          <span className="text-primary">Transform Your Future.</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto font-body">
          Master the most in-demand skills with our industry-expert led courses. 
          Start your journey today and become a digital pro.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <a 
            href="#courses" 
            className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-accent transition-all transform hover:scale-105"
          >
            Explore Courses
          </a>
          <a 
            href="#about" 
            className="border-2 border-primary text-primary px-8 py-3 rounded-lg font-bold hover:bg-primary/5 transition-all"
          >
            About Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
