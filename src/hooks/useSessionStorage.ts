import { useEffect, useState } from "react";

export default function useSessionStorage<T>(
  key: string,
  defaultValue: T,
): [T, (value: T) => void] {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    const item = sessionStorage.getItem(key);

    if (!item) {
      sessionStorage.setItem(key, JSON.stringify(defaultValue));
    }

    setValue(item ? JSON.parse(item) : defaultValue);

    function handler(e: StorageEvent) {
      if (e.key !== key) return;

      const lsi = sessionStorage.getItem(key);
      setValue(JSON.parse(lsi ?? ""));
    }

    window.addEventListener("storage", handler);

    return () => {
      window.removeEventListener("storage", handler);
    };
  }, []);

  const setValueWrap = (value: T) => {
    try {
      setValue(value);

      sessionStorage.setItem(key, JSON.stringify(value));
      if (typeof window !== "undefined") {
        window.dispatchEvent(new StorageEvent("storage", { key }));
      }
    } catch (e) {
      console.error(e);
    }
  };

  return [value, setValueWrap];
}
