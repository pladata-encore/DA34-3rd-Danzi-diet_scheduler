import { StyleSheet } from 'react-native';   //Dimensions 화면 크기 조절 할 때 사용 


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
      padding: 16,
      borderRadius: 8,
      marginBottom: 16,
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
      color: '#D6BDF6',
      fontWeight: 'bold',
    },
    value: {
      fontSize: 14,
      color: 'gray',
    },
    dietBox: {
      width: '100%',
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
      marginBottom: 5,
      padding: 13,
    },
    button: {
      width: '48%',
      backgroundColor: '#D3D3D3',
      padding: 8,
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
      top: 95,
      width: 30,
      height: 30,
    },
    dietmodify: {
      position: 'absolute',   //특정위치에 고정시키기 위해 사용 
      right: 25,   //right, top: 방향키 역할 
      top: 350,
      width: 30,
      height: 30,
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
}
)