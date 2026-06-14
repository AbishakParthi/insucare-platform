import { company } from "./brand.js";

export type ServiceCategory =
  | "Corporate Insurance"
  | "Group Insurance"
  | "Retail Insurance"
  | "Specialized Insurance";

export type Service = {
  slug: string;
  title: string;
  category: ServiceCategory;
  summary: string;
  overview: string;
  benefits: string[];
  coverage: string[];
  claimProcess: string[];
  faqs: { question: string; answer: string }[];
};

const standardClaimProcess = [
  "Notify the InsuCARE claims desk immediately with policy and incident details.",
  "Collect claim forms, invoices, reports, photos and supporting documents.",
  "Coordinate with insurer, surveyor, hospital, garage or appointed assessor.",
  "Track clarifications, settlement approval and final closure."
];

const standardFaqs = (service: string) => [
  {
    question: `How does InsuCARE help with ${service}?`,
    answer:
      "Our advisors assess your risk, compare suitable insurer options, explain exclusions, support documentation and stay involved through claims."
  },
  {
    question: "Can I request multiple insurer quotations?",
    answer:
      "Yes. As an insurance broker, InsuCARE can help compare options from multiple insurers based on coverage, premium, claims service and suitability."
  },
  {
    question: "Is claims support included?",
    answer:
      "Yes. Claims assistance is a core service area, including notification guidance, documentation review, insurer coordination and settlement follow-up."
  }
];

const makeService = (
  title: string,
  category: ServiceCategory,
  summary: string,
  coverage: string[]
): Service => ({
  slug: title.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
  title,
  category,
  summary,
  overview: `${title} helps clients protect financial stability against defined risks through suitable policy structure, insurer comparison and professional advisory from ${company.displayName}.`,
  benefits: [
    "Needs-based advisory instead of one-size-fits-all recommendations",
    "Comparison across relevant insurers and plan structures",
    "Clear explanation of inclusions, exclusions, limits and deductibles",
    "Documentation and renewal support from a dedicated advisory team"
  ],
  coverage,
  claimProcess: standardClaimProcess,
  faqs: standardFaqs(title)
});

export const serviceCategories: ServiceCategory[] = [
  "Corporate Insurance",
  "Group Insurance",
  "Retail Insurance",
  "Specialized Insurance"
];

