import { useState, useEffect } from 'react';

// This component will handle the HuggingFace transformers integration
// Currently using mock data, will be enhanced with actual AI processing

export interface TaskParsingResult {
  task: string;
  time?: string;
  category: string;
  deadline?: string;
  priority?: 'low' | 'medium' | 'high';
  language: 'ro' | 'en' | 'mixed';
  confidence: number;
}

export const useTaskParser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [model, setModel] = useState<any>(null);

  // Initialize the AI model (will be implemented with HuggingFace)
  useEffect(() => {
    const initializeModel = async () => {
      try {
        // TODO: Initialize HuggingFace transformers model
        // const { pipeline } = await import('@huggingface/transformers');
        // const classifier = await pipeline('text-classification', 'your-model-name');
        // setModel(classifier);
        
        // Mock initialization for now
        setModel({ initialized: true });
      } catch (error) {
        console.error('Failed to initialize AI model:', error);
      }
    };

    initializeModel();
  }, []);

  const parseText = async (text: string): Promise<TaskParsingResult[]> => {
    setIsLoading(true);
    
    try {
      // Mock AI processing - will be replaced with actual HuggingFace model
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Detect language and extract tasks
      const tasks = extractTasksFromText(text);
      return tasks;
    } catch (error) {
      console.error('Task parsing failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    parseText,
    isLoading,
    isModelReady: !!model,
  };
};

// Mock task extraction logic
const extractTasksFromText = (text: string): TaskParsingResult[] => {
  const tasks: TaskParsingResult[] = [];
  
  // Simple pattern matching for demonstration
  const taskPatterns = [
    // Romanian patterns
    /(?:trebuie să|să|vreau să)\s+([^.!?]+)/gi,
    // English patterns
    /(?:need to|have to|must|should)\s+([^.!?]+)/gi,
  ];

  // Time patterns
  const timePatterns = [
    /(?:la|at)\s+(\d{1,2}(?::\d{2})?\s*(?:AM|PM|dimineața|seara)?)/gi,
    /(?:mâine|tomorrow|azi|today)/gi,
  ];

  // Category detection based on keywords
  const categoryKeywords = {
    'Work': ['meeting', 'work', 'office', 'project', 'task', 'lucru', 'birou'],
    'Shopping': ['buy', 'purchase', 'shop', 'store', 'cumpăr', 'magazin', 'cumpără'],
    'Family': ['kids', 'children', 'school', 'copii', 'școală', 'familie'],
    'Personal': ['personal', 'myself', 'personal'],
    'Utilities': ['bill', 'pay', 'electricity', 'water', 'factură', 'plătesc'],
  };

  let taskId = 1;
  
  // Extract potential tasks
  for (const pattern of taskPatterns) {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      const taskText = match[1].trim();
      if (taskText.length < 5) continue; // Skip very short matches
      
      // Detect language
      const language = detectLanguage(taskText);
      
      // Determine category
      let category = 'Personal';
      for (const [cat, keywords] of Object.entries(categoryKeywords)) {
        if (keywords.some(keyword => taskText.toLowerCase().includes(keyword))) {
          category = cat;
          break;
        }
      }
      
      // Extract time information
      let timeInfo: string | undefined;
      for (const timePattern of timePatterns) {
        const timeMatch = timePattern.exec(taskText);
        if (timeMatch) {
          timeInfo = timeMatch[0];
          break;
        }
      }
      
      // Determine priority based on keywords
      let priority: 'low' | 'medium' | 'high' = 'medium';
      if (taskText.toLowerCase().includes('urgent') || taskText.toLowerCase().includes('important')) {
        priority = 'high';
      }
      
      tasks.push({
        task: taskText,
        time: timeInfo,
        category,
        priority,
        language,
        confidence: 0.85, // Mock confidence score
      });
      
      taskId++;
    }
  }

  return tasks;
};

const detectLanguage = (text: string): 'ro' | 'en' | 'mixed' => {
  const romanianWords = ['să', 'trebuie', 'copii', 'școală', 'cumpăr', 'plătesc', 'factură', 'mâine', 'azi', 'dimineața', 'seara'];
  const englishWords = ['need', 'have', 'must', 'should', 'meeting', 'tomorrow', 'today', 'children', 'school'];
  
  const hasRomanian = romanianWords.some(word => text.toLowerCase().includes(word));
  const hasEnglish = englishWords.some(word => text.toLowerCase().includes(word));
  
  if (hasRomanian && hasEnglish) return 'mixed';
  if (hasRomanian) return 'ro';
  return 'en';
};

export default { useTaskParser };