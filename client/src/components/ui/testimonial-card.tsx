import { cn } from "@/lib/utils"; 

interface TestimonialCardProps {
    image: string;
    name: string;
    text: string;
    role: string;
    className?: string;
}

export default function TestimonialCard({ image, name, text, role, className }: TestimonialCardProps) { 
    return ( 
        <div className={cn("max-w-80 bg-secondary text-white rounded-[2rem] border border-border group hover:border-primary/50 transition-all duration-500", className)}> 
            <div className="relative -mt-px overflow-hidden rounded-[2rem]"> 
                <img 
                    src={image} 
                    alt={name} 
                    className="h-[300px] w-full rounded-[2rem] group-hover:scale-110 transition-all duration-700 object-cover object-top opacity-80 group-hover:opacity-100" 
                /> 
                <div className="absolute bottom-0 z-10 h-60 w-full bg-gradient-to-t pointer-events-none from-black via-black/40 to-transparent"></div> 
            </div> 
            <div className="px-8 pb-8 -mt-12 relative z-20"> 
                <p className="font-body text-lg border-b border-border pb-6 italic text-muted-foreground group-hover:text-white transition-colors">
                    "{text}"
                </p> 
                <div className="mt-6 flex flex-col">
                    <p className="font-heading font-black text-xl text-white">— {name}</p> 
                    <p className="text-sm font-black bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text uppercase tracking-widest mt-1">
                        {role}
                    </p> 
                </div>
            </div> 
        </div> 
    ); 
}; 
