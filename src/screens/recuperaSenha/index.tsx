import { View, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { supabase } from '../../lib/supabase';
import styles from './styles';

type NavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'recuperaSenha'
>;

export default function RecuperaSenha() {
  const navigation = useNavigation<NavigationProps>();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

async function enviarLinkRecuperacao() {
  if (!email.trim()) {
    Alert.alert('Atenção', 'Digite seu e-mail.');
    return;
  }

  try {
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(
      email.trim(),
      {
        redirectTo: 'alertmed://reset-password',
      }
    );

    if (error) {
      Alert.alert('Erro', error.message);
      return;
    }

    // 🔥 ALTERAÇÃO AQUI
    navigation.navigate('linkSenha');

  } catch (error) {
    console.log('Erro ao enviar link de recuperação:', error);
    Alert.alert('Erro', 'Não foi possível enviar o link de recuperação.');
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

      <Text style={styles.title}>RECUPERAR SENHA</Text>

      <Text style={styles.subTitle}>
        Digite seu e-mail cadastrado, para{'\n'}
        receber as instruções de redefinição:
      </Text>

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

      <TouchableOpacity
        onPress={enviarLinkRecuperacao}
        style={styles.buttonLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Enviando...' : 'Enviar link'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}