import { StyleSheet, Dimensions } from 'react-native';   //Dimensions 화면 크기 조절 할 때 사용 

// ID, pw 입력칸 사formContainer이즈 
const windowWidth = Dimensions.get('window').width;

export const SignupFormstyles  = StyleSheet.create({
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
    fontSize: 40,
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
    paddingHorizontal: 10, //입력칸 안 주석 여백 
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
  },
  inputBirth: {
    height: 40,
    width: windowWidth * 0.25,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
  },
  birthInputContainer:{
    flexDirection: 'row', // 수평 배열
    justifyContent: 'space-between', // input 박스 간의 간격을 동일하게
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    fontSize: 15,
    color: '#888888'
  },
  checkButtonContainer: {
    position: 'absolute',   //특정위치에 고정시키기 위해 사용 
    right: 5,   //right, top: 방향키 역할 
    top: 20,
  },
  checkButton: {
    height: 30,    //height, marginTop: 중복확인 버튼 사이즈 조절
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
  inputBirth: {
    height: 40,
    width: windowWidth * 0.25,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
  },
  buttonContainer:{
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  signupButton: {
    height: 40,    //height, marginTop: 중복확인 버튼 사이즈 조절
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
    backgroundColor: '#CCCCCC', // 버튼 선택 전 색상 
  },
  selectedGenderButton: {
    backgroundColor: '#D6BDF6', // 선택된 성별 버튼 색상
  },
  genderText: {
    fontSize: 15,
    color: '#000'
  },



  
});
