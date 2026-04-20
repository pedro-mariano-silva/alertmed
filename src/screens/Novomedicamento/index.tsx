import { View, Text, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { supabase } from '../../lib/supabase';
import styles from './styles';

type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'Novomedicamento'>;

const mapaDiasSemana: Record<string, number> = {
  DOM: 0,
  SEG: 1,
  TER: 2,
  QUA: 3,
  QUI: 4,
  SEX: 5,
  SAB: 6,
};

export default function Novomedicamento() {
  const navigation = useNavigation<NavigationProps>();

  const [nomeMedicamento, setNomeMedicamento] = useState('');
  const [dosagem, setDosagem] = useState('');
  const [horarios, setHorarios] = useState<string[]>([]);
  const [mostrarPicker, setMostrarPicker] = useState(false);
  const [horaSelecionada, setHoraSelecionada] = useState(new Date());
  const [loading, setLoading] = useState(false);

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
        hour12: false,
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

    try {
      setLoading(true);

      const {
        data: { user },
        error: erroUsuario,
      } = await supabase.auth.getUser();

      if (erroUsuario || !user) {
        Alert.alert('Erro', 'Usuário não autenticado.');
        return;
      }

      const { data: medicamentoCriado, error: erroMedicamento } = await supabase
        .from('medicamentos')
        .insert([
          {
            user_id: user.id,
            nome: nomeMedicamento.trim(),
            dosagem: dosagem.trim(),
            observacoes: null,
            ativo: true,
          },
        ])
        .select()
        .single();

      if (erroMedicamento || !medicamentoCriado) {
        console.log('Erro ao salvar medicamento:', erroMedicamento);
        Alert.alert('Erro', 'Não foi possível salvar o medicamento.');
        return;
      }

      const payloadHorarios = horarios.map((horario) => ({
        medicamento_id: medicamentoCriado.id,
        horario,
      }));

      const { error: erroHorarios } = await supabase
        .from('medicamento_horarios')
        .insert(payloadHorarios);

      if (erroHorarios) {
        console.log('Erro ao salvar horários:', erroHorarios);
        Alert.alert('Erro', 'O medicamento foi criado, mas os horários não puderam ser salvos.');
        return;
      }

      const payloadDias = diasSelecionados.map((dia) => ({
        medicamento_id: medicamentoCriado.id,
        dia_semana: mapaDiasSemana[dia],
      }));

      const { error: erroDias } = await supabase
        .from('medicamento_dias')
        .insert(payloadDias);

      if (erroDias) {
        console.log('Erro ao salvar dias:', erroDias);
        Alert.alert('Erro', 'O medicamento foi criado, mas os dias não puderam ser salvos.');
        return;
      }

      Alert.alert('Sucesso', 'Medicamento salvo com sucesso.', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      console.log('Erro ao salvar medicamento:', error);
      Alert.alert('Erro', 'Não foi possível salvar o medicamento.');
    } finally {
      setLoading(false);
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

      <TouchableOpacity onPress={salvarMedicamento} disabled={loading}>
        <LinearGradient
          colors={['#FFB300', '#FF8F00']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.buttonSalvar}
        >
          <Text style={styles.textoBotaoSalvar}>
            {loading ? 'Salvando...' : 'Salvar medicamento'}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}