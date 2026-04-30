import React, { useState } from 'react';
import { courses } from '../data/courses';
import CourseModal from './CourseModal';

const CourseGrid = () => {
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (course: any) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCourse(null);
  };

  return (
    <section id="courses" className="bg-black py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-6xl font-extrabold mb-6 text-white tracking-tighter">
            Our Popular <span className="text-primary">Courses</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-body">
            Choose from a variety of domain-specific courses designed for industry excellence.
          </p>
          <div className="w-24 h-2 bg-primary mx-auto mt-8 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {courses.map((course) => (
            <div 
              key={course.id} 
              className="bg-secondary rounded-3xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-500 transform hover:-translate-y-4 group flex flex-col h-full"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={course.thumbnail} 
                  alt={course.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute top-6 right-6 bg-black/80 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold text-primary border border-primary/20">
                  ★ {course.rating}
                </div>
              </div>

              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-3xl font-bold mb-4 text-white group-hover:text-primary transition-colors">
                  {course.name}
                </h3>
                <p className="text-muted-foreground mb-8 line-clamp-2 text-lg font-body">
                  Master {course.name} with our expert-led curriculum and hands-on projects.
                </p>
                
                <div className="mt-auto pt-6 border-t border-border flex items-center justify-between">
                  <div className="text-sm text-muted-foreground font-medium">
                    {course.reviewCount} Students Enrolled
                  </div>
                  <button 
                    onClick={() => openModal(course)}
                    className="px-8 py-3 bg-primary text-black font-bold rounded-2xl hover:bg-accent transition-all shadow-lg shadow-primary/20"
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CourseModal 
        course={selectedCourse} 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
    </section>
  );
};

export default CourseGrid;
