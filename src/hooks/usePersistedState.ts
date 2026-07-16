import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useRef, useState} from 'react';

const PREFIX = 'golfAtMadrid:';

export function usePersistedState<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(defaultValue);
  const loaded = useRef(false);

  useEffect(() => {
    let cancelled = false;
    AsyncStorage.getItem(PREFIX + key)
      .then(raw => {
        if (cancelled || raw == null) {
          return;
        }
        try {
          setValue(JSON.parse(raw));
        } catch {
          // ignore corrupt data
        }
      })
      .finally(() => {
        if (!cancelled) {
          loaded.current = true;
        }
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!loaded.current) {
      return;
    }
    AsyncStorage.setItem(PREFIX + key, JSON.stringify(value)).catch(() => {});
  }, [key, value]);

  return [value, setValue] as const;
}
