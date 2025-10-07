import React, { useState, useEffect } from 'react';
import { Footer } from '../footer/footer'
import { ArticleBox } from '~/articleBox/articleBox';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend } from 'recharts';


function YearChart({ filters }) {
  const COLORS = [
    '#6366F1',
    '#10B981', 
    '#F59E0B', 
    '#EF4444', 
    '#8B5CF6', 
    '#06B6D4', 
    '#84CC16', 
    '#F97316', 
    '#EC4899', 
    '#64748B'
  ];

  const [chartData, setChartData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [journalData, setJournalData] = useState([]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const queryParams = new URLSearchParams({
          q: filters.search || '',
          age: filters.selectedAge || '',
          language: filters.selectedLanguage || '',
          participantnumber: filters.selectedParticipantNumber || '',
          targetuser: filters.selectedTargetUser || '',
          technology: filters.selectedTechnology || '',
          gender: filters.selectedGender || '',
          challenge: filters.selectedChallenge || '',
          problem: filters.selectedProblem|| '',
          dataset: filters.selectedDataset|| ''
        });
        const response = await fetch(`http://127.0.0.1:5055/api/visualizations/yeardistribution?${queryParams}`);
        console.log(`http://127.0.0.1:5055/api/visualizations/yeardistribution?${queryParams}`);
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

  useEffect(() => {
    const fetchPieData = async () => {
      try {
        const queryParams = new URLSearchParams({
          q: filters.search || '',
          age: filters.selectedAge || '',
          language: filters.selectedLanguage || '',
          participantnumber: filters.selectedParticipantNumber || '',
          targetuser: filters.selectedTargetUser || '',
          technology: filters.selectedTechnology || '',
          gender: filters.selectedGender || '',
          challenge: filters.selectedChallenge || '',
          problem: filters.selectedProblem|| '',
          dataset: filters.selectedDataset|| ''
        });
        const response = await fetch(`http://127.0.0.1:5055/api/visualizations/technologydistribution?${queryParams}`);
        const data = await response.json();
        if (data.success) {
          setPieData(data.data || []);
        }
      } catch (error) {
        console.error('Failed to fetch chart data:', error);
        setPieData([]);
      }
    };
    fetchPieData();
  }, [filters]);

  useEffect(() => {
    const fetchJournalData = async () => {
      try {
        const queryParams = new URLSearchParams({
          q: filters.search || '',
          age: filters.selectedAge || '',
          language: filters.selectedLanguage || '',
          participantnumber: filters.selectedParticipantNumber || '',
          targetuser: filters.selectedTargetUser || '',
          technology: filters.selectedTechnology || '',
          gender: filters.selectedGender || '',
          challenge: filters.selectedChallenge || '',
          problem: filters.selectedProblem|| '',
          dataset: filters.selectedDataset|| ''
        });
        const response = await fetch(`http://127.0.0.1:5055/api/visualizations/journaldistribution?${queryParams}`);
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
    <div>
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">Publications by year</h2>
      </div>
      <div className="p-4">
        <div className="bg-gray-50 p-4 m-2 rounded-lg">
          <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className='flex flex-row'>
          <div className='bg-gray-50 p-4 m-2 rounded-lg w-1/2'>
            <h3 className="text-lg font-semibold text-center mb-4">Distribution of Technologies used</h3>
            <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Tooltip />
              <Pie data={pieData} dataKey="count" nameKey="technology" cx="50%" cy="50%" fill="#8884d8">
              {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}            
              </Pie> 
            </PieChart>
            </ResponsiveContainer>
          </div>
          <div className='bg-gray-50 p-4 m-2 rounded-lg w-1/2'>
            <h3 className="text-lg font-semibold text-center mb-4">Distribution of Journal</h3>
            <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Tooltip />
              <Pie data={journalData} dataKey="count" nameKey="journal" cx="50%" cy="50%" fill="#8884d8">
              {journalData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}            
              </Pie> 
            </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Articles() {

  const [inputValue, setInputValue] = useState('');
  const [length, setLength] = useState(0);
  const [data, setData] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);

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
    setSelectedDataset('');
    setVisibleCount(10);
  };

  // API Request. Dependencies on filter and search state.
  useEffect(() => {
    if (search || selectedAge || selectedLanguage || selectedParticipantNumber || selectedTargetUser || selectedTechnology || selectedGender || selectedChallenge || selectedProblem || selectedDataset) {
      setLoading(true);
      setVisibleCount(10); // Reset visible count when filters change
      fetch(`http://127.0.0.1:5055/api/data?` +
      `q=${encodeURIComponent(search)}&` +
      `age=${encodeURIComponent(selectedAge)}&` +
      `language=${encodeURIComponent(selectedLanguage)}&` +
      `participantnumber=${encodeURIComponent(selectedParticipantNumber)}&` +
      `targetuser=${encodeURIComponent(selectedTargetUser)}&` +
      `technology=${encodeURIComponent(selectedTechnology)}&` +
      `gender=${encodeURIComponent(selectedGender)}&` +
      `challenge=${encodeURIComponent(selectedChallenge)}&` +
      `problem=${encodeURIComponent(selectedProblem)}&` +
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
      setVisibleCount(10); // Reset visible count when filters change
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
  }, [search, selectedAge, selectedLanguage, selectedParticipantNumber, selectedTargetUser, selectedTechnology, selectedGender, selectedChallenge, selectedProblem, selectedDataset]);

  // Prepare filter object for visualization component
  const currentFilters = {
    search,
    selectedAge,
    selectedLanguage,
    selectedParticipantNumber,
    selectedTargetUser,
    selectedTechnology,
    selectedGender,
    selectedChallenge,
    selectedProblem
  };

  return (
    <div>
    <div className='min-h-screen px-4 sm:px-6 lg:px-10'>
      <div className="flex flex-col sm:flex-row gap-2 mt-1 pt-4 sm:pt-6 lg:pt-10 pb-5">
        <input 
          type="text" 
          value={inputValue} 
          onKeyDown={handleKeyPress}
          onChange={(e) => setInputValue(e.target.value)} 
          placeholder="Search" 
          className="flex-1 px-3 sm:px-4 py-3 sm:py-4 lg:py-5 border border-gray-700 rounded-2xl text-sm sm:text-base"/>
          
        <select 
          id="dataset" 
          value={selectedDataset}
          onChange={(e) => setSelectedDataset(e.target.value)}
          className='mx-2 p-2 rounded border text-sm sm:text-base bg-gray-50 text-center'>
          <option value="">Dataset</option>
          <option value="ACM Digital Library">ACM</option>
          <option value="IEEE Explore">IEEE</option>
        </select>

        <button 
          onClick={handleSearch} 
          className="px-4 sm:px-20 py-3 sm:py-4 lg:py-2 bg-[#9095a0] text-white rounded-2xl text-sm sm:text-base whitespace-nowrap shadow-sm bg-gray-400 hover:bg-gray-600 hover:shadow-lg transition-all duration-300 cursor-pointer">
          Search
        </button>
        <button className='px-4 sm:px-20 py-3 sm:py-4 lg:py-2 bg-red-400 text-white rounded-2xl text-sm sm:text-base whitespace-nowrap 
          shadow-sm bg-red-450 hover:bg-red-600 hover:shadow-lg transition-all duration-300 cursor-pointer' onClick={() => resetFilters()}>Reset</button>
      </div>

      <div className={`flex flex-row flex-wrap p-3 mb-5 sm:p-4 bg-gray-75 rounded-lg border transition-all duration-300 max-h-150 opacity-100`}>
        <select 
          id="age" 
          value={selectedAge} 
          onChange={(e) => setSelectedAge(e.target.value)} 
          className='mx-1 my-2 p-2 rounded border text-sm sm:text-base bg-gray-50'>
          <option value="">-- Select Age Group --</option>
          <option value="child">Age: Child</option>
          <option value="youngadult">Age: Young Adult</option>
          <option value="adolescent">Age: Adolescent</option>
          <option value="adult">Age: Adult</option>
        </select>

        <select 
          id="gender" 
          value={selectedGender} 
          onChange={(e) => setSelectedGender(e.target.value)} 
          className='mx-1 my-2 p-2 rounded border text-sm sm:text-base bg-gray-50'>
          <option value="">-- Select Gender --</option>
          <option value="onlyfemale">Gender: Female (only)</option>
          <option value="primarilyfemale">Gender: Female (mostly)</option>
          <option value="onlymale">Gender: Male (only)</option>
          <option value="primarilymale">Gender: Female (mostly)</option>
          <option value="onlynonbinary">Gender: Non-binary (only)</option>
          <option value="primarilynonbinary">Gender: Non-binary (mostly)</option>
          <option value="transgender">Gender: Transgender</option>
        </select>

        <select 
          id="language" 
          value={selectedLanguage} 
          onChange={(e) => setSelectedLanguage(e.target.value)} 
          className='mx-1 my-2 p-2 rounded border text-sm sm:text-base bg-gray-50'>
          <option value="">-- Select Language Type --</option>
          <option value="personfirst"> Language Type: Person First</option>
          <option value="identityfirst">Language Type: Identity First</option>
          <option value="mixed">Language Type: Mixed</option>
          <option value="avoidant">Language Type: Avoidant</option>
        </select>

        <select 
          id="participantnumber" 
          value={selectedParticipantNumber} 
          onChange={(e) => setSelectedParticipantNumber(e.target.value)} 
          className='mx-1 my-2 p-2 rounded border text-sm sm:text-base bg-gray-50'>
          <option value="">-- Select Participant Size --</option>
          <option value="small">Participant Size: Small</option>
          <option value="medium">Participant Size: Medium</option>
          <option value="large">Participant Size: Large</option>
        </select>

        <select 
          id="targetuser" 
          value={selectedTargetUser} 
          onChange={(e) => setSelectedTargetUser(e.target.value)} 
          className='mx-1 my-2 p-2 rounded border text-sm sm:text-base bg-gray-50'>
          <option value="">-- Select Target User Type --</option>
          <option value="researchers">Target User: Researchers</option>
          <option value="autisticpeople">Target User: Persons with Autism</option>
          <option value="parents">Target User: Parents</option>
          <option value="teachers">Target User: Teachers</option>
          <option value="caregivers">Target User: Caregivers</option>
        </select>

        <select 
          id="technology" 
          value={selectedTechnology} 
          onChange={(e) => setSelectedTechnology(e.target.value)} 
          className='mx-1 my-2 p-2 rounded border text-sm sm:text-base bg-gray-50'>
          <option value="">-- Select Technology Type --</option>
          <option value="machinelearning">Technology: Machine Learning</option>
          <option value="robot">Technology: Robot</option>
          <option value="fMRI">Technology: fMRI</option>
          <option value="virtualreality">Technology: VR</option>
          <option value="game">Technology: Game</option>
          <option value="eyetracking">Technology: Eye Tracking</option>
          <option value="neuralnetwork">Technology: Neural Network</option>
          <option value="facialrecognition">Technology: Facial Recognition</option>
          <option value="deeplearning">Technology: Deep Learning</option>
          <option value="literaturereview">Technology: Literature Review</option>
          <option value="mobileapp">Technology: Mobile App</option>
        </select>

        <select 
          id="challenge" 
          value={selectedChallenge} 
          onChange={(e) => setSelectedChallenge(e.target.value)} 
          className='mx-1 my-2 p-2 rounded border text-sm sm:text-base bg-gray-50'>
          <option value="">-- Select Challenge Type --</option>
          <option value="social">Challenge: Social</option>
          <option value="communication">Challenge: Communication</option>
          <option value="repetitivebehavior">Challenge: Repetitive Behavior</option>
          <option value="emotion">Challenge: Emotion</option>
        </select>

        <select 
          id="problem" 
          value={selectedProblem} 
          onChange={(e) => setSelectedProblem(e.target.value)} 
          className='mx-1 my-2 p-2 rounded border text-sm sm:text-base bg-gray-50'>
          <option value="">-- Select Problem Type --</option>
          <option value="intervention">Problem: Intervention</option>
          <option value="diagnosis">Problem: Diagnosis</option>
        </select>
      </div>

      {data && length > 0 && (
        <h1 className='text-gray-500 mb-2 text-sm sm:text-base'>{length} Responses - <b> {((length / 2709)*100).toFixed(2)}% </b> of total dataset</h1>
      )}

      <div className='grid grid-cols-2 gap-5'>
        <div className="h-[75vh] sm:h-235 overflow-y-auto bg-white rounded-lg shadow-lg border border-gray-200 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
          {loading && (
            <div className="p-4 text-gray-400 text-center">Loading...</div>
          )}
          {!loading && length === 0 && (
            <div className="p-4 text-red-400 text-center">No Entries Found</div>
          )}
          {!loading && length > 0 && (
            <div className="p-2 sm:p-4">
              {data.slice(0, visibleCount).map((entry, index) => (
                <ArticleBox key={index} article={entry} searchQuery={search}/>
              ))}
              {visibleCount < length && (
                <div className="text-center py-4">
                  <button 
                    onClick={loadMore}
                    className="px-6 py-3 text-black rounded-lg border-black bg-gray-200">
                    Load More
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="bg-white rounded-lg shadow-lg border border-gray-200">
          <YearChart filters={currentFilters} />
          <div className='grid grid-cols-2 gap-2'>
          </div>
        </div>

      </div>

    </div>
    <Footer />
    </div>
  );
}
