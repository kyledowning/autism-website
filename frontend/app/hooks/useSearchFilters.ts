import { useState, useCallback } from 'react';
import type { FilterState, SearchType } from '~/types/filters';
import { INITIAL_FILTER_STATE } from '~/types/filters';

/**
 * Custom hook for managing search filter state
 * Provides centralized state management and update functions for all filters
 */
export function useSearchFilters(initialState: Partial<FilterState> = {}) {
  const [filters, setFilters] = useState<FilterState>({
    ...INITIAL_FILTER_STATE,
    ...initialState,
  });

  const updateFilter = useCallback(<K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(INITIAL_FILTER_STATE);
  }, []);

  const setSearch = useCallback((value: string) => {
    updateFilter('search', value);
  }, [updateFilter]);

  const setSearchType = useCallback((value: SearchType) => {
    updateFilter('selectedSearchType', value);
  }, [updateFilter]);

  const setAge = useCallback((value: string) => {
    updateFilter('selectedAge', value);
  }, [updateFilter]);

  const setLanguage = useCallback((value: string) => {
    updateFilter('selectedLanguage', value);
  }, [updateFilter]);

  const setParticipantNumber = useCallback((value: string) => {
    updateFilter('selectedParticipantNumber', value);
  }, [updateFilter]);

  const setTargetUser = useCallback((value: string) => {
    updateFilter('selectedTargetUser', value);
  }, [updateFilter]);

  const setTechnology = useCallback((value: string) => {
    updateFilter('selectedTechnology', value);
  }, [updateFilter]);

  const setGender = useCallback((value: string) => {
    updateFilter('selectedGender', value);
  }, [updateFilter]);

  const setChallenge = useCallback((value: string) => {
    updateFilter('selectedChallenge', value);
  }, [updateFilter]);

  const setProblem = useCallback((value: string) => {
    updateFilter('selectedProblem', value);
  }, [updateFilter]);

  const setLevel = useCallback((value: string) => {
    updateFilter('selectedLevel', value);
  }, [updateFilter]);

  const setRace = useCallback((value: string) => {
    updateFilter('selectedRace', value);
  }, [updateFilter]);

  const setDataset = useCallback((value: string) => {
    updateFilter('selectedDataset', value);
  }, [updateFilter]);

  return {
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
  };
}
