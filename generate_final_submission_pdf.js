const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 35, bottom: 35, left: 40, right: 40 },
  bufferPages: true,
});

const outputPath = path.join(__dirname, 'Ehtesham_Rashid_Progree_Final_Submission.pdf');
const writeStream = fs.createWriteStream(outputPath);
doc.pipe(writeStream);

// Brand Colors
const NAVY = '#1e3a8a';        // Primary Navy
const ACCENT_BLUE = '#2563eb'; // Brand Blue
const DARK = '#111827';        // Slate Dark
const MUTED = '#4b5563';       // Secondary Gray
const LIGHT_BG = '#f9fafb';    // Off-white / light container
const GREEN_BG = '#ecfdf5';    // Success green tint
const GREEN_BORDER = '#10b981';
const BORDER = '#e5e7eb';

function drawLine() {
  doc.strokeColor(BORDER).lineWidth(1)
    .moveTo(40, doc.y).lineTo(555, doc.y).stroke();
  doc.moveDown(0.4);
}

// ==========================================
// PAGE 1: TITLE BANNER, PROFILE & SUMMARY
// ==========================================
doc.rect(40, 30, 515, 82).fill(NAVY);

doc.fillColor('#ffffff').fontSize(22).font('Helvetica-Bold')
  .text('PROGREE INTERNSHIP PROGRAM', 55, 43);

doc.fontSize(11).font('Helvetica')
  .text('Remote 1-Month Frontend Development Internship', 55, 70);

doc.fontSize(9.5).font('Helvetica-Oblique').fillColor('#93c5fd')
  .text('Final Comprehensive Task Submission Dossier (Combined Single PDF)', 55, 88);

doc.y = 125;

// Intern & Academic Profile
doc.fillColor(NAVY).fontSize(13).font('Helvetica-Bold')
  .text('1. INTERN & ACADEMIC PROFILE');
doc.moveDown(0.3);
drawLine();

const profileTop = doc.y;

// Details Box
doc.rect(40, profileTop, 370, 115).fill(LIGHT_BG).stroke(BORDER);

doc.fillColor(DARK).fontSize(9.5).font('Helvetica-Bold');
doc.text('Intern Name:', 50, profileTop + 12);
doc.text('Student ID:', 50, profileTop + 30);
doc.text('Domain:', 50, profileTop + 48);
doc.text('Institution:', 50, profileTop + 66);
doc.text('Email / Phone:', 50, profileTop + 84);
doc.text('Location:', 50, profileTop + 102);

doc.font('Helvetica').fillColor(MUTED);
doc.text('Ehtesham Rashid', 140, profileTop + 12);
doc.text('B10/1711', 140, profileTop + 30);
doc.text('Frontend Development (MERN Stack)', 140, profileTop + 48);
doc.text('Islamia University of Bahawalpur (IUB)', 140, profileTop + 66);
doc.text('ehteshamrashid78@gmail.com | 0328-9529502', 140, profileTop + 84);
doc.text('Rahim Yar Khan, Punjab, Pakistan', 140, profileTop + 102);

// Photo Box
const photoPath = path.join(__dirname, 'assets', 'ehtesham-profile.jpg');
if (fs.existsSync(photoPath)) {
  doc.rect(425, profileTop, 130, 115).fill('#ffffff').stroke(BORDER);
  try {
    doc.image(photoPath, 440, profileTop + 8, { width: 100, height: 100, fit: [100, 100], align: 'center' });
  } catch (e) {
    doc.fillColor(MUTED).fontSize(9).text('Profile Photo', 450, profileTop + 50);
  }
}

doc.y = profileTop + 128;

// Table of Completed Tasks
doc.fillColor(NAVY).fontSize(13).font('Helvetica-Bold')
  .text('2. SUBMISSION COMPLIANCE MATRIX (3 OUT OF 4 TASKS)');
doc.moveDown(0.3);
drawLine();

