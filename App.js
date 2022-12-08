import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NativeBaseProvider, Box } from "native-base";
import Login from "screen/Login";

export default function App() {
  return (
    <NativeBaseProvider>
      <Login />
      <StatusBar style="auto" />
    </NativeBaseProvider>
  );
}
