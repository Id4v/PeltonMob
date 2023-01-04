import Login from '@app/features/Login';
import { useSelector} from 'react-redux';
import {getJwtToken, isLoggedIn} from '@app/features/Login/userSlice';
import LostPassword from '@app/features/LostPassword';
import Register from '@app/features/Register';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import store from '@app/store';
import {extendTheme, NativeBaseProvider} from 'native-base';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import * as Linking from 'expo-linking';
import LoadingView from '@app/components/LoadingView';
import {isLoading} from '@app/components/LoadingView/loaderSlice';
import {LeftDrawer} from "@app/components/LeftDrawer";
import {LinearGradient} from "expo-linear-gradient";

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

  const jwtToken = useSelector(getJwtToken);
  const isLogged = useSelector(isLoggedIn);
  const loading = useSelector(isLoading);

  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      text: 'rgb(25,26,71)',
      background: 'transparent',
    }
  }

  return (
    <NativeBaseProvider theme={theme}>
      <LinearGradient
        //colors={['rgba(253,245,235,1)', 'rgba(253,230,230,1)', 'rgb(249,226,230)']}
        colors={['rgb(239,237,238)', 'rgb(208,145,145)', 'rgb(173,127,126)']}
        locations={[0, 0.5, 1]}
        start={{x:0,y:0}}
        end={{x:1, y:1}}
        style={{
          flex:1
        }
      }
      >
        {
          (loading) ? (
            <LoadingView/>
          ) : (null)
        }
        <NavigationContainer theme={navTheme} initialState={store.initialState} linking={configureDeepLinking(isLogged, '/')}>
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
      </LinearGradient>
    </NativeBaseProvider>
  );
}
