"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Project = {
  id: string; name: string; eyebrow: string; short: string; description: string;
  image: string; github: string; live?: string; status?: string; stack: string[];
  detail: string[]; featured?: boolean; team?: { name: string; url: string }[];
};

const projects: Project[] = [
  {
    id: "lak-arthika", name: "Lak-Arthika", eyebrow: "Economic intelligence / Applied ML",
    short: "A research-led intelligence platform for turning fragmented Sri Lankan commodity data into structured, geospatial insight.",
    description: "The portfolio flagship: a modular data and applied-ML system designed around the realities of Sri Lankan market data.",
    image: "/images/project-lak-arthika.jpg", github: "https://github.com/inthiiii/Lak-Arthika", status: "Under development", featured: true,
    stack: ["Python", "FastAPI", "Pandas", "GeoJSON", "Plotly", "PostGIS pathway"],
    detail: [
      "Modular ingestion, preprocessing, validation, and analytical workflows for commodity-market data.",
      "Geospatial data services and interactive trend exploration designed for a production-minded architecture.",
      "Research-heavy engineering work with forecasting and spatial intelligence as deliberate areas of development.",
    ],
  },
  {
    id: "vitalis", name: "Vitalis", eyebrow: "Medical AI / Edge intelligence",
    short: "A privacy-first medical AI system exploring offline multimodal assistance and agentic clinical workflows.",
    description: "A technically ambitious medical AI platform centered on privacy, local inference, and carefully scoped clinical interaction concepts.",
    image: "/images/project-vitalis.jpg", github: "https://github.com/inthiiii/vitalis-sovereign-ai",
    stack: ["Python", "FastAPI", "Next.js", "Ollama", "Llama 3.2", "ChromaDB"],
    detail: [
      "Explores offline multimodal LLM inference on Apple Silicon and retrieval over mixed medical context.",
      "Includes a state-aware, hands-free Surgical Mode concept for voice-led navigation in sterile workflows.",
      "Investigates encrypted offline patient-data transfer using AES-256 and steganography.",
    ],
  },
  {
    id: "ara", name: "ARA", eyebrow: "Personal AI / macOS",
    short: "A powerful personal-assistant concept working toward deeply contextual, Jarvis-like computing on the Mac.",
    description: "ARA explores what a native personal AI can become when local models, cloud models, and operating-system context are treated as one system.",
    image: "/images/project-ara.jpg", github: "https://github.com/inthiiii/ARA-Virtual-Assistant",
    stack: ["Python", "macOS", "Local LLMs", "Cloud LLMs", "Automation"],
    detail: [
      "Designed as a native assistant rather than a chatbot wrapped in a desktop window.",
      "Explores contextual automation with a deliberate local/cloud model boundary.",
      "Jarvis-level is the product direction—not a claim that every imagined capability is already shipped.",
    ],
  },
  {
    id: "stickyy", name: "Stickyy", eyebrow: "Shipped product / macOS utility",
    short: "A lightweight native scratchpad that keeps fast notes persistent, close, and out of the way.",
    description: "A focused desktop product built around a single promise: ideas should be immediately available without adding workflow friction.",
    image: "/images/project-stickyy.jpg", github: "https://github.com/inthiiii/stickyy", live: "https://stickyyformac.vercel.app",
    stack: ["macOS", "Native app", "Product design", "Vercel"],
    detail: [
      "Persistent notes with a deliberately lightweight interaction model.",
      "A finished product surface with a dedicated site and download path.",
      "Demonstrates product judgment alongside larger AI research systems.",
    ],
  },
  {
    id: "insight", name: "Insight", eyebrow: "Experimental / Spatial knowledge",
    short: "An experimental knowledge tool combining AR note pinning with a connected node-web for navigating ideas.",
    description: "Insight treats notes as spatial and relational objects, experimenting with how knowledge can be placed, connected, and revisited.",
    image: "/images/project-insight.jpg", github: "https://github.com/inthiiii/Insight-App-iOS", status: "Experimental",
    stack: ["iOS", "AR", "Knowledge graphs", "Machine learning"],
    detail: [
      "AR note pinning places knowledge in physical context instead of a conventional list.",
      "A node-web view exposes relationships between ideas as a navigable graph.",
      "The work is intentionally experimental and explores interaction possibilities rather than overstating production readiness.",
    ],
  },
  {
    id: "spectra", name: "Spectra", eyebrow: "Agentic analytics / Data systems",
    short: "An autonomous AI data-science platform that plans analyses, executes code, and builds interactive outputs.",
    description: "Spectra investigates end-to-end agentic analysis: from a natural-language question to a planned, sandboxed, visual result.",
    image: "/images/project-spectra.jpg", github: "https://github.com/inthiiii/Spectra-ai-DataAnalyst",
    stack: ["LangGraph", "FastAPI", "Next.js", "E2B", "Plotly"],
    detail: [
      "LangGraph-based planning coordinates analytical steps and Python generation.",
      "Sandboxed execution creates separation between generated code and the application runtime.",
      "Automated profiling and interactive visualization support exploratory analysis.",
    ],
  },
  {
    id: "heliosl", name: "HelioSL", eyebrow: "Green energy / Research",
    short: "A researched energy-intelligence project exploring a stronger data foundation for Sri Lanka's green transition.",
    description: "HelioSL brings environmental research, geospatial thinking, and engineering together around practical clean-energy planning.",
    image: "/images/project-heliosl.jpg", github: "https://github.com/inthiiii/HelioSL",
    stack: ["Energy analytics", "Geospatial data", "Research", "Full-stack"],
    detail: [
      "Explores location-aware signals relevant to renewable-energy decisions in Sri Lanka.",
      "Frames green-energy information as a usable intelligence product, not a static report.",
      "Built collaboratively with an emphasis on research depth and a product-level vision.",
    ],
    team: [
      { name: "Kiruthika", url: "https://www.linkedin.com/in/kiruthika54/" },
      { name: "Sivamathuran", url: "https://www.linkedin.com/in/sivamathuran/" },
      { name: "Brammawaxanan", url: "https://www.linkedin.com/in/brammawaxanan14/" },
    ],
  },
  {
    id: "vantage", name: "Vantage", eyebrow: "Multimodal search / Local ML",
    short: "A compact offline video-search engine for retrieving scenes through natural-language meaning.",
    description: "A focused computer-vision project connecting CLIP embeddings with fast local vector search.",
    image: "/images/project-vantage.jpg", github: "https://github.com/inthiiii/Vantage-Local-Video-Search",
    stack: ["CLIP", "PyTorch", "FAISS", "OpenCV", "Apple MPS"],
    detail: [
      "Generates visual embeddings from video frames for semantic similarity search.",
      "Runs locally with accelerated inference on supported Apple Silicon hardware.",
    ],
  },
];

