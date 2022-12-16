import { Provider } from 'react-redux';
import store from 'store';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import * as Linking from 'expo-linking';
import App from 'App';
import { registerRootComponent } from 'expo';

const prefix = Linking.createURL('/');

function Main() {
  const linking = {
    prefixes: [prefix],
  };

  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <NavigationContainer initialState={store.initialState} linking={linking}>
          <App />
          <StatusBar style="auto" />
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
}

export default registerRootComponent(Main);
