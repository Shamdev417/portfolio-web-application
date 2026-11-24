const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 40, bottom: 40, left: 45, right: 45 },
  bufferPages: true,
});

const outputPath = path.join(__dirname, 'Ehtesham_Rashid_Task1_Portfolio.pdf');
const writeStream = fs.createWriteStream(outputPath);
doc.pipe(writeStream);

// Colors
const PRIMARY = '#1e3a8a';     // Deep Blue
const SECONDARY = '#3b82f6';   // Accent Blue
const DARK = '#1f2937';        // Slate Dark
const MUTED = '#4b5563';       // Muted Gray
const LIGHT_BG = '#f3f4f6';    // Light Gray
const ACCENT = '#059669';      // Green for success/links
const BORDER = '#e5e7eb';

// Helper: Horizontal Line
function drawLine() {
  doc.strokeColor(BORDER).lineWidth(1)
    .moveTo(45, doc.y).lineTo(550, doc.y).stroke();
  doc.moveDown(0.5);
}

// ==========================================
// HEADER BANNER
// ==========================================
doc.rect(45, 35, 505, 75).fill(PRIMARY);

doc.fillColor('#ffffff').fontSize(20).font('Helvetica-Bold')
  .text('PROGREE INTERNSHIP PROGRAM', 60, 48);

doc.fontSize(11).font('Helvetica')
  .text('Remote 1-Month Frontend Development Internship', 60, 73);

doc.fontSize(10).font('Helvetica-Oblique').fillColor('#93c5fd')
  .text('Task Submission Report — Official Documentation', 60, 89);

doc.y = 125;

// ==========================================
// STUDENT PROFILE SECTION
// ==========================================
doc.fillColor(PRIMARY).fontSize(14).font('Helvetica-Bold')
  .text('1. INTERN & SUBMISSION PROFILE');
doc.moveDown(0.3);
drawLine();

const profileTop = doc.y;

// Left Box: Details
doc.rect(45, profileTop, 360, 115).fill(LIGHT_BG).stroke(BORDER);

doc.fillColor(DARK).fontSize(10).font('Helvetica-Bold');
doc.text('Intern Name:', 55, profileTop + 12);
doc.text('Student ID:', 55, profileTop + 30);
doc.text('Domain:', 55, profileTop + 48);
doc.text('Institution:', 55, profileTop + 66);
doc.text('Email / Phone:', 55, profileTop + 84);
doc.text('Location:', 55, profileTop + 102);

doc.font('Helvetica').fillColor(MUTED);
doc.text('Ehtesham Rashid', 145, profileTop + 12);
doc.text('B10/1711', 145, profileTop + 30);
doc.text('Frontend Development (MERN Stack)', 145, profileTop + 48);
doc.text('Islamia University of Bahawalpur (IUB)', 145, profileTop + 66);
doc.text('ehteshamrashid78@gmail.com | 0328-9529502', 145, profileTop + 84);
doc.text('Rahim Yar Khan, Punjab, Pakistan', 145, profileTop + 102);

// Right Box: Photo
const photoPath = path.join(__dirname, 'assets', 'ehtesham-profile.jpg');
if (fs.existsSync(photoPath)) {
  doc.rect(420, profileTop, 130, 115).fill('#ffffff').stroke(BORDER);
  try {
    doc.image(photoPath, 435, profileTop + 8, { width: 100, height: 100, fit: [100, 100], align: 'center' });
  } catch (e) {
    doc.fillColor(MUTED).fontSize(9).text('Profile Photo', 445, profileTop + 50);
  }
}

doc.y = profileTop + 130;

// ==========================================
// TASK 1 SPECIFICATIONS
// ==========================================
doc.fillColor(PRIMARY).fontSize(14).font('Helvetica-Bold')
  .text('2. TASK SPECIFICATIONS & DIRECT LINKS');
doc.moveDown(0.3);
drawLine();

doc.fillColor(DARK).fontSize(11).font('Helvetica-Bold')
  .text('Task Title: ', { continued: true })
  .font('Helvetica').text('Task 1 — Fully Responsive Portfolio Web Application');

doc.moveDown(0.3);
doc.font('Helvetica-Bold').text('Task Objective: ', { continued: true })
  .font('Helvetica')
  .text('Code a semantic, responsive single-page visual portal profile website. Build structural application blocks using semantic HTML5 and customized CSS grid/flexbox systems. Ensure layout fluidity across all screen widths using CSS media queries, and implement a smooth, interactive mobile navigation menu.');