export const services: Service[] = [
  makeService("Property Insurance", "Corporate Insurance", "Protect factories, offices, warehouses and business assets from insured physical loss.", ["Buildings", "Plant and machinery", "Stock and contents", "Add-on covers"]),
  makeService("Fire Insurance", "Corporate Insurance", "Safeguard business property against fire and named perils with appropriate sum insured.", ["Standard fire perils", "Earthquake add-on", "Terrorism add-on", "Debris removal"]),
  makeService("Marine Insurance", "Corporate Insurance", "Cover goods in transit across road, rail, air and sea supply chains.", ["Marine cargo", "Inland transit", "Import and export cargo", "Sales return transit"]),
  makeService("Cyber Insurance", "Corporate Insurance", "Reduce financial impact from cyber incidents, privacy events and business interruption.", ["Incident response", "Data breach costs", "Cyber extortion", "Third-party liability"]),
  makeService("Liability Insurance", "Corporate Insurance", "Protect against third-party injury, property damage and legal liability exposures.", ["Public liability", "Product liability", "Commercial general liability", "Legal defence costs"]),
  makeService("Professional Indemnity", "Corporate Insurance", "Cover professionals and firms against negligence, error or omission claims.", ["Civil liability", "Defence costs", "Breach of duty", "Professional services exposure"]),
  makeService("Directors & Officers Insurance", "Corporate Insurance", "Protect directors, officers and leadership teams from management liability claims.", ["Side A/B/C covers", "Employment practices claims", "Investigation costs", "Securities claims where applicable"]),
  makeService("Trade Credit Insurance", "Corporate Insurance", "Protect receivables from customer default and payment delays.", ["Domestic receivables", "Export receivables", "Buyer insolvency", "Protracted default"]),
  makeService("Engineering Insurance", "Corporate Insurance", "Cover construction, machinery breakdown and project-related engineering risks.", ["Contractors all risk", "Erection all risk", "Machinery breakdown", "Boiler and pressure plant"]),
  makeService("Business Interruption Insurance", "Corporate Insurance", "Protect profits and fixed costs when insured property damage disrupts operations.", ["Gross profit", "Standing charges", "Increased cost of working", "Supplier/customer extensions"]),
  makeService("Group Health Insurance", "Group Insurance", "Design employee health benefits that balance coverage, utilization and cost.", ["Inpatient hospitalization", "Maternity benefits", "Pre-existing disease cover", "Corporate buffer"]),
  makeService("Group Mediclaim", "Group Insurance", "Structured group mediclaim programs for companies of different sizes.", ["Employee and dependents", "Room rent limits", "Network hospitals", "Wellness add-ons"]),
  makeService("Group Personal Accident", "Group Insurance", "Accident protection for employees, workers and members.", ["Accidental death", "Permanent disability", "Temporary disability", "Education benefit add-ons"]),
  makeService("Group Term Life", "Group Insurance", "Life cover programs that support employee families and employer benefit strategy.", ["Death benefit", "Flexible sum assured", "Employer-sponsored plans", "Optional riders"]),
  makeService("Group Travel Insurance", "Group Insurance", "Travel protection for corporate trips, employee mobility and projects.", ["Medical emergency", "Trip interruption", "Baggage delay", "Evacuation support"]),
  makeService("Employee Benefits", "Group Insurance", "Integrated employee benefits consulting across health, accident, life and wellness.", ["Program design", "Claims analytics", "Renewal negotiation", "Employee communication"]),
  makeService("Health Insurance", "Retail Insurance", "Family and individual health plans with transparent advisory.", ["Hospitalization", "Pre and post hospitalization", "Day-care procedures", "No-claim bonus"]),
  makeService("Life Insurance", "Retail Insurance", "Long-term protection and savings advisory suited to family goals.", ["Protection", "Savings plans", "Retirement options", "Rider evaluation"]),
  makeService("Term Insurance", "Retail Insurance", "High-value pure protection cover for income replacement and family security.", ["Life cover", "Critical illness rider", "Accidental death rider", "Flexible premium terms"]),
  makeService("Motor Insurance", "Retail Insurance", "Vehicle insurance advisory for private cars, two-wheelers and commercial vehicles.", ["Own damage", "Third-party liability", "Zero depreciation", "Roadside assistance"]),
  makeService("Travel Insurance", "Retail Insurance", "Domestic and international travel risk protection.", ["Medical emergency", "Trip delay", "Passport loss", "Baggage loss"]),
  makeService("Home Insurance", "Retail Insurance", "Protect home structure, contents and personal belongings.", ["Structure", "Contents", "Burglary", "Natural calamity covers"]),
  makeService("Personal Accident Insurance", "Retail Insurance", "Accidental death and disability protection for individuals and families.", ["Accidental death", "Permanent total disability", "Permanent partial disability", "Weekly benefit options"]),
  makeService("Senior Citizen Insurance", "Retail Insurance", "Health advisory for senior citizens with careful review of waiting periods and limits.", ["Hospitalization", "Pre-existing disease terms", "Co-pay review", "Network hospitals"]),
  makeService("Critical Illness Insurance", "Retail Insurance", "Lump-sum support when diagnosed with covered critical illnesses.", ["Cancer", "Heart attack", "Stroke", "Major organ transplant"]),
  makeService("Startup Insurance", "Specialized Insurance", "Risk packages for startups, founders, technology teams and growing ventures.", ["D&O", "Cyber", "Professional indemnity", "Office package"]),
  makeService("SME Insurance", "Specialized Insurance", "Practical insurance programs for small and medium enterprises.", ["Property", "Liability", "Employee benefits", "Marine transit"]),
  makeService("Technology Insurance", "Specialized Insurance", "Protection for software, IT services, SaaS and technology consulting companies.", ["Tech E&O", "Cyber", "Crime", "D&O"]),
  makeService("Manufacturing Insurance", "Specialized Insurance", "Industrial risk advisory across assets, people, liability and supply chains.", ["Fire and property", "Machinery breakdown", "Workmen compensation", "Marine cargo"]),
  makeService("Logistics Insurance", "Specialized Insurance", "Insurance for transporters, warehouses, freight forwarders and logistics operators.", ["Carrier liability", "Marine cargo", "Warehouse risk", "Fleet insurance"]),
  makeService("Hospital Insurance", "Specialized Insurance", "Risk solutions for hospitals, clinics and healthcare businesses.", ["Medical malpractice", "Property", "Cyber", "Employee benefits"]),
  makeService("Education Institution Insurance", "Specialized Insurance", "Cover schools, colleges and institutions across liability, property and student risks.", ["Public liability", "Property", "Student accident", "Cyber"]),
  makeService("Cyber Risk Insurance", "Specialized Insurance", "Advanced cyber-risk advisory for digital-first organizations.", ["Breach response", "Forensic costs", "Business interruption", "Privacy liability"])
];

export const stats = [
  { value: "50+", label: "Insurance Solutions" },
  { value: "20+", label: "Insurance Partners" },
  { value: "98%", label: "Client Satisfaction" }
];

export const whyChooseUs = [
  "Personalized Advisory",
  "Multi-Insurer Comparison",
  "Dedicated Claims Support",
  "Expert Risk Management",
  "Transparent Recommendations",
  "Fast Response Team"
];

export const claimSteps = [
  "Claim Notification",
  "Documentation",
  "Insurer Coordination",
  "Survey Assistance",
  "Settlement Follow-up",
  "Closure"
];

