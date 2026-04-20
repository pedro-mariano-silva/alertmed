import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import styles from './styles';

type NavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'linkSenha'
>;

export default function LinkSenha() {
  const navigation = useNavigation<NavigationProps>();

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

      <Text style={styles.subTitle}>
        Se o e-mail estiver cadastrado, você{'\n'}
        receberá um link para redefinir sua senha.
      </Text>

      <TouchableOpacity
        style={styles.buttonVoltarLogin}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>Voltar ao login</Text>
      </TouchableOpacity>
    </View>
  );
}