import React, { useState, useEffect } from 'react';
import { BarChart, CartesianGrid, Tooltip, XAxis, YAxis, Bar, ResponsiveContainer } from 'recharts';
import { useTheme } from '~/context/ThemeContext';

const COLORS = ['#93C5FD', '#6EE7B7', '#FCD34D', '#FCA5A5', '#C4B5FD'];

function KeywordBarChart({ filters }: { filters: Record<string, any> }) {
  const { theme } = useTheme();
  const [keywordData, setKeywordData] = useState<{ name: string; count: number }[]>([]);

  useEffect(() => {
    const fetchKeywordData = async () => {
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
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/visualizations/keyworddistribution?${queryParams}`);
        const data = await response.json();
        if (data.success) {
          const formatted = data.data.map(item => ({
            name: item.keyword,
            count: item.count
          }));
          setKeywordData(formatted);
        }
      } catch (error) {
        console.error('Failed to fetch keyword data:', error);
        setKeywordData([]);
      }
    };
    fetchKeywordData();
  }, [filters]);

  const gridColor = theme === 'dark' ? '#4B5563' : '#D1D5DB';
  const axisColor = theme === 'dark' ? '#9CA3AF' : '#6B7280';
  const tooltipBg = theme === 'dark' ? '#1a202c' : '#ffffff';
  const tooltipBorder = theme === 'dark' ? '#4B5563' : '#D1D5DB';
  const tooltipText = theme === 'dark' ? '#E5E7EB' : '#1F2937';

  return (
        <div style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-color)' }} className="p-4 m-2 rounded-lg shadow-md border">
          <h2 style={{ color: 'var(--text-primary)' }} className="text-lg font-semibold mb-4 text-center">Top Keywords</h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={keywordData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis type="number" dataKey="count" stroke={axisColor} />
              <YAxis
                type="category"
                dataKey="name"
                stroke={axisColor}
                width={120}
              />
              <Tooltip
                contentStyle={{ backgroundColor: tooltipBg, border: `1px solid ${tooltipBorder}`, borderRadius: '8px' }}
                labelStyle={{ color: tooltipText }}
                itemStyle={{ color: '#6EE7B7' }}
              />
              <Bar dataKey="count" fill="#93C5FD" />
            </BarChart>
          </ResponsiveContainer>
        </div>
  );
}

export default React.memo(KeywordBarChart, (prevProps, nextProps) => {
  return JSON.stringify(prevProps.filters) === JSON.stringify(nextProps.filters);
});
