import { useEffect, useRef } from "react";

function useEffectOnce(func: () => void): void {
  const once = useRef(true);

  useEffect(() => {
    if (once.current) {
      func();
      once.current = false;
    }
  }, []);
}

export default useEffectOnce