import { useState } from "react";

const useLocalStorage = <T>(
  key: string,
  defaultValue: T
): [T, (value: T | ((currentValue: T) => T)) => void] => {
  const [value, setValue] = useState<T>(() => {
    try {
      const value = localStorage.getItem(key);

      if (value) {
        return JSON.parse(value);
      } else {
        localStorage.setItem(key, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    }
  });

  const setLocalStorageValue = (
    valueOrFn: T | ((currentValue: T) => T)
  ): void => {
    let newValue;

    if (typeof valueOrFn === "function") {
      newValue = (valueOrFn as (currentValue: T) => T)(value);
    } else {
      newValue = valueOrFn;
    }

    localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  };

  return [value, setLocalStorageValue];
};

export default useLocalStorage;
