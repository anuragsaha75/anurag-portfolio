import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

/* ── RESPONSIVE HOOK ── */
function useIsMobile() {
  const [mobile, setMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  useEffect(() => {
    const handler = () => setMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return mobile;
}

/* ── DATA ── */
const SKILLS = {
  Languages:  ["Java", "JavaScript (ES6+)", "Python", "SQL", "TypeScript"],
  Frontend:   ["React.js", "HTML5", "CSS3", "Responsive Design"],
  Backend:    ["Node.js", "Express.js", "REST APIs", "Firebase Cloud Functions", "Microservices"],
  Databases:  ["MongoDB", "Firebase Firestore", "SQL", "NoSQL"],
  "DevOps & Cloud": ["Docker", "Kubernetes", "GitHub Actions", "Firebase Hosting", "GCP"],
  Concepts:   ["DSA", "OOP", "DBMS", "System Design", "OS", "Agile / Scrum"],
};

const PROJECTS = [
  {
    name: "Tanushree Collection",
    subtitle: "Full-Stack E-Commerce Web Application — Live in Production",
    period: "Jun 2026",
    tags: ["Vanilla JS", "Firebase", "Razorpay", "Cloudinary", "jsPDF", "Firebase Hosting"],
    color: "#00D4FF",
    live: "https://tanushreecollection.in",
    github: "https://github.com/anuragsaha75/tanushree-collection",
    highlights: [
      { label: "Real Transactions", icon: "💳" },
      { label: "No Backend Server", icon: "⚡" },
      { label: "Live Customers", icon: "🛒" },
    ],
    bullets: [
      "Built entirely with Vanilla HTML/CSS/JS + Firebase — no frontend framework. Custom fuzzy search with a weighted scoring algorithm ranks results across multiple product fields by relevance.",
      "QR UPI Poller — solved a real-world payment edge case where Razorpay's modal closes before a QR-scanned payment (Google Pay, PhonePe) confirms server-side. Custom polling retries verification until captured or timed out — zero lost orders.",
      "Two-layer admin auth gate: Firebase Auth session + Firestore role document. A waitForAdmin() guard ensures no data operation runs before both checks resolve — preventing unauthorized data access without a traditional backend.",
      "Auto PDF invoice engine using jsPDF entirely client-side — branded with gold palette, store logo, itemized table, and shipping breakdown. Uploaded to Cloudinary and the URL persisted to Firestore so the PDF is generated once and served forever.",
      "Modular ShippingEngine IIFE with Firestore-backed weight-based rates per Indian state, pincode-level discounts for the Malda area (3-day vs 7-day windows), and in-memory caching to prevent repeated Firestore reads.",
      "Order status undo/redo: transitions stored as append-only history arrays in Firestore — admin can step backward and forward through any status change without ever overwriting data. Real-time new order notifications via Firestore onSnapshot.",
      "Full SEO pipeline: Open Graph, Twitter Cards, Schema.org JewelryStore structured data, canonical URLs, Search Console verification, custom 404, and all legal pages (Privacy, Returns, Refund, Shipping, Disclaimer).",
    ],
  },
  {
    name: "Laxmifiya",
    subtitle: "Full-Stack Stock Trading Platform",
    period: "Jun 2025",
    tags: ["MongoDB", "Express.js", "React.js", "Node.js", "JWT"],
    color: "#7C3AED",
    github: "https://github.com/anuragsaha75",
    bullets: [
      "Full-stack trading app with JWT auth, real-time order placement, and portfolio tracking on the MERN stack.",
      "RESTful APIs with optimized MongoDB aggregation queries achieving 30% improvement in backend response time.",
      "Responsive, component-driven React.js frontend with modular architecture for seamless cross-device experience.",
    ],
  },
];

const EDUCATION = [
  {
    degree: "B.Tech – Computer Science & Engineering",
    school: "Adamas University, Kolkata",
    period: "2022 – 2026",
    grade: "CGPA: 7.67",
    board: "Adamas University",
    color: "#00D4FF",
  },
  {
    degree: "Higher Secondary (Class XII) – Science",
    school: "A.C. Institution, Malda",
    period: "2020 – 2022",
    grade: "89.88%",
    board: "WBCHSE Board",
    color: "#7C3AED",
  },
  {
    degree: "Secondary (Class X)",
    school: "A.C. Institution, Malda",
    period: "2020",
    grade: "88.8%",
    board: "WBBSE Board",
    color: "#10B981",
  },
];

const EXPERIENCE = [
  {
    role: "Associate System Engineer – SDE Intern",
    company: "Univolve Consulting",
    location: "Kolkata (Hybrid)",
    period: "Jul 2025 – Aug 2025",
    bullets: [
      "Developed & integrated RESTful APIs in Node.js/Express.js, reducing API response latency by 20% through query optimization and middleware improvements.",
      "Optimized backend workflows and database queries, contributing to a 15% improvement in application performance.",
      "Resolved critical bugs across key modules; hands-on DevOps with Docker, CI/CD pipelines, and production monitoring.",
    ],
  },
];

const ACHIEVEMENTS = [
  { icon: "🎯", title: "McKinsey Forward Program",        desc: "Selected Participant — McKinsey.org Global Career & Leadership Development Program 2026" },
  { icon: "💻", title: "150+ Coding Problems",            desc: "Solved on LeetCode & GeeksforGeeks covering Arrays, Trees, Graphs, Dynamic Programming, and System Design" },
  { icon: "📜", title: "Angular Stack Certification",     desc: "Infosys — Full-stack Angular development, TypeScript" },
  // { icon: "🚀", title: "NASA Space Apps Challenge",        desc: "Finalist — Climate-tech project recognized in the global hackathon" },
  { icon: "🏆", title: "Top 5 – Clash of Coders",         desc: "Adamas University competitive programming event" },
];

/* ── FADE-IN WRAPPER ── */
function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ── TYPEWRITER ── */
function Typewriter({ words }) {
  const [wordIdx, setWordIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx];
    let t;
    if (!deleting && displayed.length < word.length)
      t = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80);
    else if (!deleting && displayed.length === word.length)
      t = setTimeout(() => setDeleting(true), 1800);
    else if (deleting && displayed.length > 0)
      t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    else { setDeleting(false); setWordIdx((wordIdx + 1) % words.length); }
    return () => clearTimeout(t);
  }, [displayed, deleting, wordIdx, words]);

  return (
    <span style={{ color: "var(--accent-cyan)" }}>
      {displayed}<span className="cursor-blink" />
    </span>
  );
}

