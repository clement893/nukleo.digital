export type ImportanceLevel = 'High' | 'Medium' | 'Low';

export interface AIGlossaryTerm {
  id: string;
  term: string;
  category: string;
  definition: string;
  importance: ImportanceLevel;
  shortDefinition?: string; // Optional shorter version for cards
}

// AI Glossary Terms
// Structure: Category | Term | Definition | Importance
export const aiGlossaryTerms: AIGlossaryTerm[] = [
  // Fundamentals
  {
    id: 'artificial-intelligence',
    term: 'Artificial Intelligence (AI)',
    category: 'Fundamentals',
    definition: 'The simulation of human intelligence in machines that are programmed to think and learn like humans. AI encompasses machine learning, natural language processing, computer vision, and robotics.',
    importance: 'High',
    shortDefinition: 'Machines that can think and learn like humans.'
  },
  {
    id: 'machine-learning',
    term: 'Machine Learning (ML)',
    category: 'Fundamentals',
    definition: 'A subset of AI that enables systems to learn and improve from experience without being explicitly programmed. ML algorithms build mathematical models based on training data to make predictions or decisions.',
    importance: 'High',
    shortDefinition: 'AI systems that learn from data without explicit programming.'
  },
  {
    id: 'deep-learning',
    term: 'Deep Learning',
    category: 'Fundamentals',
    definition: 'A subset of machine learning that uses neural networks with multiple layers (hence "deep") to learn representations of data. Deep learning excels at recognizing patterns in images, speech, and text.',
    importance: 'High',
    shortDefinition: 'Machine learning using multi-layered neural networks.'
  },
  {
    id: 'neural-network',
    term: 'Neural Network',
    category: 'Fundamentals',
    definition: 'A computing system inspired by biological neural networks. It consists of interconnected nodes (neurons) organized in layers that process information and learn patterns from data.',
    importance: 'High',
    shortDefinition: 'Computing systems modeled after the human brain.'
  },
  
  // Generative AI
  {
    id: 'generative-ai',
    term: 'Generative AI',
    category: 'Generative AI',
    definition: 'AI systems that can generate new content, including text, images, audio, and video. Examples include GPT models for text generation and DALL-E for image creation.',
    importance: 'High',
    shortDefinition: 'AI that creates new content like text, images, and videos.'
  },
  {
    id: 'gpt',
    term: 'GPT (Generative Pre-trained Transformer)',
    category: 'Generative AI',
    definition: 'A family of large language models developed by OpenAI. GPT models are pre-trained on vast amounts of text data and can generate human-like text, answer questions, and perform various language tasks.',
    importance: 'High',
    shortDefinition: 'Advanced AI models that generate human-like text.'
  },
  {
    id: 'llm',
    term: 'Large Language Model (LLM)',
    category: 'Generative AI',
    definition: 'AI models trained on massive amounts of text data to understand and generate human language. LLMs can perform tasks like translation, summarization, and conversation.',
    importance: 'High',
    shortDefinition: 'AI models trained on vast text data to understand language.'
  },
  {
    id: 'prompt-engineering',
    term: 'Prompt Engineering',
    category: 'Generative AI',
    definition: 'The practice of designing effective prompts (inputs) to get desired outputs from AI models. Good prompt engineering can significantly improve the quality and relevance of AI-generated content.',
    importance: 'Medium',
    shortDefinition: 'Crafting effective inputs to get better AI outputs.'
  },
  
  // Natural Language Processing
  {
    id: 'nlp',
    term: 'Natural Language Processing (NLP)',
    category: 'NLP',
    definition: 'A branch of AI that helps computers understand, interpret, and generate human language. NLP enables applications like chatbots, translation services, and sentiment analysis.',
    importance: 'High',
    shortDefinition: 'AI that understands and processes human language.'
  },
  {
    id: 'tokenization',
    term: 'Tokenization',
    category: 'NLP',
    definition: 'The process of breaking down text into smaller units called tokens (words, subwords, or characters). Tokenization is a fundamental step in NLP preprocessing.',
    importance: 'Medium',
    shortDefinition: 'Breaking text into smaller units for processing.'
  },
  {
    id: 'sentiment-analysis',
    term: 'Sentiment Analysis',
    category: 'NLP',
    definition: 'The use of NLP to identify and extract emotional tone and opinions from text. Commonly used to analyze customer feedback, social media posts, and reviews.',
    importance: 'Medium',
    shortDefinition: 'AI that detects emotions and opinions in text.'
  },
  
  // Computer Vision
  {
    id: 'computer-vision',
    term: 'Computer Vision',
    category: 'Computer Vision',
    definition: 'A field of AI that enables machines to interpret and understand visual information from the world. Applications include image recognition, object detection, and facial recognition.',
    importance: 'High',
    shortDefinition: 'AI that can see and understand images and videos.'
  },
  {
    id: 'image-recognition',
    term: 'Image Recognition',
    category: 'Computer Vision',
    definition: 'The ability of AI systems to identify and classify objects, people, scenes, and activities in images. Used in applications like medical imaging, autonomous vehicles, and security systems.',
    importance: 'High',
    shortDefinition: 'AI that identifies objects and scenes in images.'
  },
  
  // AI Strategy & Business
  {
    id: 'ai-strategy',
    term: 'AI Strategy',
    category: 'Strategy',
    definition: 'A comprehensive plan for integrating AI into business operations to achieve specific goals. Includes identifying use cases, selecting technologies, and planning implementation.',
    importance: 'High',
    shortDefinition: 'A plan for integrating AI into business operations.'
  },
  {
    id: 'ai-transformation',
    term: 'AI Transformation',
    category: 'Strategy',
    definition: 'The process of fundamentally changing how an organization operates by integrating AI technologies across processes, products, and services. Goes beyond pilot projects to enterprise-wide adoption.',
    importance: 'High',
    shortDefinition: 'Fundamentally changing operations through AI integration.'
  },
  {
    id: 'ai-readiness',
    term: 'AI Readiness',
    category: 'Strategy',
    definition: 'An organization\'s preparedness to adopt and implement AI solutions. Assessed across dimensions like data quality, technical infrastructure, talent, and organizational culture.',
    importance: 'High',
    shortDefinition: 'How prepared an organization is to adopt AI.'
  },
  {
    id: 'use-case',
    term: 'Use Case',
    category: 'Strategy',
    definition: 'A specific business scenario or problem that AI can solve. Identifying the right use cases is crucial for successful AI implementation and ROI.',
    importance: 'High',
    shortDefinition: 'A specific business problem AI can solve.'
  },
  
  // Agentic AI
  {
    id: 'agentic-ai',
    term: 'Agentic AI',
    category: 'Agentic AI',
    definition: 'AI systems that can autonomously plan, make decisions, and take actions to achieve goals. Unlike traditional AI, agentic systems can operate independently and adapt to new situations.',
    importance: 'High',
    shortDefinition: 'AI systems that act autonomously to achieve goals.'
  },
  {
    id: 'ai-agent',
    term: 'AI Agent',
    category: 'Agentic AI',
    definition: 'An autonomous AI system that can perceive its environment, make decisions, and take actions. Agents can work independently or collaborate with humans and other agents.',
    importance: 'High',
    shortDefinition: 'Autonomous AI systems that make decisions and act.'
  },
  {
    id: 'autonomous-systems',
    term: 'Autonomous Systems',
    category: 'Agentic AI',
    definition: 'AI systems capable of operating independently without constant human intervention. They can make decisions, learn from experience, and adapt to changing conditions.',
    importance: 'High',
    shortDefinition: 'AI systems that operate independently.'
  },
  
  // Data & Infrastructure
  {
    id: 'training-data',
    term: 'Training Data',
    category: 'Data',
    definition: 'The dataset used to teach an AI model. Quality and quantity of training data directly impact model performance. Good training data should be representative, accurate, and diverse.',
    importance: 'High',
    shortDefinition: 'Data used to teach AI models.'
  },
  {
    id: 'data-quality',
    term: 'Data Quality',
    category: 'Data',
    definition: 'The accuracy, completeness, consistency, and relevance of data. High data quality is essential for successful AI implementations, as models learn from the data they\'re trained on.',
    importance: 'High',
    shortDefinition: 'How accurate, complete, and useful data is.'
  },
  {
    id: 'feature-engineering',
    term: 'Feature Engineering',
    category: 'Data',
    definition: 'The process of selecting, modifying, or creating input variables (features) for machine learning models. Good feature engineering can significantly improve model performance.',
    importance: 'Medium',
    shortDefinition: 'Preparing and selecting data inputs for AI models.'
  },
  
  // Ethics & Governance
  {
    id: 'ai-ethics',
    term: 'AI Ethics',
    category: 'Ethics',
    definition: 'The study of moral issues and values related to AI development and deployment. Includes concerns about bias, fairness, transparency, privacy, and the impact of AI on society.',
    importance: 'High',
    shortDefinition: 'Moral principles guiding AI development and use.'
  },
  {
    id: 'algorithmic-bias',
    term: 'Algorithmic Bias',
    category: 'Ethics',
    definition: 'Systematic errors in AI systems that create unfair outcomes, often reflecting biases in training data or design. Can lead to discrimination against certain groups.',
    importance: 'High',
    shortDefinition: 'Unfair AI outcomes due to biased data or design.'
  },
  {
    id: 'ai-governance',
    term: 'AI Governance',
    category: 'Ethics',
    definition: 'The framework of policies, processes, and controls for managing AI systems responsibly. Ensures AI is used ethically, safely, and in compliance with regulations.',
    importance: 'High',
    shortDefinition: 'Policies and controls for responsible AI use.'
  },
  {
    id: 'explainable-ai',
    term: 'Explainable AI (XAI)',
    category: 'Ethics',
    definition: 'AI systems designed to provide clear explanations of their decisions and reasoning. Important for building trust and ensuring transparency, especially in critical applications.',
    importance: 'Medium',
    shortDefinition: 'AI that can explain its decisions clearly.'
  },
  
  // Implementation
  {
    id: 'model-training',
    term: 'Model Training',
    category: 'Implementation',
    definition: 'The process of teaching an AI model by feeding it training data and adjusting its parameters. Training continues until the model achieves desired performance levels.',
    importance: 'High',
    shortDefinition: 'Teaching AI models using data.'
  },
  {
    id: 'fine-tuning',
    term: 'Fine-tuning',
    category: 'Implementation',
    definition: 'The process of adapting a pre-trained AI model to a specific task or domain by training it further on specialized data. More efficient than training from scratch.',
    importance: 'Medium',
    shortDefinition: 'Adapting pre-trained models for specific tasks.'
  },
  {
    id: 'inference',
    term: 'Inference',
    category: 'Implementation',
    definition: 'The process of using a trained AI model to make predictions or generate outputs on new data. Inference happens after training and is how models are used in production.',
    importance: 'High',
    shortDefinition: 'Using trained AI models to make predictions.'
  },
  {
    id: 'mvp',
    term: 'MVP (Minimum Viable Product)',
    category: 'Implementation',
    definition: 'A basic version of an AI solution with core features to test and validate the concept. MVPs help organizations learn quickly and iterate before full-scale deployment.',
    importance: 'Medium',
    shortDefinition: 'A basic AI solution to test and validate concepts.'
  },
  
  // Advanced Concepts
  {
    id: 'transfer-learning',
    term: 'Transfer Learning',
    category: 'Advanced',
    definition: 'A technique where knowledge gained from solving one problem is applied to a different but related problem. Allows models to learn faster with less data.',
    importance: 'Medium',
    shortDefinition: 'Applying knowledge from one task to another.'
  },
  {
    id: 'reinforcement-learning',
    term: 'Reinforcement Learning',
    category: 'Advanced',
    definition: 'A type of machine learning where agents learn by interacting with an environment and receiving rewards or penalties. Used in gaming, robotics, and autonomous systems.',
    importance: 'Medium',
    shortDefinition: 'AI that learns through trial and reward.'
  },
  {
    id: 'federated-learning',
    term: 'Federated Learning',
    category: 'Advanced',
    definition: 'A distributed machine learning approach where models are trained across multiple devices or servers without centralizing data. Improves privacy and reduces data transfer.',
    importance: 'Low',
    shortDefinition: 'Training AI across devices without centralizing data.'
  },
  
  // Business Terms
  {
    id: 'roi',
    term: 'ROI (Return on Investment)',
    category: 'Business',
    definition: 'A measure of the profitability of an AI investment. Calculated by comparing the benefits (cost savings, revenue increase) to the costs of implementation and operation.',
    importance: 'High',
    shortDefinition: 'The profitability of an AI investment.'
  },
  {
    id: 'pilot-project',
    term: 'Pilot Project',
    category: 'Business',
    definition: 'A small-scale test of an AI solution before full deployment. Pilots help validate feasibility, measure impact, and identify challenges before scaling.',
    importance: 'High',
    shortDefinition: 'Small-scale AI tests before full deployment.'
  },
  {
    id: 'proof-of-concept',
    term: 'Proof of Concept (PoC)',
    category: 'Business',
    definition: 'An early demonstration that an AI solution can work in principle. PoCs are used to validate technical feasibility before investing in full development.',
    importance: 'Medium',
    shortDefinition: 'Early demonstration that an AI solution works.'
  }
];

// Extract unique categories
export const aiGlossaryCategories = [
  'All',
  ...Array.from(new Set(aiGlossaryTerms.map(term => term.category)))
].filter(Boolean);

// Extract unique importance levels
export const importanceLevels: ImportanceLevel[] = ['High', 'Medium', 'Low'];

// Helper to get all terms
export const allAIGlossaryTerms = aiGlossaryTerms;
