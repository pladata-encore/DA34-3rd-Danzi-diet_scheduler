import { StyleSheet, Dimensions } from 'react-native';   //Dimensions 화면 크기 조절 할 때 사용 

export const loadingstyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D6BDF6',
  },

  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  icon: {
    width: 300,
    height: 300,
  },
});
