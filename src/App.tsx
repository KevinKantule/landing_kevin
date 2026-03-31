/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from 'motion/react';
import {
  ArrowDown,
  ArrowRight,
  Leaf,
  Smartphone,
  Send,
  Mic,
  Paperclip,
  Bot,
  Github,
  Linkedin,
  Rss,
  ExternalLink,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { cn } from './lib/utils';
import { useAdaptivePreferences, useConnectionStatus } from './hooks/useAdaptivePreferences';

// --- Components ---

const Navbar = ({ ecoMode, setEcoMode }: { ecoMode: boolean, setEcoMode: (v: boolean) => void }) => {
  return (
    <nav className="fixed top-0 w-full z-50 glass border-t-0 border-x-0">
      <div className="flex justify-between items-center px-8 py-4 max-w-screen-2xl mx-auto">
        <span className="text-2xl font-black text-primary tracking-tighter uppercase">Kevin Kantule</span>
        
        <div className="hidden md:flex items-center gap-10">
          <a href="#about" className="text-slate-400 hover:text-primary font-bold transition-colors">Sobre Mí</a>
          <a href="#services" className="text-slate-400 hover:text-primary font-bold transition-colors">Servicios</a>
          <a href="#work" className="text-slate-400 hover:text-primary font-bold transition-colors">Proyectos</a>
        </div>

        <div className="flex items-center gap-6">
          <button 
            onClick={() => setEcoMode(!ecoMode)}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-full ghost-border transition-all group",
              ecoMode ? "bg-green-500/20 border-green-500" : "bg-surface-container-highest/50 hover:border-primary"
            )}
          >
            <Leaf className={cn("w-4 h-4 transition-colors", ecoMode ? "text-green-400" : "text-slate-400")} />
            <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400 group-hover:text-white">
              {ecoMode ? "Eco: ON" : "Eco: OFF"}
            </span>
          </button>
          
          <a 
            href="#contact"
            className="bg-primary text-on-primary px-6 py-2.5 rounded-full font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20"
          >
            Hablemos
          </a>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  const { prefersReducedMotion } = useAdaptivePreferences();

  return (
    <section className="min-h-screen flex flex-col justify-center max-w-screen-2xl mx-auto px-8 pt-32 md:pt-40">
      <motion.div
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
        className="max-w-4xl"
      >
        <span className="text-primary font-bold tracking-[0.3em] uppercase text-sm mb-6 block">
          Software Developer | AI | Autonomous Agents
        </span>
        <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-white leading-[0.9] mb-12">
          Transformando ideas en <br />
          <span className="italic text-primary">sistemas inteligentes</span>.
        </h1>
        <p className="text-xl md:text-2xl text-slate-400 max-w-3xl leading-relaxed mb-16">
          Desarrollador de software radicado en <span className="text-white font-semibold">Panamá</span>. 
          Evolucionando desde el ecosistema móvil hacia la próxima frontera tecnológica: 
          el desarrollo de <span className="text-white">chatbots avanzados</span> y <span className="text-primary italic">agentes autónomos</span>.
        </p>
        
        <div className="flex flex-wrap gap-6">
          <motion.button
            whileHover={prefersReducedMotion ? {} : { y: -4 }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.96 }}
            className="bg-primary text-on-primary px-10 py-5 rounded-xl font-black text-lg flex items-center gap-3"
            onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Conoce mi trabajo <ArrowDown className="w-5 h-5" />
          </motion.button>

          <motion.button
            whileHover={prefersReducedMotion ? {} : { y: -4 }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.96 }}
            className="px-10 py-5 rounded-xl font-black text-lg ghost-border text-white flex items-center gap-3"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Hablemos de tu proyecto <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

