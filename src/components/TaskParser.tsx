import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Brain, Calendar, Download, Trash2, Sparkles, Clock, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ParsedTask {
  id: string;
  task: string;
  time?: string;
  category: string;
  deadline?: string;
  priority?: 'low' | 'medium' | 'high';
  language: 'ro' | 'en' | 'mixed';
}

const TaskParser = () => {
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [tasks, setTasks] = useState<ParsedTask[]>([]);
  const { toast } = useToast();

  // Temporary mock parsing function - will be replaced with HuggingFace model
  const parseTasksFromText = async (text: string): Promise<ParsedTask[]> => {
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock parsing logic for demonstration
    const mockTasks: ParsedTask[] = [
      {
        id: '1',
        task: 'Meeting with Ana',
        time: 'Tomorrow 3 PM',
        category: 'Work',
        priority: 'high',
        language: 'en'
      },
      {
        id: '2', 
        task: 'Cumpăra uniformă pentru copii',
        deadline: '1 Septembrie',
        category: 'Shopping',
        priority: 'medium',
        language: 'ro'
      }
    ];
    
    return mockTasks;
  };

  const handleParse = async () => {
    if (!input.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter some text to parse tasks from.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      const parsedTasks = await parseTasksFromText(input);
      setTasks(prev => [...prev, ...parsedTasks]);
      setInput('');
      
      toast({
        title: "Tasks Parsed Successfully!",
        description: `Found ${parsedTasks.length} tasks in your input.`,
      });
    } catch (error) {
      toast({
        title: "Parsing Failed",
        description: "Could not parse tasks from the input text.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSyncToCalendar = (task: ParsedTask) => {
    // Mock calendar sync - will be implemented with Google Calendar API
    toast({
      title: "Calendar Sync",
      description: `Task "${task.task}" will be synced to calendar.`,
    });
  };

  const handleExportTasks = () => {
    // Mock CSV export
    const csvContent = tasks.map(task => 
      `"${task.task}","${task.category}","${task.time || ''}","${task.deadline || ''}","${task.priority || ''}"`
    ).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'parsed-tasks.csv';
    a.click();
    
    toast({
      title: "Tasks Exported",
      description: "Your tasks have been exported to CSV.",
    });
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
    toast({
      title: "Task Deleted",
      description: "Task removed from your list.",
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Work': 'bg-primary/10 text-primary border-primary/20',
      'Shopping': 'bg-pastel-mint/20 text-pastel-mint border-pastel-mint/30',
      'Family': 'bg-success/10 text-success border-success/20',
      'Personal': 'bg-pastel-purple/20 text-pastel-purple border-pastel-purple/30',
      'Utilities': 'bg-warning/10 text-warning border-warning/20',
    };
    return colors[category] || 'bg-muted/50 text-muted-foreground border-muted';
  };

  const getPriorityColor = (priority?: string) => {
    const colors: Record<string, string> = {
      'high': 'bg-destructive/10 text-destructive border-destructive/20',
      'medium': 'bg-warning/10 text-warning border-warning/20',
      'low': 'bg-pastel-gray/20 text-muted-foreground border-pastel-gray/30',
    };
    return colors[priority || 'medium'] || 'bg-muted/50 text-muted-foreground border-muted';
  };

  return (
    <div className="space-y-8">
      {/* Input Section */}
      <Card className="border-0 shadow-soft bg-gradient-to-br from-card via-card to-muted/10">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-pastel-mint flex items-center justify-center">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Task Parser</h3>
                <p className="text-xs text-muted-foreground font-normal">
                  Process natural language into structured tasks
                </p>
              </div>
            </div>
            <Badge variant="outline" className="text-xs border-primary/30 text-primary bg-primary/5">
              <Sparkles className="h-3 w-3 mr-1" />
              AI Powered
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe your tasks naturally in Romanian or English...

Examples:
• Trebuie să duc copiii la școală la 8 dimineața și să cumpăr fructe
• I have a meeting with Ana tomorrow at 3 PM  
• Plătește factura la lumină până pe 15 și rezervă masa"
              className="min-h-[140px] resize-none border-border/50 bg-muted/20 focus:bg-card transition-colors placeholder:text-muted-foreground/60"
              disabled={isProcessing}
            />
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <AlertCircle className="h-3 w-3" />
              <span>AI will automatically detect tasks, timing, categories, and priorities</span>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button 
              onClick={handleParse} 
              disabled={isProcessing || !input.trim()}
              className="flex-1 bg-gradient-to-r from-primary via-primary to-pastel-mint hover:shadow-medium transition-all duration-300 text-white"
            >
              {isProcessing ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Brain className="h-4 w-4 mr-2" />
              )}
              {isProcessing ? 'Processing...' : 'Parse Tasks'}
            </Button>
            
            {tasks.length > 0 && (
              <Button 
                onClick={handleExportTasks}
                variant="outline"
                className="border-border/50 hover:bg-muted/50 transition-colors"
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Tasks Display */}
      {tasks.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Extracted Tasks
              </h2>
              <p className="text-sm text-muted-foreground">
                {tasks.length} task{tasks.length !== 1 ? 's' : ''} found and processed
              </p>
            </div>
          </div>
          
          <div className="grid gap-4">
            {tasks.map((task) => (
              <Card key={task.id} className="border-0 shadow-soft hover:shadow-medium transition-all duration-300 bg-gradient-to-r from-card to-muted/10">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="space-y-2">
                        <h3 className="font-medium text-foreground leading-snug">{task.task}</h3>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant="outline" className={getCategoryColor(task.category)}>
                            {task.category}
                          </Badge>
                          {task.priority && (
                            <Badge variant="outline" className={getPriorityColor(task.priority)}>
                              {task.priority} priority
                            </Badge>
                          )}
                          {task.language && (
                            <Badge variant="outline" className="text-xs border-muted text-muted-foreground bg-muted/20">
                              {task.language.toUpperCase()}
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      {(task.time || task.deadline) && (
                        <div className="flex gap-4 text-sm">
                          {task.time && (
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              <span>{task.time}</span>
                            </div>
                          )}
                          {task.deadline && (
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              <span>Deadline: {task.deadline}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleSyncToCalendar(task)}
                        className="h-8 w-8 p-0 border-border/50 hover:bg-primary/5 hover:border-primary/30 transition-colors"
                      >
                        <Calendar className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteTask(task.id)}
                        className="h-8 w-8 p-0 border-border/50 hover:bg-destructive/5 hover:border-destructive/30 transition-colors"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskParser;