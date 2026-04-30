import React from 'react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-black/80 backdrop-blur-xl border-b border-white/5 z-50">
      <div className="container mx-auto px-6 py-5 flex justify-between items-center">
        <div className="text-3xl font-black text-primary logo-font tracking-tighter pl-4">
          Digi-Learners
        </div>
        
        <div className="hidden md:flex space-x-12">
          <a href="#" className="text-muted-foreground hover:text-primary font-heading font-black text-xl transition-all">Home</a>
          <a href="#about" className="text-muted-foreground hover:text-primary font-heading font-black text-xl transition-all">About Us</a>
          <a href="#courses" className="text-muted-foreground hover:text-primary font-heading font-black text-xl transition-all">Courses</a>
          <a href="#testimonials" className="text-muted-foreground hover:text-primary font-heading font-black text-xl transition-all">Reviews</a>
          <a href="#contact" className="text-muted-foreground hover:text-primary font-heading font-black text-xl transition-all">Contact</a>
        </div>

        <a 
          href="#contact" 
          className="bg-primary text-black px-8 py-3 rounded-2xl font-black font-heading text-lg hover:bg-accent transition-all transform hover:scale-105 shadow-lg shadow-primary/20"
        >
          Enquire Now
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
