import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { ExperienceSection } from "@/components/experience-section";
import { GithubActivity } from "@/components/github-activity";
import { Hero } from "@/components/hero";
import { MotionProvider } from "@/components/motion-provider";
import { ProjectShowcase } from "@/components/project-showcase";
import { SiteHeader } from "@/components/site-header";
import { SkipLink } from "@/components/skip-link";
import { SkillKeyboard } from "@/components/skill-keyboard";
import { portfolio } from "@/data/portfolio";
  import { IntroSplash } from "@/components/intro-splash";

export default function Home() {
  return (
    <MotionProvider>
      <IntroSplash name={portfolio.identity.shortName} />
      <SkipLink />

      <SiteHeader
        name={portfolio.identity.shortName}
        navigation={portfolio.navigation}
        github={portfolio.socials.github}
      />

      <main id="main-content">
        <Hero
          identity={portfolio.identity}
          projectCount={portfolio.projects.length + portfolio.archiveProjects.length}
        />

        <GithubActivity github={portfolio.socials.github} />

        <section className="page-section" id="work">
          <ProjectShowcase />
        </section>

        <ExperienceSection />

        <SkillKeyboard />

        <AboutSection />
      </main>

      <ContactSection />
    </MotionProvider>
  );
}
