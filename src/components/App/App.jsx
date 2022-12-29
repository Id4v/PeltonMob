import Login from '@app/features/Login';
import {useDispatch, useSelector} from 'react-redux';
import {getJwtToken, getProfile, isLoggedIn} from '@app/features/Login/userSlice';
import LostPassword from '@app/features/LostPassword';
import Register from '@app/features/Register';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import store from '@app/store';
import {extendTheme, NativeBaseProvider} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import * as Linking from 'expo-linking';
import LoadingView from '@app/components/LoadingView';
import {isLoading} from '@app/components/LoadingView/loaderSlice';
import {LeftDrawer} from "@app/components/LeftDrawer";
import {useEffect} from "react";
import Api from '@app/api/client';

function configureDeepLinking(isLogged, path = '/') {
  const prefix = Linking.createURL(path);

  let homeScreen = {Home: '/'}

  if (isLogged) {
    homeScreen = {Login: '/'}
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
  const customTheme = extendTheme({themeConfig});

  return customTheme;
}

export default function App() {
  const Stack = createNativeStackNavigator();
  const theme = configureTheme();
  const dispatch = useDispatch();

  const jwtToken = useSelector(getJwtToken);
  const isLogged = useSelector(isLoggedIn);
  const loading = useSelector(isLoading);

  useEffect(() => {
    if (jwtToken !== null) {
      Api.setHeaderToken(jwtToken);
    }
  }, [jwtToken]);

  return (
    <NativeBaseProvider theme={theme}>
      {
        (loading) ? (
          <LoadingView/>
        ) : (null)
      }
      <NavigationContainer initialState={store.initialState} linking={configureDeepLinking(isLogged, '/')}>
        <Stack.Navigator>
          {
            (jwtToken == null)
              ? (
                <Stack.Group navigationKey={'guest'}>
                  <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{headerShown: false}}
                  />
                  <Stack.Screen
                    name="register"
                    component={Register}
                    options={{headerTitle: 'Inscription'}}
                  />
                  <Stack.Screen
                    name="lostPassword"
                    component={LostPassword}
                    options={{headerTitle: 'Mot de passe perdu'}}
                  />
                </Stack.Group>
              ) : (
                <Stack.Group
                  navigationKey={"user"}
                  screenOptions={
                    {
                      headerShown: false
                    }
                  }
                >
                  <Stack.Screen name={'LeftDrawer'} component={LeftDrawer}/>
                </Stack.Group>
              )
          }
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