const About = () => {
  const { prefersReducedMotion } = useAdaptivePreferences();

  return (
    <section id="about" className="py-32 px-8 bg-surface-container-low/20">
      <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.8 }}
          viewport={{ once: true }}
        >
          <div className="relative aspect-square rounded-3xl overflow-hidden ghost-border group">
            <img
              src="https://picsum.photos/seed/tech-profile/800/800"
              alt="Kevin Kantule"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-black text-white mb-8 tracking-tighter">Sobre Mí</h2>
          <div className="space-y-6 text-lg text-slate-400 leading-relaxed">
            <p>
              Mi pasión por la tecnología se traduce en la creación de soluciones que automatizan y optimizan procesos complejos.
            </p>
            <p>
              Mi viaje en el desarrollo comenzó construyendo aplicaciones para <span className="text-white font-semibold">Android</span>, donde aprendí la importancia del rendimiento, la arquitectura sólida y la experiencia del usuario. Con la rápida evolución de la tecnología, adapté mi enfoque para resolver problemas de manera más interactiva y dinámica.
            </p>
            <p>
              Hoy en día, me especializo en la <span className="text-primary font-semibold italic">inteligencia artificial aplicada</span>. Dedico la mayor parte de mi tiempo al diseño y despliegue de chatbots robustos que mejoran la comunicación y la eficiencia operativa.
            </p>
            <p>
              Actualmente, estoy inmerso en la investigación e implementación de <span className="text-white font-semibold">agentes autónomos</span>, explorando cómo la orquestación de IA puede ejecutar tareas secuenciales, tomar decisiones y revolucionar el desarrollo de software y la automatización de procesos.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Services = () => {
  const { prefersReducedMotion } = useAdaptivePreferences();

  const services = [
    {
      title: "Desarrollo de Agentes Autónomos",
      status: "En curso",
      description: "Investigación y diseño de sistemas de IA capaces de planificar, usar herramientas y ejecutar tareas de forma independiente para automatizar flujos de trabajo complejos.",
      icon: Bot
    },
    {
      title: "Creación de Chatbots Inteligentes",
      description: "Desarrollo de asistentes virtuales conversacionales impulsados por IA, diseñados para integrarse fluidamente en plataformas empresariales y mejorar la atención al cliente.",
      icon: Send
    },
    {
      title: "Desarrollo Móvil (Android)",
      description: "Experiencia fundamental en la creación de aplicaciones nativas, estableciendo bases sólidas en lógica de programación y diseño de interfaces.",
      icon: Smartphone
    }
  ];

  return (
    <section id="services" className="py-32 px-8">
      <div className="max-w-screen-2xl mx-auto">
        <h2 className="text-5xl font-black text-white mb-20 tracking-tighter text-center">Lo que hago</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: prefersReducedMotion ? 0 : i * 0.1 }}
              viewport={{ once: true }}
              className="p-10 rounded-3xl bg-surface-container-highest/20 ghost-border hover:bg-surface-container-highest/40 transition-all group"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <service.icon className="w-7 h-7 text-primary" />
              </div>
              {service.status && (
                <span className="text-[10px] uppercase tracking-widest font-bold text-primary mb-4 block">
                  {service.status}
                </span>
              )}
              <h3 className="text-2xl font-bold text-white mb-6 tracking-tight">{service.title}</h3>
              <p className="text-slate-400 leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ title, number, description, image, tag, delay = 0, className, ecoMode, onViewDetails, challenge, solution, approach }: any) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { prefersReducedMotion, isTouchDevice } = useAdaptivePreferences();
  const { effectiveType } = useConnectionStatus();

  // Disable expensive animations on slow connections, touch devices, or when motion is reduced
  const shouldAnimateCard = !prefersReducedMotion && !isTouchDevice && effectiveType !== '3g';
  const x = useSpring(0, { stiffness: 300, damping: 30 });
  const y = useSpring(0, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !shouldAnimateCard || ecoMode) return;
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
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: prefersReducedMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
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
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px"
          className={cn(
            "w-full h-full object-cover transition-transform duration-700",
            !ecoMode && !isTouchDevice && shouldAnimateCard && "group-hover:scale-110"
          )}
          loading="lazy"
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
        <h3 className="text-4xl font-bold text-white mb-6 tracking-tight flex items-center gap-4">
          {title} <span className="text-primary text-lg font-normal opacity-50">{number}</span>
        </h3>
        
        <div className="space-y-4 mb-8">
          {challenge && (
            <p className="text-slate-400 text-lg">
              <span className="text-white font-bold">El Reto:</span> {challenge}
            </p>
          )}
          {solution && (
            <p className="text-slate-400 text-lg">
              <span className="text-white font-bold">La Solución:</span> {solution}
            </p>
          )}
          {approach && (
            <p className="text-slate-400 text-lg">
              <span className="text-white font-bold">El Enfoque:</span> {approach}
            </p>
          )}
        </div>

        <button 
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails();
          }}
          className="inline-flex items-center gap-2 text-primary font-bold group/btn"
        >
          Ver Detalles
          <ArrowRight className="w-5 h-5 transform group-hover/btn:translate-x-2 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
};

