import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cloud, Shield, Network } from "lucide-react";

const VPCDiagram = () => {
  return (
    <Card className="p-6 shadow-aws">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-gradient-aws rounded-lg">
          <Cloud className="h-6 w-6 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-lg text-foreground">
            Custom VPC Architecture
          </h3>
          <p className="text-sm text-muted-foreground">
            Network topology overview
          </p>
        </div>
      </div>

      <div className="relative p-6 bg-gradient-to-br from-accent/5 to-secondary/5 rounded-lg border-2 border-dashed border-accent/30">
        {/* VPC Container */}
        <div className="absolute top-2 left-2">
          <Badge
            variant="secondary"
            className="bg-accent text-accent-foreground"
          >
            vpc-asg-demo (10.0.0.0/16)
          </Badge>
        </div>

        {/* Internet Gateway */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2 p-3 bg-secondary/20 rounded-lg border border-secondary/50">
            <Network className="h-5 w-5 text-secondary" />
            <span className="text-sm font-medium text-secondary">
              Internet Gateway
            </span>
          </div>
        </div>

        {/* Load Balancer */}
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-primary/10 rounded-lg border-2 border-primary/30 shadow-aws">
            <div className="flex items-center gap-2 mb-2">
              <Network className="h-5 w-5 text-primary" />
              <span className="font-semibold text-primary">
                Application Load Balancer
              </span>
            </div>
            <div className="text-xs text-muted-foreground">
              asg-demo-alb-123456789.us-east-1.elb.amazonaws.com
            </div>
          </div>
        </div>

        {/* Availability Zones */}
        <div className="grid grid-cols-1 sm:grid-cols-2  gap-4">
          {["us-east-1a", "us-east-1b"].map((az, index) => (
            <div
              key={az}
              className="p-4 bg-muted/30 rounded-lg border border-muted"
            >
              <div className="flex items-center gap-2 mb-3">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">
                  {az}
                </span>
              </div>

              {/* Public Subnet */}
              <div className="mb-3 p-2 bg-success/10 rounded border border-success/30">
                <div className="text-xs font-medium text-success mb-1">
                  Public Subnet
                </div>
                <div className="text-xs text-muted-foreground">
                  10.0.{index + 1}.0/24
                </div>
              </div>

              {/* Private Subnet with Instances */}
              <div className="p-2 bg-warning/10 rounded border border-warning/30">
                <div className="text-xs font-medium text-warning mb-2">
                  Private Subnet
                </div>
                <div className="text-xs text-muted-foreground mb-2">
                  10.0.{index + 10}.0/24
                </div>

                {/* EC2 Instance */}
                <div className="p-2 bg-card rounded border border-border">
                  <div className="flex items-center gap-1 mb-1">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span className="text-xs font-medium">
                      i-{Math.random().toString(36).substr(2, 9)}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    HTTP Server Running
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* NAT Gateways */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          {[1, 2].map((nat) => (
            <div key={nat} className="flex justify-center">
              <div className="p-2 bg-secondary/10 rounded border border-secondary/30">
                <div className="flex items-center gap-1">
                  <Network className="h-3 w-3 text-secondary" />
                  <span className="text-xs text-secondary">
                    NAT Gateway {nat}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-success/20 border border-success/50 rounded"></div>
          <span className="text-muted-foreground">Public Subnet</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-warning/20 border border-warning/50 rounded"></div>
          <span className="text-muted-foreground">Private Subnet</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-secondary/20 border border-secondary/50 rounded"></div>
          <span className="text-muted-foreground">Network Component</span>
        </div>
      </div>
    </Card>
  );
};

export default VPCDiagram;
