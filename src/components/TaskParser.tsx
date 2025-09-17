import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Brain, Calendar, Download, Trash2 } from 'lucide-react';
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
      'Work': 'bg-romanian-blue text-white',
      'Shopping': 'bg-romanian-yellow text-romanian-blue',
      'Family': 'bg-success text-success-foreground',
      'Personal': 'bg-accent text-accent-foreground',
      'Utilities': 'bg-warning text-warning-foreground',
    };
    return colors[category] || 'bg-muted text-muted-foreground';
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-muted/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Brain className="h-6 w-6 text-primary" />
            AI Task Parser
            <Badge variant="secondary" className="text-xs">
              Română + English
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Scrie aici tasks-urile tale... / Write your tasks here...
            
Exemple:
• Trebuie să duc copiii la școală la 8 dimineața și să cumpăr fructe
• I have a meeting with Ana tomorrow at 3 PM
• Plătește factura la lumină până pe 15 și rezervă masa la restaurant"
            className="min-h-[120px] text-base resize-none border-2 focus:ring-2 focus:ring-primary/20"
            disabled={isProcessing}
          />
          
          <div className="flex gap-2">
            <Button 
              onClick={handleParse} 
              disabled={isProcessing || !input.trim()}
              className="flex-1 bg-gradient-to-r from-primary to-primary-glow hover:shadow-lg transition-all duration-300"
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
                className="border-primary/30 hover:bg-primary/5"
              >
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Tasks Display */}
      {tasks.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">
              Parsed Tasks ({tasks.length})
            </h2>
          </div>
          
          <div className="grid gap-4">
            {tasks.map((task) => (
              <Card key={task.id} className="shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-primary">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-medium text-foreground">{task.task}</h3>
                        <Badge className={getCategoryColor(task.category)}>
                          {task.category}
                        </Badge>
                        {task.language && (
                          <Badge variant="outline" className="text-xs">
                            {task.language.toUpperCase()}
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex gap-4 text-sm text-muted-foreground">
                        {task.time && (
                          <span>⏰ {task.time}</span>
                        )}
                        {task.deadline && (
                          <span>📅 Deadline: {task.deadline}</span>
                        )}
                        {task.priority && (
                          <Badge 
                            variant={task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {task.priority} priority
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleSyncToCalendar(task)}
                        className="h-8 w-8 p-0 border-primary/30 hover:bg-primary/5"
                      >
                        <Calendar className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteTask(task.id)}
                        className="h-8 w-8 p-0 border-destructive/30 hover:bg-destructive/5"
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