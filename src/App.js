import {Stack} from "native-base";
import Login from "screen/Login";
import {useSelector} from "react-redux";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {getJwtToken} from "screen/Login/userSlice";
import Home from "screen/Home";
import LostPassword from "screen/LostPassword";
import Register from "screen/Register";

export function App() {
    const Stack = createNativeStackNavigator();
    const jwtToken = useSelector(getJwtToken);

    return (
        <Stack.Navigator>
            {
                (jwtToken == null) ?
                    (
                        <>
                            <Stack.Screen
                                name="Login"
                                component={Login}
                                options={{headerShown: false}}
                            />
                            <Stack.Screen
                                name="register"
                                component={Register}
                                options={{headerTitle: "Inscription"}}
                            />
                            <Stack.Screen
                                name="lostPassword"
                                component={LostPassword}
                                options={{headerTitle: "Mot de passe perdu"}}
                            />
                        </>
                    ) : (
                        <>
                            <Stack.Screen name="Home" component={Home}/>
                        </>
                    )
            }
        </Stack.Navigator>
    );
}
