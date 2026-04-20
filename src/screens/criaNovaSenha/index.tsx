import { View, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { supabase } from '../../lib/supabase';
import styles from './styles';

type NavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'criarNovaSenha'
>;

export default function CriarNovaSenha() {
  const navigation = useNavigation<NavigationProps>();

  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mostrarNovaSenha, setMostrarNovaSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);
  const [loading, setLoading] = useState(false);

  async function salvarNovaSenha() {
    if (!senha || !confirmarSenha) {
      Alert.alert('Atenção', 'Preencha os dois campos de senha.');
      return;
    }

    if (senha.length < 6) {
      Alert.alert('Atenção', 'A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert('Ops!', 'As senhas são diferentes. Por favor, tente novamente.');
      return;
    }

    try {
      setLoading(true);

      const { error } = await supabase.auth.updateUser({
        password: senha,
      });

      if (error) {
        Alert.alert('Erro', error.message);
        return;
      }

      Alert.alert('Sucesso', 'Senha redefinida com sucesso!', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Login'),
        },
      ]);
    } catch (error) {
      console.log('Erro ao redefinir senha:', error);
      Alert.alert('Erro', 'Não foi possível redefinir a senha.');
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

      <Text style={styles.title}>Criar nova senha</Text>

      <View>
        <TextInput
          placeholder="Nova senha"
          placeholderTextColor="#838282"
          style={styles.inputCadSenha}
          value={senha}
          onChangeText={setSenha}
          secureTextEntry={!mostrarNovaSenha}
          autoCapitalize="none"
          autoCorrect={false}
        />

        <SimpleLineIcons
          name="lock"
          size={20}
          color="black"
          style={styles.iconlock}
        />

        <TouchableOpacity
          onPress={() => setMostrarNovaSenha(!mostrarNovaSenha)}
          style={styles.iconEye}
        >
          <Feather
            name={mostrarNovaSenha ? 'eye' : 'eye-off'}
            size={22}
            color="#000"
          />
        </TouchableOpacity>
      </View>

      <View>
        <TextInput
          placeholder="Confirme a nova senha"
          placeholderTextColor="#838282"
          style={styles.inputCadSenha}
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
          secureTextEntry={!mostrarConfirmarSenha}
          autoCapitalize="none"
          autoCorrect={false}
        />

        <SimpleLineIcons
          name="lock"
          size={20}
          color="black"
          style={styles.iconlock}
        />

        <TouchableOpacity
          onPress={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
          style={styles.iconEye}
        >
          <Feather
            name={mostrarConfirmarSenha ? 'eye' : 'eye-off'}
            size={22}
            color="#000"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.buttonCriarNovaSenha}
        onPress={salvarNovaSenha}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Salvando...' : 'Salvar senha'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.footer}>
          <Text style={styles.textvltarAoLogin}>Voltar ao login</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}