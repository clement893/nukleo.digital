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
  // Add terms here following the structure:
  // {
  //   id: 'term-id',
  //   term: 'Term Name',
  //   category: 'Category Name',
  //   definition: 'Full definition...',
  //   importance: 'High' | 'Medium' | 'Low',
  //   shortDefinition: 'Short version for cards' // Optional
  // }
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
