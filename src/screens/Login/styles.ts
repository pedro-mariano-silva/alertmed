import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop:97,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#ffffff'
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    top:'-42%'
  },
  logo:{
    top: '-25%',
    width: '80%'
  },
  inputEmail:{
    backgroundColor: '#FFF',
    padding: 6,
    borderRadius: 10,
    marginBottom: 16,
    width:285,
    textAlignVertical:'center',
    textAlign:'center',
    top:'-38%',
    height:50,
     fontSize: 20,
    fontFamily: 'Inter_700Bold',
    borderWidth: 1,
    borderColor: '#000000',
    
  },

  inputSenha:{
     backgroundColor: '#FFF',
    padding: 8,
    borderRadius: 10,
    marginBottom: 16,
    fontSize: 20,
    textAlign:'center',
    textAlignVertical:'center',
    width:285,
    top:'-35%',
    color: '#000000',
    fontFamily: 'Inter_700Bold',   
    borderWidth: 1,
    borderColor: '#000000',
  },

  buttonLogin:{
    backgroundColor: '#E53935',
     borderRadius: 150,
    top:'-28%',
    width:160,
    height:40,
    alignItems: 'center',
  
  },

  buttonText:{
    color: '#FFF',
      fontSize: 22,
      top:3,
        fontWeight: 'bold',
     fontFamily: 'Inter_700Bold',

  },
  footer:{
    top: -50,

  },

  textCriar:{
    color:'#9C853D',
    fontSize: 18,
    fontFamily: 'Inter_700Bold',    
  
  }, 
  line:{
    top: -61,
    left: -95,
  },
  line2:{
    top: -61,
    left: 95,
  },
  textForgetPassWord:{
    color:'#9C853D',
    fontSize: 18,
    fontFamily: 'Inter_700Bold',    
  },
  rememberContainer:{
    top: -330,
    left: 120,
      flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 20,

  },
  checkboxChecked:{
    backgroundColor: '#ffffff',

  },
  checkbox:{
    width: 23,
  height: 22,
  borderWidth: 1,
  borderColor: '#000',
  borderRadius: 4,
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: 8,
  top:'-170%'

  },

  check:{
    color: '#9C853D',
  fontSize: 20,
  top: -4,

  },
  rememberText:{
    fontFamily: 'Inter_700Bold',
    top:'-170%'

  },

});

export default styles;