import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

import Splash from '../screens/Splash';
import Login from '../screens/Login';
import Medicamento from '../screens/Medicamento';
import Novomedicamento from '../screens/Novomedicamento';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
   
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Medicamento" component={Medicamento} />
         <Stack.Screen name="Novomedicamento" component={Novomedicamento} />
      </Stack.Navigator>
   
  );
}