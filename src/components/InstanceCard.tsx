import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Server, Activity, Globe } from "lucide-react";

interface InstanceCardProps {
  id: string;
  status: "running" | "pending" | "stopping";
  cpuUsage: number;
  httpEndpoint: string;
  az: string;
}

const InstanceCard = ({
  id,
  status,
  cpuUsage,
  httpEndpoint,
  az,
}: InstanceCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "running":
        return "bg-gradient-success text-success-foreground";
      case "pending":
        return "bg-gradient-warning text-warning-foreground";
      case "stopping":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getCpuColor = (cpu: number) => {
    if (cpu >= 70) return "text-destructive";
    if (cpu >= 50) return "text-warning";
    return "text-success";
  };

  return (
    <Card className="p-4 shadow-aws hover:shadow-glow transition-all duration-300 border-l-4 border-l-secondary">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Server className="h-5 w-5 text-secondary" />
          <span className="font-semibold text-foreground">{id}</span>
        </div>
        <Badge className={getStatusColor(status)} variant="secondary">
          {status}
        </Badge>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">CPU Usage</span>
          </div>
          <span className={`font-bold ${getCpuColor(cpuUsage)}`}>
            {cpuUsage}%
          </span>
        </div>

        <div className="w-full bg-muted rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${
              cpuUsage >= 70
                ? "bg-destructive"
                : cpuUsage >= 50
                ? "bg-warning"
                : "bg-success"
            }`}
            style={{ width: `${cpuUsage}%` }}
          />
        </div>

        <div className="flex items-center gap-2 pt-2">
          <Globe className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">{httpEndpoint}</span>
        </div>

        <div className="text-xs text-muted-foreground">
          Availability Zone:{" "}
          <span className="text-accent font-medium">{az}</span>
        </div>
      </div>
    </Card>
  );
};

export default InstanceCard;
