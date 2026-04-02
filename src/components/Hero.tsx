import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { Translation } from '../types';

interface HeroProps {
  t: Translation;
}

const Hero: React.FC<HeroProps> = ({ t }) => {
  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center max-w-screen-2xl mx-auto px-4 md:px-8 pt-32 md:pt-40">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
        className="max-w-4xl"
      >
        <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs md:text-sm mb-6 block">
          {t.heroSubtitle}
        </span>
        <h1 className="text-5xl md:text-7xl lg:text-9xl font-black tracking-tighter text-white leading-[0.9] mb-12">
          {t.heroTitle.split(' ').slice(0, -2).join(' ')} <br />
          <span className="italic text-primary">{t.heroTitle.split(' ').slice(-2).join(' ')}</span>.
        </h1>
        <p className="text-lg md:text-2xl text-slate-400 max-w-3xl leading-relaxed mb-16">
          {t.heroDesc}
        </p>
        
        <div className="flex flex-wrap gap-4 md:gap-6">
          <motion.button 
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.96 }}
            className="bg-primary text-on-primary px-8 md:px-10 py-4 md:py-5 rounded-xl font-black text-base md:text-lg flex items-center gap-3"
            onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
            aria-label="View projects"
          >
            {t.projects} <ArrowDown className="w-5 h-5" />
          </motion.button>
          
          <motion.button 
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.96 }}
            className="px-8 md:px-10 py-4 md:py-5 rounded-xl font-black text-base md:text-lg ghost-border text-white flex items-center gap-3"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            aria-label="Contact me"
          >
            {t.contact} <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
