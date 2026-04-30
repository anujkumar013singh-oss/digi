import React, { useState } from 'react';
import axios from 'axios';
import { Send, CheckCircle2, AlertCircle, Loader2, Phone, Mail, MapPin } from 'lucide-react';
import { courses } from '../data/courses';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    message: ''
  });

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null as string | null
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Character limit check ke liye frontend par hi validation laga dete hain
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  // 10 characters check (Reverted)
  if (formData.message.length < 10) {
    setStatus({ 
      loading: false, 
      success: false, 
      error: 'Message must be at least 10 characters long.' 
    });
    return;
  }

  setStatus({ loading: true, success: false, error: null });
 
  
  // ✅ Correct code
  const API_URL = import.meta.env.VITE_API_URL || 'https://digi-edu-backend.onrender.com';
  
  try {
    const res = await axios.post(`${API_URL}/api/contact`, formData);
    if (res.data.success) {
      setStatus({ loading: false, success: true, error: null });
      setFormData({ name: '', email: '', phone: '', course: '', message: '' });
    }
  } catch (err: any) {
    // UI/UX Update: Boring error ki jagah specific error dikhayenge
    const errorMessage = err.response?.data?.message || 'Minimum 10 characters required';
    setStatus({ loading: false, success: false, error: errorMessage });
  }
};
  

  return (
    <section id="contact" className="bg-black py-32 min-h-screen flex items-center">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          
          {/* Left Column: Info */}
          <div className="lg:w-1/2">
            <div className="inline-block border-2 border-primary/30 bg-primary/5 py-2 px-6 rounded-full text-primary text-base font-black uppercase tracking-widest mb-10">
              Get in Touch
            </div>
            <h2 className="text-6xl md:text-7xl font-extrabold text-white mb-10 leading-[1.1] tracking-tighter">
              Ready to Start Your <span className="text-primary">Journey?</span>
            </h2>
            <p className="text-2xl text-muted-foreground mb-12 font-body leading-relaxed max-w-xl">
              Have questions about our AI-powered courses? Our expert team is ready to guide you to success.
            </p>
            
            <div className="space-y-8 mb-16">
              <div className="flex items-center gap-6 group">
                <div className="bg-secondary p-5 rounded-[1.5rem] border border-border group-hover:border-primary/50 transition-all">
                  <Mail className="text-primary" size={28} />
                </div>
                <div>
                  <p className="text-muted-foreground text-sm font-black uppercase tracking-widest mb-1">Email Us</p>
                  <p className="text-white text-2xl font-bold font-heading">hello@digilearners.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6 group">
                <div className="bg-secondary p-5 rounded-[1.5rem] border border-border group-hover:border-primary/50 transition-all">
                  <Phone className="text-primary" size={28} />
                </div>
                <div>
                  <p className="text-muted-foreground text-sm font-black uppercase tracking-widest mb-1">Call Us</p>
                  <p className="text-white text-2xl font-bold font-heading">+91 98765 43210</p>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="bg-secondary p-5 rounded-[1.5rem] border border-border group-hover:border-primary/50 transition-all">
                  <MapPin className="text-primary" size={28} />
                </div>
                <div>
                  <p className="text-muted-foreground text-sm font-black uppercase tracking-widest mb-1">Our Lab</p>
                  <p className="text-white text-2xl font-bold font-heading">New Delhi, India</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                <Avatar className="border-2 border-black h-12 w-12">
                  <AvatarImage src="https://originui.com/avatar-80-03.jpg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Avatar className="border-2 border-black h-12 w-12">
                  <AvatarImage src="https://originui.com/avatar-80-04.jpg" />
                  <AvatarFallback>AS</AvatarFallback>
                </Avatar>
                <Avatar className="border-2 border-black h-12 w-12">
                  <AvatarImage src="https://originui.com/avatar-80-05.jpg" />
                  <AvatarFallback>MK</AvatarFallback>
                </Avatar>
              </div>
              <p className="text-muted-foreground font-medium">Talk to our <span className="text-white font-bold underline decoration-primary decoration-2 underline-offset-4">Success Mentors</span></p>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:w-1/2 w-full">
            <div className="bg-secondary p-12 rounded-[3rem] border border-border shadow-2xl relative overflow-hidden group">
              {/* Success Overlay */}
              {status.success && (
                <div className="absolute inset-0 bg-black/95 z-20 flex flex-col items-center justify-center text-center p-10 animate-in fade-in duration-500">
                  <div className="bg-primary/20 p-6 rounded-full mb-8">
                    <CheckCircle2 size={80} className="text-primary" />
                  </div>
                  <h3 className="text-4xl font-black mb-4 text-white tracking-tight">Enquiry Sent!</h3>
                  <p className="text-muted-foreground text-xl font-body">Our team will contact you within 24 hours.</p>
                  <button 
                    onClick={() => setStatus({ ...status, success: false })}
                    className="mt-10 text-primary font-black uppercase tracking-widest text-sm hover:underline"
                  >
                    Send Another Message
                  </button>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-sm font-black text-muted-foreground uppercase tracking-widest ml-1">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-black/50 border border-border px-6 py-5 rounded-2xl text-white font-heading focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-black text-muted-foreground uppercase tracking-widest ml-1">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-black/50 border border-border px-6 py-5 rounded-2xl text-white font-heading focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-sm font-black text-muted-foreground uppercase tracking-widest ml-1">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-black/50 border border-border px-6 py-5 rounded-2xl text-white font-heading focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                      placeholder="+91 00000 00000"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-black text-muted-foreground uppercase tracking-widest ml-1">Course Choice</label>
                    <select
                      name="course"
                      required
                      value={formData.course}
                      onChange={handleChange}
                      className="w-full bg-black/50 border border-border px-6 py-5 rounded-2xl text-white font-heading focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all appearance-none"
                    >
                      <option value="" disabled className="bg-secondary">Select a course</option>
                      {courses.map(course => (
                        <option key={course.id} value={course.name} className="bg-secondary">{course.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-black text-muted-foreground uppercase tracking-widest ml-1">Your Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full bg-black/50 border border-border px-6 py-5 rounded-2xl text-white font-heading focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all resize-none"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>

                {status.error && (
                  <div className="flex items-center gap-3 text-red-400 bg-red-400/10 p-5 rounded-2xl border border-red-400/20 text-sm font-medium">
                    <AlertCircle size={20} />
                    <span>{status.error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status.loading}
                  className="w-full bg-primary text-black py-6 rounded-[1.5rem] font-black text-xl flex items-center justify-center gap-3 hover:bg-accent transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl shadow-primary/20 transform hover:scale-[1.02]"
                >
                  {status.loading ? (
                    <>
                      <Loader2 size={24} className="animate-spin" />
                      SUBMITTING...
                    </>
                  ) : (
                    <>
                      <Send size={24} />
                      SEND ENQUIRY
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
