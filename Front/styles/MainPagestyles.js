import { StyleSheet } from 'react-native';   //Dimensions 화면 크기 조절 할 때 사용 

export const MainPagestyles  = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: '#D6BDF6',
    width: '100%', // 헤더가 화면 전체 너비를 차지하게 설정
    paddingTop: 70, // 상단 패딩을 추가하여 헤더 내부 내용물 배치
    paddingBottom: 150, // 하단 패딩을 추가하여 헤더 내부 내용물 배치
    alignItems: 'center',  // 텍스트 정렬
    position: 'absolute', // 절대 위치 지정
    top: 0, // 화면 맨 위쪽에 위치
  },
  dday:{
    fontSize: 60,
    color: 'white',
  },
  successday: {
    fontSize: 30,
    color: 'gray',
  },
  circle:{
    position: 'absolute', // 절대 위치 지정
    backgroundColor: 'white',
    borderColor: '#885858',
    borderWidth: 1,
    borderRadius: 250,   // 사각형을 원으로 만듬 
    top: 160,            // 위치 이동할 때 사용 
    height: 250,
    width: 250, 
    justifyContent: 'center', // 수직 중앙 정렬
    alignItems: 'center', // 수평 중앙 정렬
  },
  goalweight: {
    fontSize: 25,
    color: '#885858',
  },
  nowweight: {
    fontSize:35,
    color: 'black',
  },
  progressContainer: {
    marginHorizontal: 20,
    justifyContent: 'center', // 수직 중앙 정렬
    alignItems: 'center', // 수평 중앙 정렬
  },
  progressBar: {
    position: 'absolute',
    top: 370,
  },
  progressLabel: {
    fontSize: 15,
    marginBottom: 5,
    textAlign: 'left', 
  },
  progressBarBackground: {
    height: 30,
    width: 300,
    backgroundColor: '#E0E0E0',
    borderRadius: 20,
    overflow: 'hidden',
  },
  progress: {
    height: 200,
    backgroundColor: '#885858',
    borderRadius: 10,   //섭취량 부분 나타냄 
  },
  progressValue: {
    textAlign: 'right',
    marginTop: 5,
  },
  menuBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#ffffff',
  },
  icon: {
    width: 30,
    height: 30,
  },
  navigation: {
    position: 'absolute',
    bottom: 0,
    width: '110%',
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

})