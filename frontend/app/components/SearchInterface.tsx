import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router';
import { ArticleBox } from '~/articleBox/articleBox';
import { ChartContainer } from '~/charts/ChartContainer';
import FilterPanel from '~/filters/FilterPanel';
import { useSearchFilters } from '~/hooks/useSearchFilters';
import { useArticleSearch } from '~/hooks/useArticleSearch';


export default function SearchInterface() {
  const [searchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState('');
  const [showFilters, setShowFilters] = useState(true);
  const [showVisualizations, setShowVisualizations] = useState(true);
  const [showAbstract, setShowAbstract] = useState(true);
  const [showKeywords, setShowKeywords] = useState(true);
  const [itemsPerLoad, setItemsPerLoad] = useState(10);

  const [visibleCount, setVisibleCount] = useState(itemsPerLoad);

  // Initialize filters from URL params
  const {
    filters,
    setSearch,
    setSearchType,
    setAge,
    setLanguage,
    setParticipantNumber,
    setTargetUser,
    setTechnology,
    setGender,
    setChallenge,
    setProblem,
    setLevel,
    setRace,
    setDataset,
    resetFilters,
  } = useSearchFilters();

  // Set initial search from URL parameter
  useEffect(() => {
    const queryParam = searchParams.get('q');
    if (queryParam) {
      setInputValue(queryParam);
      setSearch(queryParam);
    }
  }, [searchParams, setSearch]);

  // Fetch articles based on current filters
  const { data, count, loading, error } = useArticleSearch(filters);

  const handleSearch = () => {
    setSearch(inputValue);
    setVisibleCount(itemsPerLoad);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const loadMore = () => {
    setVisibleCount((prev) => prev + itemsPerLoad);
  };

  const handleResetFilters = () => {
    resetFilters();
    setInputValue('');
    setItemsPerLoad(10);
    setVisibleCount(itemsPerLoad);
  };

  // Memoize current filters object for visualizations
  const currentFilters = useMemo(
    () => ({
      search: filters.search,
      selectedSearchType: filters.selectedSearchType,
      selectedAge: filters.selectedAge,
      selectedLanguage: filters.selectedLanguage,
      selectedParticipantNumber: filters.selectedParticipantNumber,
      selectedTargetUser: filters.selectedTargetUser,
      selectedTechnology: filters.selectedTechnology,
      selectedGender: filters.selectedGender,
      selectedChallenge: filters.selectedChallenge,
      selectedProblem: filters.selectedProblem,
      selectedLevel: filters.selectedLevel,
      selectedRace: filters.selectedRace,
      selectedDataset: filters.selectedDataset,
    }),
    [filters]
  );

  // Check if any filters are active
  const hasActiveFilters =
    filters.search ||
    filters.selectedAge ||
    filters.selectedLanguage ||
    filters.selectedParticipantNumber ||
    filters.selectedTargetUser ||
    filters.selectedTechnology ||
    filters.selectedGender ||
    filters.selectedChallenge ||
    filters.selectedProblem ||
    filters.selectedDataset ||
    filters.selectedLevel ||
    filters.selectedRace ||
    filters.selectedSearchType !== 't1';

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)' }} className="min-h-screen">
      
      <div className="min-h-screen px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col sm:flex-row gap-2 pt-4 sm:pt-6 lg:pt-10 pb-5">

          {/* Search Input */}
          <input
            type="text"
            value={inputValue}
            onKeyDown={handleKeyPress}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)',
            }}
            className="flex-1 px-3 sm:px-4 py-3 sm:py-4 lg:py-5 border placeholder-gray-400 rounded-2xl text-sm sm:text-base focus:outline-none focus:border-blue-500 transition-colors shadow-md"
          />
          <button
            onClick={handleSearch}
            style={{
              backgroundColor: 'var(--bg-secondary)',
              borderColor: 'blue',
              color: 'var(--text-primary)',
            }}
            className="px-4 sm:px-20 py-3 sm:py-4 lg:py-2 border rounded-2xl text-sm sm:text-base whitespace-nowrap shadow-sm hover:shadow-lg hover:bg-blue-500 transition-all duration-300 cursor-pointer"
          >
            Search
          </button>
          <button
            onClick={handleResetFilters}
            style={{
              backgroundColor: 'var(--bg-secondary)',
              borderColor: 'red',
              color: 'var(--text-primary)',
            }}
            className="px-4 sm:px-20 py-3 sm:py-4 lg:py-2 border rounded-2xl text-sm sm:text-base whitespace-nowrap shadow-sm hover:shadow-lg hover:bg-red-500 transition-all duration-300 cursor-pointer"
          >
            Reset
          </button>
          <button
            onClick={() => setShowVisualizations(!showVisualizations)}
            style={{
              backgroundColor: 'var(--bg-secondary)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)',
            }}
            className="text-sm sm:text-base whitespace-nowrap px-4 sm:px-12 py-3 sm:py-4 lg:py-2 border rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer flex items-center gap-2 justify-center"
          >
            {showVisualizations ? 'Hide' : 'Show'} Visualizations
          </button>

        </div>

        {/* Results Info */}
        <div className="mb-4">
          <h1 style={{ color: 'var(--text-secondary)' }} className="text-sm sm:text-base">
            {count} Responses - <b className="text-blue-400"> {((count / 2709) * 100).toFixed(2)}% </b> of
            total dataset
          </h1>

          {/* Toggle Abstract */}
          <button
            onClick={() => setShowAbstract(!showAbstract)}
            className="rounded-lg border border-blue-500 bg-blue-900 text-blue-100 my-2 p-2 mr-2 hover:bg-blue-800 hover:shadow-md transition-all duration-300 cursor-pointer"
          >
            {showAbstract ? 'Hide' : 'Show'} Abstract
          </button>

          {/* Toggle Keywords */}
          <button
            onClick={() => setShowKeywords(!showKeywords)}
            className="rounded-lg border border-blue-500 bg-blue-900 text-blue-100 my-2 p-2 mr-2 hover:bg-blue-800 hover:shadow-md transition-all duration-300 cursor-pointer"
          >
            {showKeywords ? 'Hide' : 'Show'} Keywords
          </button>

          {/* Entries per Load */}
          <input
            type="number"
            value={itemsPerLoad}
            onChange={(e) => setItemsPerLoad(Number(e.target.value))}
            style={{
              backgroundColor: 'var(--bg-secondary)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)',
            }}
            className="w-20 px-2 py-2.5 ml-2 border rounded-lg text-sm focus:outline-none focus:border-blue-500 transition-colors"
          />
          <label htmlFor="input"> Entries Per Load</label>
        </div>

        {/* Active Filters */}
        <div
          style={{
            backgroundColor: 'var(--bg-secondary, #f9fafb)',
            borderColor: 'var(--border-color, transparent)',
          }}
          className="mb-4 p-3 rounded-lg border"
        >
          <h2
            style={{ color: 'var(--text-primary, #111827)' }}
            className="text-sm font-semibold mb-2"
          >
            Active Filters:
          </h2>
          <div className="flex flex-wrap gap-2">
            {filters.search && (
              <button
                onClick={() => {
                  setInputValue('');
                  setSearch('');
                }}
                className="inline-flex items-center gap-1 px-3 py-1 bg-blue-500 text-white text-sm rounded-full hover:bg-blue-600 transition-colors cursor-pointer"
              >
                <span>Search: "{filters.search}"</span> ✕
              </button>
            )}
            {filters.selectedSearchType !== 't1' && (
              <button
                onClick={() => setSearchType('t1')}
                className="inline-flex items-center gap-1 px-3 py-1 bg-gray-500 text-white text-sm rounded-full hover:bg-gray-600 transition-colors cursor-pointer"
              >
                <span>Search Type: Full Text</span> ✕
              </button>
            )}
            {filters.selectedAge && (
              <button
                onClick={() => setAge('')}
                className="inline-flex items-center gap-1 px-3 py-1 bg-gray-500 text-white text-sm rounded-full hover:bg-gray-600 transition-colors cursor-pointer"
              >
                <span>Age: {filters.selectedAge}</span> ✕
              </button>
            )}
            {filters.selectedGender && (
              <button
                onClick={() => setGender('')}
                className="inline-flex items-center gap-1 px-3 py-1 bg-gray-500 text-white text-sm rounded-full hover:bg-gray-600 transition-colors cursor-pointer"
              >
                <span>Gender: {filters.selectedGender}</span> ✕
              </button>
            )}
            {filters.selectedLanguage && (
              <button
                onClick={() => setLanguage('')}
                className="inline-flex items-center gap-1 px-3 py-1 bg-gray-500 text-white text-sm rounded-full hover:bg-gray-600 transition-colors cursor-pointer"
              >
                <span>Language: {filters.selectedLanguage}</span> ✕
              </button>
            )}
            {filters.selectedParticipantNumber && (
              <button
                onClick={() => setParticipantNumber('')}
                className="inline-flex items-center gap-1 px-3 py-1 bg-gray-500 text-white text-sm rounded-full hover:bg-gray-600 transition-colors cursor-pointer"
              >
                <span>Participant Size: {filters.selectedParticipantNumber}</span> ✕
              </button>
            )}
            {filters.selectedTargetUser && (
              <button
                onClick={() => setTargetUser('')}
                className="inline-flex items-center gap-1 px-3 py-1 bg-gray-500 text-white text-sm rounded-full hover:bg-gray-600 transition-colors cursor-pointer"
              >
                <span>Target User: {filters.selectedTargetUser}</span> ✕
              </button>
            )}
            {filters.selectedTechnology && (
              <button
                onClick={() => setTechnology('')}
                className="inline-flex items-center gap-1 px-3 py-1 bg-gray-500 text-white text-sm rounded-full hover:bg-gray-600 transition-colors cursor-pointer"
              >
                <span>Technology: {filters.selectedTechnology}</span> ✕
              </button>
            )}
            {filters.selectedChallenge && (
              <button
                onClick={() => setChallenge('')}
                className="inline-flex items-center gap-1 px-3 py-1 bg-gray-500 text-white text-sm rounded-full hover:bg-gray-600 transition-colors cursor-pointer"
              >
                <span>Challenge: {filters.selectedChallenge}</span> ✕
              </button>
            )}
            {filters.selectedProblem && (
              <button
                onClick={() => setProblem('')}
                className="inline-flex items-center gap-1 px-3 py-1 bg-gray-500 text-white text-sm rounded-full hover:bg-gray-600 transition-colors cursor-pointer"
              >
                <span>Problem: {filters.selectedProblem}</span> ✕
              </button>
            )}
            {filters.selectedLevel && (
              <button
                onClick={() => setLevel('')}
                className="inline-flex items-center gap-1 px-3 py-1 bg-gray-500 text-white text-sm rounded-full hover:bg-gray-600 transition-colors cursor-pointer"
              >
                <span>Level: {filters.selectedLevel}</span> ✕
              </button>
            )}
            {filters.selectedRace && (
              <button
                onClick={() => setRace('')}
                className="inline-flex items-center gap-1 px-3 py-1 bg-gray-500 text-white text-sm rounded-full hover:bg-gray-600 transition-colors cursor-pointer"
              >
                <span>Race: {filters.selectedRace}</span> ✕
              </button>
            )}
            {filters.selectedDataset && (
              <button
                onClick={() => setDataset('')}
                className="inline-flex items-center gap-1 px-3 py-1 bg-gray-500 text-white text-sm rounded-full hover:bg-gray-600 transition-colors cursor-pointer"
              >
                <span>Dataset: {filters.selectedDataset}</span> ✕
              </button>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex gap-5 pb-15 relative">

          {/* Filter Panel */}
          <div
            className={`transition-all duration-300 ${
              showFilters ? 'w-64 opacity-100' : 'w-0 opacity-0 overflow-hidden'
            }`}
          >
            <div className="sticky top-4">
              <FilterPanel
                showFilters={showFilters}
                selectedAge={filters.selectedAge}
                setSelectedAge={setAge}
                selectedGender={filters.selectedGender}
                setSelectedGender={setGender}
                selectedLanguage={filters.selectedLanguage}
                setSelectedLanguage={setLanguage}
                selectedParticipantNumber={filters.selectedParticipantNumber}
                setSelectedParticipantNumber={setParticipantNumber}
                selectedTargetUser={filters.selectedTargetUser}
                setSelectedTargetUser={setTargetUser}
                selectedTechnology={filters.selectedTechnology}
                setSelectedTechnology={setTechnology}
                selectedChallenge={filters.selectedChallenge}
                setSelectedChallenge={setChallenge}
                selectedProblem={filters.selectedProblem}
                setSelectedProblem={setProblem}
                selectedLevel={filters.selectedLevel}
                setSelectedLevel={setLevel}
                selectedRace={filters.selectedRace}
                setSelectedRace={setRace}
                selectedDataset={filters.selectedDataset}
                setSelectedDataset={setDataset}
                selectedSearchType={filters.selectedSearchType}
                setSelectedSearchType={(value: string) =>
                  setSearchType(value as 't1' | 't2')
                }
              />
            </div>
          </div>

          {/* Toggle Filter Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            style={{
              backgroundColor: 'var(--bg-tertiary)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)',
            }}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 border p-3 rounded-r-lg hover:bg-blue-500 transition-all duration-300 cursor-pointer ${
              showFilters ? 'translate-x-64' : 'translate-x-0'
            }`}
            title={showFilters ? 'Hide Filters' : 'Show Filters'}
          >
            {showFilters ? '<' : '>'}
          </button>

          <div
            className={`flex-1 grid gap-5 transition-all duration-300 ${
              showVisualizations ? 'md:grid-cols-2' : 'grid-cols-1'
            }`}
          >
            {/* Articles */}
            <div
              style={{
                backgroundColor: 'var(--bg-secondary)',
                borderColor: 'var(--border-color)',
              }}
              className="h-[70vh] sm:h-[75vh] rounded-lg shadow-lg border overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-700"
            >
              {loading && (
                <div style={{ color: 'var(--text-secondary)' }} className="p-4 text-center">
                  Loading...
                </div>
              )}
              {error && (
                <div className="p-4 text-red-400 text-center">Error: {error}</div>
              )}
              {!loading && !error && count === 0 && (
                <div className="p-4 text-red-400 text-center">No Entries Found</div>
              )}
              {!loading && !error && count > 0 && (
                <div className="p-2 sm:p-4">
                  {data.slice(0, visibleCount).map((entry, index) => (
                    <ArticleBox
                      key={index}
                      article={entry}
                      searchQuery={filters.search}
                      showAbstract={showAbstract}
                      showKeywords={showKeywords}
                      showAuthors={false}
                    />
                  ))}
                  {visibleCount < count && (
                    <div className="text-center py-4">
                      <button
                        onClick={loadMore}
                        style={{
                          backgroundColor: 'var(--bg-tertiary)',
                          borderColor: 'var(--border-color)',
                          color: 'var(--text-primary)',
                        }}
                        className="cursor-pointer px-6 py-3 rounded-lg border shadow-md transition-all duration-300 hover:shadow-lg hover:bg-blue-500"
                      >
                        Load {itemsPerLoad} More
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Visualizations */}
            {showVisualizations && (
              <div
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  borderColor: 'var(--border-color)',
                }}
                className="h-[70vh] sm:h-[75vh] rounded-lg shadow-lg border overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-700"
              >
                <ChartContainer filters={currentFilters} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
