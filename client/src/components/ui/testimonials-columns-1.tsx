"use client"; 
import React from "react"; 
import { motion } from "framer-motion"; 

interface Testimonial {
  text: string;
  image: string;
  name: string;
  role: string;
}

export const TestimonialsColumn = (props: { 
  className?: string; 
  testimonials: Testimonial[]; 
  duration?: number; 
}) => { 
  return ( 
    <div className={props.className}> 
      <motion.div 
        animate={{ 
          translateY: "-50%", 
        }} 
        transition={{ 
          duration: props.duration || 10, 
          repeat: Infinity, 
          ease: "linear", 
          repeatType: "loop", 
        }} 
        className="flex flex-col gap-6 pb-6" 
      > 
        {[ 
          ...new Array(2).fill(0).map((_, index) => ( 
            <React.Fragment key={index}> 
              {props.testimonials.map(({ text, image, name, role }, i) => ( 
                <div 
                  className="p-8 rounded-3xl border border-border bg-secondary shadow-lg shadow-primary/5 max-w-xs w-full transition-all hover:border-primary/30" 
                  key={`${index}-${i}`}
                > 
                  <div className="text-muted-foreground font-body text-base italic leading-relaxed">"{text}"</div> 
                  <div className="flex items-center gap-3 mt-6"> 
                    <img 
                      width={44} 
                      height={44} 
                      src={image} 
                      alt={name} 
                      className="h-11 w-11 rounded-full object-cover border-2 border-primary/20" 
                    /> 
                    <div className="flex flex-col"> 
                      <div className="font-bold tracking-tight leading-5 text-white font-heading">{name}</div> 
                      <div className="text-xs font-black uppercase tracking-widest text-primary mt-1">{role}</div> 
                    </div> 
                  </div> 
                </div> 
              ))} 
            </React.Fragment> 
          )), 
        ]} 
      </motion.div> 
    </div> 
  ); 
}; 
