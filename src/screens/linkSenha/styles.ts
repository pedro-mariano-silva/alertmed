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
    fontSize: 30,
    fontWeight: 'bold',
    top:'-49%'
  },

  subTitle:{
        color: '#7D7C7C',
    fontSize: 18,
    top: '-44.2%',
    width: 480,
    left: 79,
    fontWeight: 'bold',

  },

  logo:{
    top: '-27%',
    width: '80%'
  },


  buttonVoltarLogin:{
    backgroundColor: '#E53935',
     borderRadius: 150,
    top:'-12%',
    width:230,
    height:40,
    alignItems: 'center',
  
  },

  buttonText:{
    color: '#FFF',
      fontSize: 22,
      top:4.7,
        fontWeight: 'bold',
     fontFamily: 'Inter_700Bold',

  },

  

  check:{
 
  top: '-18%',
  width: 180,
  height: 80,

  },
  rememberText:{
    fontFamily: 'Inter_700Bold',
    top:'-170%'

  },

});

export default styles;