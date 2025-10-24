import React, { useState, useEffect } from 'react';
import { CartesianGrid, Tooltip, XAxis, YAxis, ResponsiveContainer, AreaChart, Area } from 'recharts';

const COLORS = ['#93C5FD', '#6EE7B7', '#FCD34D', '#FCA5A5', '#C4B5FD'];

function YearChart({ filters }: { filters: Record<string, any> }) {
  const [chartData, setChartData] = useState<{ technology: string; count: number }[]>([]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const queryParams = new URLSearchParams({
          q: filters.search || '',
          searchtype: filters.selectedSearchType|| '',
          age: filters.selectedAge || '',
          language: filters.selectedLanguage || '',
          participantnumber: filters.selectedParticipantNumber || '',
          targetuser: filters.selectedTargetUser || '',
          technology: filters.selectedTechnology || '',
          gender: filters.selectedGender || '',
          challenge: filters.selectedChallenge || '',
          problem: filters.selectedProblem|| '',
          level: filters.selectedLevel|| '',
          race: filters.selectedRace|| '',
          dataset: filters.selectedDataset|| ''
        });        const response = await fetch(`http://127.0.0.1:5055/api/visualizations/yeardistribution?${queryParams}`);
        console.log(`http://127.0.0.1:5055/api/visualizations/yeardistribution?${queryParams}`);
        const data = await response.json();
        if (data.success) {
          setChartData(data.data || []);
        }
      } catch (error) {
        console.error('Failed to fetch chart data:', error);
        setChartData([]);
      }
    };
    fetchChartData();
  }, [filters]);

  return (
  <div className="bg-gray-750 p-4 m-2 rounded-lg border border-gray-600">
    <h3 className="text-lg font-semibold text-center mb-4 text-gray-100">Results by Year</h3>
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
        <XAxis dataKey="year" stroke="#9CA3AF" />
        <YAxis stroke="#9CA3AF" />
        <Tooltip
          contentStyle={{ backgroundColor: '#4B5563', border: '1px solid #4B5563', borderRadius: '8px' }}
          labelStyle={{ color: '#E5E7EB' }}
        />
        <Area 
          type="monotone" 
          dataKey="ieee_count" 
          stroke="#6EE7B7" 
          fill="#6EE7B7" 
          fillOpacity={0.6}
          strokeWidth={2} 
        />
        <Area 
          type="monotone" 
          dataKey="acm_count" 
          stroke="#93C5FD" 
          fill="#93C5FD" 
          fillOpacity={0.6}
          strokeWidth={2} 
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
  );
}

export default React.memo(YearChart);
