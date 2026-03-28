import { View, Text, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../../navigation/types';
import styles from './styles';

type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'Novomedicamento'>;

type MedicamentoItem = {
  id: string;
  nome: string;
  dosagem: string;
  horarios: string[];
  diasSelecionados: string[];
};

const STORAGE_KEY = '@alertmed_medicamentos';

export default function Novomedicamento() {
  const navigation = useNavigation<NavigationProps>();

  const [nomeMedicamento, setNomeMedicamento] = useState('');
  const [dosagem, setDosagem] = useState('');
  const [horarios, setHorarios] = useState<string[]>([]);
  const [mostrarPicker, setMostrarPicker] = useState(false);
  const [horaSelecionada, setHoraSelecionada] = useState(new Date());

  const diasSemana = ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB', 'DOM'];
  const [diasSelecionados, setDiasSelecionados] = useState<string[]>([]);

  function removerHorario(index: number) {
    const lista = [...horarios];
    lista.splice(index, 1);
    setHorarios(lista);
  }

  function abrirSeletorHorario() {
    setMostrarPicker(true);
  }

  function selecionarHorario(event: any, date: Date | undefined) {
    setMostrarPicker(false);

    if (date) {
      setHoraSelecionada(date);

      const horaFormatada = date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });

      if (!horarios.includes(horaFormatada)) {
        const listaAtualizada = [...horarios, horaFormatada];
        listaAtualizada.sort();
        setHorarios(listaAtualizada);
      }
    }
  }

  function toggleDia(dia: string) {
    if (diasSelecionados.includes(dia)) {
      setDiasSelecionados(diasSelecionados.filter((d) => d !== dia));
    } else {
      setDiasSelecionados([...diasSelecionados, dia]);
    }
  }

  async function salvarMedicamento() {
    if (!nomeMedicamento.trim()) {
      Alert.alert('Atenção', 'Digite o nome do medicamento.');
      return;
    }

    if (!dosagem.trim()) {
      Alert.alert('Atenção', 'Digite a dosagem.');
      return;
    }

    if (horarios.length === 0) {
      Alert.alert('Atenção', 'Adicione pelo menos um horário.');
      return;
    }

    if (diasSelecionados.length === 0) {
      Alert.alert('Atenção', 'Selecione pelo menos um dia da semana.');
      return;
    }

    const novoMedicamento: MedicamentoItem = {
      id: Date.now().toString(),
      nome: nomeMedicamento.trim(),
      dosagem: dosagem.trim(),
      horarios,
      diasSelecionados,
    };

    try {
      const dadosSalvos = await AsyncStorage.getItem(STORAGE_KEY);
      const listaAtual = dadosSalvos ? JSON.parse(dadosSalvos) : [];

      const listaAtualizada = [novoMedicamento, ...listaAtual];

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(listaAtualizada));

      Alert.alert('Sucesso', 'Medicamento salvo com sucesso.');

      navigation.goBack();
    } catch (error) {
      console.log('Erro ao salvar medicamento:', error);
      Alert.alert('Erro', 'Não foi possível salvar o medicamento.');
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          source={require('../../../assets/images/back.png')}
          style={styles.back}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <Text style={styles.titleNovomedicamento}>Novo medicamento</Text>

      <Image
        source={require('../../../assets/images/logo.png')}
        style={styles.logoNovoMedicamento}
      />

      <Text style={styles.titleNomeMedicamento}>Nome do medicamento</Text>

      <TextInput
        style={styles.inputNovoMedicamento}
        placeholder="Ex. Dipirona"
        placeholderTextColor="#7D7C7C"
        value={nomeMedicamento}
        onChangeText={setNomeMedicamento}
      />

      <Text style={styles.titleDosagem}>Dosagem</Text>

      <TextInput
        style={styles.inputDosagem}
        placeholder="Ex. 500mg 1 comprimido"
        placeholderTextColor="#7D7C7C"
        value={dosagem}
        onChangeText={setDosagem}
      />

      <Text style={styles.titleHorario}>Horários:</Text>

      <TouchableOpacity onPress={abrirSeletorHorario}>
        <LinearGradient
          colors={['#FFB300', '#FF8F00']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.buttonHorario}
        >
          <Text style={styles.textoBotao}>Adicionar horários</Text>
        </LinearGradient>
      </TouchableOpacity>

      <View style={styles.containerHorarios}>
        {horarios.map((hora, index) => (
          <View key={index} style={styles.chip}>
            <Text style={styles.textHora}>{hora}</Text>

            <TouchableOpacity onPress={() => removerHorario(index)}>
              <Text style={styles.textX}>✕</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <Text style={styles.titleDias}>Dias da semana:</Text>

      <View style={styles.containerDias}>
        {diasSemana.map((dia) => {
          const selecionado = diasSelecionados.includes(dia);

          return (
            <TouchableOpacity
              key={dia}
              onPress={() => toggleDia(dia)}
              style={[styles.dia, selecionado && styles.diaSelecionado]}
            >
              <Text
                style={[styles.textDia, selecionado && styles.textDiaSelecionado]}
              >
                {dia}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {mostrarPicker && (
        <DateTimePicker
          value={horaSelecionada}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={selecionarHorario}
        />
      )}

      <TouchableOpacity onPress={salvarMedicamento}>
        <LinearGradient
          colors={['#FFB300', '#FF8F00']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.buttonSalvar}
        >
          <Text style={styles.textoBotaoSalvar}>Salvar medicamento</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}