import { ProjectCard } from './ProjectCard';

interface PortfolioProps {
  ecoMode: boolean;
  activeProject: string | null;
  setActiveProject: (project: string | null) => void;
}

interface Project {
  title: string;
  number: string;
  tag: string;
  challenge: string;
  solution: string;
  image: string;
  delay: number;
  link?: string | undefined;
}

const projects: Project[] = [
  {
    title: "Finanzas personales con IA",
    number: "01",
    tag: "Beta | AI Financial Assistant",
    challenge: "Muchas veces gastamos nuestro salario y a la final no sabemos en qué se fue todo?",
    solution:
      "Sistema centralizado donde puedes registrar ingresos, gastos, deudas, etc y con la ayuda del agente integrado, darte asesoría personalizada.",
    image: "https://picsum.photos/seed/finance-ai/1200/675",
    link: "https://fincop-gesti-n-financiera-942659135887.us-west1.run.app",
    delay: 0,
  },
  {
    title: "Vet Agenda",
    number: "02",
    tag: "Alfa | Veterinary Management",
    challenge:
      "Un veterinario independiente se le dificulta centralizar su listado de clientes, tener los datos de sus pacientes, sin que el sistema sea costoso.",
    solution:
      "Sistema que captura de manera digital los datos de sus clientes y pacientes, permitiendo tener comunicación y seguimiento mediante el sistema.",
    image: "https://picsum.photos/seed/vet-agenda/1200/675",
    delay: 0.2,
  },
  {
    title: "Predictor de resultados de parley",
    number: "03",
    tag: "Pre-Alfa | Sports Analytics",
    challenge: "Predecir resultados deportivos con precisión requiere procesar volúmenes masivos de datos históricos y en tiempo real.",
    solution: "Modelo de IA diseñado para analizar estadísticas y tendencias, optimizando la toma de decisiones en apuestas deportivas.",
    image: "https://picsum.photos/seed/sports-ai/1200/675",
    delay: 0.3,
  },
  {
    title: "Abso: Interpretación de texto a ASL",
    number: "04",
    tag: "Pre-Alfa | Accessibility Tech",
    challenge: "La barrera de comunicación entre personas oyentes y la comunidad sorda que utiliza ASL (American Sign Language).",
    solution: "Traductor inteligente que convierte texto en representaciones visuales de lenguaje de señas en tiempo real.",
    image: "https://picsum.photos/seed/asl-ai/1200/675",
    delay: 0.4,
  },
];

export const Portfolio = ({ ecoMode, activeProject, setActiveProject }: PortfolioProps) => {
  return (
    <section id="work" className="py-32 px-8">
      <div className="max-w-screen-2xl mx-auto">
        <div className="mb-32 flex flex-col md:flex-row justify-between items-end gap-8 border-b border-outline-variant pb-12">
          <div className="max-w-xl">
            <h2 className="text-5xl font-black text-white tracking-tighter mb-4">Proyectos Destacados</h2>
            <p className="text-lg text-slate-500">Una muestra de mi experiencia en IA y automatización.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-32">
          {projects.map((project, index) => {
            const Card = ProjectCard as any;
            return (
              <Card
                key={index}
                title={project.title}
                number={project.number}
                tag={project.tag}
                ecoMode={ecoMode}
                onViewDetails={() => {
                  setActiveProject(project.title);
                  document.getElementById('feedback')?.scrollIntoView({ behavior: 'smooth' });
                  if (project.link) {
                    window.open(project.link, '_blank');
                  }
                }}
                challenge={project.challenge}
                solution={project.solution}
                image={project.image}
                delay={project.delay || 0}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};
