import { View, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import Ionicons from '@expo/vector-icons/Ionicons';
import { supabase } from '../../lib/supabase';
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
  const [loading, setLoading] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);

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

  async function carregarUsuario() {
    try {
      const usuarioSalvo = await AsyncStorage.getItem('usuario');

      if (usuarioSalvo) {
        setUsuario(usuarioSalvo);
        setLembrar(true);
      }
    } catch (error) {
      console.log('Erro ao carregar usuário salvo:', error);
    }
  }

  async function fazerLogin() {
    if (!usuario.trim() || !senha.trim()) {
      Alert.alert('Atenção', 'Preencha e-mail e senha.');
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signInWithPassword({
        email: usuario.trim(),
        password: senha,
      });

      if (error) {
        Alert.alert('Erro', error.message);
        return;
      }

      if (!data.user) {
        Alert.alert('Erro', 'Não foi possível realizar o login.');
        return;
      }

      if (lembrar) {
        await AsyncStorage.setItem('usuario', usuario.trim());
      } else {
        await AsyncStorage.removeItem('usuario');
      }

      navigation.navigate('Medicamento');
    } catch (error) {
      console.log('Erro no login:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao tentar entrar.');
    } finally {
      setLoading(false);
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
        textAlign="center"
        selection={usuario.length === 0 ? { start: 0, end: 0 } : undefined}
        caretHidden={!mostrarCursor}
        onFocus={() => setMostrarCursor(true)}
        onBlur={() => setMostrarCursor(false)}
      />

     <View style={styles.senhaContainer}>
  <TextInput
    placeholder="Senha"
    placeholderTextColor="#000000"
    style={styles.inputSenha}
    value={senha}
    onChangeText={handleChangeSenha}
    secureTextEntry={!mostrarSenha}
    autoCapitalize="none"
    caretHidden={!mostrarCursor}
    onFocus={() => setMostrarCursor(true)}
    onBlur={() => setMostrarCursor(false)}
    selection={senha.length === 0 ? { start: 0, end: 0 } : undefined}
  />

  <TouchableOpacity
    onPress={() => setMostrarSenha(!mostrarSenha)}
    style={styles.eyeButton}
  >
    <Ionicons
      name={mostrarSenha ? 'eye-off-outline' : 'eye-outline'}
      size={28}
      color="#000"
    />
  </TouchableOpacity>
</View>

      <TouchableOpacity
        style={styles.buttonLogin}
        onPress={fazerLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Entrando...' : 'Logar'}
        </Text>
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

      <View style={styles.containerVersion}>
        <Text style={styles.versionText}>versão 1.0</Text>
      </View>

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