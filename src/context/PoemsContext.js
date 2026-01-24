import { createContext, useContext } from 'react';

// Context to provide poems data globally, avoiding passing it through location.state
const PoemsContext = createContext([]);

export function usePoemsData() {
  return useContext(PoemsContext);
}

export default PoemsContext;
