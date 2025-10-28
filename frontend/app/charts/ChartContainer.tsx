import React from 'react';
import YearChart from './YearChart';
import TechnologyPieChart from './TechnologyPieChart';
import JournalPieChart from './JournalPieChart';
import KeywordBarChart from './KeywordBarChart';
import WorldGeoChart from './WorldGeoChart';

export function ChartContainer({ filters }: { filters: Record<string, any> }) {
  return (
    <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-700">
      <YearChart filters={filters} />
      <WorldGeoChart filters={filters}/>
      <KeywordBarChart filters={filters} />
      <TechnologyPieChart filters={filters} />
    </div>
  );
}
