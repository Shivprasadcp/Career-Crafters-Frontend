// import React from 'react';
// import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

// const DomainRadarChart = ({ data }) => {
//   // Format data for the radar chart
//   const formattedData = Object.entries(data || {}).map(([domain, score]) => ({
//     subject: domain.charAt(0).toUpperCase() + domain.slice(1),
//     score: score,
//     fullMark: 10, // Assuming max score is 10
//   }));

//   return (
//     <ResponsiveContainer width="100%" height={400}>
//       <RadarChart cx="50%" cy="50%" outerRadius="70%" data={formattedData}>
//         <PolarGrid />
//         <PolarAngleAxis dataKey="subject" />
//         <PolarRadiusAxis angle={30} domain={[0, 10]} />
//         <Radar 
//           name="Domain Score" 
//           dataKey="score" 
//           stroke="#8884d8" 
//           fill="#8884d8" 
//           fillOpacity={0.6} 
//         />
//       </RadarChart>
//     </ResponsiveContainer>
//   );
// };

// export default DomainRadarChart;

import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const DomainRadarChart = ({ data }) => {
  // Format data for the radar chart
  const formattedData = Object.entries(data || {}).map(([domain, score]) => ({
    subject: domain.charAt(0).toUpperCase() + domain.slice(1),
    score: score,
    fullMark: 10, // Assuming max score is 10
  }));
  
  // Custom tooltip to display domain and score clearly
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-300 rounded shadow-md">
          <p className="font-bold">{payload[0].payload.subject}</p>
          <p className="text-blue-600">Score: <span className="font-semibold">{payload[0].value}</span></p>
          <p className="text-gray-500 text-sm">Max: {payload[0].payload.fullMark}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <RadarChart cx="50%" cy="50%" outerRadius="70%" data={formattedData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis angle={30} domain={[0, 10]} />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Radar 
          name="Domain Score" 
          dataKey="score" 
          stroke="#8884d8" 
          fill="#8884d8" 
          fillOpacity={0.6} 
        />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default DomainRadarChart;