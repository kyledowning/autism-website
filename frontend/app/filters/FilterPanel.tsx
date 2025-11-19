import React, { useState } from 'react';

interface FiltersProps {
  showFilters: boolean;
  selectedAge: string;
  setSelectedAge: (value: string) => void;
  selectedGender: string;
  setSelectedGender: (value: string) => void;
  selectedLanguage: string;
  setSelectedLanguage: (value: string) => void;
  selectedParticipantNumber: string;
  setSelectedParticipantNumber: (value: string) => void;
  selectedTargetUser: string;
  setSelectedTargetUser: (value: string) => void;
  selectedTechnology: string;
  setSelectedTechnology: (value: string) => void;
  selectedChallenge: string;
  setSelectedChallenge: (value: string) => void;
  selectedProblem: string;
  setSelectedProblem: (value: string) => void;
  selectedLevel: string;
  setSelectedLevel: (value: string) => void;
  selectedRace: string;
  setSelectedRace: (value: string) => void;
  selectedDataset: string;
  setSelectedDataset: (value: string) => void;
  selectedSearchType: string;
  setSelectedSearchType: (value: string) => void;
}

export default function FilterPanel({
  showFilters,
  selectedAge,
  setSelectedAge,
  selectedGender,
  setSelectedGender,
  selectedLanguage,
  setSelectedLanguage,
  selectedParticipantNumber,
  setSelectedParticipantNumber,
  selectedTargetUser,
  setSelectedTargetUser,
  selectedTechnology,
  setSelectedTechnology,
  selectedChallenge,
  setSelectedChallenge,
  selectedProblem,
  setSelectedProblem,
  selectedLevel,
  setSelectedLevel,
  selectedRace,
  setSelectedRace,
  selectedDataset,
  setSelectedDataset,
  selectedSearchType,
  setSelectedSearchType
}: FiltersProps) {

  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({
    age: false,
    gender: false,
    language: false,
    participantNumber: false,
    targetUser: false,
    technology: false,
    challenge: false,
    problem: false,
    level: false,
    race: false,
    dataset: false,
    searchType: false
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  if (!showFilters) return null;

  const FilterSection = ({ 
    title, 
    sectionKey, 
    options, 
    selectedValue, 
    onChange 
  }: { 
    title: string; 
    sectionKey: string; 
    options: {value: string; label: string}[]; 
    selectedValue: string; 
    onChange: (value: string) => void;
  }) => {
    const isExpanded = expandedSections[sectionKey];
    const selectedLabel = options.find(opt => opt.value === selectedValue)?.label || title;
    
    return (
      <div className="mb-4">
        <button
          onClick={() => toggleSection(sectionKey)}
          style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
          className="w-full px-4 py-3 border rounded-lg text-left flex justify-between items-center hover:bg-blue-500 transition-colors duration-200 cursor-pointer"
        >
          <span className="text-sm font-medium">
            {selectedValue ? selectedLabel : title}
          </span>
          <span className="text-lg">{isExpanded ? '▲' : '▼'}</span>
        </button>

        {isExpanded && (
          <div style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }} className="mt-1 border rounded-lg overflow-hidden max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-700">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                }}
                style={{
                  backgroundColor: selectedValue === option.value ? '#1e3a8a' : 'var(--bg-secondary)',
                  color: selectedValue === option.value ? '#dbeafe' : 'var(--text-secondary)'
                }}
                className={`w-full px-4 py-2 text-left text-sm transition-all duration-400 hover:bg-blue-500 cursor-pointer
                `}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };


  return (
    <div className="space-y-4">
      
      <FilterSection
        title="Search Type"
        sectionKey="searchType"
        selectedValue={selectedSearchType}
        onChange={setSelectedSearchType}
        options={[
          { value: 't1', label: 'Title and Abstract' },
          { value: 't2', label: 'Full Text' }
       ]}
      />
            
      <FilterSection
        title="Age Group"
        sectionKey="age"
        selectedValue={selectedAge}
        onChange={setSelectedAge}
        options={[
          { value: '', label: 'All Ages' },
          { value: 'missing', label: 'Missing' },
          { value: 'noparticipants', label: 'No Participants' },
          { value: 'child', label: 'Child' },
          { value: 'youngadult', label: 'Young Adult' },
          { value: 'adolescent', label: 'Adolescent' },
          { value: 'adult', label: 'Adult' }
        ]}
      />

      <FilterSection
        title="Gender"
        sectionKey="gender"
        selectedValue={selectedGender}
        onChange={setSelectedGender}
        options={[
          { value: '', label: 'All Genders' },
          { value: 'missing', label: 'Missing' },
          { value: 'noparticipants', label: 'No Participants' },
          { value: 'balanced', label: 'Balanced' },
          { value: 'onlyfemale', label: 'Female (only)' },
          { value: 'primarilyfemale', label: 'Female (mostly)' },
          { value: 'onlymale', label: 'Male (only)' },
          { value: 'primarilymale', label: 'Male (mostly)' },
          { value: 'onlynonbinary', label: 'Non-binary (only)' },
          { value: 'primarilynonbinary', label: 'Non-binary (mostly)' },
          { value: 'transgender', label: 'Transgender' }
        ]}
      />

      <FilterSection
        title="Language Type"
        sectionKey="language"
        selectedValue={selectedLanguage}
        onChange={setSelectedLanguage}
        options={[
          { value: '', label: 'All Languages' },
          { value: 'avoidant', label: 'Avoidant' },
          { value: 'personfirst', label: 'Person First' },
          { value: 'identityfirst', label: 'Identity First' },
          { value: 'mixed', label: 'Mixed' }
        ]}
      />

      <FilterSection
        title="Participant Size"
        sectionKey="participantNumber"
        selectedValue={selectedParticipantNumber}
        onChange={setSelectedParticipantNumber}
        options={[
          { value: '', label: 'All Sizes' },
          { value: 'none', label: 'None' },
          { value: 'missing', label: 'Missing' },
          { value: 'small', label: 'Small' },
          { value: 'medium', label: 'Medium' },
          { value: 'large', label: 'Large' }
        ]}
      />

      <FilterSection
        title="Target User"
        sectionKey="targetUser"
        selectedValue={selectedTargetUser}
        onChange={setSelectedTargetUser}
        options={[
          { value: '', label: 'All Users' },
          { value: 'researchers', label: 'Researchers' },
          { value: 'autisticpeople', label: 'Persons with Autism' },
          { value: 'parents', label: 'Parents' },
          { value: 'teachers', label: 'Teachers' },
          { value: 'caregivers', label: 'Caregivers' }
        ]}
      />

      <FilterSection
        title="Technology"
        sectionKey="technology"
        selectedValue={selectedTechnology}
        onChange={setSelectedTechnology}
        options={[
          { value: '', label: 'All Technologies' },
          { value: 'machinelearning', label: 'Machine Learning' },
          { value: 'robot', label: 'Robot' },
          { value: 'fMRI', label: 'fMRI' },
          { value: 'virtualreality', label: 'VR' },
          { value: 'game', label: 'Game' },
          { value: 'eyetracking', label: 'Eye Tracking' },
          { value: 'neuralnetwork', label: 'Neural Network' },
          { value: 'facialrecognition', label: 'Facial Recognition' },
          { value: 'deeplearning', label: 'Deep Learning' },
          { value: 'literaturereview', label: 'Literature Review' },
          { value: 'mobileapp', label: 'Mobile App' },
          { value: 'electroencephalogram', label: 'Electroencephalogram' },
          { value: 'augmentedreality', label: 'Augmented Reality' },
          { value: 'dataanalysis', label: 'Data Analysis' },
          { value: 'wearables', label: 'Wearables' },
          { value: 'interview', label: 'Interview' },
          { value: 'video', label: 'Video' },
          { value: 'framework', label: 'Framework' },
          { value: 'motioncapture', label: 'Motion Capture' },
          { value: 'webapp', label: 'Web App' },
          { value: 'tablet', label: 'Tablet' },
          { value: 'MRI', label: 'MRI' },
          { value: 'survey', label: 'Survey' },
          { value: 'EEG', label: 'EEG' },
          { value: 'ipad', label: 'iPad' }
        ]}
      />

      <FilterSection
        title="Challenge"
        sectionKey="challenge"
        selectedValue={selectedChallenge}
        onChange={setSelectedChallenge}
        options={[
          { value: '', label: 'All Challenges' },
          { value: 'missing', label: 'Missing' },
          { value: 'social', label: 'Social' },
          { value: 'communication', label: 'Communication' },
          { value: 'repetitivebehavior', label: 'Repetitive Behavior' },
          { value: 'emotion', label: 'Emotion' },
          { value: 'education', label: 'Education' },
          { value: 'sensory', label: 'Sensory' },
          { value: 'behavior', label: 'Behavior' },
          { value: 'speech', label: 'Speech' },
          { value: 'diagnosis', label: 'Diagnosis' },
          { value: 'motorcontrol', label: 'Motor Control' },
          { value: 'attention', label: 'Attention' },
          { value: 'eyecontact', label: 'Eye Contact' },
          { value: 'cognitive', label: 'Cognitive' },
          { value: 'jointattention', label: 'Joint Attention' },
          { value: 'motorskills', label: 'Motor Skills' },
          { value: 'independence', label: 'Independence' },
          { value: 'emotionrecognition', label: 'Emotion Recognition' },
          { value: 'anxiety', label: 'Anxiety' },
          { value: 'interaction', label: 'Interaction' },
          { value: 'learning', label: 'Learning' }
        ]}
      />

      <FilterSection
        title="Problem"
        sectionKey="problem"
        selectedValue={selectedProblem}
        onChange={setSelectedProblem}
        options={[
          { value: '', label: 'All Problems' },
          { value: 'missing', label: 'Missing' },
          { value: 'intervention', label: 'Intervention' },
          { value: 'diagnosis', label: 'Diagnosis' },
          { value: 'understanding', label: 'Understanding' },
          { value: 'analytictool', label: 'Analytic Tool' },
          { value: 'codesign', label: 'Code Sign' },
          { value: 'training', label: 'Training' },
          { value: 'awareness', label: 'Awareness' },
          { value: 'framework', label: 'Framework' },
          { value: 'other', label: 'Other' }
        ]}
      />

      <FilterSection
        title="Level"
        sectionKey="level"
        selectedValue={selectedLevel}
        onChange={setSelectedLevel}
        options={[
          { value: '', label: 'All Levels' },
          { value: 'missing', label: 'Missing' },
          { value: 'highfunctioning', label: 'High Functioning' },
          { value: 'lowfunctioning', label: 'Low Functioning' },
          { value: 'verbal', label: 'Verbal' },
          { value: 'nonverbal', label: 'Non-verbal' }
        ]}
      />

      <FilterSection
        title="Race"
        sectionKey="race"
        selectedValue={selectedRace}
        onChange={setSelectedRace}
        options={[
          { value: '', label: 'All Races' },
          { value: 'noparticipants', label: 'No Participants' },
          { value: 'missing', label: 'Missing' },
          { value: 'present', label: 'Present' }
        ]}
      />

      <FilterSection
        title="Dataset"
        sectionKey="dataset"
        selectedValue={selectedDataset}
        onChange={setSelectedDataset}
        options={[
          { value: '', label: 'All Datasets' },
          { value: 'ACM Digital Library', label: 'ACM' },
          { value: 'IEEE Xplore', label: 'IEEE' }
        ]}
      />
    </div>
  );
}
