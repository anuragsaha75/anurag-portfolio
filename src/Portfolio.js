import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(false);

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className={darkMode ? "dark bg-gray-900 text-gray-100" : "bg-gradient-to-br from-white to-blue-50 text-gray-800"}>
      <div className="p-4 flex justify-between max-w-4xl mx-auto">
        <a
          href="/Anurag_Saha_Resume.pdf"
          download
          className="text-sm bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
        >
          ⬇️ Download Resume
        </a>
        <button
          className="text-sm bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
          onClick={() => setDarkMode(!darkMode)}
        >
          Toggle {darkMode ? "Light" : "Dark"} Mode
        </button>
      </div>

      <motion.main
        className="p-8 font-sans max-w-4xl mx-auto shadow-xl rounded-2xl"
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.2 }}
      >
        <motion.header
          className="mb-10 border-b pb-6 text-center"
          variants={sectionVariants}
        >
          <h1 className="text-4xl font-extrabold text-blue-700 dark:text-blue-400">Anurag Saha</h1>
          <p className="text-md text-gray-600 dark:text-gray-300 mt-1">B.Tech CSE Student | Aspiring Software Engineer</p>
          <div className="mt-4 flex justify-center gap-6 text-blue-600 dark:text-blue-400 text-lg">
            <a href="mailto:sahaanurag415@gmail.com" className="hover:underline">📧 Email</a>
            <a href="https://github.com/anuragsaha75" target="_blank" rel="noopener noreferrer" className="hover:underline">💻 GitHub</a>
            <a href="https://linkedin.com/in/anurag-saha-5bab35260" target="_blank" rel="noopener noreferrer" className="hover:underline">🔗 LinkedIn</a>
          </div>
        </motion.header>

        {["Objective", "Education", "Skills", "Projects", "Achievements", "Certifications"].map((title, index) => (
          <motion.section
            key={title}
            className="mb-8"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <h2 className="text-2xl font-semibold mb-3 text-blue-600 dark:text-blue-400">
              {title === "Objective" && "🎯 Objective"}
              {title === "Education" && "🎓 Education"}
              {title === "Skills" && "🛠️ Skills"}
              {title === "Projects" && "🚀 Projects"}
              {title === "Achievements" && "🏆 Achievements"}
              {title === "Certifications" && "📜 Certifications"}
            </h2>
            {title === "Objective" && (
              <p>B.Tech (CSE) student seeking Google SWE Internship – Summer 2026 to apply skills in system design, algorithms, and scalable software development.</p>
            )}
            {title === "Education" && (
              <ul className="list-disc ml-6 space-y-2">
                <li><strong>Adamas University, Kolkata:</strong> B.Tech in CSE (Aug 2022 – Present) – CGPA: 7.6</li>
                <li><strong>A.C. Institution, Malda:</strong> Higher Secondary – 89%</li>
              </ul>
            )}
            {title === "Skills" && (
              <p>
                C++, Python, Java, JavaScript, HTML, CSS, Node.js, Angular, Firebase, Git, MERN, WebSockets, Bootstrap,
                MySQL, MongoDB, DSA, OOP, System Design, Multithreading, Linux
              </p>
            )}
            {title === "Projects" && (
              <ul className="list-disc ml-6 space-y-3">
                {["Real-time Chat App", "Laxmifiya Trading Platform", "Pratyarpan Charity Site"].map((project, idx) => (
                  <motion.li
                    key={project}
                    className="bg-white dark:bg-gray-800 p-3 rounded shadow-md hover:scale-[1.02] transition-transform"
                    whileHover={{ scale: 1.03 }}
                  >
                    <strong>{project}:</strong> {project === "Real-time Chat App" && "C++, WebSockets, Node.js – Multithreaded server supporting 10+ users."}
                    {project === "Laxmifiya Trading Platform" && "MERN Stack – Zerodha-style app with auth, REST APIs, and portfolio tracking."}
                    {project === "Pratyarpan Charity Site" && "Firebase, JS – Live donation platform used during Durga Puja."}
                  </motion.li>
                ))}
              </ul>
            )}
            {title === "Achievements" && (
              <ul className="list-disc ml-6 space-y-2">
                <li>Top 5 – Clash of Coders, Adamas University</li>
                <li>GitHub contributor & CP participant (LeetCode, Codeforces)</li>
                <li>Finalist – NASA Space Apps Challenge (climate-tech project)</li>
              </ul>
            )}
            {title === "Certifications" && (
              <>
                <p>Angular Stack – Infosys | Problem Solving in C – NPTEL</p>
                <p className="mt-2"><strong>🎯 Interests:</strong> Mobile Dev, Distributed Systems, ML, NLP, Networking, Security</p>
              </>
            )}
          </motion.section>
        ))}
      </motion.main>
    </div>
  );
}