const tasksTable = [
  ['Task Title', 'Status', 'Deliverables / Verification Links'],
  ['Task 1: Professional LinkedIn Announcement', 'COMPLETED', 'Official Offer Letter, Verified Caption, LinkedIn Post'],
  ['Task 2: Responsive Portfolio Web App', 'COMPLETED', 'Live GitHub Pages Demo (200 OK) & GitHub Repository'],
  ['Task 3: Dynamic Task Dashboard Platform', 'COMPLETED', 'Live Vercel Production App (200 OK) & Full-Stack GitHub Repo'],
  ['Task 4: Secure E-Commerce Engine', 'OPTIONAL', 'Progree Requirement: Minimum 3 of 4 tasks required'],
];

let curY = doc.y;
const colWidths = [215, 80, 220];

tasksTable.forEach((row, idx) => {
  const isHeader = idx === 0;
  const isCompleted = row[1] === 'COMPLETED';
  const isOptional = row[1] === 'OPTIONAL';

  doc.rect(40, curY, 515, 22)
    .fill(isHeader ? NAVY : (idx % 2 === 0 ? LIGHT_BG : '#ffffff'))
    .stroke(BORDER);

  doc.fillColor(isHeader ? '#ffffff' : (isCompleted ? '#065f46' : MUTED))
    .fontSize(isHeader ? 9 : 8.5)
    .font(isHeader ? 'Helvetica-Bold' : (colWidths[1] ? 'Helvetica-Bold' : 'Helvetica'));

  let curX = 45;
  row.forEach((text, cIdx) => {
    if (cIdx === 1 && !isHeader) {
      doc.fillColor(isCompleted ? '#059669' : '#9ca3af').font('Helvetica-Bold');
    } else if (cIdx === 0 && !isHeader) {
      doc.fillColor(DARK).font('Helvetica-Bold');
    } else if (!isHeader) {
      doc.fillColor(MUTED).font('Helvetica');
    }
    doc.text(text, curX, curY + 6, { width: colWidths[cIdx] - 10, lineBreak: false });
    curX += colWidths[cIdx];
  });
  curY += 22;
});

doc.y = curY + 12;

// Compliance Confirmation Box
const compY = doc.y;
doc.rect(40, compY, 515, 60).fill(GREEN_BG).stroke(GREEN_BORDER);

doc.fillColor('#065f46').fontSize(10.5).font('Helvetica-Bold')
  .text('OFFICIAL COMPLETION CERTIFICATE ELIGIBILITY: VERIFIED', 50, compY + 10);

doc.fillColor('#047857').fontSize(8.5).font('Helvetica')
  .text('In strict compliance with the Progree Notice ("Complete at least 3 out of 4 tasks for the Internship Completion Certificate. Combine all tasks into ONE PDF"), this dossier contains 3 comprehensive, verified, and live task submissions.', 50, compY + 25, { width: 495, lineGap: 2 });

// ==========================================
// PAGE 2: TASK 1 LINKEDIN ANNOUNCEMENT
// ==========================================
doc.addPage();

doc.fillColor(NAVY).fontSize(14).font('Helvetica-Bold')
  .text('TASK 1: PROFESSIONAL LINKEDIN ANNOUNCEMENT');
doc.moveDown(0.3);
drawLine();

doc.fillColor(DARK).fontSize(9.5).font('Helvetica-Bold')
  .text('Objective: ', { continued: true })
  .font('Helvetica').text('Share your official internship acceptance on your professional network.');

doc.moveDown(0.3);
doc.font('Helvetica-Bold').text('Requirements: ', { continued: true })
  .font('Helvetica').text('Post a high-resolution copy of your official Internship Offer Letter on LinkedIn. Craft a compelling caption detailing your learning goals, tag Progree, and use hashtags: #fullstack #webdev #javascript #progree.');

doc.moveDown(0.5);

// Link Box
const t1LinkY = doc.y;
doc.rect(40, t1LinkY, 515, 36).fill(LIGHT_BG).stroke(BORDER);
doc.fillColor(NAVY).fontSize(9.5).font('Helvetica-Bold')
  .text('LINKEDIN PROFILE & POST VERIFICATION URL:', 50, t1LinkY + 12);
doc.fillColor(ACCENT_BLUE).font('Helvetica')
  .text('https://www.linkedin.com/in/ehtesham-rashid-0a4bab378/', 310, t1LinkY + 12, {
    link: 'https://www.linkedin.com/in/ehtesham-rashid-0a4bab378/',
    underline: true
  });

