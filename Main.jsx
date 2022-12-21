import { Provider } from 'react-redux';
import store from 'store';
import { StatusBar } from 'expo-status-bar';
import App from 'App';
import { registerRootComponent } from 'expo';

function Main() {
  return (
    <Provider store={store}>
      <App />
      <StatusBar style="auto" />
    </Provider>
  );
}

export default registerRootComponent(Main);
