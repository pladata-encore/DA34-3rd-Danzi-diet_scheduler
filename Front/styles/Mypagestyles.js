import { StyleSheet, Dimensions } from 'react-native';   //Dimensions 화면 크기 조절 할 때 사용 

const windowWidth = Dimensions.get('window').width;

export const MyPagestyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      padding: 20,
    },
    header: {
      justifyContent: 'center', 
      alignItems: 'center',
      backgroundColor: '#A481D0',
      width: '100%',
      padding: 10,
      marginBottom: 4,
      borderRadius: 8,
    },
    title: {
      textAlign: 'center',
      fontSize: 20,
      color: 'black',
      fontWeight: 'bold',
      padding: 10,
    },
    subtitle: {
      fontSize: 14,
      color: 'white',
      fontWeight: 'bold',
    },
    infoSection: {
      padding: 20,
      borderRadius: 8,
      marginBottom: 5,
    },
    infoGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    infoBox: {
      width: '49%',
      backgroundColor: '#FFFFFF',
      padding: 16,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#D6BDF6',  
      marginBottom: 5,
      alignItems: 'center',
    },
    label: {
      fontSize: 16,
      marginBottom: 2,
      color: '#c8a3f7',
      fontWeight: 'bold',
    },
    value: {
      fontSize: 14,
      color: '#6f6d70',
    },
    dietBox: {
      width: windowWidth * 0.8,
      backgroundColor: '#FFFFFF',
      padding: 15,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#D6BDF6',  
      alignItems: 'center',
    },

    appSettings: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
      padding: 5,
    },
    button: {
      width: '48%',
      backgroundColor: '#8f8f8f',
      padding: 10,
      borderRadius: 8,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    Mymodify: {
      position: 'absolute',   //특정위치에 고정시키기 위해 사용 
      right: 25,   //right, top: 방향키 역할 
      top: 110,
      width: 30,
      height: 30,
    },
    dietmodify: {
      position: 'absolute',   //특정위치에 고정시키기 위해 사용 
      right: 25,   //right, top: 방향키 역할 
      top: 345,
      width: 30,
      height: 30,
    },    
    icon: {
      width: 25,
      height: 25,
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

}
)