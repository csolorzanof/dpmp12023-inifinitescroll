import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NativeBaseProvider } from 'native-base';
import { QueryClient, QueryClientProvider } from 'react-query';

import { Inicio } from './views/inicio';

const queryClient = new QueryClient();

export default function App() {
  return (
    <>
      <StatusBar style='auto' />
      <NativeBaseProvider>
        <QueryClientProvider client={queryClient}>
          <Inicio />
        </QueryClientProvider>
      </NativeBaseProvider>
    </>
  );
}

