import { useEffect, useRef } from "react";

const useClickOuside = (callback: () => void) => {
  const ref = useRef<any>(null);

  useEffect(() => {
    const handleClickOuside = (e: MouseEvent): void => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback();
      }
    };

    document.addEventListener("click", handleClickOuside);

    return () => {
      document.removeEventListener("click", handleClickOuside);
    };
  }, [callback]);

  return ref;
};

export default useClickOuside;
