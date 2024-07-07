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
    marginBottom: 120,
    fontWeight: '900',
  },
  calendar: {
    width: '95%',
    aspectRatio: 0.7,
    marginTop: -10,
    backgroundColor: '#f8f9fa',
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
  
});
