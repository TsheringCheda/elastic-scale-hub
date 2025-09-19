import { useState, useEffect } from 'react';

interface Instance {
  id: string;
  status: "running" | "pending" | "stopping";
  cpuUsage: number;
  httpEndpoint: string;
  az: string;
}

interface AlarmData {
  name: string;
  metric: string;
  threshold: number;
  currentValue: number;
  state: "OK" | "ALARM" | "INSUFFICIENT_DATA";
  lastUpdated: string;
}

export const useAWSSimulation = () => {
  const [instances, setInstances] = useState<Instance[]>([
    {
      id: "i-0123456789abcdef0",
      status: "running",
      cpuUsage: 45,
      httpEndpoint: "http://10.0.10.100:80",
      az: "us-east-1a"
    }
  ]);

  const [loadBalancer, setLoadBalancer] = useState({
    dnsName: "asg-demo-alb-123456789.us-east-1.elb.amazonaws.com",
    healthyTargets: 1,
    totalTargets: 1,
    requestsPerMinute: 150,
    responseTime: 25
  });

  const [scalingPolicy, setScalingPolicy] = useState({
    currentInstances: 1,
    minInstances: 1,
    maxInstances: 3,
    targetCpuUtilization: 50,
    averageCpuUtilization: 45,
    scalingStatus: "stable" as "stable" | "scaling-out" | "scaling-in"
  });

  const [alarms, setAlarms] = useState<AlarmData[]>([
    {
      name: "ASG-CPU-High",
      metric: "Average CPU Utilization",
      threshold: 50,
      currentValue: 45,
      state: "OK",
      lastUpdated: new Date().toLocaleString()
    },
    {
      name: "ALB-TargetResponse-High", 
      metric: "Target Response Time",
      threshold: 100,
      currentValue: 25,
      state: "OK",
      lastUpdated: new Date().toLocaleString()
    }
  ]);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate CPU fluctuations
      setInstances(prev => prev.map(instance => ({
        ...instance,
        cpuUsage: Math.max(20, Math.min(90, instance.cpuUsage + (Math.random() - 0.5) * 10))
      })));

      // Update load balancer metrics
      setLoadBalancer(prev => ({
        ...prev,
        requestsPerMinute: Math.max(100, Math.min(500, prev.requestsPerMinute + (Math.random() - 0.5) * 50)),
        responseTime: Math.max(15, Math.min(80, prev.responseTime + (Math.random() - 0.5) * 10))
      }));

      // Calculate average CPU and determine scaling action
      setInstances(prev => {
        const avgCpu = prev.reduce((sum, inst) => sum + inst.cpuUsage, 0) / prev.length;
        
        setScalingPolicy(current => {
          let newStatus = current.scalingStatus;
          let newInstanceCount = current.currentInstances;
          
          // Scaling logic
          if (avgCpu > current.targetCpuUtilization && current.currentInstances < current.maxInstances) {
            newStatus = "scaling-out";
            // Simulate adding instance after delay
            setTimeout(() => {
              if (prev.length < 3) {
                const newInstance: Instance = {
                  id: `i-${Math.random().toString(36).substr(2, 17)}`,
                  status: "pending",
                  cpuUsage: 30,
                  httpEndpoint: `http://10.0.${prev.length % 2 === 0 ? '10' : '11'}.${100 + prev.length}:80`,
                  az: prev.length % 2 === 0 ? "us-east-1a" : "us-east-1b"
                };
                setInstances(current => [...current, newInstance]);
                setLoadBalancer(lb => ({
                  ...lb,
                  totalTargets: lb.totalTargets + 1,
                  healthyTargets: lb.healthyTargets + 1
                }));
              }
            }, 3000);
            newInstanceCount = Math.min(current.maxInstances, current.currentInstances + 1);
          } else if (avgCpu < current.targetCpuUtilization - 10 && current.currentInstances > current.minInstances) {
            newStatus = "scaling-in";
            newInstanceCount = Math.max(current.minInstances, current.currentInstances - 1);
          } else {
            newStatus = "stable";
          }
          
          return {
            ...current,
            averageCpuUtilization: Math.round(avgCpu),
            scalingStatus: newStatus,
            currentInstances: newInstanceCount
          };
        });

        // Update alarms based on average CPU
        setAlarms(currentAlarms => currentAlarms.map(alarm => {
          if (alarm.name === "ASG-CPU-High") {
            return {
              ...alarm,
              currentValue: Math.round(avgCpu),
              state: avgCpu > alarm.threshold ? "ALARM" : "OK",
              lastUpdated: new Date().toLocaleString()
            };
          }
          return alarm;
        }));

        return prev;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return {
    instances,
    loadBalancer,
    scalingPolicy,
    alarms
  };
};