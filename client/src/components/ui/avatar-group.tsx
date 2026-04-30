import React from 'react';
import { cn } from "@/lib/utils";

const AvatarGroup = ({ className }: { className?: string }) => { 
  return ( 
    <div className={cn("flex flex-col items-center lg:items-start text-white", className)}> 
        <h2 className="text-xl font-medium mb-6 font-heading"> 
            Happy 
            <span className="text-primary font-bold ml-2 underline decoration-primary/30 decoration-4 underline-offset-4"> 
                Learners 
            </span> 
        </h2> 
        <div className="flex items-center -space-x-4"> 
            <div className="relative group flex flex-col items-center"> 
                <p className="opacity-0 scale-90 group-hover:scale-100 group-hover:opacity-100 transition duration-300 absolute -top-8 bg-primary text-black text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">Michael</p> 
                <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200" alt="image" 
                    className="w-16 h-16 rounded-full border-4 border-black hover:-translate-y-1 transition hover:scale-110 object-cover ring-2 ring-primary/20" /> 
            </div> 
            <div className="relative group flex flex-col items-center"> 
                <p className="opacity-0 scale-90 group-hover:scale-100 group-hover:opacity-100 transition duration-300 absolute -top-8 bg-primary text-black text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">James</p> 
                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200" alt="image" 
                    className="w-16 h-16 rounded-full border-4 border-black hover:-translate-y-1 transition hover:scale-110 object-cover ring-2 ring-primary/20" /> 
            </div> 
            <div className="relative group flex flex-col items-center"> 
                <p className="opacity-0 scale-90 group-hover:scale-100 group-hover:opacity-100 transition duration-300 absolute -top-8 bg-primary text-black text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">Emily</p> 
                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop" 
                    alt="image" className="w-16 h-16 rounded-full border-4 border-black hover:-translate-y-1 transition hover:scale-110 object-cover ring-2 ring-primary/20" /> 
            </div> 
            <div className="relative group flex flex-col items-center"> 
                <p className="opacity-0 scale-90 group-hover:scale-100 group-hover:opacity-100 transition duration-300 absolute -top-8 bg-primary text-black text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">John</p> 
                <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="image" 
                    className="w-16 h-16 rounded-full border-4 border-black hover:-translate-y-1 transition hover:scale-110 object-cover ring-2 ring-primary/20" /> 
            </div> 
            <div className="w-16 h-16 rounded-full border-4 border-black bg-secondary flex items-center justify-center text-primary font-black text-sm ring-2 ring-primary/20 z-10">
                +60K
            </div>
        </div> 
    </div> 
  ); 
} 

export { AvatarGroup };
