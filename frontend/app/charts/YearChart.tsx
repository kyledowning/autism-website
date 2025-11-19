import React, { useState, useEffect } from 'react';
import { CartesianGrid, Tooltip, XAxis, YAxis, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { useTheme } from '~/context/ThemeContext';

const COLORS = ['#93C5FD', '#6EE7B7', '#FCD34D', '#FCA5A5', '#C4B5FD'];

function YearChart({ filters }: { filters: Record<string, any> }) {
  const { theme } = useTheme();
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
        });
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/visualizations/yeardistribution?${queryParams}`);
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

  const gridColor = theme === 'dark' ? '#4B5563' : '#D1D5DB';
  const axisColor = theme === 'dark' ? '#9CA3AF' : '#6B7280';
  const tooltipBg = theme === 'dark' ? '#1a202c' : '#ffffff';
  const tooltipBorder = theme === 'dark' ? '#4B5563' : '#D1D5DB';

  return (
  <div style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-color)' }} className="p-4 m-2 rounded-lg border">
    <h3 style={{ color: 'var(--text-primary)' }} className="text-lg font-semibold text-center mb-4">Results by Year</h3>
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
        <XAxis dataKey="year" stroke={axisColor} />
        <YAxis stroke={axisColor} />
        <Tooltip
          contentStyle={{ backgroundColor: tooltipBg, border: `1px solid ${tooltipBorder}`, borderRadius: '8px' }}
          labelStyle={{ color: theme === 'dark' ? '#E5E7EB' : '#1F2937' }}
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
