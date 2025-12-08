export interface Technology {
  id: string;
  category: string;
  maturity: "Adopt Now" | "Trial & Evaluate" | "Assess & Monitor" | "Hold";
  maturityColor: "green" | "yellow" | "blue" | "red";
  title: string;
  description: string;
  roi: string;
  timeToRoi: string;
  cost: string;
  costLevel: "low" | "medium" | "high";
  difficulty: string;
  implementationTime: string;
  radarPosition: { x: number; y: number };
}

export const technologies: Technology[] = [
  {
    id: "chatbots",
    category: "Customer Service",
    maturity: "Adopt Now",
    maturityColor: "green",
    title: "AI Chatbots & Virtual Assistants",
    description: "Automated customer support that handles common inquiries 24/7, reducing response time and support costs.",
    roi: "150-300%",
    timeToRoi: "3-6 months",
    cost: "$200-2000/month",
    costLevel: "low",
    difficulty: "Low Difficulty",
    implementationTime: "2-4 weeks",
    radarPosition: { x: 12, y: 15 }
  },
  {
    id: "predictive-analytics",
    category: "Business Intelligence",
    maturity: "Trial & Evaluate",
    maturityColor: "yellow",
    title: "Predictive Analytics & Forecasting",
    description: "AI-powered forecasting for sales, inventory, and cash flow to make data-driven decisions.",
    roi: "200-400%",
    timeToRoi: "6-12 months",
    cost: "$500-5000/month",
    costLevel: "medium",
    difficulty: "Medium Difficulty",
    implementationTime: "4-8 weeks",
    radarPosition: { x: 25, y: 35 }
  },
  {
    id: "document-processing",
    category: "Operations",
    maturity: "Adopt Now",
    maturityColor: "green",
    title: "Document Processing & Automation",
    description: "Extract data from invoices, receipts, contracts automatically using OCR and NLP.",
    roi: "300-500%",
    timeToRoi: "2-4 months",
    cost: "$100-1500/month",
    costLevel: "low",
    difficulty: "Low Difficulty",
    implementationTime: "2-6 weeks",
    radarPosition: { x: 38, y: 12 }
  },
  {
    id: "personalization",
    category: "Marketing",
    maturity: "Trial & Evaluate",
    maturityColor: "yellow",
    title: "AI-Powered Personalization",
    description: "Deliver personalized content, product recommendations, and email campaigns based on behavior.",
    roi: "250-450%",
    timeToRoi: "4-8 months",
    cost: "$300-3000/month",
    costLevel: "medium",
    difficulty: "Medium Difficulty",
    implementationTime: "4-8 weeks",
    radarPosition: { x: 50, y: 38 }
  },
  {
    id: "voice-ai",
    category: "Sales & Support",
    maturity: "Trial & Evaluate",
    maturityColor: "yellow",
    title: "Voice AI & Call Analytics",
    description: "Transcribe, analyze, and extract insights from sales calls and customer conversations.",
    roi: "150-250%",
    timeToRoi: "6-9 months",
    cost: "$50-500/user/month",
    costLevel: "medium",
    difficulty: "Medium Difficulty",
    implementationTime: "3-6 weeks",
    radarPosition: { x: 62, y: 42 }
  },
  {
    id: "workflow-automation",
    category: "Operations",
    maturity: "Adopt Now",
    maturityColor: "green",
    title: "Intelligent Workflow Automation",
    description: "Automate repetitive tasks across apps using AI-powered no-code tools.",
    roi: "400-600%",
    timeToRoi: "1-3 months",
    cost: "$20-300/month",
    costLevel: "low",
    difficulty: "Low Difficulty",
    implementationTime: "1-4 weeks",
    radarPosition: { x: 38, y: 8 }
  },
  {
    id: "sentiment-analysis",
    category: "Customer Experience",
    maturity: "Assess & Monitor",
    maturityColor: "blue",
    title: "Customer Sentiment Analysis",
    description: "Analyze customer feedback, reviews, and social mentions to understand sentiment and trends.",
    roi: "100-200%",
    timeToRoi: "6-12 months",
    cost: "$100-1000/month",
    costLevel: "low",
    difficulty: "Low Difficulty",
    implementationTime: "3-6 weeks",
    radarPosition: { x: 75, y: 65 }
  },
  {
    id: "content-generation",
    category: "Marketing",
    maturity: "Adopt Now",
    maturityColor: "green",
    title: "AI Content Generation",
    description: "Generate blog posts, social media content, and marketing copy at scale with AI assistance.",
    roi: "200-350%",
    timeToRoi: "2-4 months",
    cost: "$20-200/month",
    costLevel: "low",
    difficulty: "Low Difficulty",
    implementationTime: "1-2 weeks",
    radarPosition: { x: 50, y: 18 }
  },
  {
    id: "fraud-detection",
    category: "Risk Management",
    maturity: "Trial & Evaluate",
    maturityColor: "yellow",
    title: "AI Fraud Detection",
    description: "Detect fraudulent transactions, fake accounts, and suspicious behavior in real-time.",
    roi: "500-1000%",
    timeToRoi: "3-6 months",
    cost: "$500-5000/month",
    costLevel: "medium",
    difficulty: "Medium Difficulty",
    implementationTime: "6-12 weeks",
    radarPosition: { x: 87, y: 40 }
  },
  {
    id: "recruitment",
    category: "HR & Talent",
    maturity: "Assess & Monitor",
    maturityColor: "blue",
    title: "AI-Powered Recruitment",
    description: "Screen resumes, match candidates, and automate interview scheduling with AI.",
    roi: "150-300%",
    timeToRoi: "6-12 months",
    cost: "$200-2000/month",
    costLevel: "low",
    difficulty: "Low Difficulty",
    implementationTime: "3-6 weeks",
    radarPosition: { x: 95, y: 68 }
  }
];

export const categories = [
  "All",
  "Customer Service",
  "Business Intelligence",
  "Operations",
  "Marketing",
  "Sales & Support",
  "Customer Experience",
  "Risk Management",
  "HR & Talent"
];

export const maturityLevels = [
  { id: "all", label: "All", color: "white" },
  { id: "adopt", label: "Adopt Now", color: "green" },
  { id: "trial", label: "Trial & Evaluate", color: "yellow" },
  { id: "assess", label: "Assess & Monitor", color: "blue" },
  { id: "hold", label: "Hold", color: "red" }
];
