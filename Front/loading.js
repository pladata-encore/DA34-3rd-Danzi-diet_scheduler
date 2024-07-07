import React from 'react';
import { View, Image } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { loadingstyles } from './styles/loadingstyles'; // styles.js에서 스타일 import

const LoadingScreen = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={loadingstyles.container}>
        <View style={loadingstyles.loadingContainer}>
          <Image source={require('./assets/loading.png')} style={loadingstyles.icon} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default LoadingScreen;

