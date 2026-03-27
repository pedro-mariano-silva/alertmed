import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E53935',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  logoContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
   justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },

 
  
  logo: {
  width: 450,
  height: 280,
  top:-310,
  
},
elipse:{
   width: 300,  
  top:-90
},

  subtitle: {
    color: '#ffffff',
    fontSize: 25,
    fontFamily: 'Inter_700Bold',
    top: -220,
    textAlign: 'center',
  },

  subtitle2:{
    color: '#ffffff',
    fontSize: 15,
     fontFamily: 'Inter_700Bold',
    top: 20,
    textAlign: 'center',
  }
});

export default styles;