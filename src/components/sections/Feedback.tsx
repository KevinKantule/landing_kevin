import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, Send, Paperclip, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAdaptivePreferences } from '../../hooks/useAdaptivePreferences';

interface FeedbackProps {
  activeProject: string | null;
}

export const Feedback = ({ activeProject }: FeedbackProps) => {
  const [feedback, setFeedback] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { prefersReducedMotion } = useAdaptivePreferences();

  const handleSend = async () => {
    if (!feedback.trim()) return;

    setError(null);
    setIsSending(true);
    const userMessage = feedback;
    setFeedback('');

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          projectContext: activeProject || 'General',
        }),
      });

      const data = await response.json();

      if (data.success) {
        setIsSent(true);
        setTimeout(() => setIsSent(false), 5000);
      } else {
        setError(data.error || 'Error al enviar el mensaje. Intenta de nuevo.');
        setFeedback(userMessage);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Error de conexión. Por favor, verifica tu internet e intenta de nuevo.';
      setError(errorMessage);
      setFeedback(userMessage);
      console.error('Error sending feedback:', err);
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
                role="status"
                aria-live="polite"
              >
                <CheckCircle2 className="w-16 h-16 text-primary mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">¡Mensaje Recibido!</h3>
                <p className="text-slate-300">Tu mensaje ha sido enviado a Kevin. Gracias por el interés.</p>
              </motion.div>
            )}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -20 }}
                className="absolute inset-0 bg-red-900/20 backdrop-blur-md z-10 flex flex-col items-center justify-center text-center p-8"
                role="alert"
                aria-live="assertive"
              >
                <AlertCircle className="w-16 h-16 text-red-400 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Error al enviar</h3>
                <p className="text-red-200 mb-6">{error}</p>
                <button
                  onClick={() => setError(null)}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full font-bold transition-colors"
                  aria-label="Cerrar mensaje de error"
                >
                  Cerrar
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-on-primary" aria-hidden="true">
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
                    : '¿Buscas implementar inteligencia artificial en tu próximo proyecto o liderar una iniciativa tecnológica innovadora? Hablemos.'}
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              aria-label="Tu mensaje"
              className="w-full bg-surface-container-highest/30 border-none rounded-2xl p-6 text-white placeholder-slate-600 focus:ring-2 focus:ring-primary transition-all resize-none mb-4"
              placeholder={activeProject ? `Escribe sobre ${activeProject}...` : 'Escribe tu mensaje aquí...'}
              rows={3}
              disabled={isSending}
            />
            <div className="flex justify-between items-center">
              <div className="flex gap-4">
                <button
                  className="w-12 h-12 rounded-full ghost-border text-slate-400 hover:text-primary hover:border-primary transition-all flex items-center justify-center"
                  aria-label="Adjuntar archivo (próximamente)"
                  disabled
                >
                  <Paperclip className="w-5 h-5" />
                </button>
              </div>
              <button
                onClick={handleSend}
                disabled={!feedback.trim() || isSending}
                id="contact-btn"
                aria-label="Enviar mensaje"
                className="bg-primary text-on-primary px-8 py-3 rounded-full font-black flex items-center gap-2 hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100"
              >
                {isSending ? 'Enviando...' : 'Contáctame ahora'} <Send className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
