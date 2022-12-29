import {createDrawerNavigator} from "@react-navigation/drawer";
import Dashboard from "@app/features/Dashboard";
import Home from "@app/features/Home";


export default function HomeDrawer() {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator initialRouteName={'Home'}>
      <Drawer.Screen name={'Home'} component={Home} />
      <Drawer.Screen name={'Dashboard'} component={Dashboard}/>
      <Drawer.Screen name={'Profil'} component={Dashboard}/>
      <Drawer.Screen name={'Classement'} component={Dashboard}/>
      <Drawer.Screen
        name={'Settings'}
        options={{title: "Paramètres"}}
        component={Dashboard}
      />
    </Drawer.Navigator>
  );
}
