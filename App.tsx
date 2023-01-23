import {extendTheme, NativeBaseProvider} from 'native-base';
import React, {FunctionComponent} from 'react';
import {Provider} from 'react-redux';
import NavContainer from './src/NavContainer';
import {store} from './src/redux/store';

/**
 * App props
 */
interface Props {}

/**
 * App Component
 */
const App: FunctionComponent<Props> = ({...props}) => {
  const theme = extendTheme({
    config: {
      initialColorMode: 'dark',
    },
  });

  return (
    <Provider store={store}>
      <NativeBaseProvider theme={theme}>
        <NavContainer />
      </NativeBaseProvider>
    </Provider>
  );
};

export default App;