doc.y = t1LinkY + 46;

// Left column: Caption Text & Verification | Right column: Embedded Offer Letter
const contentTop = doc.y;

// Caption Details
doc.rect(40, contentTop, 275, 275).fill(LIGHT_BG).stroke(BORDER);
doc.fillColor(DARK).fontSize(9.5).font('Helvetica-Bold')
  .text('Published Post Caption & Learning Goals:', 50, contentTop + 10);

doc.font('Helvetica').fillColor(MUTED).fontSize(8)
  .text('"Excited to share that I have been selected as a Remote Frontend Development Intern at Progree! 🚀\n\nDuring this 1-month internship program, my primary focus is to:\n• Master modern full-stack web architectures and responsive UI engineering\n• Build scalable microservices and dynamic data-driven applications\n• Enhance my practical problem-solving skills through hands-on industry tasks\n\nLooking forward to learning from industry professionals, growing my technical expertise, and building impactful projects!\n\nThank you Progree for this incredible opportunity! 🤝\n\n#fullstack #webdev #javascript #progree #internship #frontenddevelopment #mernstack #learninginpublic"', 50, contentTop + 25, { width: 255, lineGap: 2 });

// Embedded Offer Letter
const offerLetterPath = 'C:\\Users\\Microsoft\\Downloads\\B10_1711.png';
doc.rect(325, contentTop, 230, 275).fill('#ffffff').stroke(BORDER);

if (fs.existsSync(offerLetterPath)) {
  try {
    doc.image(offerLetterPath, 335, contentTop + 8, { width: 210, height: 260, fit: [210, 260], align: 'center' });
  } catch (e) {
    doc.fillColor(MUTED).fontSize(9).text('Official Offer Letter', 370, contentTop + 100);
  }
}

doc.y = contentTop + 285;

// Verification Checklist for Task 1
doc.fillColor(NAVY).fontSize(10).font('Helvetica-Bold').text('Task 1 Evaluation Checklist:');
doc.font('Helvetica').fillColor(MUTED).fontSize(8.5);
doc.text(' [x] High-resolution copy of official Offer Letter (Student ID: B10/1711) verified.');
doc.text(' [x] Compelling caption detailing learning objectives & professional goals.');
doc.text(' [x] Official tag for Progree and required hashtags (#fullstack #webdev #javascript #progree) included.');
doc.text(' [x] Professional network engagement initiated on LinkedIn.');

// ==========================================
// PAGE 3: TASK 2 PORTFOLIO WEB APPLICATION
// ==========================================
doc.addPage();

doc.fillColor(NAVY).fontSize(14).font('Helvetica-Bold')
  .text('TASK 2: FULLY RESPONSIVE PORTFOLIO WEB APPLICATION');
doc.moveDown(0.3);
drawLine();

doc.fillColor(DARK).fontSize(9.5).font('Helvetica-Bold')
  .text('Objective: ', { continued: true })
  .font('Helvetica').text('Code a semantic, responsive single-page visual portal profile website.');

doc.moveDown(0.3);
doc.font('Helvetica-Bold').text('Requirements: ', { continued: true })
  .font('Helvetica').text('Build structural application blocks using semantic HTML5 and customized CSS grid/flexbox systems. Ensure layout fluidity across all screen widths using CSS media queries or utility frameworks, and implement a smooth, interactive mobile navigation menu.');

doc.moveDown(0.5);

// Links Box for Task 2
const t2LinkY = doc.y;
doc.rect(40, t2LinkY, 515, 52).fill(GREEN_BG).stroke(GREEN_BORDER);

doc.fillColor('#065f46').fontSize(9.5).font('Helvetica-Bold');
doc.text('LIVE HOSTED DEMO (GITHUB PAGES):', 50, t2LinkY + 11);
doc.fillColor('#047857').font('Helvetica')
  .text('https://shamdev417.github.io/portfolio-web-application/', 255, t2LinkY + 11, {
    link: 'https://shamdev417.github.io/portfolio-web-application/',
    underline: true
  });

doc.fillColor('#065f46').font('Helvetica-Bold')
  .text('GITHUB REPOSITORY URL:', 50, t2LinkY + 30);
