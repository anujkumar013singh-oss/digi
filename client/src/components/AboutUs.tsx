import { Features } from "@/components/ui/features"; 
 import { Brain, BrainCog, Code, Rocket, ShieldCheck } from "lucide-react"; 
 
 const features= [ 
   { 
     id: 1, 
     icon: BrainCog, 
     title: "Who Are AI Experts?", 
     description: 
       "AI Experts at Digi-Learners are domain-specific mentors trained to guide you in tech, coding, and academics. They bridge the gap between theory and industry practice.", 
     image: "https://smartclick.ai/wp-content/uploads/2021/11/ML-engineer-1.jpg", 
   }, 
   { 
     id: 2, 
     icon: Code, 
     title: "Real-World Coding", 
     description: 
       "Our curriculum focuses on hands-on project building. From BCA labs to corporate environments, we prepare you for the actual coding challenges of the 21st century.", 
     image: "https://cms-assets.themuse.com/media/lead/01212022-1047259374-coding-classes_scanrail.jpg", 
   }, 
   { 
     id: 3, 
     icon: Brain, 
     title: "AI-Powered Learning", 
     description: 
       "Experience personalized, AI-driven learning tailored for BCA, BBA, and other students. Our platform adapts to your pace and learning style.", 
     image: "https://cdn.mos.cms.futurecdn.net/DVffQnnibMWmNpx2Wfb5Se-1920-80.jpg", 
   }, 
   { 
     id: 4, 
     icon: Rocket, 
     title: "Fast-Track Career", 
     description: 
       "Accelerate your journey into the tech industry with our placement-oriented training and interview preparation sessions led by experts.", 
     image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop", 
   }, 
   { 
     id: 5, 
     icon: ShieldCheck, 
     title: "Certified Excellence", 
     description: 
       "Earn industry-recognized certifications that validate your skills and help you stand out to top recruiters and tech firms worldwide.", 
     image: "https://marketplace.canva.com/EAGnlJY1Dbk/1/0/1600w/canva-gold-and-black-elegant-appreciation-certificate-Cbr_vwQG__c.jpg", 
   }, 
 ]; 
 
 const AboutUs = () => { 
   return ( 
   <section id="about" className="bg-black">
     <Features 
       primaryColor="primary" 
       progressGradientLight="bg-gradient-to-r from-primary/80 to-primary" 
       progressGradientDark="bg-gradient-to-r from-primary/60 to-primary/80" 
       features={features} 
     /> 
   </section> 
   ) 
 }; 
 
 export default AboutUs; 