doc.moveDown(0.5);

// Highlighted Box for Links
const linksY = doc.y;
doc.rect(45, linksY, 505, 55).fill('#ecfdf5').stroke('#a7f3d0');

doc.fillColor('#065f46').fontSize(10).font('Helvetica-Bold');
doc.text('LIVE HOSTED DEMO URL:', 55, linksY + 12);
doc.fillColor('#047857').font('Helvetica')
  .text('https://shamdev417.github.io/portfolio-web-application/', 215, linksY + 12, {
    link: 'https://shamdev417.github.io/portfolio-web-application/',
    underline: true,
  });

doc.fillColor('#065f46').font('Helvetica-Bold')
  .text('GITHUB REPOSITORY URL:', 55, linksY + 32);
doc.fillColor('#047857').font('Helvetica')
  .text('https://github.com/Shamdev417/portfolio-web-application', 215, linksY + 32, {
    link: 'https://github.com/Shamdev417/portfolio-web-application',
    underline: true,
  });

doc.y = linksY + 70;

// ==========================================
// ARCHITECTURE & TECH STACK
// ==========================================
doc.fillColor(PRIMARY).fontSize(14).font('Helvetica-Bold')
  .text('3. ARCHITECTURE & TECH STACK');
doc.moveDown(0.3);
drawLine();

const techData = [
  ['Component', 'Technology', 'Implementation Role'],
  ['Structure', 'HTML5 Semantic', '<header>, <nav>, <main>, <section>, <article>, <figure>, <footer>'],
  ['Styling', 'CSS3 (Custom)', '40+ Design Tokens (:root), CSS Grid, Flexbox, Fluid clamp(), Keyframes'],
  ['Interactivity', 'Vanilla JS (ES6+)', 'IntersectionObserver for Scroll Reveal & Skill Bars, Mobile Drawer Menu'],
  ['Media', 'Images & Assets', 'Professional Profile Headshot, Integrated Real CV PDF (494 KB)'],
  ['Hosting', 'GitHub Pages', 'Live Continuous Deployment from main branch (Status: 200 OK)'],
];

const startX = 45;
let currentY = doc.y;
const colWidths = [100, 130, 275];

techData.forEach((row, i) => {
  const isHeader = i === 0;
  doc.rect(startX, currentY, 505, 20)
    .fill(isHeader ? PRIMARY : (i % 2 === 0 ? LIGHT_BG : '#ffffff'))
    .stroke(BORDER);

  doc.fillColor(isHeader ? '#ffffff' : DARK)
    .fontSize(isHeader ? 9.5 : 8.5)
    .font(isHeader ? 'Helvetica-Bold' : 'Helvetica');

  let curX = startX + 5;
  row.forEach((text, colIdx) => {
    doc.text(text, curX, currentY + 5, { width: colWidths[colIdx] - 10, lineBreak: false });
    curX += colWidths[colIdx];
  });
  currentY += 20;
});

doc.y = currentY + 15;

// ==========================================
// PAGE 2: STRUCTURAL SECTIONS & FEATURES
// ==========================================
doc.addPage();

doc.fillColor(PRIMARY).fontSize(14).font('Helvetica-Bold')
  .text('4. STRUCTURAL APPLICATION BLOCKS (7 SECTIONS)');
doc.moveDown(0.3);
drawLine();

const sections = [
  {
    name: '1. Fixed Glassmorphism Header & Mobile Navigation',
    desc: 'Sticky nav with real profile photo avatar, branded logo ("Ehtesham Rashid"), desktop navigation links, "Resume ↗" action button, and an accessible mobile hamburger drawer with focus trap and scroll lock.'
  },
  {
    name: '2. Hero Section (Visual Introduction)',
    desc: 'Features dynamic background grid, animated floating ambient orbs, fluid heading with gradient text highlight, professional title, quick statistics counters, and circular framed profile portrait.'
  },
  {
    name: '3. About Me Section',
    desc: 'Comprehensive biography with custom spinning dashed decorative frame, location details (Rahim Yar Khan, Punjab), education badge (BS CS, IUB), direct email link, and direct CV download CTA.'
  },
  {
    name: '4. Technical Skills & Proficiency Matrix',
    desc: '3-column card system (Frontend, Backend, Tools & Design). Each skill features automated animated progress bars dynamically triggered via IntersectionObserver upon scrolling into view.'
  },
  {
    name: '5. Featured Projects Showcase with Live Filtering',
    desc: 'Responsive CSS Grid project showcase with category filtering tabs (All, Web App, Mobile, Design). Features hover overlay actions (Live Demo ↗, GitHub ↗), tech tags, and featured card spanning.'
  },
  {
    name: '6. Tabbed Academic & Professional Timeline',
    desc: 'Interactive dual-tab panel switching between Work Experience and Formal Education (BS Computer Science from Islamia University of Bahawalpur, FSc from Nice Degree College, Matric from City Boys).'
  },
  {
    name: '7. Interactive Contact Portal & Modern Footer',
    desc: 'Direct contact info cards (Email, Location, Response SLA), social links (LinkedIn, GitHub), and full client-side validated form with real-time feedback, ending with a modern gradient footer.'
  }
];

