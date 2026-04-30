"use client";
import React from "react";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1"; 
import { motion } from "framer-motion"; 

const testimonials = [ 
  { 
    text: "Digi-Learners revolutionized my learning journey. The AI mentors are incredibly responsive and accurate.", 
    image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=600", 
    name: "Michael Chen", 
    role: "Python Expert", 
  }, 
  { 
    text: "The hands-on coding projects helped me land my first job at a top tech firm. Highly recommend!", 
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=600", 
    name: "James Wilson", 
    role: "Cyber Analyst", 
  }, 
  { 
    text: "Best resource for BCA students. The syllabus is up-to-date and the community is very supportive.", 
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=600&h=600&auto=format&fit=crop", 
    name: "Emily Rodriguez", 
    role: "Full Stack Dev", 
  }, 
  { 
    text: "The AI-powered learning platform adapted perfectly to my pace. I learned more in 3 months than in a year elsewhere.", 
    image: "https://randomuser.me/api/portraits/men/75.jpg", 
    name: "John Doe", 
    role: "Data Scientist", 
  }, 
  { 
    text: "Finally, an ed-tech platform that actually focuses on real-world skills and results.", 
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=600", 
    name: "Sarah Jenkins", 
    role: "UI/UX Expert", 
  }, 
  { 
    text: "Great mentors and excellent study materials. The certifications are highly valued by recruiters.", 
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600", 
    name: "Aliza Khan", 
    role: "Business Analyst", 
  },
  { 
    text: "The interactive lab sessions and AI-guided debugging were game-changers for my career.", 
    image: "https://randomuser.me/api/portraits/men/32.jpg", 
    name: "David Smith", 
    role: "Backend Engineer", 
  },
  { 
    text: "Digi-Learners provides the most comprehensive tech curriculum I've seen in years.", 
    image: "https://randomuser.me/api/portraits/women/44.jpg", 
    name: "Sophia Lee", 
    role: "Full Stack Lead", 
  },
  { 
    text: "The placement support is phenomenal. I felt ready for every interview thanks to my AI mentors.", 
    image: "https://randomuser.me/api/portraits/men/22.jpg", 
    name: "Rahul Varma", 
    role: "Security Analyst", 
  }
]; 

const firstColumn = testimonials.slice(0, 3); 
const secondColumn = testimonials.slice(3, 6); 
const thirdColumn = testimonials.slice(6, 9); 

const Testimonials = () => { 
  return ( 
    <section id="testimonials" className="bg-black min-h-screen flex flex-col justify-center py-32 relative overflow-hidden"> 
      <div className="container z-10 mx-auto px-4"> 
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} 
          viewport={{ once: true }} 
          className="flex flex-col items-center justify-center max-w-3xl mx-auto mb-20" 
        > 
          <div className="flex justify-center mb-8"> 
            <div className="border-2 border-primary/30 bg-primary/5 py-2 px-6 rounded-full text-primary text-base font-black uppercase tracking-widest">Testimonials</div> 
          </div> 

          <h2 className="text-6xl md:text-7xl font-extrabold tracking-tighter mt-5 text-center text-white leading-tight"> 
            What Our <span className="text-primary">Learners</span> Say 
          </h2> 
          <p className="text-center mt-8 opacity-75 text-muted-foreground text-2xl font-body max-w-xl"> 
            Join thousands of successful students who transformed their futures with Digi-Learners. 
          </p> 
        </motion.div> 

        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[740px] overflow-hidden"> 
          <TestimonialsColumn testimonials={firstColumn} duration={15} /> 
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} /> 
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} /> 
        </div> 
      </div> 
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[160px] pointer-events-none -z-10"></div>
    </section> 
  ); 
}; 

export default Testimonials;
