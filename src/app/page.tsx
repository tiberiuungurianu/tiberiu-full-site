import { SiteChrome } from "@/components/layout/SiteChrome";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { SelectedShots } from "@/components/sections/SelectedShots";
import { AroundTheWeb } from "@/components/sections/AroundTheWeb";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <a className="skip-link" href="#selected">
        Skip to content
      </a>
      <SiteChrome />
      <main>
        <Hero />
        <About />
        <SelectedShots />
        <AroundTheWeb />
        <Contact />
      </main>
    </>
  );
}
