import Login from 'screen/Login';
import { useSelector } from 'react-redux';
import { getJwtToken } from 'screen/Login/userSlice';
import Home from 'screen/Home';
import LostPassword from 'screen/LostPassword';
import Register from 'screen/Register';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function App() {
  const jwtToken = useSelector(getJwtToken);
  const Stack = createNativeStackNavigator();

  return (
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
  );
}
