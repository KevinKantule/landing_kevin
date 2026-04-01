import React, { useRef } from 'react';
import { motion, useSpring } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { Language } from '../types';

interface ProjectCardProps {
  title: string;
  number: string;
  description?: string;
  image: string;
  tag?: string;
  delay?: number;
  className?: string;
  ecoMode: boolean;
  onViewDetails: () => void;
  challenge?: string;
  solution?: string;
  approach?: string;
  language: Language;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  title, 
  number, 
  image, 
  tag, 
  delay = 0, 
  className, 
  ecoMode, 
  onViewDetails, 
  challenge, 
  solution, 
  approach, 
  language 
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 300, damping: 30 });
  const y = useSpring(0, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || ecoMode) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / 20);
    y.set((e.clientY - centerY) / 20);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
      className={cn("group cursor-pointer", className)}
      onClick={onViewDetails}
    >
      <motion.div 
        style={{ rotateX: y, rotateY: x, transformStyle: 'preserve-3d' }}
        className={cn(
          "relative aspect-[16/9] rounded-2xl overflow-hidden mb-8 bg-surface-container-high transition-all duration-500",
          ecoMode ? "grayscale brightness-75" : ""
        )}
      >
        <motion.img 
          src={image} 
          alt={title}
          referrerPolicy="no-referrer"
          className={cn(
            "w-full h-full object-cover transition-transform duration-700",
            !ecoMode && "group-hover:scale-110"
          )}
        />
        <div className="absolute inset-0 bg-surface-container-lowest/40 group-hover:bg-surface-container-lowest/10 transition-colors" />
        
        {tag && (
          <div className="absolute top-6 right-6 translate-z-10">
            <span className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/20 text-white">
              {tag}
            </span>
          </div>
        )}
      </motion.div>

      <div className="translate-z-20">
        <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight flex items-center gap-4">
          {title} <span className="text-primary text-lg font-normal opacity-50">{number}</span>
        </h3>
        
        <div className="space-y-4 mb-8">
          {challenge && (
            <p className="text-slate-400 text-base md:text-lg">
              <span className="text-white font-bold">{language === 'es' ? 'El Reto' : 'The Challenge'}:</span> {challenge}
            </p>
          )}
          {solution && (
            <p className="text-slate-400 text-base md:text-lg">
              <span className="text-white font-bold">{language === 'es' ? 'La Solución' : 'The Solution'}:</span> {solution}
            </p>
          )}
          {approach && (
            <p className="text-slate-400 text-base md:text-lg">
              <span className="text-white font-bold">{language === 'es' ? 'El Enfoque' : 'The Approach'}:</span> {approach}
            </p>
          )}
        </div>

        <button 
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails();
          }}
          className="inline-flex items-center gap-2 text-primary font-bold group/btn"
          aria-label={`View details for ${title}`}
        >
          {language === 'es' ? 'Ver Detalles' : 'View Details'}
          <ArrowRight className="w-5 h-5 transform group-hover/btn:translate-x-2 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
