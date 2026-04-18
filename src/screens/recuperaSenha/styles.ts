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

  subTitle:{
    color: '#7D7C7C',
    fontSize: 18,
    top: '-40.2%',
    width: 480,
    left: 90,
    fontWeight: 'bold',
  },


  
  logo: {
    top: '-25%',
    width: '70%'
  },
 


  inputCadEmail: {
    backgroundColor: '#FFF',
    padding: 8,
    borderRadius: 95,
    marginBottom: 20,
    width: 350,
    paddingLeft: 39,
    top: '-35%',
    height: 39,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#b4b4b4',

  },

  
  iconEmail: {
    top: '-41.5%',
    left: -153,
  },



  buttonLogin: {
    backgroundColor: '#FFC200',
    borderRadius: 150,
    top: '-31.2%',
    width: 160,
    height: 40,
    alignItems: 'center',

  },

  buttonText: {
    color: '#FFF',
    fontSize: 22,
    top: 5,
    fontWeight: 'bold',
    fontFamily: 'Inter_700Bold',

  },
 
});

export default styles;