const AssistantSection = ({ activeProject }: { activeProject: string | null }) => {
  const [feedback, setFeedback] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const { prefersReducedMotion } = useAdaptivePreferences();

  const handleSend = async () => {
    if (!feedback.trim()) return;
    
    setIsSending(true);
    const userMessage = feedback;
    setFeedback('');

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: userMessage, 
          projectContext: activeProject || 'General' 
        }),
      });

      const data = await response.json();

      if (data.success) {
        setIsSent(true);
        setTimeout(() => setIsSent(false), 5000);
      } else {
        throw new Error(data.error || 'Failed to send');
      }
    } catch (error) {
      console.error("Error sending feedback:", error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="feedback" className="py-32 bg-surface-container-low/30">
      <div className="max-w-3xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.8 }}
          viewport={{ once: true }}
          className="bg-surface-container-lowest rounded-3xl p-8 md:p-12 ghost-border shadow-2xl relative overflow-hidden"
        >
          <AnimatePresence>
            {isSent && (
              <motion.div
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -20 }}
                className="absolute inset-0 bg-primary/10 backdrop-blur-md z-10 flex flex-col items-center justify-center text-center p-8"
              >
                <CheckCircle2 className="w-16 h-16 text-primary mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">¡Mensaje Recibido!</h3>
                <p className="text-slate-300">Tu mensaje ha sido enviado a Kevin. Gracias por el interés.</p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-on-primary">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold">Asistente de Kevin</h4>
              <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Listo para dialogar</p>
            </div>
          </div>

          <div className="space-y-8 mb-12">
            <div className="flex gap-4">
              <div className="bg-surface-container-highest/50 p-6 rounded-2xl rounded-tl-none max-w-md border-l-4 border-primary">
                <p className="text-slate-200">
                  {activeProject 
                    ? `¿Qué te pareció el proyecto de ${activeProject}? Me encantaría conocer tu perspectiva o hablar de cómo puedo ayudarte.`
                    : "¿Buscas implementar inteligencia artificial en tu próximo proyecto o liderar una iniciativa tecnológica innovadora? Hablemos."}
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <textarea 
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full bg-surface-container-highest/30 border-none rounded-2xl p-6 text-white placeholder-slate-600 focus:ring-2 focus:ring-primary transition-all resize-none mb-4"
              placeholder={activeProject ? `Escribe sobre ${activeProject}...` : "Escribe tu mensaje aquí..."}
              rows={3}
              disabled={isSending}
            />
            <div className="flex justify-between items-center">
              <div className="flex gap-4">
                <button className="w-12 h-12 rounded-full ghost-border text-slate-400 hover:text-primary hover:border-primary transition-all flex items-center justify-center">
                  <Paperclip className="w-5 h-5" />
                </button>
              </div>
              <button 
                onClick={handleSend}
                disabled={!feedback.trim() || isSending}
                id="contact-btn"
                className="bg-primary text-on-primary px-8 py-3 rounded-full font-black flex items-center gap-2 hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100"
              >
                {isSending ? 'Enviando...' : 'Contáctame ahora'} <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  const { prefersReducedMotion } = useAdaptivePreferences();

  const links = [
    { label: 'Email', action: 'Escríbeme', url: 'mailto:kevin.kantule@gmail.com', icon: null },
    { label: 'Profesional', action: 'LinkedIn', url: 'https://www.linkedin.com/in/kevinkantule/', icon: Linkedin },
    { label: 'El Laboratorio', action: 'GitHub', url: 'https://github.com/KevinKantule', icon: Github },
  ];

  return (
    <section id="contact" className="py-32 px-8 text-center">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
        className="text-5xl font-black text-white mb-16 tracking-tighter"
      >
        Hablemos.
      </motion.h2>
      
      <div className="flex flex-wrap justify-center gap-6">
        {links.map((link, i) => (
          <motion.a 
            key={i}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, borderColor: '#b7c4ff' }}
            className="group px-10 py-6 bg-surface-container-highest/30 ghost-border rounded-2xl transition-all text-left min-w-[220px]"
          >
            <span className="block text-xs uppercase tracking-[0.2em] font-bold text-slate-500 mb-2">
              {link.label}
            </span>
            <span className="text-white text-xl font-bold group-hover:text-primary flex items-center gap-3">
              {link.action} {link.icon && <link.icon className="w-5 h-5" />}
            </span>
          </motion.a>
        ))}
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="w-full py-20 px-8 bg-surface-container-lowest border-t border-outline-variant">
      <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-screen-2xl mx-auto gap-8">
        <div>
          <p className="text-lg leading-relaxed text-slate-400">
            Kevin Kantule — 2026. Transformando ideas en sistemas inteligentes.
          </p>
        </div>
        
        <div className="flex gap-12">
          <a href="https://www.linkedin.com/in/kevinkantule/" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-primary transition-colors font-bold flex items-center gap-2">
            LinkedIn <ExternalLink className="w-4 h-4" />
          </a>
          <a href="https://github.com/KevinKantule" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-primary transition-colors font-bold flex items-center gap-2">
            GitHub <Github className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  const [ecoMode, setEcoMode] = useState(false);
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const { prefersReducedMotion, isTouchDevice } = useAdaptivePreferences();

  return (
    <div className={cn(
      "min-h-screen selection:bg-primary selection:text-on-primary",
      prefersReducedMotion ? "transition-none" : "transition-colors duration-1000",
      ecoMode ? "bg-black" : "bg-surface"
    )}>
      <Navbar ecoMode={ecoMode} setEcoMode={setEcoMode} />
      
      <main>
        <Hero />
        <About />
        <Services />
        
        <section id="work" className="py-32 px-8">
          <div className="max-w-screen-2xl mx-auto">
            <div className="mb-32 flex flex-col md:flex-row justify-between items-end gap-8 border-b border-outline-variant pb-12">
              <div className="max-w-xl">
                <h2 className="text-5xl font-black text-white tracking-tighter mb-4">Proyectos Destacados</h2>
                <p className="text-lg text-slate-500">
                  Una muestra de mi experiencia en IA y automatización.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-32">
              <ProjectCard 
                title="Finanzas personales con IA"
                number="01"
                tag="Beta | AI Financial Assistant"
                ecoMode={ecoMode}
                onViewDetails={() => {
                  setActiveProject("Finanzas personales con IA");
                  document.getElementById('feedback')?.scrollIntoView({ behavior: 'smooth' });
                  window.open("https://fincop-gesti-n-financiera-942659135887.us-west1.run.app", "_blank");
                }}
                challenge="Muchas veces gastamos nuestro salario y a la final no sabemos en qué se fue todo?"
                solution="Sistema centralizado donde puedes registrar ingresos, gastos, deudas, etc y con la ayuda del agente integrado, darte asesoría personalizada."
                image="https://picsum.photos/seed/finance-ai/1200/675"
              />
              
              <ProjectCard 
                title="Vet Agenda"
                number="02"
                delay={0.2}
                tag="Alfa | Veterinary Management"
                ecoMode={ecoMode}
                onViewDetails={() => {
                  setActiveProject("Vet Agenda");
                  document.getElementById('feedback')?.scrollIntoView({ behavior: 'smooth' });
                }}
                challenge="Un veterinario independiente se le dificulta centralizar su listado de clientes, tener los datos de sus pacientes, sin que el sistema sea costoso."
                solution="Sistema que captura de manera digital los datos de sus clientes y pacientes, permitiendo tener comunicación y seguimiento mediante el sistema."
                image="https://picsum.photos/seed/vet-agenda/1200/675"
              />

              <ProjectCard 
                title="Predictor de resultados de parley"
                number="03"
                delay={0.3}
                tag="Pre-Alfa | Sports Analytics"
                ecoMode={ecoMode}
                onViewDetails={() => {
                  setActiveProject("Predictor de Parley");
                  document.getElementById('feedback')?.scrollIntoView({ behavior: 'smooth' });
                }}
                challenge="Predecir resultados deportivos con precisión requiere procesar volúmenes masivos de datos históricos y en tiempo real."
                solution="Modelo de IA diseñado para analizar estadísticas y tendencias, optimizando la toma de decisiones en apuestas deportivas."
                image="https://picsum.photos/seed/sports-ai/1200/675"
              />

              <ProjectCard 
                title="Abso: Interpretación de texto a ASL"
                number="04"
                delay={0.4}
                tag="Pre-Alfa | Accessibility Tech"
                ecoMode={ecoMode}
                onViewDetails={() => {
                  setActiveProject("Abso: Texto a ASL");
                  document.getElementById('feedback')?.scrollIntoView({ behavior: 'smooth' });
                }}
                challenge="La barrera de comunicación entre personas oyentes y la comunidad sorda que utiliza ASL (American Sign Language)."
                solution="Traductor inteligente que convierte texto en representaciones visuales de lenguaje de señas en tiempo real."
                image="https://picsum.photos/seed/asl-ai/1200/675"
              />
            </div>
          </div>
        </section>

        <AssistantSection activeProject={activeProject} />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}