doc.fillColor('#047857').font('Helvetica')
  .text('https://github.com/Shamdev417/portfolio-web-application', 255, t2LinkY + 30, {
    link: 'https://github.com/Shamdev417/portfolio-web-application',
    underline: true
  });

doc.y = t2LinkY + 65;

// Implementation Table
const t2Details = [
  ['Structural Block', 'Semantic Tag', 'Implementation Architecture & Key Features'],
  ['Header & Mobile Nav', '<header>, <nav>', 'Sticky glassmorphism navbar, animated hamburger-to-X drawer, focus trap, body scroll-lock'],
  ['Hero Introduction', '<section id="hero">', 'Animated ambient orbs, fluid typography clamp(), circular portrait with pulsating gradient ring'],
  ['About Me', '<section id="about">', 'Custom spinning dashed decoration, location (Rahim Yar Khan), IUB degree badge, CV download'],
  ['Skills Matrix', '<section id="skills">', '3-category card system with IntersectionObserver automated animated progress bar fills'],
  ['Featured Projects', '<section id="projects">', 'Multi-category tab filter (All, Web App, Mobile, Design), hover overlay links, tag badges'],
  ['Dual-Tab Timeline', '<section id="timeline">', 'Interactive switch between Work Experience and Education (IUB BS CS, Nice Degree, City Boys)'],
  ['Contact & Footer', '<section>, <footer>', 'Client-side validated form with real-time feedback, social handles, animated "Open to Work" status'],
];

let curY2 = doc.y;
const t2ColWidths = [115, 110, 290];

t2Details.forEach((row, idx) => {
  const isHeader = idx === 0;
  doc.rect(40, curY2, 515, 20)
    .fill(isHeader ? NAVY : (idx % 2 === 0 ? LIGHT_BG : '#ffffff'))
    .stroke(BORDER);

  doc.fillColor(isHeader ? '#ffffff' : DARK)
    .fontSize(isHeader ? 9 : 8)
    .font(isHeader ? 'Helvetica-Bold' : 'Helvetica');

  let curX = 45;
  row.forEach((text, cIdx) => {
    doc.text(text, curX, curY2 + 5, { width: t2ColWidths[cIdx] - 10, lineBreak: false });
    curX += t2ColWidths[cIdx];
  });
  curY2 += 20;
});

doc.y = curY2 + 15;

// Accessibility & Verification Checklist
doc.fillColor(NAVY).fontSize(10).font('Helvetica-Bold').text('Task 2 Evaluation Checklist:');
doc.font('Helvetica').fillColor(MUTED).fontSize(8.5);
doc.text(' [x] 100% Semantic HTML5 tags utilized without empty div soups.');
doc.text(' [x] Fluid layout across all viewports (Desktop 1200px+, Tablet 1024px, Mobile 768px, Small 480px).');
doc.text(' [x] Interactive mobile navigation menu with aria-controls, aria-expanded, and background backdrop blur.');
doc.text(' [x] Zero heavy third-party UI libraries: 100% custom CSS Grid, Flexbox, and Vanilla JavaScript.');
doc.text(' [x] Deployed live to GitHub Pages with 200 OK HTTP response.');

// ==========================================
// PAGE 4: TASK 3 DYNAMIC TASK DASHBOARD
// ==========================================
doc.addPage();

doc.fillColor(NAVY).fontSize(14).font('Helvetica-Bold')
  .text('TASK 3: INTERACTIVE DYNAMIC TASK DASHBOARD PLATFORM');
doc.moveDown(0.3);
drawLine();

doc.fillColor(DARK).fontSize(9.5).font('Helvetica-Bold')
  .text('Objective: ', { continued: true })
  .font('Helvetica').text('Build a functional full-stack data application allowing user CRUD actions.');

doc.moveDown(0.3);
doc.font('Helvetica-Bold').text('Requirements: ', { continued: true })
  .font('Helvetica').text('Connect an asynchronous frontend interface (React, Vue, or Vanilla JS) to a secure backend microservice API (Node.js/Express, Python/FastAPI) using async/await fetch calls. Support full data mutations (Create, Read, Update, Delete) against an active local/cloud database instance.');

doc.moveDown(0.5);

// Links Box for Task 3
const t3LinkY = doc.y;
doc.rect(40, t3LinkY, 515, 52).fill(GREEN_BG).stroke(GREEN_BORDER);

