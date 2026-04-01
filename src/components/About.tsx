import React from 'react';
import { motion } from 'motion/react';
import { Translation } from '../types';

interface AboutProps {
  t: Translation;
}

const About: React.FC<AboutProps> = ({ t }) => {
  return (
    <section id="about" className="py-24 md:py-32 px-4 md:px-8 bg-surface-container-low/20">
      <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="relative aspect-square rounded-3xl overflow-hidden ghost-border group">
            <img 
              src="https://picsum.photos/seed/tech-profile/800/800" 
              alt="Kevin Kantule" 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tighter">{t.about}</h2>
          <div className="space-y-6 text-base md:text-lg text-slate-400 leading-relaxed">
            <p>{t.aboutDesc1}</p>
            <p>{t.aboutDesc2}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
