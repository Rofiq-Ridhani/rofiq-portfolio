export const SKILLS = [
  "Laravel 13", "PHP 8.3", "React", "JavaScript", 
  "MySQL", "Tailwind CSS 4", "Firebase", "Flutter", 
  "Dart", "Socket.io", "Reverb WebSocket", "Vite"
];

export interface ProjectData {
  id: string;
  name: string;
  category: string;
  description: string;
  objectives: string;
  features: string[];
  tech: string[];
  github: string | null;
  images: Record<string, string>;
}

export const PROJECTS: ProjectData[] = [
  {
    id: "01",
    name: "STARS",
    category: "Block Exam — Grade 11",
    description: "School Payment System with secure payment processing and student management.",
    objectives: "Streamline school fee transactions, provide accurate payment receipts, and manage student financial logs securely.",
    features: ["Student & Grade Management", "Secure Transaction Logging", "Automated Receipt Generation", "Administrative Dashboard"],
    tech: ["Laravel 12", "MySQL", "Vite", "Blade"],
    github: "https://github.com/Rofiq-Ridhani/STARS",
    images: {
      dashboard: "/images/projects/stars/dashboard.png",
      payment: "/images/projects/stars/payment.png"
    }
  },
  {
    id: "02",
    name: "Amigo",
    category: "Internship — Diskominfo",
    description: "Real-time messaging application with WebSocket support.",
    objectives: "Deliver an instant, low-latency messaging platform for collaborative communication using modern WebSockets.",
    features: ["Real-time Chat with Reverb/Socket.io", "User Presence & Status", "Responsive React UI", "Instant Message Delivery"],
    tech: ["Laravel 13", "React", "Reverb", "Socket.io", "Tailwind CSS"],
    github: "https://github.com/Rofiq-Ridhani/Amigo",
    images: {
      dashboard: "/images/projects/amigo/dashboard.jpg",
      chat: "/images/projects/amigo/chat.png"
    }
  },
  {
    id: "03",
    name: "WADAHKISAH",
    category: "Internship — Diskominfo",
    description: "Complaint Management System designed for public reporting.",
    objectives: "Provide a transparent public reporting channel for citizens to log civic issues and track resolution status.",
    features: ["Public Report Submission", "Status Tracking & Updates", "Admin Verification Portal", "Inertia.js Single Page Experience"],
    tech: ["Laravel", "MySQL", "React", "Inertia.js"],
    github: "https://github.com/Rofiq-Ridhani/wadahkisah.git",
    images: {
      dashboard: "/images/projects/wadahkisah/dashboard.png",
      reports: "/images/projects/wadahkisah/reports.png"
    }
  },
  {
    id: "04",
    name: "Codio",
    category: "Block Exam — Grade 11",
    description: "Mobile portfolio application with animations and Firebase integration.",
    objectives: "Build a native cross-platform mobile app showcasing interactive developer portfolios and real-time backend synchronization.",
    features: ["Fluid Flutter Material Animations", "Firebase Realtime Database", "Interactive Skill & Project Showcase", "Offline Data Caching"],
    tech: ["Flutter", "Dart", "Firebase", "Material Design"],
    github: "https://github.com/Rofiq-Ridhani/codio_app",
    images: {
      home: "/images/projects/codio/home.png",
      portfolio: "/images/projects/codio/portfolio.png"
    }
  },
  {
    id: "05",
    name: "Vieron",
    category: "Block Exam — Grade 10",
    description: "E-commerce platform with product management and checkout functionality.",
    objectives: "Develop an end-to-end e-commerce store with catalog navigation, cart management, and seamless order checkout.",
    features: ["Dynamic Product Catalog", "Shopping Cart & Checkout Flow", "Inventory Management", "Tailwind Responsive Design"],
    tech: ["Laravel", "React", "MySQL", "Tailwind CSS"],
    github: null,
    images: {
      homepage: "/images/projects/vieron/homepage.png",
      products: "/images/projects/vieron/products.png"
    }
  }
];
