import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { RetroStatusBar } from '@/components/RetroStatusBar';
import { ProjectsSection } from '@/components/ProjectsSection';
import { ExperienceSection } from '@/components/ExperienceSection';
import { SkillsSection } from '@/components/SkillsSection';
import { RetroDevConsole } from '@/components/RetroDevConsole';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Sticky Top Navbar */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Retro RPG Developer HUD Strip */}
      <RetroStatusBar />

      {/* Real Projects Showcase from GitHub */}
      <ProjectsSection />

      {/* Internship & Experience Section */}
      <ExperienceSection />

      {/* Tech Stack & Engineering Craft */}
      <SkillsSection />

      {/* Interactive Developer Terminal Easter Egg */}
      <RetroDevConsole />

      {/* Contact & Collaboration Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
