// Type definitions for filter state management

export type SearchType = 't1' | 't2';

export interface FilterState {
  search: string;
  selectedSearchType: SearchType;
  selectedAge: string;
  selectedLanguage: string;
  selectedParticipantNumber: string;
  selectedTargetUser: string;
  selectedTechnology: string;
  selectedGender: string;
  selectedChallenge: string;
  selectedProblem: string;
  selectedLevel: string;
  selectedRace: string;
  selectedDataset: string;
}

export interface Article {
  url?: string;
  urls?: string; // Legacy field name
  title: string;
  dataset: string;
  abstract?: string;
  keywords?: string;
  authors?: string;
}

export interface SearchResponse {
  data: Article[];
  count: number;
}

export const INITIAL_FILTER_STATE: FilterState = {
  search: '',
  selectedSearchType: 't1',
  selectedAge: '',
  selectedLanguage: '',
  selectedParticipantNumber: '',
  selectedTargetUser: '',
  selectedTechnology: '',
  selectedGender: '',
  selectedChallenge: '',
  selectedProblem: '',
  selectedLevel: '',
  selectedRace: '',
  selectedDataset: '',
};
