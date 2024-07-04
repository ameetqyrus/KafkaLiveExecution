import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, RotateCcw } from 'lucide-react';

const generateMockData = () => ({
  messagesProcessed: Math.floor(Math.random() * 1000),
  latency: Math.floor(Math.random() * 100),
  errors: Math.floor(Math.random() * 10),
  throughput: Math.floor(Math.random() * 100)
});

const KafkaTestDashboard = () => {
  const [testStatus, setTestStatus] = useState('idle');
  const [metrics, setMetrics] = useState(generateMockData());
  const [timeSeriesData, setTimeSeriesData] = useState([]);

  useEffect(() => {
    let interval;
    if (testStatus === 'running') {
      interval = setInterval(() => {
        const newMetrics = generateMockData();
        setMetrics(newMetrics);
        setTimeSeriesData(prev => [...prev, { time: new Date().toISOString(), ...newMetrics }].slice(-20));
        setTimeSeriesData((prev) => [...prev, { time: new Date().toISOString(), ...newMetrics }].slice(-20));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [testStatus]);

  const handleStart = () => setTestStatus('running');
  const handlePause = () => setTestStatus('paused');
  const handleReset = () => {
    setTestStatus('idle');
    setMetrics(generateMockData());
    setTimeSeriesData([]);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Kafka Streams Test Execution Dashboard</h1>
      
      <div className="flex justify-between mb-4">
        <div>
          <Badge variant={testStatus === 'running' ? 'success' : testStatus === 'paused' ? 'warning' : 'secondary'}>
            {testStatus.charAt(0).toUpperCase() + testStatus.slice(1)}
          </Badge>
        </div>

        <div>
          <button onClick={handleStart} disabled={testStatus === 'running'} className="mr-2">
            <Play size={20} />
          </button>
          <button onClick={handlePause} disabled={testStatus !== 'running'} className="mr-2">
            <Pause size={20} />
          </button>
          <button onClick={handleReset}>
            <RotateCcw size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <Card>
          <CardHeader>Messages Processed</CardHeader>
          <CardContent className="text-2xl font-bold">{metrics.messagesProcessed}</CardContent>
        </Card>

        <Card>
          <CardHeader>Avg. Latency (ms)</CardHeader>
          <CardContent className="text-2xl font-bold">{metrics.latency}</CardContent>
        </Card>

        <Card>
          <CardHeader>Errors</CardHeader>
          <CardContent className="text-2xl font-bold">{metrics.errors}</CardContent>
        </Card>

        <Card>
          <CardHeader>Throughput (msg/s)</CardHeader>
          <CardContent className="text-2xl font-bold">{metrics.throughput}</CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>Metrics Over Time</CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={timeSeriesData}>
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="messagesProcessed" fill="#8884d8" />
              <Bar dataKey="latency" fill="#82ca9d" />
              <Bar dataKey="throughput" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default KafkaTestDashboard;
