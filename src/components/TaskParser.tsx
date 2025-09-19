import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Loader2, Brain } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { processTaskInput } from './AIProcessor';

interface TaskParserProps {
  onTaskParsed?: (taskData: any) => void;
  suggestedCategory?: string;
}

export const TaskParser: React.FC<TaskParserProps> = ({ onTaskParsed, suggestedCategory }) => {
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [parsedTasks, setParsedTasks] = useState<any[]>([]);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!input.trim()) return;

    try {
      setIsProcessing(true);
      const processed = await processTaskInput(input, suggestedCategory);
      
      if (processed.length > 0) {
        setParsedTasks(processed);
        onTaskParsed?.(processed[0]);
        toast({
          title: "Tasks processed successfully",
          description: `Found ${processed.length} task(s) from your input`,
        });
      }
    } catch (error) {
      toast({
        title: "Processing failed",
        description: "Unable to process your input. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Describe your tasks naturally${suggestedCategory ? ` for ${suggestedCategory}` : ''}...

Examples:
• Trebuie să duc copiii la școală la 8 dimineața și să cumpăr fructe  
• I have a meeting with Ana tomorrow at 3 PM and need to pay the bills
• Plătește factura la lumină până pe 15 și rezervă masa`}
          className="min-h-[120px] resize-none"
          disabled={isProcessing}
        />
        <div className="flex gap-3">
          <Button 
            onClick={handleSubmit}
            disabled={isProcessing || !input.trim()}
            className="flex-1"
          >
            {isProcessing ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Brain className="h-4 w-4 mr-2" />
            )}
            {isProcessing ? 'Processing...' : 'Parse Tasks'}
          </Button>
        </div>
      </div>
      
      {parsedTasks.length > 0 && (
        <div className="space-y-3 pt-4 border-t">
          <h4 className="font-medium">Parsed Tasks:</h4>
          {parsedTasks.map((task, index) => (
            <div key={index} className="p-3 rounded-lg bg-muted/20 border">
              <p className="font-medium">{task.task}</p>
              <div className="flex gap-2 mt-2">
                <Badge variant="secondary">{task.category}</Badge>
                {task.priority && <Badge variant="outline">{task.priority}</Badge>}
                {task.time && <Badge variant="outline">{task.time}</Badge>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskParser;