import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  catImage: {
    width: 100,
    height: 100,
  },
  messageContainer: {
    marginVertical: 20,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
  },
  fabContainer: {
    position: 'absolute',
    bottom: 80,
    right: 20,
  },
  fabButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 50,
    marginBottom: 10,
  },
  fabText: {
    color: 'white',
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 50,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  addButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 50,
    position: 'absolute',
    bottom: 80,
    right: 20,
  },
  addButtonText: {
    color: 'white',
    fontSize: 24,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    position: 'absolute',
    bottom: 20,
  },
  navButton: {
    padding: 10,
  },
  navButtonImage: {
    width: 30,
    height: 30,
  },
  imageContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  savedImage: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
  },
});
