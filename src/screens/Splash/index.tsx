import { View, Text, Image } from 'react-native';
import styles from './styles'
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

type NavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'Splash'
>;
export default function SplashScreen() {
  
  const navigation = useNavigation<NavigationProps>();

useEffect(() => {
  const timer = setTimeout(() => {
    navigation.replace('Login');
  }, 2500); // 2.5 segundos

  return () => clearTimeout(timer);
}, [navigation]);

  return (


    <View style={styles.container}>

           <Image
        source={require('../../../assets/images/elipse.png')}        
        style={styles.elipse}
        resizeMode="contain"
      />

      <Image
        source={require('../../../assets/images/logoSplash.png')}        
        style={styles.logo}
        resizeMode="contain"
      />
 
      <Text style={styles.subtitle}>
        BOAS VINDAS!
      </Text>

      <Text style={styles.subtitle2}>
        DESENVOLVIDO POR PEDRO MARIANO
      </Text>
    </View>
  );
}