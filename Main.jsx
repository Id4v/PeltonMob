import { Provider } from 'react-redux';
import store from '@app/store';
import { StatusBar } from 'expo-status-bar';
import App from '@app/App';
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
