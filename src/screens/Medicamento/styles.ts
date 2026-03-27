import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

container:{
flex:1,
backgroundColor:'#ffffff',
paddingTop:80,
paddingHorizontal:20
},

header:{
flexDirection:'row',
justifyContent:'space-between',
alignItems:'center',
marginBottom:20
},

titleMedicamento:{
  
fontSize:25,
fontWeight:'bold'
},

plusButton:{
  position:'absolute',
  top:70,
  right:20,
},

plusImage:{
  width:40,
  height:40,
},

card:{
 top: 17, 
backgroundColor:'#F3F3F3',
borderRadius:18,
padding:25,
flexDirection:'row',
justifyContent:'space-between',
alignItems:'center',
marginBottom:15
},

cardLeft:{
flexDirection:'row',
alignItems:'center',
gap:10
},

capsule:{
width:58,
height:58,
left: -18.2
},

delete:{
width:24,
height:24
},

nome:{
fontSize:17,
fontWeight:'bold'
},

dosagem:{
color:'#555',
fontSize:14
},

horarios:{
color:'#777',
fontSize:12
},

buttonMedicamento:{
backgroundColor:'#E53935',
borderRadius:150,
height:45,
flexDirection:'row',
alignItems:'center',
justifyContent:'center',
top: -130
},

buttonText:{
color:'#FFF',
fontSize:16,
fontWeight:'bold',
marginLeft:10
},

timeImage:{
width:22,
height:22
}

});

export default styles;