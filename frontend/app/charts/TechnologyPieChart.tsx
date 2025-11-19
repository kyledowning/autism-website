import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts';
import { useTheme } from '~/context/ThemeContext';

const COLORS = ['#93C5FD', '#6EE7B7', '#FCD34D', '#FCA5A5', '#C4B5FD'];

function TechnologyPieChart({ filters }: { filters: Record<string, any> }) {
  const { theme } = useTheme();
  const [pieData, setPieData] = useState<{ technology: string; count: number }[]>([]);

  useEffect(() => {
    const fetchPieData = async () => {
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
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/visualizations/technologydistribution?${queryParams}`);
      const data = await res.json();
      if (data.success) setPieData(data.data || []);
    };
    fetchPieData();
  }, [filters]);

  const tooltipBg = theme === 'dark' ? '#1a202c' : '#ffffff';
  const tooltipBorder = theme === 'dark' ? '#4B5563' : '#D1D5DB';
  const tooltipText = theme === 'dark' ? '#E5E7EB' : '#1F2937';

  return (
    <div style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-color)' }} className="p-4 m-2 rounded-lg w-[100%] border">
      <h3 style={{ color: 'var(--text-primary)' }} className="text-lg font-semibold text-center mb-4">
        Distribution of Technologies used
      </h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Tooltip
            contentStyle={{ backgroundColor: tooltipBg, border: `1px solid ${tooltipBorder}`, borderRadius: '8px' }}
            itemStyle={{ color: tooltipText }}
          />
          <Pie data={pieData} dataKey="count" nameKey="technology" cx="50%" cy="50%"
          label={({ technology, count }) => `${technology}: ${count}`}
          >
            {pieData.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default React.memo(TechnologyPieChart, (prevProps, nextProps) => {
  return JSON.stringify(prevProps.filters) === JSON.stringify(nextProps.filters);
});
