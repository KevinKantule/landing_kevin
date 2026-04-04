/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { cn } from './lib/utils';
import { Translation, Language } from './types';

// --- Components ---
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import ProjectCard from './components/ProjectCard';
import AssistantSection from './components/AssistantSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

// --- Main App ---

export default function App() {
  const [ecoMode, setEcoMode] = useState(false);
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [language, setLanguage] = useState<Language>('es');

  const t: Record<Language, Translation> = {
    es: {
      about: "Sobre Mí",
      services: "Servicios",
      projects: "Proyectos",
      contact: "Hablemos",
      ecoOn: "Eco: ON",
      ecoOff: "Eco: OFF",
      heroTitle: "Transformando ideas en sistemas inteligentes",
      heroSubtitle: "Software Developer | AI | Autonomous Agents",
      heroDesc: "Especialista en la creación de agentes autónomos y soluciones de IA que optimizan procesos complejos. Con base en Panamá, ayudo a empresas a dar el salto hacia la automatización inteligente.",
      aboutTitle: "De Android a la Inteligencia Artificial",
      aboutDesc1: "Mi viaje comenzó en el desarrollo móvil, donde aprendí la importancia de la experiencia de usuario y el rendimiento. Sin embargo, mi curiosidad me llevó a explorar cómo las máquinas pueden razonar y tomar decisiones.",
      aboutDesc2: "Hoy, me especializo en el desarrollo de agentes autónomos y sistemas de IA, combinando mi base sólida en ingeniería de software con las últimas innovaciones en modelos de lenguaje y automatización.",
      servicesTitle: "Lo que hago",
      service1: "Agentes Autónomos",
      service1Desc: "Diseño y desarrollo de sistemas que pueden ejecutar tareas complejas de forma independiente utilizando LLMs.",
      service2: "Chatbots Inteligentes",
      service2Desc: "Creación de asistentes conversacionales avanzados con memoria, herramientas y razonamiento contextual.",
      service3: "Desarrollo Mobile",
      service3Desc: "Aplicaciones móviles robustas y escalables, ahora potenciadas con capacidades de IA nativas.",
      projectsTitle: "Proyectos Destacados",
      projectsDesc: "Una muestra de mi experiencia en IA y automatización.",
      project1Title: "Finanzas personales con IA",
      project1Tag: "Beta | Asistente Financiero IA",
      project1Challenge: "¿Muchas veces gastamos nuestro salario y a la final no sabemos en qué se fue todo?",
      project1Solution: "Sistema centralizado donde puedes registrar ingresos, gastos, deudas, etc y con la ayuda del agente integrado, darte asesoría personalizada.",
      project2Title: "Vet Agenda",
      project2Tag: "Alfa | Gestión Veterinaria",
      project2Challenge: "Un veterinario independiente se le dificulta centralizar su listado de clientes y pacientes sin que el sistema sea costoso.",
      project2Solution: "Sistema que captura de manera digital los datos de clientes y pacientes, permitiendo comunicación y seguimiento fluido.",
      project3Title: "Predictor de Resultados de Parley",
      project3Tag: "Pre-Alfa | Analítica Deportiva",
      project3Challenge: "Predecir resultados deportivos con precisión requiere procesar volúmenes masivos de datos históricos y en tiempo real.",
      project3Solution: "Modelo de IA diseñado para analizar estadísticas y tendencias, optimizando la toma de decisiones en apuestas deportivas.",
      project4Title: "Abso: Texto a ASL",
      project4Tag: "Pre-Alfa | Tecnología de Accesibilidad",
      project4Challenge: "La barrera de comunicación entre personas oyentes y la comunidad sorda que utiliza ASL.",
      project4Solution: "Traductor inteligente que convierte texto en representaciones visuales de lenguaje de señas en tiempo real.",
      feedbackTitle: "Asistente de Kevin",
      feedbackStatus: "Listo para dialogar",
      feedbackPlaceholder: "Escribe tu mensaje aquí...",
      feedbackSending: "Enviando...",
      feedbackButton: "Contáctame ahora",
      feedbackSuccess: "¡Mensaje Recibido!",
      feedbackSuccessDesc: "Tu mensaje ha sido enviado a Kevin. Gracias por el interés.",
      feedbackError: "Hubo un problema al enviar el mensaje. Por favor, intenta de nuevo o escríbeme directamente.",
      nameLabel: "Nombre",
      emailLabel: "Correo Electrónico",
      phoneLabel: "Teléfono (Opcional)",
    },
    en: {
      about: "About Me",
      services: "Services",
      projects: "Projects",
      contact: "Let's Talk",
      ecoOn: "Eco: ON",
      ecoOff: "Eco: OFF",
      heroTitle: "Transforming ideas into intelligent systems",
      heroSubtitle: "Software Developer | AI | Autonomous Agents",
      heroDesc: "Specialist in creating autonomous agents and AI solutions that optimize complex processes. Based in Panama, I help companies leap towards intelligent automation.",
      aboutTitle: "From Android to Artificial Intelligence",
      aboutDesc1: "My journey began in mobile development, where I learned the importance of user experience and performance. However, my curiosity led me to explore how machines can reason and make decisions.",
      aboutDesc2: "Today, I specialize in developing autonomous agents and AI systems, combining my solid software engineering foundation with the latest innovations in language models and automation.",
      servicesTitle: "What I do",
      service1: "Autonomous Agents",
      service1Desc: "Design and development of systems that can execute complex tasks independently using LLMs.",
      service2: "Intelligent Chatbots",
      service2Desc: "Creation of advanced conversational assistants with memory, tools, and contextual reasoning.",
      service3: "Mobile Development",
      service3Desc: "Robust and scalable mobile applications, now enhanced with native AI capabilities.",
      projectsTitle: "Featured Projects",
      projectsDesc: "A showcase of my expertise in AI and automation.",
      project1Title: "AI Personal Finance",
      project1Tag: "Beta | AI Financial Assistant",
      project1Challenge: "Often we spend our salary and in the end we don't know where it all went.",
      project1Solution: "Centralized system where you can register income, expenses, debts, etc., and get personalized advice from an integrated agent.",
      project2Title: "Vet Agenda",
      project2Tag: "Alpha | Veterinary Management",
      project2Challenge: "Independent veterinarians struggle to centralize client and patient data without expensive systems.",
      project2Solution: "Digital system that captures client and patient data, enabling seamless communication and follow-up.",
      project3Title: "Parley Result Predictor",
      project3Tag: "Pre-Alpha | Sports Analytics",
      project3Challenge: "Predicting sports results accurately requires processing massive volumes of historical and real-time data.",
      project3Solution: "AI model designed to analyze statistics and trends, optimizing decision-making in sports betting.",
      project4Title: "Abso: Text to ASL",
      project4Tag: "Pre-Alpha | Accessibility Tech",
      project4Challenge: "The communication barrier between hearing people and the deaf community using ASL.",
      project4Solution: "Intelligent translator that converts text into visual sign language representations in real-time.",
      feedbackTitle: "Kevin's Assistant",
      feedbackStatus: "Ready to chat",
      feedbackPlaceholder: "Write your message here...",
      feedbackSending: "Sending...",
      feedbackButton: "Contact me now",
      feedbackSuccess: "Message Received!",
      feedbackSuccessDesc: "Your message has been sent to Kevin. Thanks for your interest.",
      feedbackError: "There was a problem sending the message. Please try again or email me directly.",
      nameLabel: "Name",
      emailLabel: "Email Address",
      phoneLabel: "Phone (Optional)",
    }
  };

  const currentT = t[language];

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-1000 selection:bg-primary selection:text-on-primary",
      ecoMode ? "bg-black" : "bg-surface"
    )}>
      <Navbar 
        ecoMode={ecoMode} 
        setEcoMode={setEcoMode} 
        language={language} 
        setLanguage={setLanguage} 
        t={currentT} 
      />
      
      <main>
        <Hero t={currentT} />
        <About t={currentT} />
        <Services t={currentT} />
        
        <section id="work" className="py-24 md:py-32 px-4 md:px-8">
          <div className="max-w-screen-2xl mx-auto">
            <div className="mb-16 md:mb-32 flex flex-col md:flex-row justify-between items-end gap-8 border-b border-outline-variant pb-12">
              <div className="max-w-xl">
                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">{currentT.projectsTitle}</h2>
                <p className="text-lg text-slate-500">
                  {currentT.projectsDesc}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-24 md:gap-32">
              <ProjectCard 
                title={currentT.project1Title}
                number="01"
                tag={currentT.project1Tag}
                ecoMode={ecoMode}
                language={language}
                onViewDetails={() => {
                  setActiveProject(currentT.project1Title);
                  document.getElementById('feedback')?.scrollIntoView({ behavior: 'smooth' });
                  window.open("https://fincop-gesti-n-financiera-942659135887.us-west1.run.app", "_blank");
                }}
                challenge={currentT.project1Challenge}
                solution={currentT.project1Solution}
                image="https://picsum.photos/seed/finance-ai/1200/675"
              />
              
              <ProjectCard 
                title={currentT.project2Title}
                number="02"
                delay={0.2}
                tag={currentT.project2Tag}
                ecoMode={ecoMode}
                language={language}
                onViewDetails={() => {
                  setActiveProject(currentT.project2Title);
                  document.getElementById('feedback')?.scrollIntoView({ behavior: 'smooth' });
                }}
                challenge={currentT.project2Challenge}
                solution={currentT.project2Solution}
                image="https://picsum.photos/seed/vet-agenda/1200/675"
              />

              <ProjectCard 
                title={currentT.project3Title}
                number="03"
                delay={0.3}
                tag={currentT.project3Tag}
                ecoMode={ecoMode}
                language={language}
                onViewDetails={() => {
                  setActiveProject(currentT.project3Title);
                  document.getElementById('feedback')?.scrollIntoView({ behavior: 'smooth' });
                }}
                challenge={currentT.project3Challenge}
                solution={currentT.project3Solution}
                image="https://picsum.photos/seed/sports-ai/1200/675"
              />

              <ProjectCard 
                title={currentT.project4Title}
                number="04"
                delay={0.4}
                tag={currentT.project4Tag}
                ecoMode={ecoMode}
                language={language}
                onViewDetails={() => {
                  setActiveProject(currentT.project4Title);
                  document.getElementById('feedback')?.scrollIntoView({ behavior: 'smooth' });
                }}
                challenge={currentT.project4Challenge}
                solution={currentT.project4Solution}
                image="https://picsum.photos/seed/asl-ai/1200/675"
              />
            </div>
          </div>
        </section>

        <AssistantSection 
          activeProject={activeProject} 
          setActiveProject={setActiveProject} 
          language={language}
          t={currentT}
        />
        <ContactSection t={currentT} />
      </main>

      <Footer t={currentT} />
    </div>
  );
}

