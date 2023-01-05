import {createDrawerNavigator} from "@react-navigation/drawer";
import Dashboard from "@app/features/Dashboard";
import Home from "@app/features/Home";
import Profile from "@app/features/Profile";
import Logout from "@app/features/Logout";

export default function LeftDrawer() {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator initialRouteName={'Home'} screenOptions={
      {
        headerTitle: '',
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: 'transparent',
        }
      }
    }>
      <Drawer.Screen name={'Home'} component={Home} />
      <Drawer.Screen name={'Dashboard'} component={Dashboard}/>
      <Drawer.Screen name={'Profil'} component={Profile}/>
      <Drawer.Screen name={'Classement'} component={Dashboard}/>
      <Drawer.Screen
        name={'Settings'}
        options={{title: "Paramètres"}}
        component={Dashboard}
      />
      <Drawer.Screen name={'Logout'} component={Logout} />
    </Drawer.Navigator>
  );
}
