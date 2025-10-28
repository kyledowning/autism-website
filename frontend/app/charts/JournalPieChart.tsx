import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts';

const COLORS = ['#93C5FD', '#6EE7B7', '#FCD34D', '#FCA5A5', '#C4B5FD'];

export default function JournalPieChart({ filters }: { filters: Record<string, any> }) {
  const [journalData, setJournalData] = useState<{ technology: string; count: number }[]>([]);

  useEffect(() => {
    const fetchJournalData = async () => {
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
        });        const response = await fetch(`http://127.0.0.1:5055/api/visualizations/journaldistribution?${queryParams}`);
        const data = await response.json();
        if (data.success) {
          setJournalData(data.data || []);
        }
      } catch (error) {
        console.error('Failed to fetch chart data:', error);
        setJournalData([]);
      }
    };
    fetchJournalData();
  }, [filters]);

  return (
          <div className='bg-gray-750 p-4 m-2 rounded-lg w-1/2 border border-gray-600'>
            <h3 className="text-lg font-semibold text-center mb-4 text-gray-100">Distribution of Journal</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#4B5563', border: '1px solid #4B5563', borderRadius: '8px' }}
                  itemStyle={{ color: '#E5E7EB' }}
                />
                <Pie data={journalData} dataKey="count" nameKey="journal" cx="50%" cy="50%" fill="#8884d8"
                 label={({ journal, count }) => `${journal}: ${count}`}>
                  {journalData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}            
                </Pie> 
              </PieChart>
            </ResponsiveContainer>
          </div>
  );
}
