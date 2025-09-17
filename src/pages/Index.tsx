import TaskParser from '@/components/TaskParser';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Calendar, Globe, Zap, Languages, Clock } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted/30">
      {/* Header */}
      <header className="border-b border-border/40 bg-card/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-pastel-mint flex items-center justify-center shadow-soft">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">
                  TaskFlow AI
                </h1>
                <p className="text-xs text-muted-foreground">
                  Intelligent Task Processing
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs font-medium border-primary/30 text-primary bg-primary/5">
                <Languages className="h-3 w-3 mr-1" />
                Multilingual
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Hero Section */}
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Zap className="h-4 w-4" />
              AI-Powered Task Management
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
              Transform messy thoughts into<br />
              <span className="bg-gradient-to-r from-primary to-pastel-mint bg-clip-text text-transparent">
                structured tasks
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Process natural language in Romanian and English, automatically detect priorities, 
              and sync with your calendar — all in one intelligent interface.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-6 border-0 bg-gradient-to-br from-card to-muted/20 shadow-soft hover:shadow-medium transition-all duration-300">
              <CardContent className="p-0 text-center space-y-3">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-foreground">Smart Parsing</h3>
                  <p className="text-xs text-muted-foreground mt-1">AI-powered extraction</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="p-6 border-0 bg-gradient-to-br from-card to-muted/20 shadow-soft hover:shadow-medium transition-all duration-300">
              <CardContent className="p-0 text-center space-y-3">
                <div className="h-12 w-12 rounded-lg bg-pastel-mint/20 flex items-center justify-center mx-auto">
                  <Languages className="h-6 w-6 text-pastel-mint" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-foreground">Multilingual</h3>
                  <p className="text-xs text-muted-foreground mt-1">Romanian & English</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="p-6 border-0 bg-gradient-to-br from-card to-muted/20 shadow-soft hover:shadow-medium transition-all duration-300">
              <CardContent className="p-0 text-center space-y-3">
                <div className="h-12 w-12 rounded-lg bg-success/20 flex items-center justify-center mx-auto">
                  <Calendar className="h-6 w-6 text-success" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-foreground">Calendar Sync</h3>
                  <p className="text-xs text-muted-foreground mt-1">Google integration</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="p-6 border-0 bg-gradient-to-br from-card to-muted/20 shadow-soft hover:shadow-medium transition-all duration-300">
              <CardContent className="p-0 text-center space-y-3">
                <div className="h-12 w-12 rounded-lg bg-warning/20 flex items-center justify-center mx-auto">
                  <Clock className="h-6 w-6 text-warning" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-foreground">Real-time</h3>
                  <p className="text-xs text-muted-foreground mt-1">Instant processing</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Task Parser Component */}
          <TaskParser />
          
          {/* Usage Guide */}
          <Card className="border-dashed border-2 border-border/50 bg-gradient-to-br from-muted/20 to-card">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">How it works</h3>
                <p className="text-sm text-muted-foreground">
                  Simply describe your tasks naturally in either language
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-xs font-medium text-primary">RO</span>
                    </div>
                    <h4 className="font-medium text-foreground">Română</h4>
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground pl-8">
                    <p>• Scrie tasks-urile natural, fără structură specifică</p>
                    <p>• Include timpul: "la 8 dimineața", "mâine seara"</p>
                    <p>• Menționează deadline-uri: "până pe 15", "săptămâna viitoare"</p>
                    <p>• AI-ul detectează automat prioritatea și categoria</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-6 w-6 rounded-full bg-pastel-mint/20 flex items-center justify-center">
                      <span className="text-xs font-medium text-pastel-mint">EN</span>
                    </div>
                    <h4 className="font-medium text-foreground">English</h4>
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground pl-8">
                    <p>• Write tasks naturally, in any format you prefer</p>
                    <p>• Include timing: "at 3 PM", "tomorrow morning"</p>
                    <p>• Mention deadlines: "by September 15th", "next week"</p>
                    <p>• AI automatically detects priority and category</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Index;
