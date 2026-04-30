import HeroSection from '@/components/ui/hero-section-9';
import { AvatarGroup } from '@/components/ui/avatar-group';
import { Users, Briefcase, Link as LinkIcon } from 'lucide-react';

const HeroSectionDemo = () => {
  const heroData = {
    title: (
      <div className="space-y-4">
        <AvatarGroup className="mb-8" />
        <div className="leading-[1.1] tracking-tighter">
          Master Digital <br /> 
          <span className="text-primary">Skills Faster</span> <br />
          with AI Mentors
        </div>
      </div>
    ),
    subtitle: 'Join the next generation of digital creators. Digi-Learners provides domain-specific AI mentors and expert-led materials for BCA, BBA, and Tech enthusiasts.',
    actions: [
      {
        text: 'Join the Class',
        onClick: () => {
          const element = document.getElementById('contact');
          element?.scrollIntoView({ behavior: 'smooth' });
        },
        variant: 'default' as const,
        className: 'bg-primary text-black hover:bg-accent font-black text-xl px-10 py-8 rounded-2xl shadow-2xl shadow-primary/30 transition-all hover:scale-105'
      },
      {
        text: 'Learn more',
        onClick: () => {
          const element = document.getElementById('about');
          element?.scrollIntoView({ behavior: 'smooth' });
        },
        variant: 'outline' as const,
        className: 'border-2 border-primary/50 text-primary hover:bg-primary/10 font-bold text-xl px-10 py-8 rounded-2xl transition-all'
      },
    ],
    stats: [
      {
        value: '15.2K',
        label: 'Active Students',
        icon: <Users className="h-6 w-6 text-primary" />,
      },
      {
        value: '4.5K',
        label: 'Tutors & Mentors',
        icon: <Briefcase className="h-6 w-6 text-primary" />,
      },
      {
        value: 'Unlimited',
        label: 'Learning Resources',
        icon: <LinkIcon className="h-6 w-6 text-primary" />,
      },
    ],
    images: [
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop',
      'https://plus.unsplash.com/premium_photo-1663054774427-55adfb2be76f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=900',
    ],
  };

  return (
    <div className="w-full bg-black">
      <HeroSection
        title={heroData.title}
        subtitle={heroData.subtitle}
        actions={heroData.actions}
        stats={heroData.stats}
        images={heroData.images}
        className="min-h-screen flex items-center"
      />
    </div>
  );
};

export default HeroSectionDemo;
