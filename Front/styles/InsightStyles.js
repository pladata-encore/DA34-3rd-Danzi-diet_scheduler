import { StyleSheet } from 'react-native';

export const InsightStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 15,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 40,
        color: '#D6BDF6',
    },
    text: {
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 5,
        fontSize: 15,
        fontWeight: 'bold',
    },
    linechartContainer: {
        marginBottom: 50,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'gray',  
    },
    piechartContainer:{
        marginBottom: 50,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'gray',  
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
});
