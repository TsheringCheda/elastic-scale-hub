import { useAWSSimulation } from "@/hooks/useAWSSimulation";
import InstanceCard from "@/components/InstanceCard";
import LoadBalancerCard from "@/components/LoadBalancerCard";
import ScalingPolicyCard from "@/components/ScalingPolicyCard";
import CloudWatchCard from "@/components/CloudWatchCard";
import VPCDiagram from "@/components/VPCDiagram";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Cloud, Activity, Settings, Bell } from "lucide-react";

const Index = () => {
  const { instances, loadBalancer, scalingPolicy, alarms } = useAWSSimulation();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card shadow-aws">
        <div className="container mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between">
          {/* Left side */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="p-2 bg-gradient-aws rounded-lg">
              <Cloud className="h-8 w-8 text-white" />
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-bold text-foreground">
                AWS Auto Scaling Group
              </h1>
              <p className="text-muted-foreground">
                Real-time monitoring dashboard
              </p>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3 mt-4 sm:mt-0">
            <Badge
              variant="secondary"
              className="bg-gradient-success text-success-foreground"
            >
              <Activity className="h-4 w-4 mr-1" />
              Live Simulation
            </Badge>
            <Badge variant="outline">Region: us-east-1</Badge>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-4 text-center shadow-aws">
            <div className="text-2xl font-bold text-secondary">
              {instances.length}
            </div>
            <div className="text-sm text-muted-foreground">
              Running Instances
            </div>
          </Card>
          <Card className="p-4 text-center shadow-aws">
            <div className="text-2xl font-bold text-success">
              {loadBalancer.healthyTargets}
            </div>
            <div className="text-sm text-muted-foreground">Healthy Targets</div>
          </Card>
          <Card className="p-4 text-center shadow-aws">
            <div className="text-2xl font-bold text-primary">
              {scalingPolicy.averageCpuUtilization}%
            </div>
            <div className="text-sm text-muted-foreground">Average CPU</div>
          </Card>
          <Card className="p-4 text-center shadow-aws">
            <div className="text-2xl font-bold text-warning">
              {loadBalancer.requestsPerMinute}
            </div>
            <div className="text-sm text-muted-foreground">Requests/min</div>
          </Card>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Load Balancer */}
          <LoadBalancerCard {...loadBalancer} />

          {/* Scaling Policy */}
          <ScalingPolicyCard {...scalingPolicy} />
        </div>

        {/* VPC Diagram */}
        <div className="mb-8">
          <VPCDiagram />
        </div>

        {/* Instances and Monitoring */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Instances Grid */}
          <div className="xl:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-aws rounded-lg">
                <Settings className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-foreground">
                EC2 Instances
              </h2>
              <Badge variant="secondary">
                Min: {scalingPolicy.minInstances} | Max:{" "}
                {scalingPolicy.maxInstances}
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
              {instances.map((instance) => (
                <InstanceCard key={instance.id} {...instance} />
              ))}

              {/* Show placeholder for potential instances */}
              {Array.from({
                length: scalingPolicy.maxInstances - instances.length,
              }).map((_, index) => (
                <Card
                  key={`placeholder-${index}`}
                  className="p-4 border-2 border-dashed border-muted opacity-50"
                >
                  <div className="flex items-center justify-center h-32">
                    <div className="text-center">
                      <Settings className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Available Capacity
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* CloudWatch Alarms */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-aws rounded-lg">
                <Bell className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-foreground">Monitoring</h2>
            </div>
            <CloudWatchCard alarms={alarms} />
          </div>
        </div>

        {/* User Data Information */}
        <Card className="mt-8 p-6 bg-gradient-to-r from-muted/30 to-accent/10">
          <h3 className="text-lg font-bold text-foreground mb-3">
            HTTP Server Configuration
          </h3>
          <div className="bg-card p-4 rounded-lg border border-border">
            <div className="text-sm text-muted-foreground mb-2">
              User Data Script:
            </div>
            <pre className="text-xs font-mono text-foreground bg-muted/50 p-3 rounded overflow-x-auto">
              {`#!/bin/bash
yum update -y
yum install -y httpd
systemctl start httpd
systemctl enable httpd
echo "<h1>Hello from ASG Instance $(curl -s http://169.254.169.254/latest/meta-data/instance-id)</h1>" > /var/www/html/index.html
echo "<p>Availability Zone: $(curl -s http://169.254.169.254/latest/meta-data/placement/availability-zone)</p>" >> /var/www/html/index.html`}
            </pre>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Index;
