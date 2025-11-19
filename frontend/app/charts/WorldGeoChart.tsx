import React, { useState, useEffect } from 'react';
import { Chart } from "react-google-charts";
import { useTheme } from '~/context/ThemeContext';

function WorldGeoChart({ filters }: { filters: Record<string, any> }) {
  const { theme } = useTheme();
  const [GeoData, setGeoData] = useState<[string, string | number][]>([["Country", "Count"]]);

  // Function to convert database format to Google Charts format
const prepareGeoChartData = (entries: any[]) => {
  const countryCounts: { [key: string]: number } = {};
  entries.forEach(entry => {
    const countryString = entry.country;
    const entryCount = entry.count || 1;
    if (!countryString) return;
      const countries = countryString
      .split(';')
      .map((c: string) => c.trim())
      .filter((c: string) => c !== '');
    countries.forEach((country: string) => {
      countryCounts[country] = (countryCounts[country] || 0) + entryCount;
    });
  });
    
  // Convert to Google Charts format
  return [
    ['Country', 'Count'],
    ...Object.entries(countryCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([country, count]) => [country, count])
  ];
};

  useEffect(() => {
    const fetchGeoData = async () => {
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
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/visualizations/geodata?${queryParams}`);
        const data = await response.json();
        if (data.success && data.data) {
          const chartData = prepareGeoChartData(data.data, 'country');
          setGeoData(chartData);
        }
      } catch (error) {
        console.error('Failed to fetch chart data:', error);
        setGeoData([["Country", "Count"]]);
      }
    };
    fetchGeoData();
  }, [filters]);

  return (
    <div style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-color)' }} className="p-4 m-2 rounded-lg border">
        <h3 style={{ color: 'var(--text-primary)' }} className="text-lg font-semibold text-center mb-4">Map of location of publications</h3>
        <Chart
        className="rounded-lg m-1"
        chartType="GeoChart"
        data={GeoData}
        width="100%"
        height="500px"
        options={{
            backgroundColor: {
                fill: theme === 'dark' ? "#1F2937" : "#ffffff",
                fillOpacity: 1,
            },
            colorAxis: {
            values: [1, 10, 100, 250, 550],
            colors: ["#e0f7e9", "#a5d6a7", "#66bb6a", "#2e7d32", "#1b5e20",],
            },
        }}
        />
    </div>
  );
}

export default React.memo(WorldGeoChart);
