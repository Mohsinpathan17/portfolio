import { existsSync } from "node:fs";
import { chromium } from "@playwright/test";
import { profile, experience } from "../src/lib/content.ts";
const base = process.env.PORTFOLIO_LOCAL_URL ?? "http://127.0.0.1:4190";
const escape = (text) =>
  text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
const browser = await chromium.launch({
  executablePath:
    process.env.PORTFOLIO_CHROMIUM_PATH ??
    (existsSync("/usr/bin/chromium") ? "/usr/bin/chromium" : undefined),
  args: ["--no-sandbox"],
});
try {
  const page = await browser.newPage();
  await page.goto(base);
  await page.setContent(`<!doctype html><html lang="en"><head><meta charset="UTF-8"><title>Mohsin Pathan — Résumé</title><style>
 @font-face{font-family:Manrope;src:url(${base}/fonts/manrope-latin.woff2);font-weight:400 700}
 @page{size:A4;margin:14mm 15mm}*{box-sizing:border-box}body{font:12px/1.45 Manrope,Arial;color:#242830;margin:0}h1{font-size:29px;letter-spacing:-1.2px;margin:0;line-height:1.2}h2{font-size:10px;letter-spacing:1.6px;color:#3256c5;text-transform:uppercase;border-bottom:1px solid #d8dce5;padding-bottom:5px;margin:12px 0 7px}h3{font-size:12px;margin:8px 0 3px}p{margin:4px 0}a{color:inherit;text-decoration:none}.role{font-size:14px;color:#626977;margin-top:5px}.contact{font-size:10px;color:#626977;margin-top:9px}.intro{margin-top:12px;max-width:660px}.row{display:flex;justify-content:space-between;gap:15px}.date{font-size:9px;color:#6c7481}ul{margin:4px 0 7px;padding-left:13px}li{margin:3px 0}.small{font-size:10px;color:#626977}.skill{display:grid;grid-template-columns:100px 1fr;gap:15px;padding:3px 0}.experience{margin:8px 0}.bottom{margin-top:12px;font-size:9px;color:#6c7481}
 </style></head><body><h1>MOHSIN PATHAN</h1><p class="role">Computer Engineer · Web Products & Applied Machine Learning</p><div class="contact">Pune, India · +91 9822797573 · <a href="mailto:${profile.email}">${profile.email}</a><br/><a href="${profile.github}">github.com/Mohsinpathan17</a> · <a href="${profile.linkedin}">LinkedIn</a> · <a href="https://mohsinpathan.vercel.app">mohsinpathan.vercel.app</a></div><p class="intro">Computer engineering graduate with hands-on work in Python, Flask, React and applied ML. Building NEXYRAL, a live AI frontend-building workspace. Experience spans client web development, model-output evaluation and research into agricultural pest prediction.</p>
 <h2>Selected projects</h2><div class="row"><h3>NEXYRAL — AI Frontend-Building Workspace</h3><h3><a href="https://nexyral.online">nexyral.online</a></h3></div><p class="small">React · TypeScript · Three.js · Cloudflare Worker / D1 · Firebase</p><ul><li>Built a responsive website and account-based workspace with frontend generation, browser previews, code editing and project export.</li><li>Implemented plain-language revisions, recoverable source versions and in-product guidance; published source and implementation reports on GitHub.</li><li>Designed interactive 3D with mobile, reduced-motion and WebGL fallback handling.</li></ul>
 <h3>KrishiSetu — Pest Outbreak Prediction</h3><p class="small">Python · Scikit-learn · XGBoost · LSTM · Flask · MySQL</p><ul><li>Developed an environmental-data pipeline and compared classification models for Kharif crop pest prediction across Maharashtra.</li><li>Research accepted at ICRTSET-2026; built a Flask interface to explore predictions.</li></ul>
 <h3>Websites With Punch — Web Studio Website</h3><p class="small">React · TypeScript · Tailwind CSS · Vite</p><ul><li>Website presenting business web design and maintenance services, pricing and contact options.</li></ul>
 <h2>Experience</h2>${experience.map((item) => `<div class="experience"><div class="row"><strong>${escape(item.role)} — ${escape(item.company)}</strong><span class="date">${escape(item.date)}</span></div><p>${escape(item.role === "Maps Search Quality Rater" ? "Evaluate location-search results for relevance and accuracy using structured guidelines." : item.description)}</p></div>`).join("")}
 <h2>Skills</h2><div class="skill"><strong>Web & platforms</strong><span>React, TypeScript, JavaScript, Flask, Node.js, SQL, Firebase, Cloudflare</span></div><div class="skill"><strong>ML & data</strong><span>Python, Pandas, NumPy, Scikit-learn, XGBoost, LSTM</span></div><div class="skill"><strong>Tools & workflow</strong><span>Git, GitHub, Docker, Figma, Tailwind CSS, Three.js</span></div>
 <h2>Education</h2><div class="row"><strong>Bachelor of Engineering — Computer Science</strong><span>2026</span></div><p>Government College of Engineering & Research, Avasari Khurd · Savitribai Phule Pune University</p><p class="small">CGPA: 7.44 / 10</p><p class="bottom">Live project links and case study: <a href="https://mohsinpathan.vercel.app">mohsinpathan.vercel.app</a></p></body></html>`);
  await page.evaluate(async () => await document.fonts.ready);
  await page.pdf({
    path: "public/Mohsin_Pathan_Resume.pdf",
    format: "A4",
    printBackground: true,
    tagged: true,
    preferCSSPageSize: true,
  });
  console.log(
    "Generated updated résumé with NEXYRAL and links. Original résumé remains at the repository root.",
  );
} finally {
  await browser.close();
}