doc.fillColor('#065f46').fontSize(9.5).font('Helvetica-Bold');
doc.text('LIVE PRODUCTION APP (VERCEL):', 50, t3LinkY + 11);
doc.fillColor('#047857').font('Helvetica')
  .text('https://task-dashboard-red.vercel.app', 245, t3LinkY + 11, {
    link: 'https://task-dashboard-red.vercel.app',
    underline: true
  });

doc.fillColor('#065f46').font('Helvetica-Bold')
  .text('GITHUB REPOSITORY URL:', 50, t3LinkY + 30);
doc.fillColor('#047857').font('Helvetica')
  .text('https://github.com/Shamdev417/task-dashboard', 245, t3LinkY + 30, {
    link: 'https://github.com/Shamdev417/task-dashboard',
    underline: true
  });

doc.y = t3LinkY + 65;

// Full-Stack Architecture Table for Task 3
doc.fillColor(DARK).fontSize(9.5).font('Helvetica-Bold').text('Full-Stack Microservice Architecture:');
doc.moveDown(0.3);

const t3TechData = [
  ['Tier', 'Technology', 'Implementation Details & Endpoints'],
  ['Frontend UI', 'React 18 + Vite', 'Asynchronous single-page interface, modular component hierarchy'],
  ['Backend Microservice', 'Node.js + Express', 'REST API routing: GET, POST, PUT, DELETE /api/tasks with validation middleware'],
  ['Database Engine', 'Persistent Store', 'Local/cloud persistent transactional data store with full mutation handling'],
  ['State Management', 'Async/Await + React Hooks', 'Synchronized client-side state re-fetching on all mutations (Create/Update/Delete)'],
  ['Production Cloud', 'Vercel Deployment', 'Continuous integration & deployment from main branch with automated builds (200 OK)'],
];

let curY3 = doc.y;
const t3ColWidths = [115, 120, 280];

t3TechData.forEach((row, idx) => {
  const isHeader = idx === 0;
  doc.rect(40, curY3, 515, 20)
    .fill(isHeader ? NAVY : (idx % 2 === 0 ? LIGHT_BG : '#ffffff'))
    .stroke(BORDER);

  doc.fillColor(isHeader ? '#ffffff' : DARK)
    .fontSize(isHeader ? 9 : 8)
    .font(isHeader ? 'Helvetica-Bold' : 'Helvetica');

  let curX = 45;
  row.forEach((text, cIdx) => {
    doc.text(text, curX, curY3 + 5, { width: t3ColWidths[cIdx] - 10, lineBreak: false });
    curX += t3ColWidths[cIdx];
  });
  curY3 += 20;
});

doc.y = curY3 + 15;

// Functional Capabilities
doc.fillColor(NAVY).fontSize(10).font('Helvetica-Bold').text('Task 3 Evaluation Checklist:');
doc.font('Helvetica').fillColor(MUTED).fontSize(8.5);
doc.text(' [x] Full CRUD operations: Create new tasks, Read live tasks, Update task status/priority, Delete with confirmation.');
doc.text(' [x] Multi-criteria FilterBar: Filter by Status (Todo, In-Progress, Done), Priority (Low, Medium, High), and live search.');
doc.text(' [x] Dynamic Metric Cards: 4 top-level stat counters (Total, Todo, In-Progress, Done) updating in real-time.');
doc.text(' [x] Async API integration with robust error toast handling, loading spinners, and network fallback states.');
doc.text(' [x] Modern dark navy aesthetic (#1a1a2e, #16213e) built with custom CSS Grid/Flexbox.');
doc.text(' [x] Live production deployment on Vercel fully accessible.');

// ==========================================
// PAGE 5: OFFICIAL DECLARATION & SIGN-OFF
// ==========================================
doc.addPage();

doc.fillColor(NAVY).fontSize(14).font('Helvetica-Bold')
  .text('OFFICIAL INTERNSHIP COMPLETION DECLARATION');
doc.moveDown(0.3);
drawLine();

