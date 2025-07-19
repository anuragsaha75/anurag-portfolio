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
          {/* 👤 Profile Image with animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-6"
          >
            <img
              src="/profile.jpg"
              alt="Anurag Saha"
              className="w-36 h-36 sm:w-40 sm:h-40 rounded-full border-4 border-blue-600 dark:border-blue-400 shadow-lg transition-transform duration-500 hover:scale-105 hover:rotate-1 object-cover"
            />
          </motion.div>

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
              <p>Aspiring Software Development Engineer (SDE) with a strong grasp of full-stack development, system design, and problem solving. Currently pursuing B.Tech in Computer Science, with hands-on experience in building scalable web applications, real-time systems, and microservices using MERN stack, Docker, and Kubernetes. Passionate about creating efficient, user-focused software and continuously improving through competitive programming, open-source contributions, and modern engineering practices. Seeking opportunities to contribute to impactful products while growing as a world-class developer.</p>
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
                MySQL, MongoDB, DSA, OOP, System Design, Multithreading, Linux, Docker, Kubernetes
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
                <li>CP participant (LeetCode, Codeforces)</li>
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
