/* Your content: projects, skills, services, experience and more.
   Testimonials, company names and project details are placeholders. Replace them with your own. */
window.PORTFOLIO = {
  stats: [
    { value: 3, label: "Years of experience" },
    { value: 25, label: "Projects delivered" },
    { value: 15, label: "Clients" },
  ],

  about: {
    intro: "Front-end developer with three years of product and client work.",
    paragraphs: [
      "I build websites and interface components with HTML, CSS and JavaScript. Most of my work is for small teams and businesses that need a site that loads quickly and is easy to update.",
      "I pay attention to keyboard use, screen readers and speed. These are easy to skip and expensive to fix later, so I handle them from the first day.",
      "Outside work I write short notes on front-end topics, rebuild interfaces I like to see how they are made, and read a lot about type.",
    ],
    facts: [
      ["Based in", "Remote, worldwide"],
      ["Works on", "Websites, UI components, accessibility"],
      ["Languages", "English, Hindi"],
      ["Open to", "Freelance and full-time roles"],
    ],
  },

  education: [
    { period: "2017 — 2021", title: "B.Tech, Computer Science", place: "University Name" },
  ],

  certifications: [
    { name: "Responsive Web Design", issuer: "freeCodeCamp", year: "2021" },
    { name: "Web Accessibility Fundamentals", issuer: "Online course", year: "2022" },
  ],

  now: [
    "Learning WebGL for interactive backgrounds",
    "Turning my component styles into a small open-source package",
    "Writing about keyboard navigation patterns",
  ],

  services: [
    { title: "Landing pages", text: "Fast, clear pages for launches, events and new products. Easy to edit without a developer." },
    { title: "Business websites", text: "Multi-page sites with a contact form, a clear structure and basic SEO set up correctly." },
    { title: "Interactive components", text: "Filters, tabs, accordions and forms that work with a mouse, a keyboard and a screen reader." },
    { title: "Speed and fixes", text: "I find what slows a site down, fix layout bugs, and make older code easier to change." },
  ],

  testimonials: [
    { quote: "The site was ready two days early, and the changes we asked for were done the same week.", name: "Client Name", role: "Founder, Company" },
    { quote: "Clean code and clear updates. Our page speed score went up and people stayed longer.", name: "Client Name", role: "Marketing lead, Company" },
    { quote: "Explained the options in plain language, so our team could decide quickly.", name: "Client Name", role: "Product manager, Company" },
  ],

  categories: [
    { id: "web", label: "Websites" },
    { id: "app", label: "Web apps" },
    { id: "anim", label: "Animation" },
  ],

  skillGroups: [
    {
      title: "Frontend",
      items: [
        { name: "HTML and semantic markup", level: 95 },
        { name: "CSS, Flexbox and Grid", level: 92 },
        { name: "JavaScript (ES6+)", level: 88 },
        { name: "Responsive layouts", level: 80 },
      ],
    },
    {
      title: "Quality",
      items: [
        { name: "Accessibility (WCAG)", level: 82 },
        { name: "Animation and scroll effects", level: 80 },
        { name: "Performance tuning", level: 78 },
      ],
    },
    {
      title: "Tools and delivery",
      items: [
        { name: "Git and GitHub", level: 85 },
        { name: "Docker and static hosting", level: 72 },
        { name: "GitHub Pages, Netlify, Vercel", level: 80 },
      ],
    },
  ],

  projects: [
    {
      id: "studio-landing",
      number: "01",
      title: "Studio Landing Page",
      cat: "web",
      year: "2025",
      role: "Design and development",
      image: "assets/img/project-01.svg",
      gradient: "linear-gradient(135deg, #e4572e, #f2a65a)",
      summary: "A landing page for a design studio, with large type and a short story section that scrolls in steps.",
      description: [
        "A marketing page for a small design studio. The goal was a clear first screen, a short story and one clear next step.",
        "Type sizes scale smoothly with the screen width, and sections reveal as you scroll. No animation library is used.",
      ],
      highlights: ["Type scales from phone to large screens", "Lighthouse performance score above 95", "No JavaScript framework"],
      tags: ["HTML", "CSS", "Responsive"],
      featured: true,
      live: "",
      code: "",
    },
    {
      id: "task-flow-board",
      number: "02",
      title: "Task Flow Board",
      cat: "app",
      year: "2025",
      role: "Front-end developer",
      image: "assets/img/project-02.svg",
      gradient: "linear-gradient(135deg, #0f5257, #3aa6a0)",
      summary: "A kanban board with drag and drop, keyboard controls and saved state in the browser.",
      description: [
        "A small task board. Cards move between columns with a mouse, touch or the keyboard.",
        "The board is saved in the browser, so tasks stay after a refresh. No server is needed.",
      ],
      highlights: ["Drag and drop with a keyboard alternative", "Saved in localStorage", "Labels that screen readers announce"],
      tags: ["JavaScript", "LocalStorage", "Accessibility"],
      featured: true,
      live: "",
      code: "",
    },
    {
      id: "particle-hero",
      number: "03",
      title: "Particle Hero",
      cat: "anim",
      year: "2024",
      role: "Creative coding",
      image: "assets/img/project-03.svg",
      gradient: "radial-gradient(circle at 30% 30%, #7b5ea7, #1f1b3a)",
      summary: "A canvas background where dots drift and move away from the pointer.",
      description: [
        "A set of dots drawn on one canvas. They drift on their own and move away when the pointer comes close.",
        "The animation stops when the tab is hidden and turns off when the visitor asks for reduced motion.",
      ],
      highlights: ["Single canvas, redrawn each frame", "Pauses when the tab is hidden", "Reduced-motion fallback"],
      tags: ["Canvas", "Math", "Performance"],
      featured: true,
      live: "",
      code: "",
    },
    {
      id: "cafe-menu",
      number: "04",
      title: "Cafe Menu Site",
      cat: "web",
      year: "2024",
      role: "Front-end developer",
      image: "assets/img/project-04.svg",
      gradient: "linear-gradient(160deg, #c9a66b, #7a4f2b)",
      summary: "A phone-first menu with category tabs and a print layout for a paper copy.",
      description: [
        "A digital menu for a neighbourhood cafe. It is built to be read one-handed on a phone.",
        "Categories switch without a page reload, and a print stylesheet makes a clean paper version.",
      ],
      highlights: ["Category tabs without a page reload", "Print stylesheet included", "Works offline after the first visit"],
      tags: ["CSS Grid", "Responsive"],
      featured: false,
      live: "",
      code: "",
    },
    {
      id: "expense-tracker",
      number: "05",
      title: "Expense Tracker",
      cat: "app",
      year: "2024",
      role: "Front-end developer",
      image: "assets/img/project-05.svg",
      gradient: "linear-gradient(135deg, #2e4057, #5d7b9d)",
      summary: "Log spending, filter by month or category, and see totals and a simple chart.",
      description: [
        "Add expenses, filter by category or month, and watch the totals update.",
        "The chart is drawn in plain SVG, so no charting library is loaded.",
      ],
      highlights: ["Totals and category breakdown update live", "Month filter", "Export the data as JSON"],
      tags: ["JavaScript", "SVG", "Charts"],
      featured: false,
      live: "",
      code: "",
    },
    {
      id: "micro-interactions",
      number: "06",
      title: "Micro-interactions Kit",
      cat: "anim",
      year: "2023",
      role: "UI engineer",
      image: "assets/img/project-06.svg",
      gradient: "linear-gradient(135deg, #ff8fa3, #e4572e)",
      summary: "A set of hover, tilt and reveal effects written in CSS only, with settings you can change.",
      description: [
        "A small CSS-only kit with hover, tilt and reveal effects that you can copy into any page.",
        "Each effect reads CSS custom properties, so timing and distance can be changed in one place.",
      ],
      highlights: ["Pure CSS, no dependencies", "Settings through custom properties", "Respects reduced motion"],
      tags: ["CSS", "Motion"],
      featured: false,
      live: "",
      code: "",
    },
  ],

  experience: [
    {
      period: "2024 — Now",
      role: "Senior front-end developer",
      company: "Company Name",
      summary: "Leading a team of three. Rebuilt the design system and raised the main site's Lighthouse scores above 95.",
    },
    {
      period: "2022 — 2024",
      role: "Front-end developer",
      company: "Agency Name",
      summary: "Delivered more than 15 client websites with responsive layouts and scroll-based animation.",
    },
    {
      period: "2021 — 2022",
      role: "Junior web developer",
      company: "Startup Name",
      summary: "Built landing pages and internal tools, and learned a lot from code reviews.",
    },
  ],
};
