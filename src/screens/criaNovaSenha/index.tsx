import { View, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import styles from './styles';

type NavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'Criarconta'
>;

export default function CriarNovaSenha() {
  const navigation = useNavigation<NavigationProps>();

  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mostrarNovaSenha, setMostrarNovaSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);

  async function criarConta() {
    if (!senha || !confirmarSenha) {
      Alert.alert('Atenção', 'Preencha os dois campos de senha.');
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert('Ops!', 'As senhas são diferentes. Por favor, tente novamente');
      return;
    }

    Alert.alert('Sucesso', 'Senha criada com sucesso!');
    navigation.navigate('Login');
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
          style={styles.inputCadSenha}
          value={senha}
          onChangeText={setSenha}
          secureTextEntry={!mostrarNovaSenha}
          autoCapitalize="none"
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
          style={styles.inputCadSenha}
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
          secureTextEntry={!mostrarConfirmarSenha}
          autoCapitalize="none"
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
        onPress={criarConta}
      >
        <Text style={styles.buttonText}>Salvar senha</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.footer}>
          <Text style={styles.textvltarAoLogin}>Voltar ao login</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}