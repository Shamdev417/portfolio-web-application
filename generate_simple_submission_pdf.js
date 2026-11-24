const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// Single page A4 document
const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 40, bottom: 40, left: 45, right: 45 },
});

const outputPath = path.join(__dirname, 'Ehtesham_Rashid_Progree_Tasks_Submission.pdf');
const writeStream = fs.createWriteStream(outputPath);
doc.pipe(writeStream);

// Theme Colors
const PRIMARY = '#1e3a8a';     // Professional Deep Navy
const ACCENT = '#2563eb';      // Blue for links
const DARK = '#111827';        // Text Dark
const MUTED = '#4b5563';       // Gray
const LIGHT_BG = '#f8fafc';    // Card background
const BORDER = '#e2e8f0';      // Light border

function drawDivider() {
  doc.strokeColor(BORDER).lineWidth(1)
    .moveTo(45, doc.y).lineTo(550, doc.y).stroke();
  doc.moveDown(0.5);
}

// ==========================================
// 1. TOP HEADER BANNER
// ==========================================
doc.rect(45, 40, 505, 60).fill(PRIMARY);

doc.fillColor('#ffffff').fontSize(18).font('Helvetica-Bold')
  .text('PROGREE INTERNSHIP PROGRAM', 60, 52);

doc.fontSize(10).font('Helvetica')
  .text('Remote 1-Month Frontend Development Internship — Task Submission', 60, 75);

doc.y = 115;

// ==========================================
// 2. STUDENT DETAILS SECTION
// ==========================================
doc.fillColor(PRIMARY).fontSize(12).font('Helvetica-Bold')
  .text('INTERN INFORMATION');
doc.moveDown(0.2);
drawDivider();

const infoBoxY = doc.y;
doc.rect(45, infoBoxY, 505, 80).fill(LIGHT_BG).stroke(BORDER);

// Two column grid for intern info
doc.fillColor(DARK).fontSize(9.5).font('Helvetica-Bold');
doc.text('Full Name:', 60, infoBoxY + 12);
doc.text('Student ID:', 60, infoBoxY + 32);
doc.text('Domain:', 60, infoBoxY + 52);

doc.font('Helvetica').fillColor(MUTED);
doc.text('Ehtesham Rashid', 145, infoBoxY + 12);
doc.text('B10/1711', 145, infoBoxY + 32);
doc.text('Frontend Development (MERN)', 145, infoBoxY + 52);

doc.fillColor(DARK).font('Helvetica-Bold');
doc.text('University:', 305, infoBoxY + 12);
doc.text('Email:', 305, infoBoxY + 32);
doc.text('Phone:', 305, infoBoxY + 52);

doc.font('Helvetica').fillColor(MUTED);
doc.text('Islamia University of Bahawalpur (IUB)', 375, infoBoxY + 12);
doc.text('ehteshamrashid78@gmail.com', 375, infoBoxY + 32);
doc.text('0328-9529502', 375, infoBoxY + 52);

doc.y = infoBoxY + 95;

// ==========================================
// 3. TASK 1: LINKEDIN ANNOUNCEMENT
// ==========================================
doc.fillColor(PRIMARY).fontSize(12).font('Helvetica-Bold')
  .text('TASK 1: PROFESSIONAL LINKEDIN ANNOUNCEMENT');
doc.moveDown(0.2);
drawDivider();

const t1BoxY = doc.y;
doc.rect(45, t1BoxY, 505, 55).fill(LIGHT_BG).stroke(BORDER);

doc.fillColor(DARK).fontSize(9.5).font('Helvetica-Bold')
  .text('LinkedIn Profile / Post URL:', 60, t1BoxY + 12);

doc.fillColor(ACCENT).fontSize(9.5).font('Helvetica')
  .text('https://www.linkedin.com/in/ehtesham-rashid-0a4bab378/', 60, t1BoxY + 28, {
    link: 'https://www.linkedin.com/in/ehtesham-rashid-0a4bab378/',
    underline: true,
  });

