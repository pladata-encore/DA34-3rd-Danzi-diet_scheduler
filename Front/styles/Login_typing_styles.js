import { StyleSheet, Dimensions } from 'react-native';   //Dimensions 화면 크기 조절 할 때 사용 

// ID, pw 입력칸 사formContainer이즈 
const windowWidth = Dimensions.get('window').width;

export const Loginstyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D6BDF6',
  },
  title: {                      
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    width: windowWidth * 0.9,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
  },
  inputButton: {
    height: 40,
    width: windowWidth * 0.9,
    marginBottom: 20,
    backgroundColor: '#000000',
    justifyContent: 'center', 
    alignItems: 'center', 
    borderRadius: 10,
  },
  inputButtonText:{
    color: 'white'
  },
  additionalText: {
    marginTop: 10,
    marginBottom: 10,
  },
});
