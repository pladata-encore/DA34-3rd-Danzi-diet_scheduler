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
    paddingHorizontal: 150,  // 가로 길이 조정
    paddingVertical: 10,  // 세로 패딩 증가
    borderRadius: 20,
    marginTop: 5,
    height: 40,
    justifyContent: 'center',  // 텍스트 수직 중앙 정렬
  },
  foodName: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  dropdownIcon: {
    fontSize: 20,  // 아이콘 크기 조정
    color: 'black',
    position: 'absolute',  // 절대 위치 지정
    right: 15,  // 오른쪽에 배치
    top: 7,  // 아이콘을 10px 아래로 내림
  },
  menuContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 5,
    marginTop: 4,
    alignSelf: 'center',  // 중앙 정렬
  },
  menuItem: {
    backgroundColor: '#D6BDF6',  // 내부 색상 변경
    paddingHorizontal: 50,  // 가로 길이 조정
    paddingVertical: 10,  // 세로 패딩 증가
    borderRadius: 20,
    marginTop: 5,
    height: 40,
    justifyContent: 'center',  // 텍스트 수직 중앙 정렬
  },
  menuItemText: {
    fontSize: 15,
    color: '#333',
    fontWeight: 'bold',
  },
  chartContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 40,  // 차트와 다른 요소 사이 여백 조정
  },
  foodDetailsContainer: {
    marginTop: 10,
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
    marginLeft: 170,
  },
  addButton: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    backgroundColor: '#A481D0',
    borderRadius: 25,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  addButtonText: {
    color: 'white',  // 흰색으로 수정
    fontSize: 40,
    lineHeight: 50,
  },
  fabContainer: {
    position: 'absolute',
    bottom: 110,  // + 버튼의 위치에 맞추어 조정
    right: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    zIndex: 0,
  },
  fabButton: {
    backgroundColor: '#A481D0',
    borderRadius: 25,
    width: 50,  // 너비 조정
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,  // 간격 조정
  },
  fabText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',  // 글자 두껍게 설정
  },
  closeButton: {
    marginTop: 1,
    backgroundColor: '#A481D0',  // 보라색 배경색
    borderRadius: 25,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    fontSize: 30,
    lineHeight: 50,
    color: 'white',  // 흰색으로 설정
    fontWeight: 'bold',  // 글자 두껍게 설정
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
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
