
import React, { createContext, useState } from 'react';

const ThemeContext = createContext(); // Create the context

const ThemeProvider = ({ children }) => {
  const [changed, setChanged] = useState(0);

  return (
    <ThemeContext.Provider value={{ changed, setChanged }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
