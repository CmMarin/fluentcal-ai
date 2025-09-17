import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, ExternalLink, Settings, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end?: string;
  description?: string;
  location?: string;
}

const GoogleCalendarSync = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [syncedEvents, setSyncedEvents] = useState<CalendarEvent[]>([]);
  const { toast } = useToast();

  // Mock Google Calendar API integration
  const connectToGoogleCalendar = async () => {
    setIsConnecting(true);
    
    try {
      // Simulate OAuth flow
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful connection
      setIsConnected(true);
      
      toast({
        title: "Calendar Connected!",
        description: "Successfully connected to your Google Calendar.",
      });
      
      // Mock some existing events
      const mockEvents: CalendarEvent[] = [
        {
          id: '1',
          title: 'Team Meeting',
          start: '2024-01-15T10:00:00Z',
          end: '2024-01-15T11:00:00Z',
          description: 'Weekly team sync'
        },
        {
          id: '2', 
          title: 'Dentist Appointment',
          start: '2024-01-16T14:00:00Z',
          end: '2024-01-16T15:00:00Z'
        }
      ];
      
      setSyncedEvents(mockEvents);
      
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Could not connect to Google Calendar. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const createCalendarEvent = async (taskTitle: string, dateTime?: string) => {
    if (!isConnected) {
      toast({
        title: "Not Connected",
        description: "Please connect to Google Calendar first.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Mock event creation
      const newEvent: CalendarEvent = {
        id: Date.now().toString(),
        title: taskTitle,
        start: dateTime || new Date().toISOString(),
        description: `Task created by TaskFlow AI: ${taskTitle}`
      };
      
      setSyncedEvents(prev => [...prev, newEvent]);
      
      toast({
        title: "Event Created",
        description: `"${taskTitle}" added to your Google Calendar.`,
      });
      
    } catch (error) {
      toast({
        title: "Sync Failed", 
        description: "Could not create calendar event.",
        variant: "destructive",
      });
    }
  };

  const disconnectCalendar = () => {
    setIsConnected(false);
    setSyncedEvents([]);
    toast({
      title: "Calendar Disconnected",
      description: "Your Google Calendar has been disconnected.",
    });
  };

  return (
    <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-muted/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Google Calendar Integration
          {isConnected && (
            <Badge className="bg-success text-success-foreground">
              <CheckCircle className="h-3 w-3 mr-1" />
              Connected
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isConnected ? (
          <div className="text-center py-6 space-y-4">
            <div className="text-muted-foreground">
              Connect your Google Calendar to automatically sync parsed tasks as events.
            </div>
            <Button 
              onClick={connectToGoogleCalendar}
              disabled={isConnecting}
              className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-lg"
            >
              {isConnecting ? (
                <>
                  <Settings className="h-4 w-4 mr-2 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <Calendar className="h-4 w-4 mr-2" />
                  Connect Google Calendar
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Successfully connected to Google Calendar
              </div>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => window.open('https://calendar.google.com', '_blank')}
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Open Calendar
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={disconnectCalendar}
                >
                  Disconnect
                </Button>
              </div>
            </div>
            
            {syncedEvents.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Recent Synced Events</h4>
                <div className="space-y-2">
                  {syncedEvents.slice(-3).map((event) => (
                    <div 
                      key={event.id} 
                      className="flex items-center gap-2 p-2 bg-muted/50 rounded-md text-sm"
                    >
                      <CheckCircle className="h-3 w-3 text-success flex-shrink-0" />
                      <span className="flex-1 truncate">{event.title}</span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(event.start).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export { GoogleCalendarSync, type CalendarEvent };