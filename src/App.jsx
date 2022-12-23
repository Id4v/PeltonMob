import Login from '@app/features/Login';
import { useSelector } from 'react-redux';
import {getJwtToken, isLoggedIn} from '@app/features/Login/userSlice';
import Home from '@app/features/Home';
import LostPassword from '@app/features/LostPassword';
import Register from '@app/features/Register';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import store from '@app/store';
import { extendTheme, NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import LoadingView from '@app/components/LoadingView';
import { isLoading } from '@app/components/LoadingView/loaderSlice';

function configureDeepLinking(isLogged, path = '/') {
  const prefix = Linking.createURL(path);

  let homeScreen = {Home: '/'}

  if (isLogged) {
    homeScreen = {Login : '/'}
  }

  let screens = {
    ...homeScreen
  }

  const linking = {
    prefixes: [prefix, 'https://padel.wip'],
    config: {
      screens
    }
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
  const isLogged = useSelector(isLoggedIn);
  const loading = useSelector(isLoading);
  const Stack = createNativeStackNavigator();

  return (
    <NativeBaseProvider theme={configureTheme()}>
      <NavigationContainer initialState={store.initialState} linking={configureDeepLinking(isLogged, '/')}>
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
