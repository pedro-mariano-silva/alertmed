import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import styles from './styles';

export default function Novomedicamento() {

const [horarios, setHorarios] = useState<string[]>([]);

const [mostrarPicker, setMostrarPicker] = useState(false);
const [horaSelecionada, setHoraSelecionada] = useState(new Date());

const diasSemana = ['SEG','TER','QUA','QUI','SEX','SAB','DOM'];
const [diasSelecionados, setDiasSelecionados] = useState<string[]>([]);

function removerHorario(index:number){

const lista = [...horarios];
lista.splice(index,1);
setHorarios(lista);

}

function abrirSeletorHorario(){
setMostrarPicker(true);
}

function selecionarHorario(event:any, date:any){

setMostrarPicker(false);

if(date){

const horaFormatada = date.toLocaleTimeString([],{
hour:'2-digit',
minute:'2-digit'
});

if(!horarios.includes(horaFormatada)){

const listaAtualizada = [...horarios, horaFormatada];

listaAtualizada.sort();

setHorarios(listaAtualizada);

}

}

}

function toggleDia(dia:string){

if(diasSelecionados.includes(dia)){

setDiasSelecionados(
diasSelecionados.filter(d => d !== dia)
);

}else{

setDiasSelecionados([...diasSelecionados,dia]);

}

}

return (

<View style={styles.container}>

<TouchableOpacity>
<Image
source={require('../../../assets/images/back.png')}
style={styles.back}
resizeMode="contain"
/>
</TouchableOpacity>

<Text style={styles.titleNovomedicamento}>
Novo medicamento
</Text>

<Image
source={require('../../../assets/images/logo.png')}
style={styles.logoNovoMedicamento}
/>

<Text style={styles.titleNomeMedicamento}>
Nome do medicamento
</Text>

<TextInput
style={styles.inputNovoMedicamento}
placeholder="Ex. Dipirona"
placeholderTextColor="#7D7C7C"
caretHidden={true}
autoCapitalize="none"
/>

<Text style={styles.titleDosagem}>
Dosagem
</Text>

<TextInput
style={styles.inputDosagem}
placeholder="Ex. 500mg 1 comprimido"
placeholderTextColor="#7D7C7C"
caretHidden={true}
autoCapitalize="none"
/>

<Text style={styles.titleHorario}>
Horários:
</Text>

<TouchableOpacity onPress={abrirSeletorHorario}>
<LinearGradient
colors={['#FFB300', '#FF8F00']}
start={{ x: 0, y: 0 }}
end={{ x: 1, y: 0 }}
style={styles.buttonHorario}
>
<Text style={styles.textoBotao}>
Adicionar horários
</Text>
</LinearGradient>
</TouchableOpacity>

{/* CHIPS DE HORÁRIOS */}

<View style={styles.containerHorarios}>

{horarios.map((hora, index) => (

<View key={index} style={styles.chip}>

<Text style={styles.textHora}>
{hora}
</Text>

<TouchableOpacity onPress={()=>removerHorario(index)}>
<Text style={styles.textX}>✕</Text>
</TouchableOpacity>

</View>

))}

</View>

{/* DIAS DA SEMANA */}

<Text style={styles.titleDias}>
Dias da semana:
</Text>

<View style={styles.containerDias}>

{diasSemana.map((dia)=>{

const selecionado = diasSelecionados.includes(dia);

return(

<TouchableOpacity
key={dia}
onPress={()=>toggleDia(dia)}
style={[
styles.dia,
selecionado && styles.diaSelecionado
]}
>

<Text
style={[
styles.textDia,
selecionado && styles.textDiaSelecionado
]}
>
{dia}
</Text>

</TouchableOpacity>

)

})}

</View>

{/* TIME PICKER */}

{mostrarPicker && (

<DateTimePicker
value={horaSelecionada}
mode="time"
is24Hour={true}
display="default"
onChange={selecionarHorario}
/>


)}
<TouchableOpacity>

<LinearGradient
colors={['#FFB300', '#FF8F00']}
start={{ x: 0, y: 0 }}
end={{ x: 1, y: 0 }}
style={styles.buttonSalvar}
>

<Text style={styles.textoBotaoSalvar}>
Salvar medicamento
</Text>

</LinearGradient>

</TouchableOpacity>


</View>

)}