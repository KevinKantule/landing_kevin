import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, CheckCircle2, Paperclip, Send, AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';
import { Translation, Language } from '../types';

interface AssistantSectionProps {
  activeProject: string | null;
  setActiveProject: (v: string | null) => void;
  language: Language;
  t: Translation;
}

const AssistantSection: React.FC<AssistantSectionProps> = ({ activeProject, language, t }) => {
  const [feedback, setFeedback] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSend = async () => {
    if (!feedback.trim()) return;
    
    setIsSending(true);
    setError(null);
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
    } catch (err: any) {
      console.error("Error sending feedback:", err);
      setError(err.message || "Error");
      setFeedback(userMessage);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="feedback" className="py-24 md:py-32 bg-surface-container-low/30 px-4 md:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-surface-container-lowest rounded-3xl p-8 md:p-12 ghost-border shadow-2xl relative overflow-hidden"
        >
          <AnimatePresence>
            {isSent && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute inset-0 bg-primary/10 backdrop-blur-md z-10 flex flex-col items-center justify-center text-center p-8"
              >
                <CheckCircle2 className="w-16 h-16 text-primary mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">{t.feedbackSuccess}</h3>
                <p className="text-slate-300">{t.feedbackSuccessDesc}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-on-primary">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold">{t.feedbackTitle}</h4>
              <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">{t.feedbackStatus}</p>
            </div>
          </div>

          <div className="space-y-8 mb-12">
            <div className="flex gap-4">
              <div className="bg-surface-container-highest/50 p-6 rounded-2xl rounded-tl-none max-w-md border-l-4 border-primary">
                <p className="text-slate-200">
                  {activeProject 
                    ? `${language === 'es' ? '¿Qué te pareció el proyecto de' : 'What did you think about the'} ${activeProject}? ${language === 'es' ? 'Me encantaría conocer tu perspectiva o hablar de cómo puedo ayudarte.' : 'I would love to hear your perspective or talk about how I can help you.'}`
                    : t.heroDesc}
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <textarea 
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className={cn(
                "w-full bg-surface-container-highest/30 border-none rounded-2xl p-6 text-white placeholder-slate-600 focus:ring-2 transition-all resize-none mb-4",
                error ? "ring-2 ring-destructive" : "focus:ring-primary"
              )}
              placeholder={activeProject ? `${language === 'es' ? 'Escribe sobre' : 'Write about'} ${activeProject}...` : t.feedbackPlaceholder}
              rows={3}
              disabled={isSending}
              aria-label="Feedback message"
            />
            
            {error && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-destructive text-sm mb-4 font-bold flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4" /> {t.feedbackError}
              </motion.p>
            )}

            <div className="flex justify-between items-center">
              <div className="flex gap-4">
                <button 
                  className="w-12 h-12 rounded-full ghost-border text-slate-400 hover:text-primary hover:border-primary transition-all flex items-center justify-center"
                  aria-label="Attach file"
                >
                  <Paperclip className="w-5 h-5" />
                </button>
              </div>
              <button 
                onClick={handleSend}
                disabled={!feedback.trim() || isSending}
                id="contact-btn"
                className="bg-primary text-on-primary px-8 py-3 rounded-full font-black flex items-center gap-2 hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100"
              >
                {isSending ? t.feedbackSending : t.feedbackButton} <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AssistantSection;