export const partners = [
  { name: "LIC", ext: "svg" },
  { name: "HDFC Life", ext: "svg" },
  { name: "ICICI Prudential", ext: "png" },
  { name: "SBI Life", ext: "svg" },
  { name: "Max Life", ext: "png" },
  { name: "Tata AIA", ext: "png" },
  { name: "Bajaj Allianz", ext: "jpg" },
  { name: "Aditya Birla Sun Life", ext: "png" },
  { name: "Kotak Life", ext: "png" },
  { name: "ICICI Lombard", ext: "svg" },
  { name: "Tata AIG", ext: "png" },
  { name: "HDFC ERGO", ext: "jpeg" },
  { name: "Reliance General", ext: "png" },
  { name: "New India Assurance", ext: "svg" },
  { name: "Star Health", ext: "svg" },
  { name: "Niva Bupa", ext: "svg" },
  { name: "Care Health", ext: "svg" },
  { name: "ManipalCigna", ext: "png" },
  { name: "SBI General", ext: "webp" },
  { name: "Future Generali", ext: "jpg" },
  { name: "Universal Sompo", ext: "svg" },
  { name: "Cholamandalam MS", ext: "jpg" }
].map(({ name, ext }) => ({
  name,
  logoExt: ext,
  slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
  category:
    name.includes("Life") || name === "LIC" || name === "Tata AIA" || name === "Kotak Life"
      ? "Life Insurance"
      : name.includes("Health") || name === "Niva Bupa" || name === "Care Health" || name === "ManipalCigna"
        ? "Health Insurance"
        : "General Insurance"
}));

export const testimonials = [
  {
    name: "Ramesh Kumar",
    role: "Business Owner",
    quote:
      "Insucare India Insurance Broking provided exceptional guidance in choosing the right insurance plan for our business. Their team explained every detail clearly and helped us secure comprehensive coverage at a competitive premium."
  },
  {
    name: "Priya Sharma",
    role: "IT Professional",
    quote:
      "I was looking for a reliable health insurance policy for my family, and Insucare India Insurance Broking made the entire process simple and stress-free."
  },
  {
    name: "Venkatesh Rao",
    role: "Entrepreneur",
    quote: "The claims assistance provided by Insucare India Insurance Broking was outstanding."
  },
  {
    name: "Anjali Mehta",
    role: "HR Manager",
    quote:
      "Their expertise in corporate insurance solutions and commitment to customer satisfaction have helped us manage risks effectively."
  },
  {
    name: "Suresh Reddy",
    role: "Manufacturing Business Owner",
    quote: "Their personalized approach and attention to detail provided exceptional value."
  }
];

export const blogCategories = [
  "Health Insurance",
  "Corporate Insurance",
  "Risk Management",
  "Employee Benefits",
  "Industry News"
];

export const blogs = [
  {
    slug: "how-to-choose-health-insurance-for-your-family",
    title: "How to Choose Health Insurance for Your Family",
    category: "Health Insurance",
    tags: ["health", "family", "claims"],
    excerpt:
      "A practical guide to comparing cover, room rent, waiting periods, network hospitals and claim service before choosing family health insurance.",
    readingTime: "6 min read",
    publishedAt: "2026-01-08"
  },
  {
    slug: "why-smes-need-a-structured-risk-review",
    title: "Why SMEs Need a Structured Risk Review",
    category: "Risk Management",
    tags: ["sme", "risk", "property"],
    excerpt:
      "SMEs often carry hidden gaps across assets, liability, people and supply chains. A structured review can prevent expensive surprises.",
    readingTime: "5 min read",
    publishedAt: "2026-01-18"
  },
  {
    slug: "employee-benefits-that-improve-retention",
    title: "Employee Benefits That Improve Retention",
    category: "Employee Benefits",
    tags: ["group health", "hr", "benefits"],
    excerpt:
      "Well-designed group insurance benefits help HR teams support employees while controlling renewal volatility.",
    readingTime: "4 min read",
    publishedAt: "2026-02-02"
  }
];

export const jobs = [
  {
    slug: "insurance-sales-consultant",
    title: "Insurance Sales Consultant",
    location: "Hyderabad",
    type: "Full-time",
    summary: "Drive consultative insurance conversations for retail and SME clients."
  },
  {
    slug: "claims-coordinator",
    title: "Claims Coordinator",
    location: "Hyderabad",
    type: "Full-time",
    summary: "Coordinate claim documents, insurer follow-ups and customer communication."
  },
  {
    slug: "corporate-risk-advisor",
    title: "Corporate Risk Advisor",
    location: "Hyderabad / Hybrid",
    type: "Full-time",
    summary: "Support enterprises with risk assessment, placement strategy and renewal reviews."
  }
];

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/claims-assistance", label: "Claims Assistance" },
  { href: "/insurance-partners", label: "Partners" },
  { href: "/blogs", label: "Blogs" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact Us" }
] as const;