doc.y = t1BoxY + 70;

// ==========================================
// 4. TASK 2: PORTFOLIO WEB APPLICATION
// ==========================================
doc.fillColor(PRIMARY).fontSize(12).font('Helvetica-Bold')
  .text('TASK 2: FULLY RESPONSIVE PORTFOLIO WEB APPLICATION');
doc.moveDown(0.2);
drawDivider();

const t2BoxY = doc.y;
doc.rect(45, t2BoxY, 505, 75).fill(LIGHT_BG).stroke(BORDER);

doc.fillColor(DARK).fontSize(9.5).font('Helvetica-Bold')
  .text('Live Demo Website:', 60, t2BoxY + 12);
doc.fillColor(ACCENT).fontSize(9.5).font('Helvetica')
  .text('https://shamdev417.github.io/portfolio-web-application/', 200, t2BoxY + 12, {
    link: 'https://shamdev417.github.io/portfolio-web-application/',
    underline: true,
  });

doc.fillColor(DARK).font('Helvetica-Bold')
  .text('GitHub Repository:', 60, t2BoxY + 34);
doc.fillColor(ACCENT).font('Helvetica')
  .text('https://github.com/Shamdev417/portfolio-web-application', 200, t2BoxY + 34, {
    link: 'https://github.com/Shamdev417/portfolio-web-application',
    underline: true,
  });

doc.fillColor(MUTED).fontSize(8.5).font('Helvetica')
  .text('Tech Stack: Semantic HTML5, CSS Grid & Flexbox, Vanilla JavaScript', 60, t2BoxY + 54);

doc.y = t2BoxY + 90;

// ==========================================
// 5. TASK 3: DYNAMIC TASK DASHBOARD
// ==========================================
doc.fillColor(PRIMARY).fontSize(12).font('Helvetica-Bold')
  .text('TASK 3: INTERACTIVE DYNAMIC TASK DASHBOARD PLATFORM');
doc.moveDown(0.2);
drawDivider();

const t3BoxY = doc.y;
doc.rect(45, t3BoxY, 505, 75).fill(LIGHT_BG).stroke(BORDER);

doc.fillColor(DARK).fontSize(9.5).font('Helvetica-Bold')
  .text('Live Demo (Vercel):', 60, t3BoxY + 12);
doc.fillColor(ACCENT).fontSize(9.5).font('Helvetica')
  .text('https://task-dashboard-red.vercel.app', 200, t3BoxY + 12, {
    link: 'https://task-dashboard-red.vercel.app',
    underline: true,
  });

doc.fillColor(DARK).font('Helvetica-Bold')
  .text('GitHub Repository:', 60, t3BoxY + 34);
doc.fillColor(ACCENT).font('Helvetica')
  .text('https://github.com/Shamdev417/task-dashboard', 200, t3BoxY + 34, {
    link: 'https://github.com/Shamdev417/task-dashboard',
    underline: true,
  });

doc.fillColor(MUTED).fontSize(8.5).font('Helvetica')
  .text('Tech Stack: React 18 + Vite, Node.js + Express, REST API, Full CRUD', 60, t3BoxY + 54);

doc.y = t3BoxY + 90;

// ==========================================
// 6. FOOTER DECLARATION
// ==========================================
const footerY = 745;
doc.rect(45, footerY, 505, 45).fill('#ecfdf5').stroke('#10b981');

doc.fillColor('#065f46').fontSize(9.5).font('Helvetica-Bold')
  .text('SUBMISSION STATUS: COMPLETED (3 OUT OF 4 TASKS)', 60, footerY + 11);

doc.fillColor('#047857').fontSize(8.5).font('Helvetica')
  .text('Submitted by: Ehtesham Rashid (ID: B10/1711) | Progree Internship Team', 60, footerY + 26);

doc.end();

writeStream.on('finish', () => {
  console.log('Simple 1-Page PDF generated successfully at:', outputPath);
});
