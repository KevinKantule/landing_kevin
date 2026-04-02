import React from 'react';
import { motion } from 'motion/react';
import { Bot, Send, Smartphone } from 'lucide-react';
import { Translation } from '../types';

interface ServicesProps {
  t: Translation;
}

const Services: React.FC<ServicesProps> = ({ t }) => {
  const services = [
    {
      title: t.service1,
      status: "En curso",
      description: t.service1Desc,
      icon: Bot
    },
    {
      title: t.service2,
      description: t.service2Desc,
      icon: Send
    },
    {
      title: t.service3,
      description: t.service3Desc,
      icon: Smartphone
    }
  ];

  return (
    <section id="services" className="py-24 md:py-32 px-4 md:px-8">
      <div className="max-w-screen-2xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-12 md:mb-20 tracking-tighter text-center">{t.servicesTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-8 md:p-10 rounded-3xl bg-surface-container-highest/20 ghost-border hover:bg-surface-container-highest/40 transition-all group"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <service.icon className="w-7 h-7 text-primary" />
              </div>
              {service.status && (
                <span className="text-[10px] uppercase tracking-widest font-bold text-primary mb-4 block">
                  {service.status}
                </span>
              )}
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 tracking-tight">{service.title}</h3>
              <p className="text-slate-400 leading-relaxed text-sm md:text-base">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
