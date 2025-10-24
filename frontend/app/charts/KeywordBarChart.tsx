import React, { useState, useEffect } from 'react';
import { BarChart, CartesianGrid, Tooltip, XAxis, YAxis, Bar, ResponsiveContainer } from 'recharts';

const COLORS = ['#93C5FD', '#6EE7B7', '#FCD34D', '#FCA5A5', '#C4B5FD'];

function KeywordBarChart({ filters }: { filters: Record<string, any> }) {
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
        });        const response = await fetch(`/api/visualizations/keyworddistribution?${queryParams}`);
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

  return (
        <div className="bg-gray-750 p-4 rounded-lg shadow-md border border-gray-600">
          <h2 className="text-lg font-semibold mb-4 text-center text-gray-100">Top Keywords</h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={keywordData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
              <XAxis type="number" dataKey="count" stroke="#9CA3AF" />
              <YAxis
                type="category"
                dataKey="name"
                stroke="#9CA3AF"
                width={120}
              />
              <Tooltip
                contentStyle={{ backgroundColor: '#4B5563', border: '1px solid #4B5563', borderRadius: '8px' }}
                labelStyle={{ color: '#E5E7EB' }}
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
