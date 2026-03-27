import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import styles from './styles';

type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'Medicamento'>;

export default function Medicamento(){
  

const navigation = useNavigation<any>();

const [medicamentos, setMedicamentos] = useState([]);


useEffect(() => {
  carregarMedicamentos();
}, []);

function carregarMedicamentos(){

  const dados = [
    {
      id: '1',
      nome: 'Dipirona',
      dosagem: '500 mg',
      horarios: '08:00, 14:00, 20:00, 02:00',
    },
    {
      id: '2',
      nome: 'Omeprazol',
      dosagem: '20 mg',
      horarios: 'Todos os dias às 08:00',
    },
  ];

  setMedicamentos(dados);
}

function deletarMedicamento(id){

const novaLista = medicamentos.filter(item => item.id !== id);

setMedicamentos(novaLista);

}

return (

<View style={styles.container}>

{/* BOTÃO + */}
<TouchableOpacity
onPress={() => navigation.navigate('Novomedicamento')}
activeOpacity={0.7}
style={{ position: 'absolute', top: 70, right: 20, zIndex: 10 }}
>

<Image
source={require('../../../assets/images/plus.png')}
style={{ width: 40, height: 40 }}
resizeMode="contain"
/>

</TouchableOpacity>
{/* TÍTULO */}
<Text style={styles.titleMedicamento}>
Meus Medicamentos
</Text>

{/* LISTA */}
<FlatList
data={medicamentos}
keyExtractor={(item) => item.id}
showsVerticalScrollIndicator={false}

renderItem={({ item }) => (

<View style={styles.card}>

<View style={styles.cardLeft}>

<Image
source={require('../../../assets/images/capsule.png')}
style={styles.capsule}
/>

<View>

<Text style={styles.nome}>
{item.nome}
</Text>

<Text style={styles.dosagem}>
{item.dosagem}
</Text>

<Text style={styles.horarios}>
{item.horarios}
</Text>

</View>

</View>

{/* BOTÃO DELETE */}
<TouchableOpacity
onPress={() => deletarMedicamento(item.id)}
>

<Image
source={require('../../../assets/images/delete.png')}
style={styles.delete}
/>

</TouchableOpacity>

</View>

)}
/>

{/* PRÓXIMO MEDICAMENTO */}
<TouchableOpacity style={styles.buttonMedicamento}>

<Image
source={require('../../../assets/images/time.png')}
style={styles.timeImage}
resizeMode="contain"
/>

<Text style={styles.buttonText}>
Próximo: Omeprazol às 08:00
</Text>

</TouchableOpacity>

</View>

);
}