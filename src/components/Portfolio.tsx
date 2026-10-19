"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

type Project = {
  id: string; name: string; eyebrow: string; short: string; description: string;
  image: string; github?: string; live?: string; status?: string; stack: string[];
  detail: string[]; featured?: boolean; team?: { name: string; url: string }[];
  featureCards?: { title: string; text: string }[]; futureScope?: string[];
  websitePreview?: string; hintImage?: string;
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
    featureCards: [
      { title: "Geo-Market Intelligence", text: "A unified analytical layer connecting commodity movement over time with the regions and market contexts where it happens." },
    ],
  },
  {
    id: "heliosl", name: "HelioSL", eyebrow: "Green energy / Geospatial research",
    short: "A researched energy-intelligence system building a stronger data foundation for Sri Lanka's green transition.",
    description: "HelioSL combines environmental research, geospatial analysis, and product engineering to make renewable-energy planning more explainable and accessible.",
    image: "/images/project-heliosl.jpg", github: "https://github.com/inthiiii/HelioSL", featured: true,
    stack: ["Energy analytics", "Geospatial data", "Research", "Decision intelligence", "Full-stack"],
    detail: [
      "Layers location-aware environmental signals into a unified view of renewable-energy potential across Sri Lanka.",
      "Turns research and geospatial evidence into an explorable intelligence product rather than a static report.",
      "Designed collaboratively with a product-level architecture and a long-term national-impact perspective.",
    ],
    futureScope: [
      "Higher-resolution solar, wind, terrain, and infrastructure datasets for stronger site-level analysis.",
      "Scenario modelling that helps compare energy mixes, regional constraints, and long-term environmental outcomes.",
      "Decision-support workflows for researchers, communities, institutions, and clean-energy planners.",
    ],
    team: [
      { name: "Kiruthika", url: "https://www.linkedin.com/in/kiruthika54/" },
      { name: "Sivamathuran", url: "https://www.linkedin.com/in/sivamathuran/" },
      { name: "Brammawaxanan", url: "https://www.linkedin.com/in/brammawaxanan14/" },
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
    image: "/images/project-ara.jpg", featured: true,
    stack: ["Python", "macOS", "Local LLMs", "Cloud LLMs", "Deep device control"],
    detail: [
      "Designed as a native intelligence layer rather than a chatbot wrapped in a desktop window.",
      "Works toward full-device context and control that moves beyond the narrow command boundaries of conventional voice assistants.",
      "Explores a deliberate local/cloud model boundary so private, low-latency actions can stay on-device where appropriate.",
      "Jarvis-level is the product direction—not a claim that every imagined capability is already complete.",
    ],
    featureCards: [
      { title: "Deep Device Control", text: "Context-aware control across applications and system actions, designed to break past Siri-style limitations." },
      { title: "ARA Drop", text: "A fast hand-off surface for giving files, screenshots, and context directly to the assistant." },
      { title: "Writing Tools", text: "System-aware help for rewriting, refining, and acting on text wherever work is happening." },
      { title: "ARA Orb", text: "A lightweight ambient interface for invoking ARA without interrupting the current workflow." },
    ],
  },
  {
    id: "stickyy", name: "Stickyy", eyebrow: "Shipped product / macOS utility",
    short: "A lightweight native scratchpad that keeps fast notes persistent, close, and out of the way.",
    description: "A focused desktop product built around a single promise: ideas should be immediately available without adding workflow friction.",
    image: "/images/project-stickyy.jpg", github: "https://github.com/inthiiii/stickyy", live: "https://stickyyformac.vercel.app", websitePreview: "https://stickyyformac.vercel.app",
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
      "AR Notes Pinning explores attaching knowledge to real physical places instead of keeping every note inside a conventional list.",
      "A node-web view exposes relationships between ideas as a navigable graph.",
      "The location-aware concept could let a user pin a note at a place and rediscover it when returning there.",
      "This feature is actively being researched and refined; the goal is reliability and usefulness rather than premature claims of completion.",
    ],
    hintImage: "/images/insight-ar-location-concept.jpg",
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

const signatureCapabilities = [
  {
    project: "Vitalis",
    title: "Surgical OS",
    text: "A voice-only, hands-free interaction layer designed so doctors can navigate supported clinical workflows without touching the device.",
    state: "Working concept",
    image: "/images/surgical-os-voice-control.jpg",
    imageAlt: "Surgeon using voice to control clinical imaging while both hands remain occupied",
  },
  {
    project: "ARA",
    title: "Personal computing layer",
    text: "Designed to move beyond—and ultimately overtake—the limitations of Siri through deeper device control, ARA Drop, contextual Writing Tools, and the ambient ARA Orb.",
    state: "Flagship direction",
    image: "/images/project-ara.jpg",
    imageAlt: "Ambient personal AI interface representing ARA",
  },
  {
    project: "Insight",
    title: "Spatial knowledge",
    text: "Notes Web connects ideas; AR Notes Pin researches location-based notes that can reappear when the user returns to the place where they were pinned.",
    state: "Active research",
    image: "/images/insight-ar-location-concept.jpg",
    imageAlt: "AR notes positioned in a physical environment for Insight",
  },
  {
    project: "Lak-Arthika",
    title: "Geo-Market Intelligence",
    text: "Connects commodity movement over time with regional and market context, turning fragmented data into one explorable intelligence layer.",
    state: "Under development",
    image: "/images/project-lak-arthika.jpg",
    imageAlt: "Geospatial commodity intelligence visualization for Lak-Arthika",
  },
];

type IntelligenceNode = {
  id: string; label: string; kind: "project" | "skill"; x: number; y: number; z: number; description: string;
};

const intelligenceNodes: IntelligenceNode[] = [
  { id: "lak", label: "Lak-Arthika", kind: "project", x: -1.35, y: -.2, z: .65, description: "Geo-market intelligence built from commodity, regional, and temporal data." },
  { id: "helio", label: "HelioSL", kind: "project", x: 1.25, y: -.65, z: .7, description: "Geospatial research for explainable renewable-energy planning." },
  { id: "vitalis", label: "Vitalis", kind: "project", x: -.65, y: 1.05, z: .45, description: "Privacy-first medical AI, including a voice-led Surgical OS concept." },
  { id: "ara", label: "ARA", kind: "project", x: .72, y: 1.02, z: .62, description: "A native personal-computing layer for deep, contextual device control." },
  { id: "insight", label: "Insight", kind: "project", x: 1.38, y: .25, z: -.42, description: "Spatial knowledge through AR Notes Pinning and a connected Notes Web." },
  { id: "spectra", label: "Spectra", kind: "project", x: -1.22, y: .4, z: -.52, description: "Agentic data science that plans, executes, and explains analysis." },
  { id: "stickyy", label: "Stickyy", kind: "project", x: .25, y: -1.16, z: -.35, description: "A shipped native macOS product for frictionless persistent notes." },
  { id: "vantage", label: "Vantage", kind: "project", x: -.18, y: .05, z: -1.25, description: "Local multimodal video retrieval using semantic embeddings." },
  { id: "agentic", label: "Agentic AI", kind: "skill", x: -.25, y: .72, z: .05, description: "Planning, tools, state, and multi-step intelligent workflows." },
  { id: "langgraph", label: "LangGraph", kind: "skill", x: -.72, y: .5, z: -.1, description: "Stateful orchestration for reliable agent workflows." },
  { id: "rag", label: "RAG", kind: "skill", x: .12, y: .45, z: -.52, description: "Grounding model responses in relevant, retrievable knowledge." },
  { id: "multimodal", label: "Multimodal ML", kind: "skill", x: .15, y: .02, z: .2, description: "Working across language, images, video, and structured context." },
  { id: "pytorch", label: "PyTorch", kind: "skill", x: -.55, y: -.2, z: -.25, description: "Model development and accelerated local inference." },
  { id: "vector", label: "Vector Search", kind: "skill", x: -.72, y: -.72, z: -.55, description: "Semantic retrieval with FAISS, ChromaDB, and Pinecone." },
  { id: "geo", label: "Geospatial", kind: "skill", x: .58, y: -.55, z: .18, description: "Location-aware analysis, GeoJSON, and spatial intelligence." },
  { id: "data", label: "Data Engineering", kind: "skill", x: -.45, y: -.82, z: .52, description: "Reliable ingestion, validation, transformation, and analytical pipelines." },
  { id: "fastapi", label: "FastAPI", kind: "skill", x: .6, y: .15, z: -.7, description: "Production-minded Python services for AI applications." },
  { id: "next", label: "Next.js", kind: "skill", x: .9, y: -.12, z: -.12, description: "Responsive product interfaces for intelligent systems." },
  { id: "vision", label: "Computer Vision", kind: "skill", x: -.15, y: -.45, z: -.92, description: "Visual embeddings, scene understanding, and image-driven workflows." },
  { id: "product", label: "Product Engineering", kind: "skill", x: .18, y: -.68, z: .88, description: "Turning technical ideas into coherent, usable products." },
];

const intelligenceLinks: [string, string][] = [
  ["lak", "geo"], ["lak", "data"], ["lak", "pytorch"], ["helio", "geo"], ["helio", "data"], ["helio", "next"],
  ["vitalis", "multimodal"], ["vitalis", "rag"], ["vitalis", "fastapi"], ["ara", "agentic"], ["ara", "rag"], ["ara", "product"],
  ["insight", "geo"], ["insight", "next"], ["insight", "product"], ["spectra", "agentic"], ["spectra", "langgraph"], ["spectra", "fastapi"],
  ["stickyy", "product"], ["stickyy", "next"], ["vantage", "multimodal"], ["vantage", "vision"], ["vantage", "vector"],
  ["agentic", "langgraph"], ["rag", "vector"], ["multimodal", "pytorch"], ["data", "fastapi"],
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

function IntelligenceMapModal({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const projectedRef = useRef<{ id: string; x: number; y: number; radius: number }[]>([]);
  const rotationRef = useRef({ x: -.12, y: -.32 });
  const dragRef = useRef({ active: false, moved: false, x: 0, y: 0 });
  const [activeId, setActiveId] = useState("ara");
  const reduceMotion = useReducedMotion();
  const activeNode = intelligenceNodes.find((node) => node.id === activeId) ?? intelligenceNodes[0];
  const connectedIds = useMemo(() => new Set(intelligenceLinks.flatMap(([from, to]) => from === activeId ? [to] : to === activeId ? [from] : [])), [activeId]);
  const connectedNodes = intelligenceNodes.filter((node) => connectedIds.has(node.id));

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const handleKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    closeRef.current?.focus();
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener("keydown", handleKey); };
  }, [onClose]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    let frame = 0;
    let width = 0;
    let height = 0;
    let pixelRatio = 1;

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();

    const draw = () => {
      if (!reduceMotion && !dragRef.current.active) rotationRef.current.y += .0007;
      context.clearRect(0, 0, width, height);
      const { x: angleX, y: angleY } = rotationRef.current;
      const cosX = Math.cos(angleX), sinX = Math.sin(angleX), cosY = Math.cos(angleY), sinY = Math.sin(angleY);
      const scale = Math.min(width, height) * .29;
      const projected = intelligenceNodes.map((node) => {
        const x1 = node.x * cosY - node.z * sinY;
        const z1 = node.x * sinY + node.z * cosY;
        const y1 = node.y * cosX - z1 * sinX;
        const z2 = node.y * sinX + z1 * cosX;
        const perspective = 3.7 / (3.7 + z2);
        return { ...node, sx: width / 2 + x1 * scale * perspective, sy: height / 2 + y1 * scale * perspective, depth: z2, perspective };
      }).sort((a, b) => b.depth - a.depth);
      const byId = new Map(projected.map((node) => [node.id, node]));

      intelligenceLinks.forEach(([from, to]) => {
        const a = byId.get(from), b = byId.get(to);
        if (!a || !b) return;
        const emphasized = from === activeId || to === activeId;
        const gradient = context.createLinearGradient(a.sx, a.sy, b.sx, b.sy);
        gradient.addColorStop(0, emphasized ? "rgba(165,225,210,.72)" : "rgba(165,225,210,.14)");
        gradient.addColorStop(1, emphasized ? "rgba(232,189,118,.62)" : "rgba(232,189,118,.08)");
        context.beginPath();
        context.moveTo(a.sx, a.sy);
        context.lineTo(b.sx, b.sy);
        context.strokeStyle = gradient;
        context.lineWidth = emphasized ? 1.5 : .75;
        context.stroke();
      });

      projected.forEach((node) => {
        const active = node.id === activeId;
        const connected = connectedIds.has(node.id);
        const baseRadius = node.kind === "project" ? 8.5 : 4.5;
        const radius = baseRadius * node.perspective * (active ? 1.5 : 1);
        context.beginPath();
        context.arc(node.sx, node.sy, radius * 3.2, 0, Math.PI * 2);
        const glow = context.createRadialGradient(node.sx, node.sy, 0, node.sx, node.sy, radius * 3.2);
        glow.addColorStop(0, active ? "rgba(232,189,118,.38)" : node.kind === "project" ? "rgba(165,225,210,.2)" : "rgba(165,225,210,.12)");
        glow.addColorStop(1, "rgba(165,225,210,0)");
        context.fillStyle = glow;
        context.fill();
        context.beginPath();
        context.arc(node.sx, node.sy, radius, 0, Math.PI * 2);
        context.fillStyle = active ? "#e8bd76" : node.kind === "project" ? "#a5e1d2" : connected ? "#d9efe8" : "rgba(194,208,201,.72)";
        context.fill();
        if (node.kind === "project" || active) {
          context.font = `${active ? 600 : 500} ${active ? 13 : 11}px Helvetica Neue, Arial`;
          context.fillStyle = active ? "#f4efe2" : "rgba(224,226,220,.78)";
          context.textAlign = "center";
          context.fillText(node.label, node.sx, node.sy - radius - 10);
        }
      });

      projectedRef.current = projected.map((node) => ({ id: node.id, x: node.sx, y: node.sy, radius: node.kind === "project" ? 18 : 13 }));
      frame = requestAnimationFrame(draw);
    };

    draw();
    return () => { cancelAnimationFrame(frame); observer.disconnect(); };
  }, [activeId, connectedIds, reduceMotion]);

  const getPoint = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    return { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
  };

  const pickNode = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const point = getPoint(event);
    return projectedRef.current.reduce<{ id: string; distance: number } | null>((closest, node) => {
      const distance = Math.hypot(node.x - point.x, node.y - point.y);
      return distance <= node.radius && (!closest || distance < closest.distance) ? { id: node.id, distance } : closest;
    }, null);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const point = getPoint(event);
    dragRef.current = { active: true, moved: false, x: point.x, y: point.y };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!dragRef.current.active) return;
    const point = getPoint(event);
    const dx = point.x - dragRef.current.x, dy = point.y - dragRef.current.y;
    if (Math.abs(dx) + Math.abs(dy) > 2) dragRef.current.moved = true;
    rotationRef.current.y += dx * .006;
    rotationRef.current.x = Math.max(-1, Math.min(1, rotationRef.current.x + dy * .004));
    dragRef.current.x = point.x;
    dragRef.current.y = point.y;
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!dragRef.current.moved) {
      const picked = pickNode(event);
      if (picked) setActiveId(picked.id);
    }
    dragRef.current.active = false;
  };

  return (
    <motion.div className="modal-backdrop intelligence-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div role="dialog" aria-modal="true" aria-labelledby="intelligence-map-title" className="intelligence-modal" initial={{ opacity: 0, y: 20, scale: .985 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: .99 }} transition={{ duration: .3 }}>
        <button ref={closeRef} type="button" className="modal-close" onClick={onClose} aria-label="Close intelligence map"><span aria-hidden="true">×</span></button>
        <div className="intelligence-header">
          <div><p className="eyebrow">Interactive intelligence map</p><h2 id="intelligence-map-title">Where projects<br /><em>connect to capability.</em></h2></div>
          <p>Each neuron is a real project or skill. Connections reveal the engineering relationships between them—not decorative noise.</p>
        </div>
        <div className="intelligence-stage">
          <canvas ref={canvasRef} role="img" aria-label="Interactive 3D network of Ihthisham's projects and technical skills. Drag to rotate and select a neuron to inspect it." onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} onPointerCancel={() => { dragRef.current.active = false; }} />
          <div className="network-key" aria-hidden="true"><span><i className="project-dot" /> Projects</span><span><i /> Skills</span></div>
          <div className="network-instruction" aria-hidden="true">Drag to orbit · Select a neuron</div>
          <button type="button" className="network-reset" onClick={() => { rotationRef.current = { x: -.12, y: -.32 }; setActiveId("ara"); }}>Reset view</button>
        </div>
        <aside className="intelligence-detail" aria-live="polite">
          <p className="eyebrow">{activeNode.kind}</p>
          <h3>{activeNode.label}</h3>
          <p>{activeNode.description}</p>
          <div><span>Connected intelligence</span>{connectedNodes.map((node) => <button type="button" key={node.id} onClick={() => setActiveId(node.id)}>{node.label}</button>)}</div>
        </aside>
        <div className="network-node-list" aria-label="All intelligence map nodes">
          {intelligenceNodes.map((node) => <button type="button" key={node.id} aria-pressed={node.id === activeId} className={node.id === activeId ? "active" : ""} onClick={() => setActiveId(node.id)}>{node.label}</button>)}
        </div>
      </motion.div>
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
        <div className="modal-image"><Image src={project.image} alt="" fill loading="eager" sizes="(max-width: 800px) 100vw, 820px" /></div>
        <div className="modal-content">
          <div className="modal-heading">
            <p className="eyebrow">{project.eyebrow}</p>
            <h2 id={`modal-${project.id}`}>{project.name}</h2>
            {project.status && <span className="status-pill">{project.status}</span>}
          </div>
          <p className="modal-lead">{project.description}</p>
          {project.websitePreview && project.live && (
            <div className="site-hero-preview">
              <div className="browser-bar" aria-hidden="true"><span /><span /><span /><p>stickyyformac.vercel.app</p></div>
              <iframe src={project.websitePreview} title="Preview of the Stickyy website hero" loading="lazy" tabIndex={-1} />
              <div className="site-preview-scrim" aria-hidden="true" />
              <a className="button primary site-preview-link" href={project.live} target="_blank" rel="noreferrer">Visit website <Arrow /></a>
            </div>
          )}
          <ul className="detail-list">{project.detail.map((detail) => <li key={detail}>{detail}</li>)}</ul>
          {project.featureCards && (
            <div className="feature-cards">
              {project.featureCards.map((feature) => <article key={feature.title}><h3>{feature.title}</h3><p>{feature.text}</p></article>)}
            </div>
          )}
          {project.hintImage && (
            <figure className="hint-image">
              <div><Image src={project.hintImage} alt="Concept showing an AR note pinned to a physical location and rediscovered on return" fill sizes="(max-width: 800px) 92vw, 700px" /></div>
              <figcaption><strong>AR Notes Pin — research direction</strong><span>Pin knowledge to a real place and surface it again when returning.</span></figcaption>
            </figure>
          )}
          {project.futureScope && (
            <div className="future-scope">
              <p className="eyebrow">Future scope</p>
              <div>{project.futureScope.map((item, index) => <article key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></article>)}</div>
            </div>
          )}
          {project.team && (
            <div className="team-block">
              <p className="eyebrow">Project team</p>
              <div className="team-links">{project.team.map((member) => <a key={member.name} href={member.url} target="_blank" rel="noreferrer">{member.name} <Arrow /></a>)}</div>
            </div>
          )}
          <div className="tag-row">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
          <div className="modal-actions">
            {project.github && <a className={`button ${project.live ? "quiet" : "primary"}`} href={project.github} target="_blank" rel="noreferrer">{project.live ? "View source" : "View GitHub"} <Arrow /></a>}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function KnowledgeModal({ onClose }: { onClose: () => void }) {
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
      <motion.div role="dialog" aria-modal="true" aria-labelledby="outside-knowledge-title" className="knowledge-modal" initial={{ opacity: 0, y: 18, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.99 }}>
        <button ref={closeRef} className="modal-close" onClick={onClose} aria-label="Close education details"><span aria-hidden="true">×</span></button>
        <p className="eyebrow">Outside the core technical track</p>
        <h2 id="outside-knowledge-title">Business knowledge,<br /><em>built with purpose.</em></h2>
        <div className="knowledge-list">
          <article><span>2023 — 2024</span><h3>BBA in Applied Accounting</h3><p>BIMT Campus</p></article>
          <article><span>2023</span><h3>AAT Passed Finalist</h3><p>Accounting and business foundation</p></article>
        </div>
        <p className="knowledge-note">Business and accounting knowledge adds the operational and financial context needed to build stronger intelligent systems. The long-term goal is to combine technical depth with domain understanding into one powerful source of knowledge.</p>
      </motion.div>
    </motion.div>
  );
}

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showOutOfScope, setShowOutOfScope] = useState(false);
  const [showIntelligenceMap, setShowIntelligenceMap] = useState(false);
  return (
    <main>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <header className="site-header">
        <a className="monogram" href="#top" aria-label="Ihthisham Irshad, home">Ihthi<span>.</span></a>
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
          <div className="hero-actions"><a className="button primary" href="#projects">Explore selected work <Arrow direction="right" /></a><button type="button" className="button secondary" onClick={() => setShowIntelligenceMap(true)}>Explore intelligence map <Arrow direction="right" /></button><a className="text-link" href="/files/ihthisham-irshad-cv.pdf" target="_blank">Read CV <Arrow /></a></div>
        </motion.div>
        <motion.div className="hero-portrait" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.1, delay: 0.15 }}>
          <div className="portrait-frame"><Image src="/images/ihthisham-profile.png" alt="Portrait of M. Ihthisham Irshad" fill priority sizes="(max-width: 800px) 72vw, 38vw" /></div>
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
          <Reveal className="signature-heading"><p className="eyebrow">New capabilities I’m creating</p><h3>Original product ideas,<br /><em>engineered into systems.</em></h3></Reveal>
          <div className="signature-grid">
            {signatureCapabilities.map((capability, index) => (
              <Reveal key={capability.title} className="signature-card">
                <div className="signature-visual"><Image src={capability.image} alt={capability.imageAlt} width={900} height={520} sizes="(max-width: 760px) 100vw, 38vw" /></div>
                <div className="signature-body">
                  <div className="signature-meta"><span>{String(index + 1).padStart(2, "0")}</span><i>{capability.state}</i></div>
                  <p className="eyebrow">{capability.project}</p>
                  <h4>{capability.title}</h4>
                  <p>{capability.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="section experience" id="experience">
          <div className="experience-intro">
            <Reveal className="section-label"><span>04</span><p>Experience</p></Reveal>
            <Reveal><p className="eyebrow">Applied across the full stack</p><h2>Building intelligence<br /><em>in the real world.</em></h2></Reveal>
          </div>
          <div className="experience-cards">
            <Reveal className="experience-card current-role">
              <div className="role-top"><span>01</span><i>Current practice</i></div>
              <p className="role-date">Nov 2025 — Present</p>
              <h3>Freelance Machine Learning Engineer</h3>
              <p>Designing AI applications across agentic workflows, RAG systems, semantic retrieval, local intelligence, and FastAPI services.</p>
              <div className="role-tags"><span>Agentic AI</span><span>Multimodal ML</span><span>Product engineering</span></div>
            </Reveal>
            <Reveal className="experience-card">
              <div className="role-top"><span>02</span><i>ProTron Technologies</i></div>
              <p className="role-date">2024 — 2025</p>
              <h3>Full-Stack Engineer & Data Analyst</h3>
              <p>Built data-driven applications, predictive models, dashboards, and automated reporting workflows across Python, React, SQL, and business-intelligence tools.</p>
              <div className="role-tags"><span>Full-stack</span><span>Data analysis</span><span>Automation</span></div>
            </Reveal>
          </div>
        </section>

        <section className="credentials" id="credentials">
          <div className="section credential-grid">
            <Reveal className="section-label"><span>05</span><p>Learning & proof</p></Reveal>
            <Reveal className="education-card">
              <p className="eyebrow">Education</p>
              <h2><span>BSc IT Specialized in</span><strong>Data Science</strong></h2>
              <p>Specialization focused on machine learning, analytics, and intelligent data systems.</p>
              <div><span>SLIIT</span><span>2023 — Present</span></div>
              <button className="outside-button" onClick={() => setShowOutOfScope(true)}>Out-of-scope knowledge <Arrow direction="right" /></button>
            </Reveal>
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
          <Reveal className="builder-side"><p>Source, experiments, and the engineering behind the work live in the open.</p><div className="social-actions"><a className="button secondary" href="https://github.com/inthiiii" target="_blank" rel="noreferrer">Explore GitHub <Arrow /></a><a className="button secondary" href="https://www.linkedin.com/in/ihthisham-irshad-296157234/" target="_blank" rel="noreferrer">LinkedIn <Arrow /></a></div></Reveal>
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
      <AnimatePresence>
        {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
        {showOutOfScope && <KnowledgeModal onClose={() => setShowOutOfScope(false)} />}
        {showIntelligenceMap && <IntelligenceMapModal onClose={() => setShowIntelligenceMap(false)} />}
      </AnimatePresence>
    </main>
  );
}
