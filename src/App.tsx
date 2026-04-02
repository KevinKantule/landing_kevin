/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { cn } from './lib/utils';
import { useAdaptivePreferences } from './hooks/useAdaptivePreferences';
import { ErrorBoundary } from './components/ErrorBoundary';
import { SEO } from './components/SEO';
import { SchemaOrg } from './components/SchemaOrg';

// Section Components
import { Navbar } from './components/Navbar';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Services } from './components/sections/Services';
import { Portfolio } from './components/sections/Portfolio';
import { Feedback } from './components/sections/Feedback';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/Footer';

function AppContent() {
  const [ecoMode, setEcoMode] = useState(false);
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const { prefersReducedMotion } = useAdaptivePreferences();

  return (
    <>
      <SEO />
      <SchemaOrg />
      <div
      className={cn(
        'min-h-screen selection:bg-primary selection:text-on-primary',
        prefersReducedMotion ? 'transition-none' : 'transition-colors duration-1000',
        ecoMode ? 'bg-black' : 'bg-surface'
      )}
    >
      <Navbar ecoMode={ecoMode} setEcoMode={setEcoMode} />

      <main>
        <Hero />
        <About />
        <Services />
        <Portfolio ecoMode={ecoMode} activeProject={activeProject} setActiveProject={setActiveProject} />
        <Feedback activeProject={activeProject} />
        <Contact />
      </main>

      <Footer />
      </div>
    </>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  );
}
