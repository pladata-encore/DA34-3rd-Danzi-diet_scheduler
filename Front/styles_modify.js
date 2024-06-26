import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  calendar: {
    height: 100,
    paddingTop: 20,
    paddingBottom: 1,
    marginVertical: 10, 
  },
  foodImage: {
    width: 180,  // 이미지 너비 수정
    height: 180,  // 이미지 높이 수정
    alignSelf: 'center',
    marginVertical: 10,  // 여백 조정
  },

  foodInfoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,  // 여백 조정
  },
  foodNameBox: {
    backgroundColor: '#D6BDF6',  // 내부 색상 변경
    width: 350,
    paddingVertical: 10,  // 세로 패딩 증가
    borderRadius: 20,
    marginTop: 5,
    height: 40,
    justifyContent: 'center',  // 텍스트 수직 중앙 정렬
    alignItems: 'center',
    alignSelf: 'center', //화면 가운데 설정
  },
  foodName: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  foodDetailsContainer: {
    marginTop: 20,
    padding: 30,
    borderRadius: 10,
    elevation: 1,  
  },
  foodDetails: {
    flexDirection: 'rows',
    alignItems: 'flex-start',
    
  },
  foodDetailText: {
    fontSize: 16,
    marginVertical: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 16,
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 5,
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  unitText: {
    fontSize: 16,
    marginLeft: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  saveButton: {
    backgroundColor: '#A481D0',
    borderRadius: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    marginHorizontal: 5,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#A481D0',
    borderRadius: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    marginHorizontal: 5,
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  navigation: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#ffffff',
    borderTopWidth: 4,
    borderTopColor: '#D6BDF6',
    paddingVertical: 30,
  },
  navButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navButtonImage: {
    width: 30,
    height: 30,
  },
  navButtonText: {
    fontSize: 16,
    color: '#A481D0',
  },
});
