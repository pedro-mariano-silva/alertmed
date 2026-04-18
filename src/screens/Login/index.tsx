import { View, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import styles from './styles';

type NavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

export default function Login() {

const navigation = useNavigation<NavigationProps>();
const [usuario, setUsuario] = useState('');
const [senha, setSenha] = useState('');
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

<Text style={styles.title}>LOGIN</Text>

<TextInput
placeholder="E-mail"
placeholderTextColor="#000000"
style={styles.inputEmail}
value={usuario}
onChangeText={handleChangeUser}
keyboardType="email-address"
autoCapitalize="none"
textAlign='center'
  selection={usuario.length === 0 ? { start: 0, end: 0 } : undefined}

caretHidden={!mostrarCursor}   //  controla o cursor
onFocus={() => setMostrarCursor(true)}   // mostra ao clicar
onBlur={() => setMostrarCursor(false)}   // esconde ao sair


/>

<TextInput
placeholder="Senha"
placeholderTextColor="#000000"
style={styles.inputSenha}
value={senha}
onChangeText={setSenha}
secureTextEntry={true}

autoCapitalize="none"
caretHidden={!mostrarCursor}   //  controla o cursor
onFocus={() => setMostrarCursor(true)}   // mostra ao clicar
onBlur={() => setMostrarCursor(false)}   // esconde ao sair
selection={senha.length === 0 ? { start: 0, end: 0 } : undefined}
/>

<TouchableOpacity
style={styles.buttonLogin}
onPress={fazerLogin}
>
<Text style={styles.buttonText}>Logar</Text>
</TouchableOpacity>

<TouchableOpacity onPress={() => navigation.navigate('Criarconta')}>
  <Text style={styles.footer}>
    <Text style={styles.textCriar}>Criar conta</Text>
  </Text>
</TouchableOpacity>

<Image
source={require('../../../assets/images/line.png')}
style={styles.line}
resizeMode="contain"
/>

<Image
source={require('../../../assets/images/line.png')}
style={styles.line2}
resizeMode="contain"
/>

<TouchableOpacity onPress={() => navigation.navigate('recuperaSenha')}>
  <Text style={styles.footer}>
    <Text style={styles.textForgetPassWord}>Esqueci minha senha</Text>
  </Text>
</TouchableOpacity>

<View style={styles.rememberContainer}>

<TouchableOpacity
style={[styles.checkbox, lembrar && styles.checkboxChecked]}
onPress={() => setLembrar(!lembrar)}
>

{lembrar && <Text style={styles.check}>✓</Text>}

</TouchableOpacity>

<Text style={styles.rememberText}>Lembrar-me</Text>

</View>

</View>

);
}