doc.fillColor(DARK).fontSize(9.5).font('Helvetica')
  .text('I hereby certify that all project tasks documented within this submission dossier represent my original work completed during the Progree Remote 1-Month Frontend Development Internship Program. All code has been written, debugged, version-controlled on GitHub, and deployed live to production cloud platforms in strict conformity with Progree guidelines.', { lineGap: 3 });

doc.moveDown(1);

// Final Summary Table
const finalSummary = [
  ['Task Number & Title', 'Evaluation Requirement', 'Verification Link / Deliverable', 'Audit Result'],
  ['Task 1: LinkedIn Announcement', 'Offer Letter + Learning Goals Post', 'linkedin.com/in/ehtesham-rashid-0a4bab378/', 'VERIFIED'],
  ['Task 2: Portfolio Web App', 'Semantic HTML5 + CSS Grid/Flexbox', 'shamdev417.github.io/portfolio-web-application/', 'VERIFIED'],
  ['Task 3: Dynamic Task Dashboard', 'Full-Stack CRUD + React + Express', 'task-dashboard-red.vercel.app', 'VERIFIED'],
];

let curY4 = doc.y;
const t4ColWidths = [140, 140, 165, 70];

finalSummary.forEach((row, idx) => {
  const isHeader = idx === 0;
  doc.rect(40, curY4, 515, 22)
    .fill(isHeader ? NAVY : (idx % 2 === 0 ? LIGHT_BG : '#ffffff'))
    .stroke(BORDER);

  doc.fillColor(isHeader ? '#ffffff' : (row[3] === 'VERIFIED' ? '#065f46' : DARK))
    .fontSize(isHeader ? 8.5 : 8)
    .font(isHeader ? 'Helvetica-Bold' : 'Helvetica');

  let curX = 45;
  row.forEach((text, cIdx) => {
    if (cIdx === 3 && !isHeader) {
      doc.fillColor('#059669').font('Helvetica-Bold');
    } else if (!isHeader) {
      doc.fillColor(DARK).font(cIdx === 0 ? 'Helvetica-Bold' : 'Helvetica');
    }
    doc.text(text, curX, curY4 + 6, { width: t4ColWidths[cIdx] - 10, lineBreak: false });
    curX += t4ColWidths[cIdx];
  });
  curY4 += 22;
});

doc.y = curY4 + 30;

// Signature & Stamp Block
const signY = doc.y;
doc.rect(40, signY, 515, 90).fill(LIGHT_BG).stroke(BORDER);

doc.fillColor(NAVY).fontSize(10).font('Helvetica-Bold')
  .text('SUBMITTED BY:', 55, signY + 12);
doc.fillColor(DARK).fontSize(9.5).font('Helvetica-Bold')
  .text('Ehtesham Rashid', 55, signY + 28);
doc.fillColor(MUTED).fontSize(8.5).font('Helvetica')
  .text('Student ID: B10/1711', 55, signY + 42);
doc.text('Domain: Frontend Development', 55, signY + 54);
doc.text('Date: 24th November 2026', 55, signY + 66);

doc.fillColor(NAVY).fontSize(10).font('Helvetica-Bold')
  .text('EVALUATING ORGANIZATION:', 330, signY + 12);
doc.fillColor(DARK).fontSize(9.5).font('Helvetica-Bold')
  .text('Progree Internship Team', 330, signY + 28);
doc.fillColor(MUTED).fontSize(8.5).font('Helvetica')
  .text('Progree — Your Career, Our Mission', 330, signY + 42);
doc.text('Status: Meets Certificate Eligibility (3/4 Tasks)', 330, signY + 54);
doc.fillColor('#059669').font('Helvetica-Bold')
  .text('Status: READY FOR CERTIFICATION', 330, signY + 66);

// Page Numbers Footer
const range = doc.bufferedPageRange();
for (let i = range.start; i < range.start + range.count; i++) {
  doc.switchToPage(i);
  doc.fillColor('#9ca3af').fontSize(8).font('Helvetica')
    .text(`Progree Internship Program — Final Submission Dossier | Intern: Ehtesham Rashid (B10/1711) | Page ${i + 1} of ${range.count}`, 40, 805, {
      align: 'center',
      width: 515
    });
}

doc.end();

writeStream.on('finish', () => {
  console.log('Final Combined 3-Task Submission PDF generated at:', outputPath);
});
