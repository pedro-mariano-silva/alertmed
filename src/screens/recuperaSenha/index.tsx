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

export default function recuperaSenha() {

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







async function criarConta(){




}

return (

<View style={styles.container}>
  

<Image
source={require('../../../assets/images/logo.png')}
style={styles.logo}
resizeMode="contain"
/>



<Text style={styles.title}>RECUPERAR SENHA</Text>
<Text style={styles.subTitle}>Digite seu e-mail cadastrado, para{'\n'}receber as instruções de redefinição:</Text>





<TextInput
placeholder='E-mail'
style={styles.inputCadEmail}

/>
<MaterialIcons name="alternate-email" size={20} color="black"
style={styles.iconEmail}
/>











<TouchableOpacity onPress={() => navigation.navigate('linkSenha')}
style={styles.buttonLogin}

>
<Text style={styles.buttonText}>Enviar link</Text>
</TouchableOpacity>






</View>

);
}