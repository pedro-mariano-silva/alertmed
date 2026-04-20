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
    fontSize: 20,
    fontWeight: 'bold',
    top: '-42%'
  },
  logo: {
    top: '-23.5%',
    width: '70%'
  },
  inputNome: {
    backgroundColor: '#FFF',
    padding: 8,
    borderRadius: 95,
    marginBottom: 20,
    width: 350,
    paddingLeft: 35,
    top: '-40%',
    height: 39,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#b4b4b4',

  },


  inputCadEmail: {
    backgroundColor: '#FFF',
    padding: 8,
    borderRadius: 95,
    marginBottom: 20,
    width: 350,
    paddingLeft: 39,
    top: '-42%',
    height: 39,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#b4b4b4',

  },

  inputCadSenha: {
    backgroundColor: '#FFF',
    padding: 8,
    borderRadius: 95,
    marginBottom: 10,
    width: 350,
    paddingLeft: 35,
    top: '-43.9%',
    height: 39,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#b4b4b4',


  },

  iconUser: {
    top: '-46.8%',
    left: -153,

  },

  iconEmail: {
    top: '-48.5%',
    left: -153,
  },

  iconSenha: {
    top: '-49.3%',
    left: -155,
  },

  iconRepeteSenha: {
    top: '-49.4%',
    right: 155,

  },

  buttonLogin: {
    backgroundColor: '#FFC200',
    borderRadius: 150,
    top: '-43.2%',
    width: 160,
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
  footer: {
    top: -50,

  },

  textCriar: {
    color: '#9C853D',
    fontSize: 18,
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
  textForgetPassWord: {
    color: '#9C853D',
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
  },
  rememberContainer: {
    top: -330,
    left: 120,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,

  },
  checkboxChecked: {
    backgroundColor: '#ffffff',

  },
  checkbox: {
    width: 23,
    height: 22,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    top: '-170%'

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

  senhaContainer: {
  position: 'relative',
  width: '100%',
  alignItems: 'center',
  top: '-41.0%',
},

eyeButtonSenha: {
  position: 'absolute',
  right: 45,
  top: -31,
  height: 57,
  justifyContent: 'center',
  alignItems: 'center',
},

eyeButtonRepeteSenha: {
  position: 'absolute',
  right: 45,
  top: -30,
  height: 57,
  justifyContent: 'center',
  alignItems: 'center',
},

});

export default styles;