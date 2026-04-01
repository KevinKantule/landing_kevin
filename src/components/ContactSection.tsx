import React from 'react';
import { motion } from 'motion/react';
import { Linkedin, Github } from 'lucide-react';
import { Translation } from '../types';

interface ContactSectionProps {
  t: Translation;
}

const ContactSection: React.FC<ContactSectionProps> = ({ t }) => {
  const links = [
    { label: 'Email', action: t.contact, url: 'mailto:kevin.kantule@gmail.com', icon: null },
    { label: 'Profesional', action: 'LinkedIn', url: 'https://www.linkedin.com/in/kevinkantule/', icon: Linkedin },
    { label: 'El Laboratorio', action: 'GitHub', url: 'https://github.com/KevinKantule', icon: Github },
  ];

  return (
    <section id="contact" className="py-24 md:py-32 px-4 md:px-8 text-center">
      <motion.h2 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="text-4xl md:text-5xl font-black text-white mb-12 md:mb-16 tracking-tighter"
      >
        {t.contact}.
      </motion.h2>
      
      <div className="flex flex-wrap justify-center gap-4 md:gap-6">
        {links.map((link, i) => (
          <motion.a 
            key={i}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, borderColor: '#b7c4ff' }}
            className="group px-6 md:px-10 py-4 md:py-6 bg-surface-container-highest/30 ghost-border rounded-2xl transition-all text-left min-w-[180px] md:min-w-[220px]"
          >
            <span className="block text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-slate-500 mb-2">
              {link.label}
            </span>
            <span className="text-white text-lg md:text-xl font-bold group-hover:text-primary flex items-center gap-3">
              {link.action} {link.icon && <link.icon className="w-5 h-5" />}
            </span>
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default ContactSection;
