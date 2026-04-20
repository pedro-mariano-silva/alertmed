import { View, Text, Image, TouchableOpacity, FlatList, Alert } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { supabase } from '../../lib/supabase';
import styles from './styles';

type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'Medicamento'>;

type MedicamentoItem = {
  id: string;
  nome: string;
  dosagem: string;
  horarios: string[];
  diasSelecionados?: string[];
};

type ProximoMedicamento = {
  nome: string;
  horario: string;
} | null;

const mapaDiaNumeroParaSigla: Record<number, string> = {
  0: 'DOM',
  1: 'SEG',
  2: 'TER',
  3: 'QUA',
  4: 'QUI',
  5: 'SEX',
  6: 'SAB',
};

type MedicamentoResponse = {
  id: string;
  nome: string;
  dosagem: string;
  medicamento_horarios?: {
    id: string;
    horario: string;
  }[];
  medicamento_dias?: {
    id: string;
    dia_semana: number;
  }[];
};

export default function Medicamento() {
  const navigation = useNavigation<NavigationProps>();

  const [medicamentos, setMedicamentos] = useState<MedicamentoItem[]>([]);
  const [proximoMedicamento, setProximoMedicamento] = useState<ProximoMedicamento>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    carregarMedicamentos();
  }, []);

  useFocusEffect(
    useCallback(() => {
      carregarMedicamentos();
    }, [])
  );

  useEffect(() => {
    atualizarProximoMedicamento(medicamentos);
  }, [medicamentos]);

  async function carregarMedicamentos() {
    try {
      setLoading(true);

      const {
        data: { user },
        error: erroUsuario,
      } = await supabase.auth.getUser();

      if (erroUsuario || !user) {
        console.log('Usuário não autenticado:', erroUsuario);
        setMedicamentos([]);
        return;
      }

      const { data, error } = await supabase
        .from('medicamentos')
        .select(`
          id,
          nome,
          dosagem,
          medicamento_horarios (
            id,
            horario
          ),
          medicamento_dias (
            id,
            dia_semana
          )
        `)
        .eq('user_id', user.id)
        .eq('ativo', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.log('Erro ao carregar medicamentos:', error);
        Alert.alert('Erro', 'Não foi possível carregar os medicamentos.');
        setMedicamentos([]);
        return;
      }

      const listaFormatada: MedicamentoItem[] = ((data as MedicamentoResponse[]) || []).map(
        (item) => {
          const horarios = (item.medicamento_horarios || [])
            .map((h) => h.horario?.slice(0, 5))
            .filter(Boolean)
            .sort();

          const diasSelecionados = (item.medicamento_dias || [])
            .map((d) => mapaDiaNumeroParaSigla[d.dia_semana])
            .filter(Boolean);

          return {
            id: item.id,
            nome: item.nome,
            dosagem: item.dosagem,
            horarios,
            diasSelecionados,
          };
        }
      );

      setMedicamentos(listaFormatada);
    } catch (error) {
      console.log('Erro ao carregar medicamentos:', error);
      Alert.alert('Erro', 'Não foi possível carregar os medicamentos.');
    } finally {
      setLoading(false);
    }
  }

  async function deletarMedicamento(id: string) {
    Alert.alert(
      'Excluir medicamento',
      'Tem certeza que deseja excluir este medicamento?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              const { error } = await supabase
                .from('medicamentos')
                .delete()
                .eq('id', id);

              if (error) {
                console.log('Erro ao deletar medicamento:', error);
                Alert.alert('Erro', 'Não foi possível excluir o medicamento.');
                return;
              }

              const novaLista = medicamentos.filter((item) => item.id !== id);
              setMedicamentos(novaLista);
            } catch (error) {
              console.log('Erro ao deletar medicamento:', error);
              Alert.alert('Erro', 'Não foi possível excluir o medicamento.');
            }
          },
        },
      ]
    );
  }

  function formatarHorarios(horarios: string[]) {
    return horarios.join(', ');
  }

  function formatarDias(dias?: string[]) {
    if (!dias || dias.length === 0) {
      return '';
    }

    return dias.join(', ');
  }

  function obterDiaAtual(): string {
    const diasSemana = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];
    const hoje = new Date();
    return diasSemana[hoje.getDay()];
  }

  function converterHorarioParaMinutos(horario: string): number {
    const [hora, minuto] = horario.split(':').map(Number);
    return hora * 60 + minuto;
  }

  function atualizarProximoMedicamento(lista: MedicamentoItem[]) {
  const agora = new Date();
  const diaAtual = obterDiaAtual();
  const minutosAtuais = agora.getHours() * 60 + agora.getMinutes();

  type ProximoCalculado = {
    nome: string;
    horario: string;
    diferenca: number;
  };

  let proximo: ProximoCalculado | null = null;

  for (const medicamento of lista) {
    const dias = medicamento.diasSelecionados || [];
    const medicamentoValeHoje = dias.length === 0 || dias.includes(diaAtual);

    if (!medicamentoValeHoje) {
      continue;
    }

    for (const horario of medicamento.horarios) {
      const minutosHorario = converterHorarioParaMinutos(horario);
      let diferenca = minutosHorario - minutosAtuais;

      if (diferenca < 0) {
        diferenca += 24 * 60;
      }

      if (proximo === null || diferenca < proximo.diferenca) {
        proximo = {
          nome: medicamento.nome,
          horario,
          diferenca,
        };
      }
    }
  }

  if (proximo !== null) {
    setProximoMedicamento({
      nome: proximo.nome,
      horario: proximo.horario,
    });
  } else {
    setProximoMedicamento(null);
  }
}
  return (
    <View style={styles.container}>
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

      <Text style={styles.titleMedicamento}>Meus Medicamentos</Text>

      <FlatList
        data={medicamentos}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        refreshing={loading}
        onRefresh={carregarMedicamentos}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardLeft}>
              <Image
                source={require('../../../assets/images/capsule.png')}
                style={styles.capsule}
              />

              <View>
                <Text style={styles.nome}>{item.nome}</Text>
                <Text style={styles.dosagem}>{item.dosagem}</Text>

                <Text style={styles.horarios}>
                  Horários: {formatarHorarios(item.horarios)}
                </Text>

                {item.diasSelecionados && item.diasSelecionados.length > 0 && (
                  <Text style={styles.horarios}>
                    Dias: {formatarDias(item.diasSelecionados)}
                  </Text>
                )}
              </View>
            </View>

            <TouchableOpacity onPress={() => deletarMedicamento(item.id)}>
              <Image
                source={require('../../../assets/images/delete.png')}
                style={styles.delete}
              />
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 30 }}>
            Nenhum medicamento cadastrado.
          </Text>
        }
      />

      <TouchableOpacity style={styles.buttonMedicamento}>
        <Image
          source={require('../../../assets/images/time.png')}
          style={styles.timeImage}
          resizeMode="contain"
        />

        <Text style={styles.buttonText}>
          {proximoMedicamento
            ? `Próximo: ${proximoMedicamento.nome} às ${proximoMedicamento.horario}`
            : 'Nenhum medicamento programado'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}