import { StyleSheet } from 'react-native';

export const InsightStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
        color: '#D6BDF6',
        marginBottom: 10, // 간격을 줄임
    },
    text: {
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 5,
        fontSize: 15,
        fontWeight: 'bold',
    },
    linechartContainer: {
        marginBottom: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'gray',  
    },
    arrowButton: {
        padding: 8,
    },
    noDataText: {
        textAlign: 'center',
        marginVertical: 20,
        fontSize: 16,
        color: 'gray',
    },    
    piechartContainer:{
      marginBottom: 10,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: 'gray',  
  },
  pie: {
      alignContent: 'center',
      flexDirection: 'row',
  },
  piecomment: {
      marginLeft: 20,
  },
  pieindex:{
      flexDirection: 'row', 
      alignItems: 'center', 
      marginBottom: 10
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
});
