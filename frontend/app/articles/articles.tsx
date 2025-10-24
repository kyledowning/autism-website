import React, { useState, useEffect, useMemo } from 'react';
import { ArticleBox } from '~/articleBox/articleBox';
import { ChartContainer } from '~/charts/ChartContainer';
import  FilterPanel from '~/filters/FilterPanel'

export default function Articles() {

  const [inputValue, setInputValue] = useState('');
  const [length, setLength] = useState(0);
  const [data, setData] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);

  const [showAbstract, setShowAbstract] = useState(false);
  const [showKeywords, setShowKeywords] = useState(false);

  const [visibleCount, setVisibleCount] = useState(10);
  const ITEMS_PER_LOAD = 10;

  const [search, setSearch] = useState('');
  const [selectedAge, setSelectedAge] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedParticipantNumber, setSelectedParticipantNumber] = useState('');
  const [selectedTargetUser, setSelectedTargetUser] = useState('');
  const [selectedTechnology, setSelectedTechnology] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedChallenge, setSelectedChallenge] = useState('');
  const [selectedProblem, setSelectedProblem] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedRace, setSelectedRace] = useState('');

  const [selectedSearchType, setSelectedSearchType] = useState('t1');

  const [selectedDataset, setSelectedDataset] = useState('');

  const handleSearch = () => {
    setSearch(inputValue);
    setVisibleCount(10);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const loadMore = () => {
    setVisibleCount(prev => prev + ITEMS_PER_LOAD);
  };

  const resetFilters = () => {
    setSelectedAge('');
    setSelectedLanguage('');
    setSelectedParticipantNumber('');
    setSelectedTargetUser('');
    setSelectedTechnology('');
    setSelectedGender('');
    setSelectedChallenge('');
    setSelectedProblem('');
    setInputValue('');
    setSearch('');
    setSelectedLevel('');
    setSelectedDataset('');
    setSelectedRace('');
    setSelectedSearchType('t1')
    setVisibleCount(10);
  };

  // API Request. Dependencies on filter and search state.
  useEffect(() => {
    if (search || selectedAge || selectedLanguage || selectedParticipantNumber || selectedTargetUser || selectedTechnology || selectedGender || selectedChallenge || selectedProblem || selectedDataset || selectedLevel || selectedRace || selectedSearchType) {
      setLoading(true);
      setVisibleCount(10); // Reset visible count when filters change
      fetch(`/api/data?` +
      `q=${encodeURIComponent(search)}&` +
      `searchtype=${encodeURIComponent(selectedSearchType)}&` +
      `age=${encodeURIComponent(selectedAge)}&` +
      `language=${encodeURIComponent(selectedLanguage)}&` +
      `participantnumber=${encodeURIComponent(selectedParticipantNumber)}&` +
      `targetuser=${encodeURIComponent(selectedTargetUser)}&` +
      `technology=${encodeURIComponent(selectedTechnology)}&` +
      `gender=${encodeURIComponent(selectedGender)}&` +
      `challenge=${encodeURIComponent(selectedChallenge)}&` +
      `problem=${encodeURIComponent(selectedProblem)}&` +
      `level=${encodeURIComponent(selectedLevel)}&` +
      `race=${encodeURIComponent(selectedRace)}&` +
      `dataset=${encodeURIComponent(selectedDataset)}`)
        .then(response => response.json())
        .then(response => {
          setData(response.data);
          setLength(response.count);
          setLoading(false);
        })
        .catch(error => {
          setLoading(false);
          console.log("API request failed.", error);
        });
    } else if (!search) {
      setLoading(true);
      setVisibleCount(10);
      fetch(`http://127.0.0.1:5055/api/data`)
        .then(response => response.json())
        .then(response => {
          setData(response.data);
          setLength(response.count);
          setLoading(false);
        })
        .catch(error => {
          setLoading(false);
          console.log("API request failed.", error);
        });
    }
  }, [search, selectedAge, selectedLanguage, selectedParticipantNumber, selectedTargetUser, selectedTechnology, selectedGender, selectedChallenge, selectedProblem, selectedDataset, selectedLevel, selectedRace, selectedSearchType]);

  const currentFilters = useMemo(() => ({
    search,
    selectedSearchType,
    selectedAge,
    selectedLanguage,
    selectedParticipantNumber,
    selectedTargetUser,
    selectedTechnology,
    selectedGender,
    selectedChallenge,
    selectedProblem,
    selectedLevel,
    selectedRace,
    selectedDataset
  }), [
    search,
    selectedSearchType,
    selectedAge,
    selectedLanguage,
    selectedParticipantNumber,
    selectedTargetUser,
    selectedTechnology,
    selectedGender,
    selectedChallenge,
    selectedProblem,
    selectedLevel,
    selectedRace,
    selectedDataset
  ]);

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className='min-h-screen px-4 sm:px-6 lg:px-10'>
        <div className="flex flex-col sm:flex-row gap-2 pt-4 sm:pt-6 lg:pt-10 pb-5">
          <input 
            type="text" 
            value={inputValue} 
            onKeyDown={handleKeyPress}
            onChange={(e) => setInputValue(e.target.value)} 
            placeholder="Search" 
            className="flex-1 px-3 sm:px-4 py-3 sm:py-4 lg:py-5 border border-gray-600 bg-gray-750 text-white placeholder-gray-400 rounded-2xl text-sm sm:text-base focus:outline-none focus:border-blue-500 transition-colors"/>
          <button 
            onClick={handleSearch} 
            className="px-4 sm:px-20 py-3 sm:py-4 lg:py-2 bg-blue-900 border-blue-500 border text-white rounded-2xl text-sm sm:text-base whitespace-nowrap shadow-sm hover:bg-blue-700 hover:shadow-lg active:bg-blue-800 transition-all duration-300 cursor-pointer">
            Search
          </button>
          <button 
            className='px-4 sm:px-20 py-3 sm:py-4 lg:py-2 bg-red-700 border-red-500 border text-white rounded-2xl text-sm sm:text-base whitespace-nowrap shadow-sm hover:bg-red-600 hover:shadow-lg transition-all duration-300 cursor-pointer' 
            onClick={() => resetFilters()}>
            Reset
          </button>
          <button 
            className='px-4 sm:px-20 py-3 sm:py-4 lg:py-2 bg-gray-600 text-white rounded-2xl text-sm sm:text-base whitespace-nowrap shadow-sm hover:bg-gray-700 hover:shadow-lg transition-all duration-300 cursor-pointer' 
            onClick={() => setShowFilters(!showFilters)}>
             Show Filters
          </button>
        </div>

        {showFilters && 
          <FilterPanel
            showFilters={showFilters}
            selectedAge={selectedAge}
            setSelectedAge={setSelectedAge}
            selectedGender={selectedGender}
            setSelectedGender={setSelectedGender}
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
            selectedParticipantNumber={selectedParticipantNumber}
            setSelectedParticipantNumber={setSelectedParticipantNumber}
            selectedTargetUser={selectedTargetUser}
            setSelectedTargetUser={setSelectedTargetUser}
            selectedTechnology={selectedTechnology}
            setSelectedTechnology={setSelectedTechnology}
            selectedChallenge={selectedChallenge}
            setSelectedChallenge={setSelectedChallenge}
            selectedProblem={selectedProblem}
            setSelectedProblem={setSelectedProblem}
            selectedLevel={selectedLevel}
            setSelectedLevel={setSelectedLevel}
            selectedRace={selectedRace}
            setSelectedRace={setSelectedRace}
            selectedDataset={selectedDataset}
            setSelectedDataset={setSelectedDataset}
            selectedSearchType={selectedSearchType}
            setSelectedSearchType={setSelectedSearchType}
          />
        }

        {data && length > 0 && 
          <div className='mb-2'>
            <h1 className='text-gray-400 text-sm sm:text-base'>{length} Responses - <b className="text-blue-400"> {((length / 2709)*100).toFixed(2)}% </b> of total dataset</h1>          
            <button onClick={() => (setShowAbstract(!showAbstract))} className='rounded-lg border border-blue-500 bg-blue-900 text-blue-100 my-2 p-2 mr-2 hover:bg-blue-800 hover:shadow-md transition-all duration-300 cursor-pointer'>Show Abstract</button>
            <button onClick={() => (setShowKeywords(!showKeywords))} className='rounded-lg border border-blue-500 bg-blue-900 text-blue-100 my-2 p-2 mr-2 hover:bg-blue-800 hover:shadow-md transition-all duration-300 cursor-pointer'>Show Keywords</button>
          </div>
        }

        <div className='grid grid-cols-1 gap-5 md:grid md:grid-cols-2 md:gap-5 pb-15'>
          <div className="h-[70vh] sm:h-[75vh] bg-gray-750 rounded-lg shadow-lg border border-gray-600 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-700">
            {loading && (
              <div className="p-4 text-gray-400 text-center">Loading...</div>
            )}
            {!loading && length === 0 && (
              <div className="p-4 text-red-400 text-center">No Entries Found</div>
            )}
            {!loading && length > 0 && (
              <div className="p-2 sm:p-4">
                {data.slice(0, visibleCount).map((entry, index) => (
                  <ArticleBox key={index} article={entry} searchQuery={search} showAbstract={showAbstract} showKeywords={showKeywords}/>
              ))}
              {visibleCount < length && (
                <div className="text-center py-4">
                  <button 
                    onClick={loadMore}
                    className="cursor-pointer px-6 py-3 text-black rounded-lg border-black shadow-md bg-gray-200 transition-all duration-300 hover:shadow-lg y-2">
                    Load More
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="h-[70vh] sm:h-[75vh] bg-gray-750 rounded-lg shadow-lg border border-gray-600">
          <ChartContainer filters={currentFilters} />
          <div className='grid grid-cols-2 gap-2'>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
