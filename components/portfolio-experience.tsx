"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Braces,
  CloudCog,
  Code2,
  Download,
  Github,
  Linkedin,
  MapPin,
  Menu,
  Sparkles,
  X,
} from "lucide-react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { resume } from "@/content/resume";

const HeroScene = dynamic(() => import("@/components/hero-scene"), {
  ssr: false,
  loading: () => <div className="scene-loader" aria-label="Loading interactive scene" />,
});

const reveal = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0 },
};

const iconSet = [Braces, Code2, CloudCog, Sparkles];

export function PortfolioExperience() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.35,
  });

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-section]"));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-25% 0px -55%", threshold: [0.05, 0.25, 0.5] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const motionProps = {
    initial: reducedMotion ? false : "hidden",
    whileInView: "visible",
    viewport: { once: true, amount: 0.18 },
    variants: reveal,
    transition: { duration: 0.72, ease: "easeOut" as const },
  };

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <motion.div className="scroll-progress" style={{ scaleX: smoothProgress }} />
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <div className="grid-plane" aria-hidden="true" />

      <header className="site-header">
        <a className="brand" href="#home" aria-label="Chino Concepcion, home">
          <Image className="brand-logo" src="/cc-brand-mark.png" alt="" width={38} height={38} priority />
          <span className="brand-word">CHINO</span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {resume.navigation.map((item) => {
            const id = item.href.slice(1);
            return (
              <a key={item.href} href={item.href} className={activeSection === id ? "active" : ""}>
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>
        <a className="availability" href={`mailto:${resume.identity.email}`}>
          <span className="status-dot" />
          Available for opportunities
        </a>
        <button
          className="menu-button"
          type="button"
          onClick={() => setMenuOpen((current) => !current)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
        <nav id="mobile-menu" className={`mobile-nav ${menuOpen ? "open" : ""}`} aria-label="Mobile navigation">
          {resume.navigation.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main id="main">
        <section id="home" className="hero section-shell" data-section>
          <div className="hero-scene" aria-hidden="true">
            <Image
              className="hero-art"
              src="/hero-orbital-workstation.png"
              alt=""
              fill
              sizes="(max-width: 800px) 145vw, 57vw"
              priority
            />
            {!reducedMotion && <HeroScene />}
          </div>
          <div className="hero-copy">
            <motion.div {...motionProps} className="hero-kicker">
              <span>01</span>
              <div />
              <p>Software systems / AI / cloud</p>
            </motion.div>
            <motion.h1
              initial={reducedMotion ? undefined : { opacity: 0, y: 48 }}
              animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
            >
              Building systems
              <br />
              <span>that move ideas</span>
              <br />
              into reality.
            </motion.h1>
            <motion.p
              className="hero-summary"
              initial={reducedMotion ? undefined : { opacity: 0, y: 30 }}
              animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.3 }}
            >
              Full stack developer crafting dependable APIs, thoughtful interfaces, and intelligent infrastructure.
            </motion.p>
            <motion.div
              className="hero-actions"
              initial={reducedMotion ? undefined : { opacity: 0, y: 24 }}
              animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
            >
              <a className="button button-primary" href="#projects">
                Explore my work <ArrowDown size={17} />
              </a>
              <a className="button button-quiet" href={resume.identity.pdf} download>
                Download résumé <Download size={17} />
              </a>
            </motion.div>
          </div>
          <div className="hero-meta">
            <div>
              <span>Based in</span>
              <strong>{resume.identity.location}</strong>
            </div>
            <div>
              <span>Experience</span>
              <strong>5+ years</strong>
            </div>
          </div>
          <a className="scroll-cue" href="#about" aria-label="Scroll to about section">
            <span>Scroll to explore</span>
            <ArrowDown size={16} />
          </a>
        </section>

        <section id="about" className="about section-shell" data-section>
          <motion.div className="section-heading" {...motionProps}>
            <p className="eyebrow"><span>02</span> About</p>
            <h2>Engineer at the intersection of <em>product</em> and <em>systems.</em></h2>
          </motion.div>
          <div className="about-grid">
            <motion.div className="portrait-wrap" {...motionProps}>
              <div className="portrait-frame">
                <Image
                  src={resume.identity.profileImage}
                  alt="Profile placeholder for Chino Concepcion"
                  fill
                  sizes="(max-width: 800px) 70vw, 30vw"
                  priority
                />
                <span className="corner top-left" />
                <span className="corner bottom-right" />
                <div className="portrait-label">Profile image / replace in public</div>
              </div>
              <div className="orbit-badge">
                <span>5+</span>
                Years building
              </div>
            </motion.div>
            <motion.div className="about-copy" {...motionProps}>
              <p className="lead">{resume.summary}</p>
              <p>{resume.status}</p>
              <div className="principles">
                <div>
                  <span>01</span>
                  <strong>Think in systems</strong>
                  <p>Design clear boundaries, stable contracts, and maintainable foundations.</p>
                </div>
                <div>
                  <span>02</span>
                  <strong>Ship with purpose</strong>
                  <p>Connect technical decisions to real users, workflows, and business outcomes.</p>
                </div>
                <div>
                  <span>03</span>
                  <strong>Keep learning</strong>
                  <p>Explore new tools deeply enough to understand where they create lasting value.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="expertise" className="expertise section-shell" data-section>
          <motion.div className="section-heading split-heading" {...motionProps}>
            <div>
              <p className="eyebrow"><span>03</span> Expertise</p>
              <h2>One engineer.<br /><em>Four dimensions.</em></h2>
            </div>
            <p>From interface to infrastructure, I build across the whole path an idea takes to become a reliable product.</p>
          </motion.div>
          <div className="expertise-grid">
            {resume.expertise.map((group, index) => {
              const Icon = iconSet[index];
              return (
                <motion.article
                  className="expertise-card"
                  key={group.title}
                  {...motionProps}
                  transition={{ duration: 0.65, delay: index * 0.08 }}
                >
                  <div className="card-topline">
                    <span>{group.index}</span>
                    <Icon size={23} strokeWidth={1.5} />
                  </div>
                  <h3>{group.title}</h3>
                  <p>{group.description}</p>
                  <div className="skill-cloud">
                    {group.skills.map((skill) => <span key={skill}>{skill}</span>)}
                  </div>
                </motion.article>
              );
            })}
          </div>
          <motion.div className="terminal" {...motionProps}>
            <div className="terminal-bar">
              <div><i /><i /><i /></div>
              <span>architecture.log</span>
              <span>LIVE</span>
            </div>
            <div className="terminal-body">
              <code>
                <span className="code-muted">01</span> <span className="code-green">const</span> direction = {"{"}
                <br />
                <span className="code-muted">02</span>&nbsp;&nbsp; architecture: <span className="code-cyan">&quot;clean + scalable&quot;</span>,
                <br />
                <span className="code-muted">03</span>&nbsp;&nbsp; systems: [<span className="code-cyan">&quot;microservices&quot;</span>, <span className="code-cyan">&quot;event-driven&quot;</span>],
                <br />
                <span className="code-muted">04</span>&nbsp;&nbsp; next: <span className="code-cyan">&quot;cloud-native AI platforms&quot;</span>
                <br />
                <span className="code-muted">05</span> {"}"};
              </code>
              <div className="terminal-signal"><span /><small>Expanding the frontier</small></div>
            </div>
          </motion.div>
        </section>

        <section id="projects" className="projects section-shell" data-section>
          <motion.div className="section-heading split-heading" {...motionProps}>
            <div>
              <p className="eyebrow"><span>04</span> Selected systems</p>
              <h2>Ideas shaped into<br /><em>working platforms.</em></h2>
            </div>
            <p>A selection of product concepts spanning AI infrastructure, enterprise operations, and location-aware experiences.</p>
          </motion.div>
          <div className="project-list">
            {resume.projects.map((project, index) => (
              <motion.article
                className="project-card"
                key={project.title}
                {...motionProps}
                transition={{ duration: 0.7, delay: (index % 2) * 0.08 }}
              >
                <div className="project-number">{String(index + 1).padStart(2, "0")}</div>
                <div className="project-content">
                  <p>{project.eyebrow}</p>
                  <h3>{project.title}</h3>
                  <span>{project.description}</span>
                  <div className="project-tags">
                    {project.tags.map((tag) => <small key={tag}>{tag}</small>)}
                  </div>
                </div>
                <div className="project-arrow"><ArrowUpRight size={21} /></div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="contact" className="contact section-shell" data-section>
          <motion.div className="contact-orbit" {...motionProps}>
            <div className="contact-ring ring-one" />
            <div className="contact-ring ring-two" />
            <div className="contact-core">
              <span className="status-dot" />
              Available
            </div>
          </motion.div>
          <motion.div className="contact-copy" {...motionProps}>
            <p className="eyebrow"><span>05</span> Start a conversation</p>
            <h2>Have a complex idea?<br /><em>Let&apos;s make it clear.</em></h2>
            <p>I&apos;m open to backend, full stack, software engineering, and AI engineering opportunities.</p>
            <a className="email-link" href={`mailto:${resume.identity.email}`}>
              {resume.identity.email} <ArrowRight />
            </a>
            <div className="contact-actions">
              <a href={resume.identity.github} target="_blank" rel="noreferrer"><Github size={19} /> GitHub</a>
              <a href={resume.identity.linkedin} target="_blank" rel="noreferrer"><Linkedin size={19} /> LinkedIn</a>
              <a href={resume.identity.pdf} download><Download size={19} /> Résumé PDF</a>
            </div>
            <div className="location"><MapPin size={16} /> {resume.identity.location} · UTC+8</div>
          </motion.div>
        </section>
      </main>

      <footer>
        <div className="brand">
          <Image className="brand-logo" src="/cc-brand-mark.png" alt="" width={38} height={38} />
          <span className="brand-word">CHINO</span>
        </div>
        <p>Designed for clarity. Built with depth.</p>
        <a href="#home">Back to top <ArrowUpRight size={15} /></a>
      </footer>
    </>
  );
}
