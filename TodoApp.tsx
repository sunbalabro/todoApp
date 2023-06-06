import React, { FC } from 'react'
import App from './App'
import { Provider } from 'react-redux';
import { store } from './Store/store';
import { NativeBaseProvider } from 'native-base';

export const TodoApp :FC= () => { 

 return(
  <Provider store={store}>
    <NativeBaseProvider>
    <App />
    </NativeBaseProvider>
    </Provider>
  )
}
