import React from 'react';
import { X, CheckCircle } from 'lucide-react';

const CourseModal = ({ course, isOpen, onClose }: { course: any, isOpen: boolean, onClose: () => void }) => {
  if (!isOpen || !course) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60] flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <div 
        className="bg-secondary w-full max-w-4xl max-h-[85vh] rounded-[2.5rem] border border-border shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 flex flex-col md:flex-row"
        onClick={e => e.stopPropagation()}
      >
        {/* Left Side: Visuals */}
        <div className="md:w-1/2 relative bg-black/40 flex items-center justify-center border-b md:border-b-0 md:border-r border-border overflow-hidden group">
          <img 
            src={course.thumbnail} 
            alt={course.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          
          <div className="absolute bottom-8 left-8 right-8">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3 leading-tight tracking-tighter">{course.name}</h2>
            <div className="flex items-center gap-3 text-primary font-black">
              <span className="bg-primary/20 px-3 py-1 rounded-full border border-primary/20 flex items-center gap-1.5 text-sm">
                ★ {course.rating}
              </span>
              <span className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.2em]">({course.reviewCount} REVIEWS)</span>
            </div>
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="md:w-1/2 p-8 md:p-10 flex flex-col overflow-y-auto custom-scrollbar bg-secondary">
          <div className="flex justify-between items-start mb-8">
             <div className="bg-black/30 border border-border p-6 rounded-3xl flex-1">
                <div className="text-muted-foreground line-through text-sm mb-1 font-body">₹{course.actualPrice.toLocaleString('en-IN')}</div>
                <div className="flex items-center gap-3">
                  <span className="text-3xl md:text-4xl font-black text-primary">₹{course.discountedPrice.toLocaleString('en-IN')}</span>
                  <span className="bg-primary text-black px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-tighter">
                    SAVE {Math.round((1 - course.discountedPrice/course.actualPrice) * 100)}%
                  </span>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="ml-4 bg-black/20 backdrop-blur-md text-white p-3 rounded-full hover:bg-black/40 transition-colors border border-white/5"
              >
                <X size={20} />
              </button>
          </div>

          <div className="mb-8">
            <h3 className="text-sm font-black mb-6 text-white uppercase tracking-[0.3em] flex items-center gap-3">
              <span className="w-8 h-1 bg-primary rounded-full"></span>
              Syllabus
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {course.syllabus.map((item: string, index: number) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-black/20 rounded-2xl border border-white/5 hover:border-primary/10 transition-all group">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
                    <CheckCircle size={14} className="text-primary" />
                  </div>
                  <span className="text-muted-foreground font-body text-base group-hover:text-white transition-colors leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4 mt-auto pt-6">
            <a 
              href="#contact" 
              onClick={onClose}
              className="flex-1 bg-primary text-black py-5 rounded-2xl font-black text-lg text-center hover:bg-accent transition-all shadow-xl shadow-primary/20"
            >
              ENROLL NOW
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseModal;
