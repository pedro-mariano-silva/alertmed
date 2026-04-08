import { View, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import styles from './styles';

type NavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'Criarconta'
>;

export default function Criarconta() {

const navigation = useNavigation<NavigationProps>();
const [usuario, setUsuario] = useState('');
const [senha, setSenha] = useState('');
const [email, setEmail] = useState('');
const [lembrar, setLembrar] = useState(false);
const [mostrarCursor, setMostrarCursor] = useState(false);

const handleChangeUser = (text: string) => {
  setUsuario(text);

  if (text.length === 0) {
    setMostrarCursor(false);
  }
};

const handleChangeSenha = (text: string) => {
  setSenha(text);

  if (text.length === 0) {
    setMostrarCursor(false);
  }
};



useEffect(() => {
carregarUsuario();
}, []);

async function carregarUsuario(){

const usuarioSalvo = await AsyncStorage.getItem('usuario');

if(usuarioSalvo){
setUsuario(usuarioSalvo);
setLembrar(true);
}

}

async function fazerLogin(){

if(usuario === 'admin' && senha === '1234'){

if(lembrar){
await AsyncStorage.setItem('usuario', usuario);
}else{
await AsyncStorage.removeItem('usuario');
}

navigation.navigate('Medicamento');

}else{

Alert.alert('Erro','Usuário ou senha inválidos');

}

}

return (

<View style={styles.container}>
  

<Image
source={require('../../../assets/images/logo.png')}
style={styles.logo}
resizeMode="contain"
/>



<Text style={styles.title}>Crie sua conta</Text>




<TextInput
placeholder="Nome completo"
placeholderTextColor="#838282"
style={styles.inputNome}
value={usuario}
onChangeText={handleChangeUser}
keyboardType="email-address"
autoCapitalize="none"
selection={usuario.length === 0 ? { start: 0, end: 0 } : undefined}
/>
<Feather name="user" size={20} color="black" 
style={styles.iconUser}
/>

<TextInput
placeholder='E-mail'
style={styles.inputCadEmail}

/>
<MaterialIcons name="alternate-email" size={20} color="black"
style={styles.iconEmail}
/>

<TextInput
placeholder='Senha'
style={styles.inputCadSenha}

/>
<SimpleLineIcons name="lock" size={20} color="black" 
style={styles.iconSenha}
/>





<TextInput
placeholder='Repita a senha'
style={styles.inputCadSenha}

/>
<SimpleLineIcons name="lock" size={20} color="black" 
style={styles.iconRepeteSenha}
/>





<TouchableOpacity
style={styles.buttonLogin}
onPress={fazerLogin}
>
<Text style={styles.buttonText}>Criar conta</Text>
</TouchableOpacity>






</View>

);
}