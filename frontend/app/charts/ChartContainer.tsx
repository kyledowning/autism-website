import React from 'react';
import YearChart from './YearChart';
import TechnologyPieChart from './TechnologyPieChart';
import JournalPieChart from './JournalPieChart';
import KeywordBarChart from './KeywordBarChart';

export function ChartContainer({ filters }: { filters: Record<string, any> }) {
  return (
    <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-700">
      <YearChart filters={filters} />
      <div className="flex flex-row">
        <TechnologyPieChart filters={filters} />
      </div>
      <KeywordBarChart filters={filters} />
    </div>
  );
}
