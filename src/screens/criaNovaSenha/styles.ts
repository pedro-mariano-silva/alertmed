import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: '30%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff'
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    top: '-40%'
  },
  logo: {
    top: '-23.5%',
    width: '70%'
  },

  textvltarAoLogin:{

  },

  footer:{
        top: -50,
        color: '#9C853D',
        fontSize: 16,
        fontFamily: 'Inter_700Bold',


  },


 

  inputCadSenha: {
    backgroundColor: '#FFF',
    padding: 8,
    borderRadius: 95,
    marginBottom: 10,
    width: 350,
    paddingLeft: 35,
    top: -260,
    height: 39,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#b4b4b4',


  },

  iconlock: {
    top: -302,
    left: 10,

  },

  iconEye:{
    position: 'absolute',
    top: -255,
    left: 285,
  },


  buttonCriarNovaSenha: {
    backgroundColor: '#FFC200',
    borderRadius: 150,
    top: '-30.9%',
    width: 250,
    height: 40,
    alignItems: 'center',

  },

  buttonText: {
    color: '#FFF',
    fontSize: 22,
    top: 4.8,
    fontWeight: 'bold',
    fontFamily: 'Inter_700Bold',

  },


  line: {
    top: -61,
    left: -95,
  },
  line2: {
    top: -61,
    left: 95,
  },



  check: {
    color: '#9C853D',
    fontSize: 20,
    top: -4,

  },
  rememberText: {
    fontFamily: 'Inter_700Bold',
    top: '-170%'

  },

});

export default styles;