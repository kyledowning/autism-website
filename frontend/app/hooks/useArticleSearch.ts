import { useState, useEffect, useCallback } from 'react';
import type { FilterState, Article, SearchResponse } from '~/types/filters';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL + '/api';

export function useArticleSearch(filters: FilterState) {
  const [data, setData] = useState<Article[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const hasActiveFilters = useCallback(() => {
    return (
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
      filters.selectedSearchType || 't1'
    );
  }, [filters]);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({
          q: filters.search,
          searchtype: filters.selectedSearchType,
          age: filters.selectedAge,
          language: filters.selectedLanguage,
          participantnumber: filters.selectedParticipantNumber,
          targetuser: filters.selectedTargetUser,
          technology: filters.selectedTechnology,
          gender: filters.selectedGender,
          challenge: filters.selectedChallenge,
          problem: filters.selectedProblem,
          level: filters.selectedLevel,
          race: filters.selectedRace,
          dataset: filters.selectedDataset,
        });

        const url = hasActiveFilters()
          ? `${API_BASE_URL}/data?${params.toString()}`
          : `${API_BASE_URL}/data`;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }

        const result: SearchResponse = await response.json();
        setData(result.data || []);
        setCount(result.count || 0);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('API request failed:', err);
        setData([]);
        setCount(0);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [
    filters.search,
    filters.selectedSearchType,
    filters.selectedAge,
    filters.selectedLanguage,
    filters.selectedParticipantNumber,
    filters.selectedTargetUser,
    filters.selectedTechnology,
    filters.selectedGender,
    filters.selectedChallenge,
    filters.selectedProblem,
    filters.selectedLevel,
    filters.selectedRace,
    filters.selectedDataset,
    hasActiveFilters,
  ]);

  return { data, count, loading, error };
}
