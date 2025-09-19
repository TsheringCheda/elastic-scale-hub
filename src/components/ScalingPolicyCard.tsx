import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Target, AlertTriangle } from "lucide-react";

interface ScalingPolicyCardProps {
  currentInstances: number;
  minInstances: number;
  maxInstances: number;
  targetCpuUtilization: number;
  averageCpuUtilization: number;
  scalingStatus: "stable" | "scaling-out" | "scaling-in";
}

const ScalingPolicyCard = ({
  currentInstances,
  minInstances,
  maxInstances,
  targetCpuUtilization,
  averageCpuUtilization,
  scalingStatus
}: ScalingPolicyCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "stable":
        return "bg-success text-success-foreground";
      case "scaling-out":
        return "bg-gradient-warning text-warning-foreground";
      case "scaling-in":
        return "bg-secondary text-secondary-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const shouldScale = averageCpuUtilization > targetCpuUtilization;
  
  return (
    <Card className="p-6 shadow-aws">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-gradient-aws rounded-lg">
          <Target className="h-6 w-6 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-lg text-foreground">Target Tracking Policy</h3>
          <p className="text-sm text-muted-foreground">CPU Utilization Scaling</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-sm text-muted-foreground mb-1">Min</div>
            <div className="text-2xl font-bold text-foreground">{minInstances}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground mb-1">Current</div>
            <div className="text-2xl font-bold text-secondary">{currentInstances}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground mb-1">Max</div>
            <div className="text-2xl font-bold text-foreground">{maxInstances}</div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Target CPU</span>
            <span className="font-semibold text-foreground">{targetCpuUtilization}%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Average CPU</span>
            <span className={`font-semibold ${shouldScale ? 'text-warning' : 'text-success'}`}>
              {averageCpuUtilization}%
            </span>
          </div>
          <Progress 
            value={averageCpuUtilization} 
            className="h-3"
          />
          <div className="relative">
            <div 
              className="absolute top-0 w-0.5 h-3 bg-destructive"
              style={{ left: `${targetCpuUtilization}%` }}
            />
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Status</span>
          </div>
          <Badge className={getStatusColor(scalingStatus)}>
            {scalingStatus.replace('-', ' ')}
          </Badge>
        </div>
        
        {shouldScale && (
          <div className="flex items-center gap-2 p-3 bg-warning/10 rounded-lg">
            <AlertTriangle className="h-4 w-4 text-warning" />
            <span className="text-sm text-warning">
              CPU above threshold - scaling action triggered
            </span>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ScalingPolicyCard;