import TaskParser from '@/components/TaskParser';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Calendar, Globe, Zap } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                TaskFlow AI
              </h1>
              <p className="text-sm text-muted-foreground">
                Bilingual Natural Language Task Parser
              </p>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <Badge variant="outline" className="border-romanian-blue text-romanian-blue">
                🇷🇴 Română
              </Badge>
              <Badge variant="outline" className="border-primary text-primary">
                🇬🇧 English
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Features Overview */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <Card className="text-center p-4 border-0 bg-gradient-to-br from-card to-muted/30">
              <CardContent className="p-0">
                <Brain className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold text-sm">AI Parsing</h3>
                <p className="text-xs text-muted-foreground">Smart task extraction</p>
              </CardContent>
            </Card>
            <Card className="text-center p-4 border-0 bg-gradient-to-br from-card to-muted/30">
              <CardContent className="p-0">
                <Globe className="h-8 w-8 text-accent mx-auto mb-2" />
                <h3 className="font-semibold text-sm">Bilingual</h3>
                <p className="text-xs text-muted-foreground">Romanian + English</p>
              </CardContent>
            </Card>
            <Card className="text-center p-4 border-0 bg-gradient-to-br from-card to-muted/30">
              <CardContent className="p-0">
                <Calendar className="h-8 w-8 text-success mx-auto mb-2" />
                <h3 className="font-semibold text-sm">Calendar Sync</h3>
                <p className="text-xs text-muted-foreground">Google integration</p>
              </CardContent>
            </Card>
            <Card className="text-center p-4 border-0 bg-gradient-to-br from-card to-muted/30">
              <CardContent className="p-0">
                <Zap className="h-8 w-8 text-warning mx-auto mb-2" />
                <h3 className="font-semibold text-sm">Instant</h3>
                <p className="text-xs text-muted-foreground">Real-time processing</p>
              </CardContent>
            </Card>
          </div>

          {/* Task Parser Component */}
          <TaskParser />
          
          {/* Instructions */}
          <Card className="mt-8 border-dashed border-2 border-muted-foreground/20">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-3 text-lg">How to use TaskFlow AI</h3>
              <div className="grid md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h4 className="font-medium mb-2 text-primary">🇷🇴 Română</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Scrie tasks-urile în limba română sau amestecate</li>
                    <li>• Include timpul: "la 8 dimineața", "mâine"</li>
                    <li>• Menționează deadline-urile: "până pe 15"</li>
                    <li>• AI-ul va detecta automat categoria și prioritatea</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2 text-primary">🇬🇧 English</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Write tasks in English or mixed languages</li>
                    <li>• Include timing: "at 3 PM", "tomorrow"</li>
                    <li>• Mention deadlines: "by September 15th"</li>
                    <li>• AI will auto-detect category and priority</li>
                  </ul>
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
