import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

/* ── DATA ── */
const SKILLS = {
  Languages: ["Java", "JavaScript (ES6+)", "Python", "SQL", "TypeScript"],
  Frontend: ["React.js", "HTML5", "CSS3", "Responsive Design"],
  Backend: ["Node.js", "Express.js", "REST APIs", "Firebase Cloud Functions", "Microservices"],
  Databases: ["MongoDB", "Firebase Firestore", "SQL", "NoSQL"],
  DevOps: ["Docker", "Kubernetes", "GitHub Actions", "Firebase Hosting", "GCP"],
  Concepts: ["DSA", "OOP", "DBMS", "System Design", "OS", "Agile", "Scrum"],
};

const PROJECTS = [
  {
    name: "Tanushree Collection",
    subtitle: "Production E-Commerce Platform",
    period: "Jun 2026",
    tags: ["Firebase", "Node.js", "Razorpay", "GCP", "Brevo"],
    color: "#00D4FF",
    live: "https://tanushreecollection.in",
    github: "https://github.com/anuragsaha75",
    bullets: [
      "Production-grade e-commerce on GCP (Firebase Hosting) with OTP email verification, role-based admin dashboard, and dynamic product/order management.",
      "Tamper-proof Razorpay pipeline: Cloud Functions fetch live Firestore prices, compute state-wise weight-slab shipping, create orders server-side, verify HMAC-SHA256 — frontend never controls amounts.",
      "Atomic Firestore transactions for concurrent order safety; conflict orders auto-flagged with refundRequired: true triggering admin-initiated refund flow.",
      "Full order lifecycle: COD & online flows, webhook-driven refund updates, idempotent transactional emails (confirmed, shipped, delivered, refunded) via Brevo REST API.",
      "SEO pipeline: canonical URLs, Open Graph, JSON-LD, XML sitemap; custom domain with HTTPS and Firestore Security Rules.",
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
  { icon: "🎯", title: "McKinsey Forward Program", desc: "Selected Participant — McKinsey.org Global Career & Leadership Development Program 2026" },
  { icon: "💻", title: "150+ Coding Problems", desc: "Solved on LeetCode & GeeksforGeeks covering Arrays, Trees, Graphs, Dynamic Programming, and System Design" },
  { icon: "📜", title: "Angular Stack Certification", desc: "Infosys — Full-stack Angular development, TypeScript" },
  // { icon: "🚀", title: "Finalist – NASA Space Apps Challenge", desc: "Climate-tech project recognized in the global hackathon" },
  { icon: "🏆", title: "Top 5 – Clash of Coders", desc: "Adamas University competitive programming event" },
];

/* ── FADE-IN WRAPPER ── */
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── TYPING HEADLINE ── */
function Typewriter({ words }) {
  const [wordIdx, setWordIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx];
    let timeout;
    if (!deleting && displayed.length < word.length) {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === word.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setWordIdx((wordIdx + 1) % words.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, wordIdx, words]);

  return (
    <span style={{ color: "var(--accent-cyan)" }}>
      {displayed}
      <span className="cursor-blink" />
    </span>
  );
}

/* ── SKILL BAR ── */
function SkillBar({ level }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="skill-bar-track" style={{ marginTop: 4 }}>
      <motion.div
        className="skill-bar-fill"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: level } : {}}
        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

/* ── MAIN COMPONENT ── */
export default function Portfolio() {
  const [activeNav, setActiveNav] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { id: "about", label: "about" },
    { id: "skills", label: "skills" },
    { id: "experience", label: "experience" },
    { id: "projects", label: "projects" },
    { id: "achievements", label: "achievements" },
  ];

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveNav(id);
    setMenuOpen(false);
  };

  return (
    <>
      {/* Ambient orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />

      {/* ── NAV ── */}
      <nav className="nav-glass fixed top-0 left-0 right-0 z-50">
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "1rem", color: "var(--accent-cyan)" }}>
            AS<span style={{ color: "var(--text-secondary)" }}>.dev</span>
          </span>

          {/* Desktop nav */}
          <div style={{ display: "flex", gap: 32, alignItems: "center" }} className="hidden-mobile">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="nav-link"
                style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
              >
                <span style={{ color: "var(--accent-cyan)", marginRight: 2 }}>./</span>{link.label}
              </button>
            ))}
            <a href="/Anurag_Saha_Resume.pdf" download className="btn-primary" style={{ padding: "8px 18px", fontSize: "0.75rem" }}>
              ↓ Resume
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: "none", border: "1px solid var(--border)", borderRadius: 8, padding: "6px 12px", color: "var(--text-secondary)", cursor: "pointer", fontSize: "1.2rem" }}
            className="show-mobile"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              style={{ borderTop: "1px solid var(--border)", padding: "12px 24px 20px", display: "flex", flexDirection: "column", gap: 16 }}
            >
              {navLinks.map(link => (
                <button key={link.id} onClick={() => scrollTo(link.id)} className="nav-link" style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left", fontSize: "0.85rem" }}>
                  <span style={{ color: "var(--accent-cyan)" }}>./</span>{link.label}
                </button>
              ))}
              <a href="/Anurag_Saha_Resume.pdf" download className="btn-primary" style={{ width: "fit-content", fontSize: "0.8rem" }}>
                ↓ Resume
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── HERO ── */}
      <section id="home" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "120px 24px 80px", maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 64, flexWrap: "wrap" }} className="hero-layout">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ flex: 1, minWidth: 280 }}
          >
            <p className="hero-role" style={{ marginBottom: 16 }}>
              AVAILABLE FOR OPPORTUNITIES
            </p>
            <h1 className="hero-name" style={{ marginBottom: 12 }}>
              Anurag<br />Saha
            </h1>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "1.1rem", marginBottom: 24, color: "var(--text-secondary)" }}>
              <Typewriter words={["Full-Stack Developer", "MERN Stack Engineer", "Problem Solver", "SDE Intern @ Univolve"]} />
            </div>
            <p className="hero-bio" style={{ marginBottom: 36 }}>
              B.Tech CSE student at Adamas University building production-grade web applications — from tamper-proof payment pipelines to real-time trading platforms. I care about clean architecture, fast APIs, and shipping things that actually work.
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }} className="hero-btns">
              <button onClick={() => scrollTo("projects")} className="btn-primary">
                View Projects →
              </button>
              <a href="mailto:sahaanurag415@gmail.com" className="btn-ghost">
                Get in touch
              </a>
            </div>

            <div style={{ display: "flex", gap: 10, marginTop: 28 }}>
              <a href="https://github.com/anuragsaha75" target="_blank" rel="noreferrer" className="social-link" title="GitHub">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
              </a>
              <a href="https://linkedin.com/in/anurag-saha-5bab35260" target="_blank" rel="noreferrer" className="social-link" title="LinkedIn">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="mailto:sahaanurag415@gmail.com" className="social-link" title="Email">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.45.225-.878.596-1.133L12 12.09 23.404 4.324c.371.255.596.683.596 1.133z"/></svg>
              </a>
              <a href="tel:+918371009613" className="social-link" title="Phone">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
              </a>
            </div>
          </motion.div>

          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}
          >
            <div className="avatar-ring">
              <img src="/profile.jpg" alt="Anurag Saha" className="avatar-img" />
            </div>

            {/* Mini stats */}
            <div style={{ display: "flex", gap: 32 }}>
              {[
                { num: "150+", label: "Problems Solved" },
                { num: "3+", label: "Projects Shipped" },
                { num: "1", label: "Internship" },
              ].map(s => (
                <div key={s.label} style={{ textAlign: "center" }}>
                  <div className="stat-num">{s.num}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}
        >
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: "var(--text-secondary)", letterSpacing: "0.15em" }}>SCROLL</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            style={{ width: 1, height: 32, background: "linear-gradient(to bottom, var(--accent-cyan), transparent)" }}
          />
        </motion.div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px", position: "relative", zIndex: 1 }}>
        <div className="section-divider" style={{ margin: "0 0 80px" }} />
        <Reveal>
          <p className="section-eyebrow" style={{ marginBottom: 8 }}>// 01 — about me</p>
          <h2 className="section-title" style={{ marginBottom: 40 }}>Who I Am</h2>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, flexWrap: "wrap" }}>
          <Reveal delay={0.1}>
            <div className="glass-card" style={{ padding: 32 }}>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "1rem", marginBottom: 16, color: "var(--accent-cyan)" }}>Background</h3>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, fontSize: "0.95rem" }}>
                Final-year B.Tech CSE student at Adamas University (CGPA 7.67), based in Kolkata. I bridge the gap between design and robust engineering — I've shipped a live production e-commerce platform processing real Razorpay payments, and built a Zerodha-style trading app from scratch.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="glass-card" style={{ padding: 32 }}>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "1rem", marginBottom: 16, color: "var(--accent-cyan)" }}>What Drives Me</h3>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, fontSize: "0.95rem" }}>
                I care about code that scales. Security-first API design, atomic database transactions, idempotent webhooks — these aren't nice-to-haves to me, they're what separates a project from a product. Selected for McKinsey Forward Program 2026.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px", position: "relative", zIndex: 1 }}>
        <div className="section-divider" style={{ margin: "0 0 80px" }} />
        <Reveal>
          <p className="section-eyebrow" style={{ marginBottom: 8 }}>// 02 — skills</p>
          <h2 className="section-title" style={{ marginBottom: 40 }}>Technical Stack</h2>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
          {Object.entries(SKILLS).map(([category, items], i) => (
            <Reveal key={category} delay={i * 0.07}>
              <div className="glass-card" style={{ padding: 24 }}>
                <h3 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", color: "var(--accent-cyan)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16 }}>
                  {category}
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {items.map(skill => (
                    <span key={skill} className="skill-pill">{skill}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience" style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px", position: "relative", zIndex: 1 }}>
        <div className="section-divider" style={{ margin: "0 0 80px" }} />
        <Reveal>
          <p className="section-eyebrow" style={{ marginBottom: 8 }}>// 03 — experience</p>
          <h2 className="section-title" style={{ marginBottom: 40 }}>Work History</h2>
        </Reveal>
        {EXPERIENCE.map((exp, i) => (
          <Reveal key={i} delay={0.1}>
            <div style={{ display: "flex", gap: 24, marginBottom: 40 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 6 }}>
                <div className="timeline-dot" />
                <div className="timeline-line" style={{ flex: 1, minHeight: 80 }} />
              </div>
              <div className="glass-card" style={{ flex: 1, padding: 28 }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
                  <div>
                    <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "1.05rem", color: "var(--text-primary)", marginBottom: 4 }}>{exp.role}</h3>
                    <span className="exp-company">{exp.company}</span>
                    <span style={{ color: "var(--text-secondary)", fontSize: "0.75rem", marginLeft: 8 }}>· {exp.location}</span>
                  </div>
                  <span className="exp-period">{exp.period}</span>
                </div>
                <ul style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
                  {exp.bullets.map((b, j) => (
                    <li key={j} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <span style={{ color: "var(--accent-cyan)", marginTop: 3, fontSize: "0.6rem", flexShrink: 0 }}>▶</span>
                      <span style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.7 }}>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}

        {/* Education inline */}
        <Reveal delay={0.2}>
          <div style={{ display: "flex", gap: 24 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 6 }}>
              <div className="timeline-dot" style={{ background: "var(--accent-violet)" }} />
            </div>
            <div className="glass-card" style={{ flex: 1, padding: 28 }}>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "1.05rem", color: "var(--text-primary)", marginBottom: 4 }}>B.Tech in Computer Science & Engineering</h3>
              <span className="exp-company" style={{ color: "var(--accent-violet)" }}>Adamas University, Kolkata</span>
              <span className="exp-period" style={{ marginLeft: 8 }}>2022 – 2026</span>
              <p style={{ color: "var(--text-secondary)", marginTop: 10, fontSize: "0.9rem" }}>CGPA: 7.67 &nbsp;·&nbsp; Completed HSC (Science) from A.C. Institution, Malda with 89%</p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px", position: "relative", zIndex: 1 }}>
        <div className="section-divider" style={{ margin: "0 0 80px" }} />
        <Reveal>
          <p className="section-eyebrow" style={{ marginBottom: 8 }}>// 04 — projects</p>
          <h2 className="section-title" style={{ marginBottom: 16 }}>Things I've Built</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", marginBottom: 48 }}>Production-grade applications with real users, real payments, real stakes.</p>
        </Reveal>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {PROJECTS.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.1}>
              <div className="project-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: 16 }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
                      <h3 className="project-title">{p.name}</h3>
                      {p.live && (
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", padding: "2px 8px", borderRadius: 4, background: "rgba(16, 185, 129, 0.15)", color: "#10B981", border: "1px solid rgba(16,185,129,0.3)" }}>
                          LIVE
                        </span>
                      )}
                    </div>
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>{p.subtitle}</p>
                  </div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span className="exp-period">{p.period}</span>
                    {p.live && (
                      <a href={p.live} target="_blank" rel="noreferrer" className="btn-ghost" style={{ padding: "6px 14px", fontSize: "0.75rem" }}>
                        ↗ Live
                      </a>
                    )}
                    <a href={p.github} target="_blank" rel="noreferrer" className="btn-ghost" style={{ padding: "6px 14px", fontSize: "0.75rem" }}>
                      GitHub
                    </a>
                  </div>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
                  {p.tags.map(tag => (
                    <span key={tag} className="project-tag" style={{ borderColor: `${p.color}33`, color: p.color, background: `${p.color}12` }}>{tag}</span>
                  ))}
                </div>

                <ul style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {p.bullets.map((b, j) => (
                    <li key={j} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <span style={{ color: p.color, marginTop: 4, fontSize: "0.55rem", flexShrink: 0 }}>◆</span>
                      <span style={{ color: "var(--text-secondary)", fontSize: "0.88rem", lineHeight: 1.7 }}>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── ACHIEVEMENTS ── */}
      <section id="achievements" style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px", position: "relative", zIndex: 1 }}>
        <div className="section-divider" style={{ margin: "0 0 80px" }} />
        <Reveal>
          <p className="section-eyebrow" style={{ marginBottom: 8 }}>// 05 — achievements</p>
          <h2 className="section-title" style={{ marginBottom: 40 }}>Recognition & Milestones</h2>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
          {ACHIEVEMENTS.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.07}>
              <div className="achievement-card">
                <span style={{ fontSize: "1.5rem", flexShrink: 0 }}>{a.icon}</span>
                <div>
                  <h4 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "0.95rem", color: "var(--text-primary)", marginBottom: 4 }}>{a.title}</h4>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.82rem", lineHeight: 1.6 }}>{a.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px 120px", position: "relative", zIndex: 1 }}>
        <div className="section-divider" style={{ margin: "0 0 80px" }} />
        <Reveal>
          <div style={{ textAlign: "center", maxWidth: 600, margin: "0 auto" }}>
            <p className="section-eyebrow" style={{ marginBottom: 12 }}>// ready to collaborate</p>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 2.8rem)", letterSpacing: "-0.02em", marginBottom: 16 }}>
              Let's build something<br />
              <span style={{ background: "linear-gradient(90deg, var(--accent-cyan), var(--accent-violet))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                that matters.
              </span>
            </h2>
            <p style={{ color: "var(--text-secondary)", marginBottom: 36, lineHeight: 1.7 }}>
              Open to SDE roles, internships, and freelance projects. I respond within 24 hours.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="mailto:sahaanurag415@gmail.com" className="btn-primary">
                sahaanurag415@gmail.com
              </a>
              <a href="tel:+918371009613" className="btn-ghost">
                +91 83710 09613
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── FOOTER ── */}
      <footer>
        <span style={{ color: "var(--accent-cyan)" }}>Anurag Saha</span>
        <span style={{ color: "var(--border)", margin: "0 12px" }}>·</span>
        Kolkata, West Bengal
        <span style={{ color: "var(--border)", margin: "0 12px" }}>·</span>
        Built with React & Tailwind
        <span style={{ color: "var(--border)", margin: "0 12px" }}>·</span>
        <span style={{ color: "var(--text-secondary)", fontSize: "0.65rem" }}>{new Date().getFullYear()}</span>
      </footer>

      {/* ── MOBILE CSS FIXES ── */}
      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: block !important; }
          section > div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </>
  );
}
