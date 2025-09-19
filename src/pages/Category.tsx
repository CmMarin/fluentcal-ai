import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Calendar, DollarSign, Mail, StickyNote, Filter, Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { TaskParser } from "@/components/TaskParser";

const categoryIcons = {
  schedule: Calendar,
  finance: DollarSign,
  mail: Mail,
  notes: StickyNote,
};

const categoryColors = {
  schedule: "pastel-blue",
  finance: "pastel-mint", 
  mail: "pastel-purple",
  notes: "pastel-gray",
};

interface Task {
  id: string;
  text: string;
  time?: string;
  deadline?: string;
  priority?: "low" | "medium" | "high";
  status: "pending" | "completed" | "in-progress";
  createdAt: string;
}

// Sample data for demonstration
const sampleTasks: Record<string, Task[]> = {
  schedule: [
    {
      id: "1",
      text: "Team meeting with marketing department",
      time: "10:00 AM",
      priority: "high",
      status: "pending",
      createdAt: "2024-01-15"
    },
    {
      id: "2", 
      text: "Doctor appointment for annual checkup",
      time: "3:00 PM",
      deadline: "2024-01-20",
      priority: "medium",
      status: "completed",
      createdAt: "2024-01-14"
    }
  ],
  finance: [
    {
      id: "3",
      text: "Pay electricity bill",
      deadline: "2024-01-25",
      priority: "high",
      status: "pending",
      createdAt: "2024-01-13"
    },
    {
      id: "4",
      text: "Review monthly budget and expenses",
      priority: "medium", 
      status: "in-progress",
      createdAt: "2024-01-12"
    }
  ],
  mail: [
    {
      id: "5",
      text: "Send project update to stakeholders",
      deadline: "2024-01-18",
      priority: "high",
      status: "completed",
      createdAt: "2024-01-11"
    }
  ],
  notes: [
    {
      id: "6",
      text: "Research new productivity tools for the team",
      priority: "low",
      status: "pending", 
      createdAt: "2024-01-10"
    },
    {
      id: "7",
      text: "Plan weekend family activities",
      priority: "medium",
      status: "in-progress",
      createdAt: "2024-01-09"
    }
  ]
};

export default function Category() {
  const { categoryId } = useParams();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "pending" | "completed" | "in-progress">("all");
  const [showParser, setShowParser] = useState(false);

  useEffect(() => {
    if (categoryId && sampleTasks[categoryId]) {
      setTasks(sampleTasks[categoryId]);
    }
  }, [categoryId]);

  const CategoryIcon = categoryIcons[categoryId as keyof typeof categoryIcons] || StickyNote;
  const categoryColor = categoryColors[categoryId as keyof typeof categoryColors] || "pastel-gray";
  
  const categoryName = categoryId?.charAt(0).toUpperCase() + categoryId?.slice(1) || "Category";

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.text.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || task.status === filter;
    return matchesSearch && matchesFilter;
  });

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case "high": return "destructive";
      case "medium": return "warning";
      case "low": return "success";
      default: return "secondary";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "success";
      case "in-progress": return "warning";
      case "pending": return "secondary";
      default: return "secondary";
    }
  };

  const handleNewTask = (taskData: any) => {
    const newTask: Task = {
      id: Date.now().toString(),
      text: taskData.task,
      time: taskData.time,
      deadline: taskData.deadline,
      priority: taskData.priority || "medium",
      status: "pending",
      createdAt: new Date().toISOString().split('T')[0]
    };
    setTasks(prev => [newTask, ...prev]);
    setShowParser(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/30 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl bg-${categoryColor}/20 border border-${categoryColor}/30`}>
              <CategoryIcon className={`h-6 w-6 text-${categoryColor}`} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-1">{categoryName}</h1>
              <p className="text-muted-foreground">
                {filteredTasks.length} tasks • {filteredTasks.filter(t => t.status === "completed").length} completed
              </p>
            </div>
          </div>
          <Button
            onClick={() => setShowParser(true)}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Task
          </Button>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex gap-3 items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 w-64"
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => {
                const nextFilter = filter === "all" ? "pending" : 
                                 filter === "pending" ? "in-progress" :
                                 filter === "in-progress" ? "completed" : "all";
                setFilter(nextFilter);
              }}
            >
              <Filter className="h-4 w-4" />
              {filter === "all" ? "All" : filter.charAt(0).toUpperCase() + filter.slice(1)}
            </Button>
          </div>
        </div>

        {/* Tasks Grid */}
        <div className="grid gap-4">
          {filteredTasks.length === 0 ? (
            <Card className="p-8 text-center">
              <CardContent>
                <CategoryIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No tasks found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm ? "Try adjusting your search terms" : `Start adding tasks to your ${categoryName.toLowerCase()} category`}
                </p>
                <Button onClick={() => setShowParser(true)} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Your First Task
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredTasks.map((task) => (
              <Card key={task.id} className="hover:shadow-md transition-all duration-200">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground mb-2">{task.text}</h3>
                      <div className="flex flex-wrap gap-2 items-center text-sm text-muted-foreground">
                        {task.time && (
                          <Badge variant="outline" className="text-xs">
                            {task.time}
                          </Badge>
                        )}
                        {task.deadline && (
                          <Badge variant="outline" className="text-xs">
                            Due: {task.deadline}
                          </Badge>
                        )}
                        <Badge variant={getPriorityColor(task.priority)} className="text-xs">
                          {task.priority}
                        </Badge>
                        <Badge variant={getStatusColor(task.status)} className="text-xs">
                          {task.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {task.createdAt}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Task Parser Modal */}
        {showParser && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-card rounded-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Add Task to {categoryName}</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowParser(false)}
                  >
                    ×
                  </Button>
                </div>
              </div>
              <div className="p-6">
                <TaskParser
                  onTaskParsed={handleNewTask}
                  suggestedCategory={categoryId}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}