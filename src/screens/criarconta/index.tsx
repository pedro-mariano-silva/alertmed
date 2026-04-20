import { View, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { supabase } from '../../lib/supabase';
import styles from './styles';

type NavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'Criarconta'
>;

export default function Criarconta() {
  const navigation = useNavigation<NavigationProps>();

  const [usuario, setUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [repeteSenha, setRepeteSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarRepeteSenha, setMostrarRepeteSenha] = useState(false);

  const handleChangeUser = (text: string) => {
    setUsuario(text);
  };

  const handleChangeSenha = (text: string) => {
    setSenha(text);
  };

  async function criarConta() {
    if (!usuario.trim() || !email.trim() || !senha.trim() || !repeteSenha.trim()) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }

    if (senha.length < 6) {
      Alert.alert('Atenção', 'A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    if (senha !== repeteSenha) {
      Alert.alert('Atenção', 'As senhas não coincidem.');
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: senha,
        options: {
          data: {
            nome: usuario.trim(),
          },
        },
      });

      if (error) {
        Alert.alert('Erro', error.message);
        return;
      }

      if (!data.user) {
        Alert.alert('Erro', 'Não foi possível criar a conta.');
        return;
      }

      Alert.alert(
        'Sucesso',
        'Conta criada com sucesso.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login'),
          },
        ]
      );
    } catch (error) {
      console.log('Erro ao criar conta:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao criar a conta.');
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

      <Text style={styles.title}>Crie sua conta</Text>

      <TextInput
        placeholder="Nome completo"
        placeholderTextColor="#838282"
        style={styles.inputNome}
        value={usuario}
        onChangeText={handleChangeUser}
        autoCapitalize="words"
        autoCorrect={false}
        selection={usuario.length === 0 ? { start: 0, end: 0 } : undefined}
      />
      <Feather
        name="user"
        size={20}
        color="black"
        style={styles.iconUser}
      />

      <TextInput
        placeholder="E-mail"
        placeholderTextColor="#838282"
        style={styles.inputCadEmail}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <MaterialIcons
        name="alternate-email"
        size={20}
        color="black"
        style={styles.iconEmail}
      />

      <View style={styles.senhaContainer}>
        <TextInput
          placeholder="Senha"
          placeholderTextColor="#838282"
          style={styles.inputCadSenha}
          value={senha}
          onChangeText={handleChangeSenha}
          secureTextEntry={!mostrarSenha}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TouchableOpacity
          onPress={() => setMostrarSenha(!mostrarSenha)}
          style={styles.eyeButtonSenha}
        >
          <Ionicons
            name={mostrarSenha ? 'eye-off-outline' : 'eye-outline'}
            size={22}
            color="black"
          />
        </TouchableOpacity>
      </View>

      <SimpleLineIcons
        name="lock"
        size={20}
        color="black"
        style={styles.iconSenha}
      />

      <View style={styles.senhaContainer}>
        <TextInput
          placeholder="Repita a senha"
          placeholderTextColor="#838282"
          style={styles.inputCadSenha}
          value={repeteSenha}
          onChangeText={setRepeteSenha}
          secureTextEntry={!mostrarRepeteSenha}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TouchableOpacity
          onPress={() => setMostrarRepeteSenha(!mostrarRepeteSenha)}
          style={styles.eyeButtonRepeteSenha}
        >
          <Ionicons
            name={mostrarRepeteSenha ? 'eye-off-outline' : 'eye-outline'}
            size={22}
            color="black"
          />
        </TouchableOpacity>
      </View>

      <SimpleLineIcons
        name="lock"
        size={20}
        color="black"
        style={styles.iconRepeteSenha}
      />

      <TouchableOpacity
        style={styles.buttonLogin}
        onPress={criarConta}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Criando conta...' : 'Criar conta'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}