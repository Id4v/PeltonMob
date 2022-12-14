import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import Login from "screen/Login";
import { Provider } from "react-redux";
import store from "store";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <NavigationContainer initialState={store.initialState}>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} />
          </Stack.Navigator>
          <StatusBar style="auto" />
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
}
