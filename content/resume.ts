export type Project = {
  title: string;
  eyebrow: string;
  description: string;
  tags: string[];
  href?: string;
};

export type ExpertiseGroup = {
  title: string;
  index: string;
  description: string;
  skills: string[];
};

export const resume = {
  identity: {
    name: "Chino Concepcion",
    shortName: "CC",
    role: "Full Stack Developer · AI Engineer",
    location: "Philippines",
    email: "hello@example.com",
    github: "https://github.com/your-username",
    linkedin: "https://www.linkedin.com/in/your-username",
    profileImage: "/chino-profile.jpeg",
    pdf: "/chino-concepcion-resume.pdf",
  },
  navigation: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Expertise", href: "#expertise" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ],
  summary:
    "Software developer with 5+ years of experience building business applications across frontend, backend, databases, and cloud infrastructure. I turn complex requirements into dependable, scalable software.",
  status:
    "Currently exploring AI engineering, Kubernetes, cloud-native development, API gateways, local LLM deployment, and enterprise software architecture.",
  expertise: [
    {
      index: "01",
      title: "Backend Systems",
      description:
        "Production-minded APIs and services designed around clear contracts, security, and maintainability.",
      skills: [
        "Python",
        "FastAPI",
        "Flask",
        "Java",
        "Spring Boot",
        "PHP",
        "REST APIs",
        "JWT",
      ],
    },
    {
      index: "02",
      title: "Frontend Craft",
      description:
        "Responsive interfaces that make complex workflows feel direct, fast, and understandable.",
      skills: [
        "Angular",
        "Angular Material",
        "TypeScript",
        "JavaScript",
        "HTML5",
        "CSS3",
        "Responsive Design",
      ],
    },
    {
      index: "03",
      title: "Cloud & Data",
      description:
        "Containerized applications, practical CI/CD, and data layers built for real operational needs.",
      skills: [
        "Docker",
        "Kubernetes",
        "GitHub Actions",
        "Linux",
        "Azure VMs",
        "PostgreSQL",
        "MySQL",
        "MariaDB",
      ],
    },
    {
      index: "04",
      title: "Applied AI",
      description:
        "Local-first AI platforms, retrieval workflows, and tool-using agents connected to real products.",
      skills: [
        "Ollama",
        "vLLM",
        "OpenWebUI",
        "LM Studio",
        "MCP",
        "RAG",
        "AI Agents",
        "Tool Calling",
      ],
    },
  ] satisfies ExpertiseGroup[],
  projects: [
    {
      title: "AI Server Platform",
      eyebrow: "Local intelligence infrastructure",
      description:
        "A platform concept for local LLM hosting, authenticated AI APIs, tool calling, and multi-agent workflows.",
      tags: ["Local LLM", "AI APIs", "Agents"],
    },
    {
      title: "OrderHub",
      eyebrow: "Restaurant operations",
      description:
        "QR ordering with coordinated kitchen and cashier workflows, designed for a multi-restaurant architecture.",
      tags: ["QR Ordering", "Dashboards", "Multi-tenant"],
    },
    {
      title: "CourtFinder",
      eyebrow: "Location-aware booking",
      description:
        "A court reservation platform spanning booking, GPS discovery, owner management, and administration.",
      tags: ["Booking", "GPS", "Admin"],
    },
    {
      title: "ParkingFinder",
      eyebrow: "Cross-platform mobility",
      description:
        "A Flutter application concept that helps drivers discover and navigate to available parking spaces.",
      tags: ["Flutter", "Mobile", "Maps"],
    },
    {
      title: "HR Management System",
      eyebrow: "Enterprise people operations",
      description:
        "A modular HR platform covering employee records, attendance, leave, payroll, recruitment, and performance.",
      tags: ["Enterprise", "Workflows", "HR"],
    },
    {
      title: "Law Firm Management",
      eyebrow: "Legal operations platform",
      description:
        "A connected workspace for case management, scheduling, billing, and document organization.",
      tags: ["Casework", "Billing", "Documents"],
    },
  ] satisfies Project[],
};
