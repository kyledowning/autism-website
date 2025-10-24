import React from 'react';

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

  if (!showFilters) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-5 p-3 sm:p-4 bg-gray-750 rounded-lg border border-gray-600">
      <select
        id="age"
        value={selectedAge}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedAge(e.target.value)}
        className="w-full p-3 rounded border border-gray-600 text-sm sm:text-base text-center cursor-pointer bg-gray-700 text-gray-300 focus:bg-gray-600 focus:text-gray-100 transition-colors duration-200">
        <option value="">-- Select Age Group --</option>
        <option value="missing">Age: Missing</option>
        <option value="noparticipants">Age: No Participants</option>
        <option value="child">Age: Child</option>
        <option value="youngadult">Age: Young Adult</option>
        <option value="adolescent">Age: Adolescent</option>
        <option value="adult">Age: Adult</option>
      </select>

      <select
        id="gender"
        value={selectedGender}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedGender(e.target.value)}
        className="w-full p-3 rounded border border-gray-600 text-sm sm:text-base text-center cursor-pointer bg-gray-700 text-gray-300 focus:bg-gray-600 focus:text-gray-100 transition-colors duration-200">
        <option value="">-- Select Gender --</option>
        <option value="missing">Gender: Missing</option>
        <option value="noparticipants">Gender: No Participants</option>
        <option value="balanced">Gender: Balanced</option>
        <option value="onlyfemale">Gender: Female (only)</option>
        <option value="primarilyfemale">Gender: Female (mostly)</option>
        <option value="onlymale">Gender: Male (only)</option>
        <option value="primarilymale">Gender: Male (mostly)</option>
        <option value="onlynonbinary">Gender: Non-binary (only)</option>
        <option value="primarilynonbinary">Gender: Non-binary (mostly)</option>
        <option value="transgender">Gender: Transgender</option>
      </select>

      <select
        id="language"
        value={selectedLanguage}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedLanguage(e.target.value)}
        className="w-full p-3 rounded border border-gray-600 text-sm sm:text-base text-center cursor-pointer bg-gray-700 text-gray-300 focus:bg-gray-600 focus:text-gray-100 transition-colors duration-200">
        <option value="">-- Select Language Type --</option>
        <option value="avoidant">Language Type: Avoidant</option>
        <option value="personfirst">Language Type: Person First</option>
        <option value="identityfirst">Language Type: Identity First</option>
        <option value="mixed">Language Type: Mixed</option>
      </select>

      <select
        id="participantnumber"
        value={selectedParticipantNumber}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedParticipantNumber(e.target.value)}
        className="w-full p-3 rounded border border-gray-600 text-sm sm:text-base text-center cursor-pointer bg-gray-700 text-gray-300 focus:bg-gray-600 focus:text-gray-100 transition-colors duration-200">
        <option value="">-- Select Participant Size --</option>
        <option value="none">Participant Size: None</option>
        <option value="missing">Participant Size: Missing</option>
        <option value="small">Participant Size: Small</option>
        <option value="medium">Participant Size: Medium</option>
        <option value="large">Participant Size: Large</option>
      </select>

      <select
        id="targetuser"
        value={selectedTargetUser}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedTargetUser(e.target.value)}
        className="w-full p-3 rounded border border-gray-600 text-sm sm:text-base text-center cursor-pointer bg-gray-700 text-gray-300 focus:bg-gray-600 focus:text-gray-100 transition-colors duration-200">
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
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedTechnology(e.target.value)}
        className="w-full p-3 rounded border border-gray-600 text-sm sm:text-base text-center cursor-pointer bg-gray-700 text-gray-300 focus:bg-gray-600 focus:text-gray-100 transition-colors duration-200">
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
        <option value="electroencephalogram">Technology: Electroencephalogram</option>
        <option value="augmentedreality">Technology: Augmented Reality</option>
        <option value="dataanalysis">Technology: Data Analysis</option>
        <option value="wearables">Technology: Wearables</option>
        <option value="interview">Technology: Interview</option>
        <option value="video">Technology: Video</option>
        <option value="framework">Technology: Framework</option>
        <option value="motioncapture">Technology: Motion Capture</option>
        <option value="webapp">Technology: Web App</option>
        <option value="tablet">Technology: Tablet</option>
        <option value="MRI">Technology: MRI</option>
        <option value="survey">Technology: Survey</option>
        <option value="EEG">Technology: EEG</option>
        <option value="ipad">Technology: iPad</option>
      </select>

      <select
        id="challenge"
        value={selectedChallenge}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedChallenge(e.target.value)}
        className="w-full p-3 rounded border border-gray-600 text-sm sm:text-base text-center cursor-pointer bg-gray-700 text-gray-300 focus:bg-gray-600 focus:text-gray-100 transition-colors duration-200">
        <option value="">-- Select Challenge Type --</option>
        <option value="missing">Challenge: Missing</option>
        <option value="social">Challenge: Social</option>
        <option value="communication">Challenge: Communication</option>
        <option value="repetitivebehavior">Challenge: Repetitive Behavior</option>
        <option value="emotion">Challenge: Emotion</option>
        <option value="education">Challenge: Education</option>
        <option value="sensory">Challenge: Sensory</option>
        <option value="behavior">Challenge: Behavior</option>
        <option value="speech">Challenge: Speech</option>
        <option value="diagnosis">Challenge: Diagnosis</option>
        <option value="motorcontrol">Challenge: Motor Control</option>
        <option value="attention">Challenge: Attention</option>
        <option value="eyecontact">Challenge: Eye Contact</option>
        <option value="cognitive">Challenge: Cognitive</option>
        <option value="jointattention">Challenge: Joint Attention</option>
        <option value="motorskills">Challenge: Motor Skills</option>
        <option value="independence">Challenge: Independence</option>
        <option value="emotionrecognition">Challenge: Emotion Recognition</option>
        <option value="anxiety">Challenge: Anxiety</option>
        <option value="interaction">Challenge: Interaction</option>
        <option value="learning">Challenge: Learning</option>
      </select>

      <select
        id="problem"
        value={selectedProblem}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedProblem(e.target.value)}
        className="w-full p-3 rounded border border-gray-600 text-sm sm:text-base text-center cursor-pointer bg-gray-700 text-gray-300 focus:bg-gray-600 focus:text-gray-100 transition-colors duration-200">
        <option value="">-- Select Problem Type --</option>
        <option value="missing">Problem: Missing</option>
        <option value="intervention">Problem: Intervention</option>
        <option value="diagnosis">Problem: Diagnosis</option>
        <option value="understanding">Problem: Understanding</option>
        <option value="analytictool">Problem: Analytic Tool</option>
        <option value="codesign">Problem: Code Sign</option>
        <option value="training">Problem: Training</option>
        <option value="awareness">Problem: Awareness</option>
        <option value="framework">Problem: Framework</option>
        <option value="other">Problem: Other</option>
      </select>

      <select
        id="level"
        value={selectedLevel}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedLevel(e.target.value)}
        className="w-full p-3 rounded border border-gray-600 text-sm sm:text-base text-center cursor-pointer bg-gray-700 text-gray-300 focus:bg-gray-600 focus:text-gray-100 transition-colors duration-200">
        <option value="">-- Select Level Type --</option>
        <option value="missing">Level: Missing</option>
        <option value="highfunctioning">Level: High Functioning</option>
        <option value="lowfunctioning">Level: Low Functioning</option>
        <option value="verbal">Level: Verbal</option>
        <option value="nonverbal">Level: Non-verbal</option>
      </select>

      <select
        id="race"
        value={selectedRace}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedRace(e.target.value)}
        className="w-full p-3 rounded border border-gray-600 text-sm sm:text-base text-center cursor-pointer bg-gray-700 text-gray-300 focus:bg-gray-600 focus:text-gray-100 transition-colors duration-200">
        <option value="">-- Select Race --</option>
        <option value="noparticipants">Race: No Participants</option>
        <option value="missing">Race: Missing</option>
        <option value="present">Race: Present</option>
      </select>

      <select
        id="dataset"
        value={selectedDataset}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedDataset(e.target.value)}
        className="w-full p-3 rounded border border-gray-600 text-sm sm:text-base text-center cursor-pointer bg-gray-700 text-gray-300 focus:bg-gray-600 focus:text-gray-100 transition-colors duration-200">
        <option value="">-- Select Dataset --</option>
        <option value="ACM Digital Library">Dataset: ACM</option>
        <option value="IEEE Xplore">Dataset: IEEE</option>
      </select>

      <select
        id="searchtype"
        value={selectedSearchType}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedSearchType(e.target.value)}
        className="w-full p-3 rounded border border-blue-500 bg-blue-900 text-blue-100 text-sm sm:text-base text-center cursor-pointer">
        <option value="t1">Search Type: Title and Abstract</option>
        <option value="t2">Search Type: Full Text</option>
      </select>
    </div>
  );
}