/* ── SECTION HEADER ── */
function SectionHeader({ num, label, title, sub }) {
  return (
    <Reveal>
      <p className="section-eyebrow" style={{ marginBottom: 6 }}>// {num} — {label}</p>
      <h2 className="section-title" style={{ marginBottom: sub ? 12 : 40 }}>{title}</h2>
      {sub && <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", marginBottom: 44 }}>{sub}</p>}
    </Reveal>
  );
}

/* ══════════════════════════════
   MAIN COMPONENT
══════════════════════════════ */
export default function Portfolio() {
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { id: "about",        label: "about" },
    { id: "skills",       label: "skills" },
    { id: "experience",   label: "experience" },
    { id: "projects",     label: "projects" },
    { id: "education",    label: "education" },
    { id: "achievements", label: "achievements" },
  ];

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  /* ── shared section wrapper style ── */
  const sectionStyle = {
    maxWidth: 1100,
    margin: "0 auto",
    padding: isMobile ? "60px 16px" : "80px 24px",
    position: "relative",
    zIndex: 1,
  };

  return (
    <>
      {/* Ambient orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />

      {/* ══ NAV ══ */}
      <nav className="nav-glass" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: "1rem", color: "var(--accent-cyan)" }}>
            AS<span style={{ color: "var(--text-secondary)" }}>.dev</span>
          </span>

          {/* Desktop links */}
          {!isMobile && (
            <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
              {navLinks.map(l => (
                <button key={l.id} onClick={() => scrollTo(l.id)} className="nav-link"
                  style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                  <span style={{ color: "var(--accent-cyan)", marginRight: 2 }}>./</span>{l.label}
                </button>
              ))}
              <a href="/Anurag_Saha_Resume.pdf" download className="btn-primary"
                style={{ padding: "7px 16px", fontSize: "0.75rem" }}>↓ Resume</a>
            </div>
          )}

          {/* Hamburger */}
          {isMobile && (
            <button onClick={() => setMenuOpen(!menuOpen)}
              style={{ background: "none", border: "1px solid var(--border)", borderRadius: 8, padding: "6px 13px", color: "var(--text-secondary)", cursor: "pointer", fontSize: "1.1rem", lineHeight: 1 }}>
              {menuOpen ? "✕" : "☰"}
            </button>
          )}
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {isMobile && menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              style={{ borderTop: "1px solid var(--border)", padding: "16px 20px 20px", display: "flex", flexDirection: "column", gap: 18, overflow: "hidden" }}>
              {navLinks.map(l => (
                <button key={l.id} onClick={() => scrollTo(l.id)} className="nav-link"
                  style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left", fontSize: "0.9rem", padding: 0 }}>
                  <span style={{ color: "var(--accent-cyan)" }}>./</span>{l.label}
                </button>
              ))}
              <a href="/Anurag_Saha_Resume.pdf" download className="btn-primary"
                style={{ alignSelf: "flex-start", fontSize: "0.8rem" }}>↓ Resume</a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ══ HERO ══ */}
      <section id="home" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: isMobile ? "110px 16px 80px" : "120px 24px 80px", maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: "center", gap: isMobile ? 40 : 64, width: "100%", textAlign: isMobile ? "center" : "left" }}>

          {/* Avatar — top on mobile */}
          {isMobile && (
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
              <div className="avatar-ring">
                <img src="/profile.jpg" alt="Anurag Saha" className="avatar-img" />
              </div>
              <div style={{ display: "flex", gap: 28 }}>
                {[{ num: "150+", label: "Problems" }, { num: "13+", label: "Projects" }, { num: "1", label: "Internship" }].map(s => (
                  <div key={s.label} style={{ textAlign: "center" }}>
                    <div className="stat-num">{s.num}</div>
                    <div className="stat-label">{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Text */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }}
            style={{ flex: 1 }}>
            <p className="hero-role" style={{ marginBottom: 14 }}>AVAILABLE FOR OPPORTUNITIES</p>
            <h1 className="hero-name" style={{ marginBottom: 14 }}>Anurag<br />Saha</h1>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: isMobile ? "0.95rem" : "1.05rem", marginBottom: 22, color: "var(--text-secondary)", minHeight: "1.4em" }}>
              <Typewriter words={["Full-Stack Developer", "MERN Stack Engineer", "Problem Solver", "SDE Intern @ Univolve"]} />
            </div>
            <p className="hero-bio" style={{ marginBottom: 32, margin: isMobile ? "0 auto 32px" : "0 0 32px" }}>
              B.Tech CSE student at Adamas University building production-grade web applications — from tamper-proof payment pipelines to real-time trading platforms. I care about clean architecture, fast APIs, and shipping things that actually work.
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: isMobile ? "center" : "flex-start", marginBottom: 28 }}>
              <button onClick={() => scrollTo("projects")} className="btn-primary">View Projects →</button>
              <a href="mailto:sahaanurag415@gmail.com" className="btn-ghost">Get in touch</a>
            </div>

            {/* Socials */}
            <div style={{ display: "flex", gap: 10, justifyContent: isMobile ? "center" : "flex-start" }}>
              {[
                { href: "https://github.com/anuragsaha75", title: "GitHub", svg: <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg> },
                { href: "https://linkedin.com/in/anurag-saha-5bab35260", title: "LinkedIn", svg: <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
                { href: "mailto:sahaanurag415@gmail.com", title: "Email", svg: <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.45.225-.878.596-1.133L12 12.09 23.404 4.324c.371.255.596.683.596 1.133z"/></svg> },
                { href: "tel:+918371009613", title: "Phone", svg: <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg> },
              ].map(s => (
                <a key={s.title} href={s.href} target={s.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="social-link" title={s.title}>{s.svg}</a>
              ))}
            </div>
          </motion.div>

          {/* Avatar — right on desktop */}
          {!isMobile && (
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2, ease: [0.22,1,0.36,1] }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24, flexShrink: 0 }}>
              <div className="avatar-ring">
                <img src="/profile.jpg" alt="Anurag Saha" className="avatar-img" />
              </div>
              <div style={{ display: "flex", gap: 32 }}>
                {[{ num: "150+", label: "Problems Solved" }, { num: "13+", label: "Projects Shipped" }, { num: "1", label: "Internship" }].map(s => (
                  <div key={s.label} style={{ textAlign: "center" }}>
                    <div className="stat-num">{s.num}</div>
                    <div className="stat-label">{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Scroll hint */}
        {!isMobile && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
            style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.6rem", color: "var(--text-secondary)", letterSpacing: "0.15em" }}>SCROLL</span>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}
              style={{ width: 1, height: 32, background: "linear-gradient(to bottom, var(--accent-cyan), transparent)" }} />
          </motion.div>
        )}
      </section>

      {/* ══ ABOUT ══ */}
      <section id="about" style={sectionStyle}>
        <div className="section-divider" style={{ margin: "0 0 60px" }} />
        <SectionHeader num="01" label="about me" title="Who I Am" />
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 20 }}>
          {[
            { heading: "Background", text: "Final-year B.Tech CSE student at Adamas University (CGPA 7.67), based in Kolkata. I bridge the gap between design and robust engineering — I've shipped a live production e-commerce platform processing real Razorpay payments, and built a Zerodha-style trading app from scratch." },
            { heading: "What Drives Me", text: "I care about code that scales. Security-first API design, atomic database transactions, idempotent webhooks — these aren't nice-to-haves to me, they're what separates a project from a product. Selected for McKinsey Forward Program 2026." },
          ].map((c, i) => (
            <Reveal key={c.heading} delay={i * 0.1}>
              <div className="glass-card" style={{ padding: isMobile ? 20 : 28, height: "100%" }}>
                <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "0.95rem", marginBottom: 14, color: "var(--accent-cyan)" }}>{c.heading}</h3>
                <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, fontSize: "0.9rem" }}>{c.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══ SKILLS ══ */}
      <section id="skills" style={sectionStyle}>
        <div className="section-divider" style={{ margin: "0 0 60px" }} />
        <SectionHeader num="02" label="skills" title="Technical Stack" />
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 16 }}>
          {Object.entries(SKILLS).map(([cat, items], i) => (
            <Reveal key={cat} delay={i * 0.06}>
              <div className="glass-card" style={{ padding: isMobile ? 18 : 22 }}>
                <h3 style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.65rem", color: "var(--accent-cyan)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 14 }}>{cat}</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                  {items.map(skill => <span key={skill} className="skill-pill">{skill}</span>)}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══ EXPERIENCE ══ */}
      <section id="experience" style={sectionStyle}>
        <div className="section-divider" style={{ margin: "0 0 60px" }} />
        <SectionHeader num="03" label="experience" title="Work History" />
        {EXPERIENCE.map((exp, i) => (
          <Reveal key={i} delay={0.1}>
            <div style={{ display: "flex", gap: isMobile ? 14 : 24, marginBottom: 32 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 6, flexShrink: 0 }}>
                <div className="timeline-dot" />
                <div className="timeline-line" style={{ flex: 1, minHeight: 60 }} />
              </div>
              <div className="glass-card" style={{ flex: 1, padding: isMobile ? 18 : 26 }}>
                <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", gap: 6, marginBottom: 6 }}>
                  <div>
                    <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: isMobile ? "0.95rem" : "1.05rem", color: "var(--text-primary)", marginBottom: 4 }}>{exp.role}</h3>
                    <span className="exp-company">{exp.company}</span>
                    <span style={{ color: "var(--text-secondary)", fontSize: "0.7rem", marginLeft: 6 }}>· {exp.location}</span>
                  </div>
                  <span className="exp-period" style={{ flexShrink: 0 }}>{exp.period}</span>
                </div>
                <ul style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 9 }}>
                  {exp.bullets.map((b, j) => (
                    <li key={j} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <span style={{ color: "var(--accent-cyan)", marginTop: 4, fontSize: "0.55rem", flexShrink: 0 }}>▶</span>
                      <span style={{ color: "var(--text-secondary)", fontSize: isMobile ? "0.85rem" : "0.9rem", lineHeight: 1.7 }}>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </section>

      {/* ══ PROJECTS ══ */}
      <section id="projects" style={sectionStyle}>
        <div className="section-divider" style={{ margin: "0 0 60px" }} />
        <SectionHeader num="04" label="projects" title="Things I've Built"
          sub="Production-grade applications with real users, real payments, real stakes." />
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {PROJECTS.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.1}>
              <div className="project-card">
                {/* Header row */}
                <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", gap: 12, marginBottom: 14 }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6, flexWrap: "wrap" }}>
                      <h3 className="project-title">{p.name}</h3>
                      {p.live && (
                        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.6rem", padding: "2px 8px", borderRadius: 4, background: "rgba(16,185,129,0.15)", color: "#10B981", border: "1px solid rgba(16,185,129,0.3)" }}>
                          LIVE
                        </span>
                      )}
                    </div>
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.83rem" }}>{p.subtitle}</p>
                  </div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", flexShrink: 0 }}>
                    <span className="exp-period">{p.period}</span>
                    {p.live && (
                      <a href={p.live} target="_blank" rel="noreferrer" className="btn-ghost" style={{ padding: "5px 12px", fontSize: "0.73rem" }}>↗ Live</a>
                    )}
                    <a href={p.github} target="_blank" rel="noreferrer" className="btn-ghost" style={{ padding: "5px 12px", fontSize: "0.73rem" }}>GitHub</a>
                  </div>
                </div>

                {/* Highlight badges — only if present */}
                {p.highlights && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
                    {p.highlights.map(h => (
                      <span key={h.label} style={{
                        fontFamily: "'Space Grotesk',sans-serif",
                        fontWeight: 600,
                        fontSize: "0.72rem",
                        padding: "4px 12px",
                        borderRadius: 999,
                        background: "rgba(0,212,255,0.08)",
                        color: "var(--accent-cyan)",
                        border: "1px solid rgba(0,212,255,0.22)",
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                      }}>
                        <span>{h.icon}</span> {h.label}
                      </span>
                    ))}
                  </div>
                )}

                {/* Tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
                  {p.tags.map(tag => (
                    <span key={tag} className="project-tag" style={{ borderColor: `${p.color}33`, color: p.color, background: `${p.color}12` }}>{tag}</span>
                  ))}
                </div>

                {/* Bullets */}
                <ul style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {p.bullets.map((b, j) => (
                    <li key={j} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <span style={{ color: p.color, marginTop: 5, fontSize: "0.5rem", flexShrink: 0 }}>◆</span>
                      <span style={{ color: "var(--text-secondary)", fontSize: isMobile ? "0.84rem" : "0.88rem", lineHeight: 1.75 }}>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══ EDUCATION ══ */}
      <section id="education" style={sectionStyle}>
        <div className="section-divider" style={{ margin: "0 0 60px" }} />
        <SectionHeader num="05" label="education" title="Academic Background" />
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {EDUCATION.map((edu, i) => (
            <Reveal key={edu.degree} delay={i * 0.1}>
              <div style={{ display: "flex", gap: isMobile ? 14 : 24, marginBottom: 8 }}>
                {/* Timeline */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, paddingTop: 6 }}>
                  <div className="timeline-dot" style={{ background: edu.color, boxShadow: `0 0 0 4px ${edu.color}22` }} />
                  {i < EDUCATION.length - 1 && (
                    <div style={{ width: 1, flex: 1, minHeight: 32, background: `linear-gradient(to bottom, ${edu.color}60, transparent)`, marginTop: 4 }} />
                  )}
                </div>

                {/* Card */}
                <div className="glass-card" style={{ flex: 1, padding: isMobile ? 18 : 24, marginBottom: 20 }}>
                  <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "center", gap: 8, marginBottom: 8 }}>
                    <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: isMobile ? "0.92rem" : "1rem", color: "var(--text-primary)" }}>{edu.degree}</h3>
                    {/* Grade badge */}
                    <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: "1.1rem", color: edu.color, flexShrink: 0 }}>{edu.grade}</span>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
                    <span className="exp-company" style={{ color: edu.color }}>{edu.school}</span>
                    <span style={{ color: "var(--border)" }}>·</span>
                    <span className="exp-period">{edu.period}</span>
                    <span style={{ color: "var(--border)" }}>·</span>
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.65rem", padding: "2px 8px", borderRadius: 4, background: `${edu.color}15`, color: edu.color, border: `1px solid ${edu.color}30` }}>
                      {edu.board}
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══ ACHIEVEMENTS ══ */}
      <section id="achievements" style={sectionStyle}>
        <div className="section-divider" style={{ margin: "0 0 60px" }} />
        <SectionHeader num="06" label="achievements" title="Recognition & Milestones" />
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: 14 }}>
          {ACHIEVEMENTS.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.07}>
              <div className="achievement-card">
                <span style={{ fontSize: "1.4rem", flexShrink: 0, marginTop: 2 }}>{a.icon}</span>
                <div>
                  <h4 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "0.92rem", color: "var(--text-primary)", marginBottom: 4 }}>{a.title}</h4>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.82rem", lineHeight: 1.65 }}>{a.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section style={{ ...sectionStyle, padding: isMobile ? "60px 16px 100px" : "80px 24px 120px" }}>
        <div className="section-divider" style={{ margin: "0 0 60px" }} />
        <Reveal>
          <div style={{ textAlign: "center", maxWidth: 580, margin: "0 auto" }}>
            <p className="section-eyebrow" style={{ marginBottom: 12 }}>// ready to collaborate</p>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: isMobile ? "1.8rem" : "clamp(2rem, 4vw, 2.8rem)", letterSpacing: "-0.02em", marginBottom: 16, lineHeight: 1.2 }}>
              Let's build something<br />
              <span style={{ background: "linear-gradient(90deg, var(--accent-cyan), var(--accent-violet))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                that matters.
              </span>
            </h2>
            <p style={{ color: "var(--text-secondary)", marginBottom: 36, lineHeight: 1.7, fontSize: "0.95rem" }}>
              Open to SDE roles, internships, and freelance projects. I respond within 24 hours.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="mailto:sahaanurag415@gmail.com" className="btn-primary" style={{ fontSize: isMobile ? "0.8rem" : "0.875rem" }}>
                sahaanurag415@gmail.com
              </a>
              <a href="tel:+918371009613" className="btn-ghost">+91 83710 09613</a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={{ borderTop: "1px solid var(--border)", padding: isMobile ? "24px 16px" : "32px", textAlign: "center", fontFamily: "'JetBrains Mono',monospace", fontSize: "0.72rem", color: "var(--text-secondary)" }}>
        <span style={{ color: "var(--accent-cyan)" }}>Anurag Saha</span>
        {" · "}Kolkata, West Bengal
        {" · "}Built with React & Framer Motion
        {" · "}{new Date().getFullYear()}
      </footer>
    </>
  );
}
