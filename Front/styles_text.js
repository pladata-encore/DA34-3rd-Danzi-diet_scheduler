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
  inputContainer: {
    marginBottom: 18,
    width: '80%',
    alignSelf: 'flex-start', 
  },
  label: {
    marginBottom: 3,
    color: '#2d3436',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 5,
    width: '120%',
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  unitText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#2d3436',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
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
  dataContainer: {
    marginTop: 20,
    width: '80%',
  },
  dataText: {
    fontSize: 16,
    marginBottom: 5,
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
