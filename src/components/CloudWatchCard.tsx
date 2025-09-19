import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, AlertCircle, CheckCircle, Clock } from "lucide-react";

interface AlarmData {
  name: string;
  metric: string;
  threshold: number;
  currentValue: number;
  state: "OK" | "ALARM" | "INSUFFICIENT_DATA";
  lastUpdated: string;
}

interface CloudWatchCardProps {
  alarms: AlarmData[];
}

const CloudWatchCard = ({ alarms }: CloudWatchCardProps) => {
  const getStateIcon = (state: string) => {
    switch (state) {
      case "OK":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "ALARM":
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      case "INSUFFICIENT_DATA":
        return <Clock className="h-4 w-4 text-warning" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStateBadge = (state: string) => {
    switch (state) {
      case "OK":
        return "bg-success text-success-foreground";
      case "ALARM":
        return "bg-destructive text-destructive-foreground";
      case "INSUFFICIENT_DATA":
        return "bg-warning text-warning-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="p-6 shadow-aws">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-gradient-aws rounded-lg">
          <Bell className="h-6 w-6 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-lg text-foreground">CloudWatch Alarms</h3>
          <p className="text-sm text-muted-foreground">Monitoring ASG metrics</p>
        </div>
      </div>
      
      <div className="space-y-3">
        {alarms.map((alarm, index) => (
          <div 
            key={index} 
            className="p-4 bg-card border border-border rounded-lg hover:shadow-sm transition-shadow"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                {getStateIcon(alarm.state)}
                <span className="font-medium text-foreground">{alarm.name}</span>
              </div>
              <Badge className={getStateBadge(alarm.state)} variant="secondary">
                {alarm.state}
              </Badge>
            </div>
            
            <div className="text-sm text-muted-foreground mb-2">
              {alarm.metric}
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Threshold: <span className="font-medium text-foreground">{alarm.threshold}%</span>
              </span>
              <span className={`font-medium ${
                alarm.currentValue > alarm.threshold ? 'text-destructive' : 'text-success'
              }`}>
                Current: {alarm.currentValue}%
              </span>
            </div>
            
            <div className="text-xs text-muted-foreground mt-2">
              Last updated: {alarm.lastUpdated}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default CloudWatchCard;