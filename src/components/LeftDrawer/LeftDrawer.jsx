import {createDrawerNavigator} from "@react-navigation/drawer";
import Dashboard from "@app/features/Dashboard";
import Home from "@app/features/Home";

export default function LeftDrawer() {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator initialRouteName={'Home'} screenOptions={
      {
        headerTitle: '',
        headerStyle: {
          backgroundColor: 'transparent',
        }
      }
    }>
      <Drawer.Screen name={'Home'} component={Home} />
      <Drawer.Screen name={'Dashboard'} component={Dashboard}/>
      <Drawer.Screen name={'Profil'} component={Dashboard}/>
      <Drawer.Screen name={'Classement'} component={Dashboard}/>
      <Drawer.Screen
        name={'Settings'}
        options={{title: "Paramètres"}}
        component={Dashboard}
      />
      <Drawer.Screen name={'Logout'} component={Dashboard} />
    </Drawer.Navigator>
  );
}
