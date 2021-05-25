import React from 'react';

import { AuthContextProvider } from '../context/AuthContext';
import { DataContextProvider } from '../context/DataContext';
import { FirestoreContextProvider } from '../context/FirestoreContext';
import { ThemeContextProvider } from '../context/ThemeContext';
import Routes from './Routes';

const Providers = () => (
  <AuthContextProvider>
    <FirestoreContextProvider>
      <DataContextProvider>
        <ThemeContextProvider>
          <Routes />
        </ThemeContextProvider>
      </DataContextProvider>
    </FirestoreContextProvider>
  </AuthContextProvider>
);

export default Providers;
