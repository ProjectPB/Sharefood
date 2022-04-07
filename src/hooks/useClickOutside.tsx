import { useEffect } from "react";

const useClickOutside = (ref: React.MutableRefObject<HTMLDivElement>, callback: () => void) => {
  useEffect(() => {
    const listener = (e: { target: any; }) => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    };

    document.addEventListener("mousedown", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
    };

  });
};

export default useClickOutside;