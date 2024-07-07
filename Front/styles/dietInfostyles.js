import { StyleSheet, Dimensions } from 'react-native';   //Dimensions 화면 크기 조절 할 때 사용 

// ID, pw 입력칸 사formContainer이즈 
const windowWidth = Dimensions.get('window').width;


export const DietInfostyles = StyleSheet.create({
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
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  label: {
    marginBottom: 5,
    fontSize: 15,
    color: '#888888'
  },
  sliderContainer: {
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  slidertext:{
    marginBottom: 5,
    fontSize: 10,
    color: '#888888'
  },
  inputSignup: {
    height: 40,
    width: windowWidth * 0.8,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10, //입력칸 내부 문구 여백 
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
  },
  slider: {
    height:40, 
    width: 300
  },
  inputButton: {
    height: 40,
    width: windowWidth * 0.8,
    marginBottom: 20,
    backgroundColor: '#000000',
    justifyContent: 'center', 
    alignItems: 'center', 
    borderRadius: 10,
  },
  inputButtonText:{
    color: 'white',
    fontWeight: 'bold',
  },

  recommendationContainer: {
    height: 40,
    width: windowWidth * 0.8,
    marginBottom: 20,
    justifyContent: 'center', 
    alignItems: 'center', 
    borderRadius: 10,
    backgroundColor: '#e1ff00',
  },
  recommendationText: {
    color: 'black',
    fontWeight: 'bold',
  },


});
