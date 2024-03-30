import { useEffect, useState } from "react";
// import { encryptAES, decryptAES } from '@/utils/crypts';
import { getCookie } from "../utils/cookies/getCookie";
import { setCookie } from "../utils/cookies/setCookie";
import { removeCookie } from "../utils/cookies/removeCookie";

export function useCookies<T>(
  key: string,
  initialValue: T,
  options?: {
    encrypt?: boolean;
  },
): [T | null, (x: T) => void, () => void] {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T | null>(() => {
    try {
      // Get from cookie by key
      const item = getCookie(key) as T;
      // Parse stored json or if none return initialValue
      return item ? item : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to cookies Storage.
  const setValue = (value: T): void => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to cookie
      setCookie({
        name: key,
        value: valueToStore,
        days: 30,
      });
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  const deleteValue = () => {
    removeCookie(key);
    setStoredValue(null);
  };

  useEffect(() => {
    // trả về giá trị mới khi cookie có sự thay đổi
    try {
      const item = getCookie(key) as T;
      setStoredValue(item || initialValue);
    } catch (error) {
      console.log(error);
    }
  }, [document.cookie]);

  return [storedValue, setValue, deleteValue];
}
