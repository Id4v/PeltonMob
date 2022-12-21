import Login from 'features/Login';
import { useSelector } from 'react-redux';
import { getJwtToken } from 'features/Login/userSlice';
import Home from 'features/Home';
import LostPassword from 'features/LostPassword';
import Register from 'features/Register';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import store from 'store';
import { extendTheme, NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import LoadingView from 'components/LoadingView';
import { isLoading } from 'components/LoadingView/loaderSlice';

function configureDeepLinking(path = '/') {
  const prefix = Linking.createURL(path);
  const linking = {
    prefixes: [prefix],
  };

  return linking;
}

function configureTheme() {
  const themeConfig = {
    useSystemColorMode: false,
  };
  const customTheme = extendTheme({ themeConfig });

  return customTheme;
}

export default function App() {
  const jwtToken = useSelector(getJwtToken);
  const loading = useSelector(isLoading);
  const Stack = createNativeStackNavigator();

  return (
    <NativeBaseProvider theme={configureTheme()}>
      <NavigationContainer initialState={store.initialState} linking={configureDeepLinking('/')}>
        {
          (loading) ? (
            <LoadingView />
          ) : (null)
        }
        <Stack.Navigator>
          {
            (jwtToken == null)
              ? (
                <>
                  <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="register"
                    component={Register}
                    options={{ headerTitle: 'Inscription' }}
                  />
                  <Stack.Screen
                    name="lostPassword"
                    component={LostPassword}
                    options={{ headerTitle: 'Mot de passe perdu' }}
                  />
                </>
              ) : (
                <Stack.Screen name="Home" component={Home} />
              )
          }
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
