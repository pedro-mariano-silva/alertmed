import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

import Splash from '../screens/Splash';
import Login from '../screens/Login';
import Medicamento from '../screens/Medicamento';
import Novomedicamento from '../screens/Novomedicamento';
import Criarconta from '../screens/criarconta';
import recuperaSenha from '../screens/recuperaSenha';
import linkSenha from '../screens/linkSenha';
import criarNovaSenha from '../screens/criaNovaSenha';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
   
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Medicamento" component={Medicamento} />
        <Stack.Screen name="Novomedicamento" component={Novomedicamento} />
        <Stack.Screen name="Criarconta" component={Criarconta} />
        <Stack.Screen name="recuperaSenha" component={recuperaSenha} />
        <Stack.Screen name="linkSenha" component={linkSenha} />
        <Stack.Screen name="criarNovaSenha" component={criarNovaSenha} />
      </Stack.Navigator>
   
  );
}