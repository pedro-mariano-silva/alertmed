import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

container:{
flex:1,
backgroundColor:'#ffffff',
paddingTop:40,
paddingHorizontal:20
},

header:{
flexDirection:'row',
justifyContent:'space-between',
alignItems:'center',
marginBottom:20
},

titleNovomedicamento:{
top:-90,
left:92,
fontSize:25,
fontWeight:'bold'
},

back:{
width:49,
transform:[{ rotate:'180deg'}],
top:-55,
},

logoNovoMedicamento:{
top:-270,
left:60,
width:270,
height:170
},

titleNomeMedicamento:{
fontSize:18,
fontWeight:'bold',
top:-235,
},

inputNovoMedicamento:{
backgroundColor:'#FFF',
padding:8,
paddingLeft:40,
borderRadius:75,
marginBottom:16,
width:320,
top:-225,
height:40,
fontSize:15,
fontFamily:'Inter_700Bold',
borderWidth:1,
borderColor:'#C4C4C4',
},

titleDosagem:{
fontSize:18,
fontWeight:'bold',
top:-228,
},

inputDosagem:{
backgroundColor:'#FFF',
padding:8,
paddingLeft:40,
borderRadius:75,
marginBottom:16,
width:320,
top:-220,
height:40,
fontSize:15,
fontFamily:'Inter_700Bold',
borderWidth:1,
borderColor:'#C4C4C4',
},

titleHorario:{
fontSize:18,
fontWeight:'bold',
top:-222,
},

buttonHorario:{
borderRadius:20,
alignItems:'center',
top:-216,
width:220,
height:40,
justifyContent:'center'
},

textoBotao:{
color:'#fff',
fontWeight:'bold',
top:-2,
fontSize:20,
},

/* HORÁRIOS */

containerHorarios:{
flexDirection:'row',
flexWrap:'wrap',
top:-205,
width:320
},

chip:{
flexDirection:'row',
alignItems:'center',
backgroundColor:'#EAEAEA',
borderRadius:20,
paddingHorizontal:12,
paddingVertical:6,
marginRight:8,
marginBottom:8,
borderWidth:1,
borderColor:'#C4C4C4'
},

textHora:{
fontSize:14,
color:'#555',
marginRight:6,
fontWeight:'bold'
},

textX:{
fontSize:14,
color:'#777'
},

/* DIAS DA SEMANA */

titleDias:{
fontSize:18,
fontWeight:'bold',
top:-199,
},

containerDias:{
flexDirection:'row',
flexWrap:'wrap',
top:-195,
width:320
},

dia:{
width:36,
height:36,
borderRadius:18,
borderWidth:1,
borderColor:'#C4C4C4',
justifyContent:'center',
alignItems:'center',
marginRight:6,
marginBottom:8,
backgroundColor:'#F2F2F2'
},

diaSelecionado:{
backgroundColor:'#FFC200',
borderColor:'#FFC200'
},

textDia:{
fontSize:12,
fontWeight:'bold',
color:'#555'
},

textDiaSelecionado:{
color:'#ffffff'
},

buttonSalvar:{
borderRadius:20,
alignItems:'center',
top:-192,
left: 50,
width:260,
height:45,
justifyContent:'center'
},

textoBotaoSalvar:{
color:'#fff',
fontWeight:'bold',
fontSize:18
},

});

export default styles;