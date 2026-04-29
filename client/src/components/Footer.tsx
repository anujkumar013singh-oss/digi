import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-border py-24">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="md:col-span-1 space-y-8">
            <h2 className="text-4xl font-black text-primary logo-font tracking-tighter pl-4">Digi-Learners</h2>
            <p className="text-muted-foreground text-xl leading-relaxed font-body pl-4">
              Empowering the next generation of digital creators with AI-driven mentorship and real-world projects.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-8 text-white uppercase tracking-widest font-heading">Navigation</h3>
            <ul className="space-y-4 text-muted-foreground text-lg font-body">
              <li><a href="#" className="hover:text-primary transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#courses" className="hover:text-primary transition-colors">Courses</a></li>
              <li><a href="#testimonials" className="hover:text-primary transition-colors">Testimonials</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-8 text-white uppercase tracking-widest font-heading">Top Courses</h3>
            <ul className="space-y-4 text-muted-foreground text-lg font-body">
              <li><a href="#courses" className="hover:text-primary transition-colors">BCA Lab Expert</a></li>
              <li><a href="#courses" className="hover:text-primary transition-colors">Python & AI</a></li>
              <li><a href="#courses" className="hover:text-primary transition-colors">Digital Marketing</a></li>
              <li><a href="#courses" className="hover:text-primary transition-colors">UI/UX Design</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-8 text-white uppercase tracking-widest font-heading">Newsletter</h3>
            <p className="text-muted-foreground text-lg mb-8 font-body">Get the latest updates on AI-powered learning.</p>
            <div className="flex flex-col gap-4">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-secondary border border-border rounded-2xl px-6 py-4 w-full focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none text-white font-heading"
              />
              <button className="bg-primary px-8 py-4 rounded-2xl font-black text-black hover:bg-accent transition-all shadow-xl shadow-primary/20">
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>
        
        <div className="pt-12 border-t border-border flex flex-col md:flex-row justify-between items-center gap-8 text-muted-foreground text-lg font-body">
          <p>© {new Date().getFullYear()} Digi-Learners. Designed for the AI Era.</p>
          <div className="flex gap-10">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
