import { useEffect, useState } from 'react';
import { TCityObj, TSearchResult } from './types';
import { fromEvent, debounceTime, map, switchMap, filter } from 'rxjs';
import { API_URL, apiMap } from '6_shared';
import { getInputByName } from '6_shared';

export const useCitySearch = (inputName: string): TSearchResult => {
  const [searchResults, setSearchResults] = useState<TCityObj[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const inputElement = getInputByName(inputName);

    if (!inputElement) {
      return;
    }

    const inputObservable = fromEvent(inputElement, 'input').pipe(
      debounceTime(100),
      map((event) => (event.target as HTMLInputElement).value),
      map((value) => value.trim()),
      filter(Boolean),
      switchMap((value) => {
        setLoading(true);
        return fetch(`${API_URL}${apiMap.CITIES}?name=${value}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error('Ошибка запроса');
            }
            return response.json();
          })
          .catch((err: Error) => {
            console.error(err.message);
            return [];
          })
          .finally(() => setLoading(false));
      })
    );

    const subscription = inputObservable.subscribe({
      next: (data: TCityObj[]) => {
        setSearchResults(data);
        setLoading(false);
      },
      error: (error: Error) => {
        console.error('Error fetching cities:', error);
        setLoading(false);
        setError(error.message);
      }
    });

    return () => subscription.unsubscribe();
  }, [inputName]);

  return { searchResults, loading, error, setSearchResults };
};
