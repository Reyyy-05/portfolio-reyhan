import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { RetroStatusBar } from '@/components/RetroStatusBar';
import { RetroArcadeSection } from '@/components/RetroArcadeSection';
import { ExperienceSection } from '@/components/ExperienceSection';
import { RpgSkillsWindow } from '@/components/RpgSkillsWindow';
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

      {/* Pixel Realms - Retro Arcade & Neon Projects Showcase (Home.jpeg / projects.jpeg) */}
      <RetroArcadeSection />

      {/* Internship & Experience Section */}
      <ExperienceSection />

      {/* Retro OS Window - RPG Inventory Skills Grid (skills.jpeg) */}
      <RpgSkillsWindow />

      {/* Interactive Developer Terminal Easter Egg */}
      <RetroDevConsole />

      {/* Contact & Collaboration Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
