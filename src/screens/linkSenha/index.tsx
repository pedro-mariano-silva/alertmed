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

export default function linkSenha() {

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


<Image
source={require('../../../assets/images/check.png')}
style={styles.check}
resizeMode="contain"
/>

<Text style={styles.title}>RECUPERAR SENHA</Text>
<Text style={styles.subTitle}>Se o e-mail estiver cadastrado, você{'\n'}receberá um link para redefinir sua senha.</Text>




<TouchableOpacity
style={styles.buttonVoltarLogin}
onPress={() => navigation.navigate('criarNovaSenha')}
>
<Text style={styles.buttonText}>Voltar ao login</Text>
</TouchableOpacity>







</View>

);
}