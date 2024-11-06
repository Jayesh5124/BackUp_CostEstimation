import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

interface CostBreakdownChartProps {
  data: { resource: string; amount: number }[];
}

// Custom colors for the charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const CostBreakdownChart: React.FC<CostBreakdownChartProps> = ({ data }) => {
  // Transform data for quantity analysis (example calculation)
  const quantityData = data.map(item => ({
    name: item.resource,
    value: item.amount / 1000 // Converting to a reasonable scale for visualization
  }));

  // Transform data for cost analysis percentages
  const totalCost = data.reduce((sum, item) => sum + item.amount, 0);
  const costPercentageData = data.map(item => ({
    name: item.resource,
    value: (item.amount / totalCost) * 100
  }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
      {/* Bar Chart */}
      <div>
        <h3 style={{ textAlign: 'center' }}>Resource Cost Distribution</h3>
        <BarChart
          width={600}
          height={300}
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="resource" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="amount" fill="#0d47a1" />
        </BarChart>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
        {/* Doughnut Chart (Quantity Distribution) */}
        <div>
          <h3 style={{ textAlign: 'center' }}>Quantity Distribution</h3>
          <PieChart width={400} height={400}>
            <Pie
              data={quantityData}
              cx={200}
              cy={200}
              innerRadius={60}
              outerRadius={120}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              label={({ name, value }) => `${name}: ${value.toFixed(1)}`}
            >
              {quantityData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        {/* Pie Chart (Cost Percentage) */}
        <div>
          <h3 style={{ textAlign: 'center' }}>Cost Percentage Distribution</h3>
          <PieChart width={400} height={400}>
            <Pie
              data={costPercentageData}
              cx={200}
              cy={200}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
              label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
            >
              {costPercentageData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default CostBreakdownChart;