const skillGroups = [
  ["AI & ML", "PyTorch · TensorFlow · Scikit-learn · Predictive modeling · Computer vision"],
  ["Agentic & GenAI", "LangGraph · LangChain · RAG · LLMs · Tool workflows · E2B"],
  ["Data & Retrieval", "Pandas · SQL · FAISS · Pinecone · ChromaDB · GeoJSON"],
  ["Engineering", "Python · FastAPI · TypeScript · Next.js · Docker · REST APIs"],
  ["Cloud & Delivery", "GitHub CI/CD · AWS · Azure · Vercel · Model versioning"],
];
const navItems = ["About", "Projects", "Skills", "Experience", "Credentials", "Contact"];

function Arrow({ direction = "up" }: { direction?: "up" | "right" }) {
  return <span aria-hidden="true">{direction === "up" ? "↗" : "→"}</span>;
}

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div className={className} initial={reduceMotion ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    closeRef.current?.focus();
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener("keydown", handleKey); };
  }, [onClose]);

  return (
    <motion.div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div role="dialog" aria-modal="true" aria-labelledby={`modal-${project.id}`} className="project-modal" initial={{ opacity: 0, y: 24, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: 0.99 }} transition={{ duration: 0.28 }}>
        <button ref={closeRef} className="modal-close" onClick={onClose} aria-label="Close project details"><span aria-hidden="true">×</span></button>
        <div className="modal-image"><Image src={project.image} alt="" fill sizes="(max-width: 800px) 100vw, 900px" /></div>
        <div className="modal-content">
          <div>
            <p className="eyebrow">{project.eyebrow}</p>
            <h2 id={`modal-${project.id}`}>{project.name}</h2>
            {project.status && <span className="status-pill">{project.status}</span>}
          </div>
          <p className="modal-lead">{project.description}</p>
          <ul className="detail-list">{project.detail.map((detail) => <li key={detail}>{detail}</li>)}</ul>
          {project.team && (
            <div className="team-block">
              <p className="eyebrow">Project team</p>
              <div className="team-links">{project.team.map((member) => <a key={member.name} href={member.url} target="_blank" rel="noreferrer">{member.name} <Arrow /></a>)}</div>
            </div>
          )}
          <div className="tag-row">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
          <div className="modal-actions">
            <a className="button primary" href={project.github} target="_blank" rel="noreferrer">View GitHub <Arrow /></a>
            {project.live && <a className="button secondary" href={project.live} target="_blank" rel="noreferrer">Visit & download <Arrow /></a>}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <main>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <header className="site-header">
        <a className="monogram" href="#top" aria-label="Ihthisham Irshad, home">II<span>.</span></a>
        <nav aria-label="Primary navigation" className={menuOpen ? "nav-open" : ""}>
          {navItems.map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item}</a>)}
        </nav>
        <button className="menu-button" onClick={() => setMenuOpen((value) => !value)} aria-expanded={menuOpen} aria-label="Toggle navigation"><span /><span /></button>
      </header>

      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true" /><div className="hero-orbit" aria-hidden="true"><span /></div>
        <motion.div className="hero-copy" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
          <p className="hero-kicker"><span /> AI / Machine Learning Developer</p>
          <h1>I build intelligent systems<em> with depth.</em></h1>
          <p className="hero-intro">I’m M. Ihthisham Irshad. I work across agentic AI, multimodal machine learning, and data intelligence—turning ambitious ideas into considered systems.</p>
          <div className="hero-actions"><a className="button primary" href="#projects">Explore selected work <Arrow direction="right" /></a><a className="text-link" href="/files/ihthisham-irshad-cv.pdf" target="_blank">Read CV <Arrow /></a></div>
        </motion.div>
        <motion.div className="hero-portrait" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.1, delay: 0.15 }}>
          <div className="portrait-frame"><Image src="/images/ihthisham-profile.png" alt="Portrait of M. Ihthisham Irshad" fill priority sizes="(max-width: 800px) 72vw, 38vw" /></div>
          <div className="portrait-caption"><span>01</span> Colombo-built. Globally curious.</div>
        </motion.div>
        <div className="scroll-note" aria-hidden="true">Scroll to explore <span>↓</span></div>
      </section>

      <div id="main-content">
        <section className="section about" id="about">
          <Reveal className="section-label"><span>01</span><p>Profile</p></Reveal>
          <Reveal className="about-copy"><p className="eyebrow">Beyond the prototype</p><h2>Engineering practical AI—<em>from research question to working product.</em></h2></Reveal>
          <Reveal className="about-detail">
            <p>I’m an AI and Data Science undergraduate focused on the full shape of intelligent software: model behavior, data foundations, system architecture, and the experience people actually use.</p>
            <p>My strongest work sits where disciplines meet—local and cloud intelligence, multimodal retrieval, agentic workflows, geospatial analytics, and full-stack AI engineering.</p>
            <div className="principles"><span>Research-minded</span><span>Systems-oriented</span><span>Product-aware</span></div>
          </Reveal>
        </section>

        <section className="projects-section" id="projects">
          <div className="section projects-heading">
            <Reveal className="section-label"><span>02</span><p>Selected systems</p></Reveal>
            <Reveal><h2>Work that asks<br /><em>bigger questions.</em></h2></Reveal>
            <Reveal><p className="section-intro">Eight projects across economic intelligence, medical AI, agentic systems, spatial knowledge, and focused products.</p></Reveal>
          </div>
          <div className="project-list">
            {projects.map((project, index) => (
              <Reveal key={project.id}>
                <article className={`project-card ${project.featured ? "featured" : ""}`}>
                  <button className="project-open" onClick={() => setSelectedProject(project)} aria-label={`View details for ${project.name}`}>
                    <div className="project-visual">
                      <Image src={project.image} alt="" fill loading={index === 0 ? "eager" : "lazy"} sizes="(max-width: 800px) 100vw, 58vw" /><div className="visual-scrim" />
                      <span className="project-index">{String(index + 1).padStart(2, "0")}</span>{project.featured && <span className="flagship-badge">Flagship research build</span>}
                    </div>
                    <div className="project-copy">
                      <p className="eyebrow">{project.eyebrow}</p><h3>{project.name}</h3><p>{project.short}</p>
                      <div className="project-meta"><span>{project.status ?? project.stack.slice(0, 2).join(" · ")}</span><span className="view-project">Open case note <Arrow direction="right" /></span></div>
                    </div>
                  </button>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="section skills" id="skills">
          <Reveal className="section-label"><span>03</span><p>Capabilities</p></Reveal>
          <Reveal className="skills-heading"><p className="eyebrow">A stack shaped by the problem</p><h2>Models are one layer.<br /><em>Systems are the work.</em></h2></Reveal>
          <div className="skill-list">{skillGroups.map(([title, items], index) => <Reveal key={title} className="skill-row"><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{items}</p></Reveal>)}</div>
        </section>

        <section className="section experience" id="experience">
          <Reveal className="section-label"><span>04</span><p>Experience</p></Reveal>
          <div className="timeline">
            <Reveal className="timeline-entry"><div><span>Nov 2025 — Present</span><i>Current</i></div><div><p className="eyebrow">Independent practice</p><h3>Freelance Machine Learning Engineer</h3><p>Designing AI applications across agentic workflows, RAG systems, semantic retrieval, and FastAPI services. Current work includes ARA, Insight, Lak-Arthika, Vantage, and Stickyy.</p></div></Reveal>
            <Reveal className="timeline-entry"><div><span>2024 — 2025</span></div><div><p className="eyebrow">ProTron Technologies</p><h3>Full-Stack Engineer & Data Analyst</h3><p>Built data-driven applications, analytical dashboards, predictive models, and automated reporting workflows across Python, React, SQL, and business-intelligence tools.</p></div></Reveal>
          </div>
        </section>

        <section className="credentials" id="credentials">
          <div className="section credential-grid">
            <Reveal className="section-label"><span>05</span><p>Learning & proof</p></Reveal>
            <Reveal className="education-card"><p className="eyebrow">Education</p><h2>BSc in Information Technology</h2><p>Specializing in Data Science</p><div><span>SLIIT</span><span>2023 — Present</span></div></Reveal>
            <Reveal className="certificate-card">
              <a href="https://credsverse.com/credentials/c2f35cab-9d09-4ee6-afbf-43c2861eddd9?preview=1" target="_blank" rel="noreferrer" aria-label="Verify STEMLink AI Engineering Bootcamp credential">
                <div className="certificate-image"><Image src="/images/stemlink-certificate.png" alt="STEMLink AI Engineering Bootcamp certificate awarded to Ihthisham Irshad" fill sizes="(max-width: 800px) 100vw, 48vw" /></div>
                <div className="certificate-copy"><div><p className="eyebrow">Verified credential</p><h3>AI Engineering Bootcamp</h3></div><span>STEMLink · High Achiever · 2026 <Arrow /></span></div>
              </a>
            </Reveal>
          </div>
        </section>

        <section className="section builder" id="github">
          <Reveal className="builder-copy"><p className="eyebrow">GitHub / Builder</p><h2>Ideas are better<br /><em>when they ship.</em></h2></Reveal>
          <Reveal className="builder-side"><p>Source, experiments, and the engineering behind the work live in the open.</p><a className="button secondary" href="https://github.com/inthiiii" target="_blank" rel="noreferrer">Explore GitHub <Arrow /></a></Reveal>
        </section>

        <section className="section cv-section" id="cv">
          <Reveal><p className="eyebrow">Curriculum vitae</p><h2>Want the<br /><em>full picture?</em></h2></Reveal>
          <Reveal className="cv-actions"><p>Education, technical stack, selected projects, and professional experience—collected in one concise document.</p><div><a className="button primary" href="/files/ihthisham-irshad-cv.pdf" target="_blank">View CV <Arrow /></a><a className="text-link" href="/files/ihthisham-irshad-cv.pdf" download>Download PDF ↓</a></div></Reveal>
        </section>

        <section className="contact" id="contact">
          <div className="contact-glow" aria-hidden="true" />
          <Reveal><p className="eyebrow">Let’s build something considered</p><h2>Building something<br /><em>ambitious?</em></h2><p>Let’s talk about AI, machine learning, intelligent products, or the next hard problem worth solving.</p><a className="contact-email" href="mailto:ihthishamirshad781@gmail.com">ihthishamirshad781@gmail.com <Arrow /></a></Reveal>
          <footer><p>© 2026 M. Ihthisham Irshad</p><div><a href="https://www.linkedin.com/in/ihthisham-irshad-296157234/" target="_blank" rel="noreferrer">LinkedIn <Arrow /></a><a href="https://github.com/inthiiii" target="_blank" rel="noreferrer">GitHub <Arrow /></a><a href="#top">Back to top ↑</a></div></footer>
        </section>
      </div>
      <AnimatePresence>{selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}</AnimatePresence>
    </main>
  );
}