sections.forEach(s => {
  doc.fillColor(SECONDARY).fontSize(10.5).font('Helvetica-Bold').text(s.name);
  doc.fillColor(MUTED).fontSize(9).font('Helvetica').text(s.desc);
  doc.moveDown(0.5);
});

doc.moveDown(0.5);

// ==========================================
// RESPONSIVE SYSTEM & ACCESSIBILITY
// ==========================================
doc.fillColor(PRIMARY).fontSize(14).font('Helvetica-Bold')
  .text('5. FLUID RESPONSIVE SYSTEM & ACCESSIBILITY');
doc.moveDown(0.3);
drawLine();

doc.fillColor(DARK).fontSize(9.5).font('Helvetica-Bold').text('Responsive Breakpoints Implemented:');
doc.font('Helvetica').fillColor(MUTED).fontSize(9);
doc.text('• Desktop (1200px+): 3-column project grid, 3-column skills matrix, side-by-side hero layout.');
doc.text('• Tablet Landscape (1024px): 2-column rebalanced grid, stacked hero content with centered counters.');
doc.text('• Tablet Portrait (768px): Desktop links collapse; interactive animated hamburger drawer activates.');
doc.text('• Mobile (480px & 360px): Single-column fluid viewports, stacked full-width touch targets, fluid clamp() typography.');

doc.moveDown(0.4);
doc.fillColor(DARK).fontSize(9.5).font('Helvetica-Bold').text('Accessibility & Performance (WCAG Compliance):');
doc.font('Helvetica').fillColor(MUTED).fontSize(9);
doc.text('• Skip to main content link for keyboard-only navigation users.');
doc.text('• ARIA attributes throughout: aria-expanded, aria-controls, aria-selected, role="progressbar", role="dialog".');
doc.text('• CSS prefers-reduced-motion media query to respect users who prefer minimal animation.');
doc.text('• Zero external libraries or heavy CSS frameworks: 100% pure vanilla code for maximum lighthouse speed.');

doc.moveDown(1);

// ==========================================
// SUBMISSION VERIFICATION BOX
// ==========================================
const verifyY = doc.y;
doc.rect(45, verifyY, 505, 75).fill(LIGHT_BG).stroke(PRIMARY);

doc.fillColor(PRIMARY).fontSize(11).font('Helvetica-Bold')
  .text('SUBMISSION COMPLIANCE STATEMENT', 55, verifyY + 10);

doc.fillColor(DARK).fontSize(8.5).font('Helvetica')
  .text('This document certifies that Task 1 (Fully Responsive Portfolio Web Application) of the Progree 1-Month Remote Internship has been designed, coded, tested, version-controlled on GitHub, and deployed live to GitHub Pages in full accordance with all specified evaluation requirements.', 55, verifyY + 26, { width: 485 });

doc.fillColor(SECONDARY).fontSize(9).font('Helvetica-Bold')
  .text('Status: READY FOR EVALUATION', 55, verifyY + 58);

doc.fillColor(MUTED).font('Helvetica')
  .text('Submitted by: Ehtesham Rashid (B10/1711) | Progree Internship Team', 260, verifyY + 58);

// Add page numbers
const range = doc.bufferedPageRange();
for (let i = range.start; i < range.start + range.count; i++) {
  doc.switchToPage(i);
  doc.fillColor('#9ca3af').fontSize(8).font('Helvetica')
    .text(`Progree Internship — Task 1 Submission | Page ${i + 1} of ${range.count}`, 45, 800, {
      align: 'center',
      width: 505
    });
}

doc.end();

writeStream.on('finish', () => {
  console.log('PDF Generated Successfully at:', outputPath);
});
