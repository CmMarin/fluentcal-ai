import { useState, useEffect } from 'react';

// This component will handle the HuggingFace transformers integration
// Currently using mock data, will be enhanced with actual AI processing

export interface ProcessedTask {
  task: string;
  time?: string;
  category: string;
  deadline?: string;
  priority?: 'low' | 'medium' | 'high';
  language: 'ro' | 'en' | 'mixed';
  confidence: number;
}

const parseNaturalLanguage = (input: string, suggestedCategory?: string): ProcessedTask[] => {
  const lowerInput = input.toLowerCase();

  // Enhanced category detection with bilingual support and context awareness
  const detectCategory = (text: string): string => {
    // If there's a suggested category, use it as preference but still validate
    if (suggestedCategory) {
      const categoryMap: Record<string, string> = {
        'schedule': 'Schedule',
        'finance': 'Finance', 
        'mail': 'Mail Report',
        'notes': 'Notes'
      };
      
      // Check if the text actually matches the suggested category
      const categoryKeywords: Record<string, RegExp> = {
        'finance': /\b(plătesc|plata|factură|bani|money|pay|bill|bank|budget|finance|financial|invest|expense|income|salary|cost|euro|dollar|ron|leu)\b/i,
        'schedule': /\b(întâlnire|meeting|appointment|call|conference|schedule|calendar|reminder|deadline|event|presentation|ora|timp|time|date|when|today|tomorrow|week|month)\b/i,
        'mail': /\b(mail|email|mesaj|message|send|reply|newsletter|report|communication|letter|contact|scriu|write|trimite|răspund)\b/i,
        'notes': /\b(notă|note|remember|remind|think|idea|plan|list|task|todo|să fac|trebuie|important)\b/i
      };
      
      if (categoryKeywords[suggestedCategory]?.test(text)) {
        return categoryMap[suggestedCategory] || 'Notes';
      }
    }
    
    // Financial keywords (Romanian + English)
    if (/\b(plătesc|plata|factură|bani|money|pay|bill|bank|budget|finance|financial|invest|expense|income|salary|cost|euro|dollar|ron|leu)\b/i.test(text)) {
      return "Finance";
    }
    
    // Meeting/Schedule keywords  
    if (/\b(întâlnire|meeting|appointment|call|conference|schedule|calendar|reminder|deadline|event|presentation|ora|timp|time|date|when|today|tomorrow|week|month)\b/i.test(text)) {
      return "Schedule";
    }
    
    // Email/Communication keywords
    if (/\b(mail|email|mesaj|message|send|reply|newsletter|report|communication|letter|contact|scriu|write|trimite|răspund)\b/i.test(text)) {
      return "Mail Report";
    }
    
    // Shopping/Tasks keywords
    if (/\b(cumpăr|shopping|buy|purchase|store|market|groceries|items|list|să fac|trebuie|task|todo)\b/i.test(text)) {
      return suggestedCategory ? (suggestedCategory.charAt(0).toUpperCase() + suggestedCategory.slice(1)) : "Notes";
    }
    
    // Default category
    return suggestedCategory ? (suggestedCategory.charAt(0).toUpperCase() + suggestedCategory.slice(1)) : "Notes";
  };

  // Extract tasks from input
  const sentences = input.split(/[.!?]+/).filter(s => s.trim().length > 5);
  const tasks: ProcessedTask[] = [];

  sentences.forEach((sentence, index) => {
    const trimmed = sentence.trim();
    if (trimmed) {
      const category = detectCategory(trimmed);
      const language = detectLanguage(trimmed);
      
      // Extract time info
      const timeMatch = trimmed.match(/\b(\d{1,2}:\d{2}|\d{1,2}\s*(AM|PM|dimineața|seara))\b/i);
      const time = timeMatch ? timeMatch[0] : undefined;
      
      // Determine priority
      let priority: 'low' | 'medium' | 'high' = 'medium';
      if (/urgent|important|asap|imediat/i.test(trimmed)) priority = 'high';
      if (/maybe|perhaps|poate/i.test(trimmed)) priority = 'low';
      
      tasks.push({
        task: trimmed,
        time,
        category,
        priority,
        language,
        confidence: 0.85
      });
    }
  });

  return tasks;
};