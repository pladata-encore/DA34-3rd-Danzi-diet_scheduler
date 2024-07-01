import { StyleSheet, Dimensions } from 'react-native'; 

const windowWidth = Dimensions.get('window').width;

export const MyModifyPagestyles  = StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D6BDF6',
  },
  formContainer: {
    width: windowWidth * 0.9,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
    title: {                      
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
    subtitle: {
      fontSize: 14,
      color: '#888888',
      marginBottom: 20,
    },
    inputSignup: {
      height: 40,
      width: windowWidth * 0.8,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal: 10, 
      backgroundColor: '#FFFFFF',
      marginBottom: 10,
    },
    inputBirth: {
      height: 40,
      width: windowWidth * 0.8,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal: 10,
      backgroundColor: '#FFFFFF',
    },
    birthInputContainer:{
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      marginBottom: 20,
    },
    label: {
      marginBottom: 5,
      fontSize: 15,
      color: '#888888'
    },
    checkButtonContainer: {
      position: 'absolute', 
      right: 5,  
      top: 20,
    },
    checkButton: {
      height: 30,   
      marginTop: 10,
      paddingHorizontal: 10,
      backgroundColor: '#0a0a0a',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    },
    checkButtonText: {
      color: '#FFF',
      fontWeight: 'bold',
    },
    birthContainer: {
      flexDirection: 'column',
      marginBottom: 20,
    },
    buttonContainer:{
      flexDirection: 'column',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    signupButton: {
      height: 40,    
      marginTop: 10,
      paddingHorizontal: 20,
      backgroundColor: '#0a0a0a',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    },
    signupButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    genderInputContainer:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    genderButton:{
      height: 40,
      width: '48%',
      paddingHorizontal: 10,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#b6b8ba',
    },

    genderText: {
      fontSize: 15,
      color: '#000'
    },
    
  });
  