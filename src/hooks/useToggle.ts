import { useState, useCallback } from "react";

const useToggle = (initialState: boolean = false):[boolean, () => void] => {
  const [visible, setVisibility] = useState(initialState);

  const toggle = useCallback(() => {
    setVisibility(!visible);
  }, [visible]);

  return [visible, toggle];
};

export default useToggle;