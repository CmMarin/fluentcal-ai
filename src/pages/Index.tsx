import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TaskParser } from "@/components/TaskParser";
import { GoogleCalendarSync } from "@/components/GoogleCalendarSync";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Clock, Calendar, CheckCircle, Circle, Download, Trash2, RefreshCw, Menu, User, Bell } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ParsedTask {
  id: string;
  task: string;
  time?: string;
  category: string;
  deadline?: string;
  priority?: "low" | "medium" | "high";
  language: "ro" | "en" | "mixed";
  completed: boolean;
  createdAt: string;
}

export default function Index() {
  const [tasks, setTasks] = useState<ParsedTask[]>([
    {
      id: "1",
      task: "Team meeting with marketing department",
      time: "10:00 AM",
      category: "Schedule",
      priority: "high",
      language: "en",
      completed: false,
      createdAt: "2024-01-15",
    },
    {
      id: "2",
      task: "Plătesc factura la electricitate",
      deadline: "2024-01-25",
      category: "Finance",
      priority: "high",
      language: "ro",
      completed: false,
      createdAt: "2024-01-13",
    },
  ]);
  
  const [isSync, setIsSync] = useState(false);
  const { toast } = useToast();

  const handleTaskParsed = (taskData: any) => {
    const newTask: ParsedTask = {
      id: Date.now().toString(),
      task: taskData.task,
      time: taskData.time,
      category: taskData.category,
      deadline: taskData.deadline,
      priority: taskData.priority || "medium",
      language: taskData.language || "en",
      completed: false,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const toggleTaskCompletion = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
    toast({
      title: "Task deleted",
      description: "Task has been removed from your list.",
    });
  };

  const exportTasks = () => {
    const csvContent = [
      "Task,Category,Time,Deadline,Priority,Language,Status,Created",
      ...tasks.map((task) =>
        [
          `"${task.task}"`,
          task.category,
          task.time || "",
          task.deadline || "",
          task.priority || "",
          task.language,
          task.completed ? "Completed" : "Pending",
          task.createdAt,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "taskflow-tasks.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Tasks exported",
      description: "Your tasks have been downloaded as CSV.",
    });
  };

  const handleSync = async () => {
    setIsSync(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast({
        title: "Sync completed",
        description: "Tasks synced with Google Calendar successfully.",
      });
    } catch (error) {
      toast({
        title: "Sync failed",
        description: "Unable to sync with Google Calendar.",
        variant: "destructive",
      });
    } finally {
      setIsSync(false);
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case "high":
        return "destructive";
      case "medium":
        return "warning";
      case "low":
        return "success";
      default:
        return "secondary";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "finance":
        return "pastel-mint";
      case "schedule":
        return "pastel-blue";
      case "mail report":
        return "pastel-purple";
      case "notes":
        return "pastel-gray";
      default:
        return "secondary";
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-gradient-to-br from-background via-background to-secondary/20">
      <AppSidebar />
      <SidebarInset className="flex-1">
        {/* Enhanced Header */}
        <header className="border-b border-border/40 bg-card/60 backdrop-blur-xl sticky top-0 z-40">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="lg:hidden" />
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary/15 to-accent/15 border border-primary/20 shadow-sm">
                  <div className="w-6 h-6 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center shadow-inner">
                    <div className="w-3 h-3 bg-primary-foreground rounded-sm opacity-95"></div>
                  </div>
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
                    TaskFlow AI
                  </h1>
                  <p className="text-xs text-muted-foreground">Intelligent task management</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-success/5 border-success/20">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                AI Active
              </Badge>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full"></div>
              </Button>
              <Button variant="ghost" size="sm">
                <User className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="gap-2 hidden sm:flex" onClick={exportTasks}>
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-6 py-8 space-y-8">
          {/* Welcome Section */}
          <div className="text-center space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Welcome to your AI-powered task hub
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Transform natural language into organized tasks automatically categorized 
              and ready for your calendar. Works with Romanian and English.
            </p>
          </div>

          {/* Task Input */}
          <Card className="border-0 shadow-soft bg-gradient-to-br from-card via-card to-secondary/10">
            <CardHeader>
              <CardTitle>Add New Tasks</CardTitle>
              <CardDescription>
                Describe your tasks naturally - AI will handle the rest
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TaskParser onTaskParsed={handleTaskParsed} />
            </CardContent>
          </Card>

          {/* Calendar Sync */}
          <Card className="border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Calendar Integration
              </CardTitle>
              <CardDescription>
                Sync your tasks with Google Calendar for seamless scheduling
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Badge variant="outline" className="px-3 py-1">
                    {tasks.filter(t => !t.completed).length} pending tasks
                  </Badge>
                  <GoogleCalendarSync tasks={tasks} />
                </div>
                <Button 
                  onClick={handleSync} 
                  disabled={isSync}
                  className="gap-2"
                >
                  {isSync ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <Calendar className="h-4 w-4" />
                  )}
                  {isSync ? "Syncing..." : "Sync to Calendar"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Tasks Overview */}
          <Card className="border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Recent Tasks
                <Badge variant="secondary">{tasks.length} total</Badge>
              </CardTitle>
              <CardDescription>
                Your latest parsed tasks across all categories
              </CardDescription>
            </CardHeader>
            <CardContent>
              {tasks.length === 0 ? (
                <div className="text-center py-8">
                  <Circle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No tasks yet</h3>
                  <p className="text-muted-foreground">
                    Start by adding some tasks using the AI parser above
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {tasks.slice(0, 5).map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center gap-4 p-3 rounded-lg border border-border/50 bg-gradient-to-r from-card to-muted/5 hover:shadow-sm transition-all duration-200"
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 rounded-full"
                        onClick={() => toggleTaskCompletion(task.id)}
                      >
                        {task.completed ? (
                          <CheckCircle className="h-4 w-4 text-success" />
                        ) : (
                          <Circle className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                      
                      <div className="flex-1 min-w-0">
                        <p className={`font-medium truncate ${task.completed ? "line-through text-muted-foreground" : "text-foreground"}`}>
                          {task.task}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className={`text-xs bg-${getCategoryColor(task.category)}/10 border-${getCategoryColor(task.category)}/20 text-${getCategoryColor(task.category)}`}>
                            {task.category}
                          </Badge>
                          {task.priority && (
                            <Badge variant={getPriorityColor(task.priority)} className="text-xs">
                              {task.priority}
                            </Badge>
                          )}
                          {task.time && (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {task.time}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                        onClick={() => deleteTask(task.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                  
                  {tasks.length > 5 && (
                    <div className="text-center pt-4 border-t border-border/50">
                      <p className="text-sm text-muted-foreground">
                        Showing 5 of {tasks.length} tasks. View all in the sidebar categories.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </SidebarInset>
    </div>
  );
}