import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../../navigation/types';
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

const STORAGE_KEY = '@alertmed_medicamentos';

export default function Medicamento() {
  const navigation = useNavigation<NavigationProps>();

  const [medicamentos, setMedicamentos] = useState<MedicamentoItem[]>([]);
  const [proximoMedicamento, setProximoMedicamento] = useState<ProximoMedicamento>(null);

  useEffect(() => {
    carregarMedicamentosSalvos();
  }, []);

  useFocusEffect(
    useCallback(() => {
      carregarMedicamentosSalvos();
    }, [])
  );

  useEffect(() => {
    atualizarProximoMedicamento(medicamentos);
  }, [medicamentos]);

  async function carregarMedicamentosSalvos() {
    try {
      const dadosSalvos = await AsyncStorage.getItem(STORAGE_KEY);

      if (dadosSalvos) {
        const lista: MedicamentoItem[] = JSON.parse(dadosSalvos);
        setMedicamentos(lista);
      } else {
        setMedicamentos([]);
      }
    } catch (error) {
      console.log('Erro ao carregar medicamentos:', error);
    }
  }

  async function salvarMedicamentos(lista: MedicamentoItem[]) {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
    } catch (error) {
      console.log('Erro ao salvar medicamentos:', error);
    }
  }

  async function deletarMedicamento(id: string) {
    const novaLista = medicamentos.filter((item) => item.id !== id);
    setMedicamentos(novaLista);
    await salvarMedicamentos(novaLista);
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

    let proximo: { nome: string; horario: string; diferenca: number } | null = null;

    lista.forEach((medicamento) => {
      const dias = medicamento.diasSelecionados || [];
      const medicamentoValeHoje = dias.length === 0 || dias.includes(diaAtual);

      if (!medicamentoValeHoje) {
        return;
      }

      medicamento.horarios.forEach((horario) => {
        const minutosHorario = converterHorarioParaMinutos(horario);
        let diferenca = minutosHorario - minutosAtuais;

        if (diferenca < 0) {
          diferenca += 24 * 60;
        }

        if (!proximo || diferenca < proximo.diferenca) {
          proximo = {
            nome: medicamento.nome,
            horario,
            diferenca,
          };
        }
      });
    });

    if (proximo) {
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