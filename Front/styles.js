// styles.js

import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    paddingTop: 30,
  },
  title: {
    color: '#D6BDF6',
    fontSize: 40,
    marginBottom: 70,
    fontWeight: '900',
  },
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: -220,
  },
  message: {
    color: '#2d3436',
    fontSize: 26,
    textAlign: 'center',
    marginHorizontal: 7,
    fontWeight: 'bold',
  },
  catImage: {
    width: 200,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
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
    color: 'white', // 흰색으로 수정
    fontSize: 40,
    lineHeight: 50,
  },
  fabContainer: {
    position: 'absolute',
    bottom: 110, // + 버튼의 위치에 맞추어 조정
    right: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    zIndex: 0,
  },
  fabButton: {
    backgroundColor: '#A481D0',
    borderRadius: 25,
    width: 50, // 너비 조정
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10, // 간격 조정
  },
  fabText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold', // 글자 두껍게 설정
  },
  closeButton: {
    marginTop: 1,
    backgroundColor: '#A481D0', // 보라색 배경색
    borderRadius: 25,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    fontSize: 30,
    lineHeight: 50,
    color: 'white', // 흰색으로 설정
    fontWeight: 'bold', // 글자 두껍게 설정
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
    selectedImage: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    margin: 20,
  },
});
