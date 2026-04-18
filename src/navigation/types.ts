export type RootStackParamList = {
  Medicamento: {
    novoMedicamento?: {
      id: string;
      nome: string;
      dosagem: string;
      horarios: string[];
      diasSelecionados: string[];
    };
  } | undefined;

  Splash: undefined;
  Login: undefined;
  Novomedicamento: undefined;
  Criarconta: undefined;
  recuperaSenha: undefined;
  linkSenha: undefined;
  criarNovaSenha: undefined;
};