import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Network, Shield, Activity } from "lucide-react";

interface LoadBalancerCardProps {
  dnsName: string;
  healthyTargets: number;
  totalTargets: number;
  requestsPerMinute: number;
  responseTime: number;
}

const LoadBalancerCard = ({
  dnsName,
  healthyTargets,
  totalTargets,
  requestsPerMinute,
  responseTime,
}: LoadBalancerCardProps) => {
  const healthPercentage = (healthyTargets / totalTargets) * 100;

  return (
    <Card className="p-6 shadow-aws hover:shadow-glow transition-all duration-300 bg-gradient-to-br from-card to-accent/5">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-gradient-aws rounded-lg">
          <Network className="h-6 w-6 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-lg text-foreground">
            Application Load Balancer
          </h3>
          <p className="text-sm text-muted-foreground">
            Distributing traffic across instances
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Network className="h-4 w-4 text-secondary" />
            <span className="text-sm font-medium">DNS Endpoint</span>
          </div>
          <p className="text-xs font-mono text-accent break-all">{dnsName}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Shield className="h-4 w-4 text-success" />
              <span className="text-sm text-muted-foreground">
                Healthy Targets
              </span>
            </div>
            <div className="text-2xl font-bold text-success">
              {healthyTargets}/{totalTargets}
            </div>
            <Progress value={healthPercentage} className="mt-2 h-2" />
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Activity className="h-4 w-4 text-secondary" />
              <span className="text-sm text-muted-foreground">
                Requests/min
              </span>
            </div>
            <div className="text-2xl font-bold text-secondary w-full">
              {requestsPerMinute}
            </div>
            <Badge
              variant="secondary"
              className="mt-2 w-full flex justify-center items-center"
            >
              {responseTime}ms avg
            </Badge>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default LoadBalancerCard;
