import React from 'react';
import { useColorScheme } from 'react-native';

import { default as palette } from '../theme/theme';

const ThemeContext = React.createContext({});

const ThemeContextProvider = ({ children }) => {
  const preferredColorScheme = useColorScheme();

  const [theme, setTheme] = React.useState(
    preferredColorScheme === 'dark' ? palette.dark : palette.light
  );

  const toggleTheme = () => {
    setTheme(theme => (theme.isDark ? palette.light : palette.dark));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeContextProvider };
