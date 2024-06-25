import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import styles from './styles';

export default function Cal() {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); // State to hold the selected image URI
  const navigation = useNavigation();

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleOptionSelect = async (option) => {
    setShowOptions(false);

    if (option === 'text') {
      navigation.navigate('AddText');
    } else if (option === 'camera') {
      await openCamera();
    } else if (option === 'gallery') {
      await openGallery();
    }
  };

  const openCamera = async () => {
    try {
      let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

      if (!permissionResult.granted) {
        Alert.alert('카메라 권한 필요', '이 기능을 사용하려면 카메라 권한이 필요합니다.');
        return;
      }

      let pickerResult = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
      });

      if (pickerResult.cancelled || !pickerResult.assets || pickerResult.assets.length === 0) {
        console.log('Camera cancelled or no image selected');
        return;
      }

      const localUri = pickerResult.assets[0].uri;
      console.log('Selected camera image:', localUri);

      const filename = localUri.split('/').pop();
      const newPath = FileSystem.documentDirectory + filename;

      await FileSystem.moveAsync({
        from: localUri,
        to: newPath
      });

      console.log('Selected camera image saved to:', newPath);
      Alert.alert('카메라 이미지', `이미지가 저장되었습니다`);
      setSelectedImage(newPath); // 선택된 이미지 URI 설정
    } catch (error) {
      console.error('카메라 실행 중 오류 발생:', error);
      Alert.alert('오류', '카메라를 여는 도중 문제가 발생했습니다.');
    }
  };

  const openGallery = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('갤러리 접근 권한 필요', '이 기능을 사용하려면 갤러리 접근 권한이 필요합니다.');
      return;
    }

    let pickerResult;
    try {
      pickerResult = await ImagePicker.launchImageLibraryAsync({});
      console.log('Picker result:', pickerResult);
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('오류', '이미지를 불러오는 도중 오류가 발생했습니다.');
      return;
    }

    if (pickerResult.cancelled || !pickerResult.assets || pickerResult.assets.length === 0) {
      console.log('Image picker was cancelled or no image was selected');
      return;
    }

    const localUri = pickerResult.assets[0].uri;
    console.log('Selected gallery image:', localUri);

    const filename = localUri.split('/').pop();
    const newPath = FileSystem.documentDirectory + filename;

    try {
      await FileSystem.moveAsync({
        from: localUri,
        to: newPath
      });

      console.log('Selected gallery image saved to:', newPath);
      Alert.alert('갤러리 이미지', `이미지가 저장되었습니다`);
      setSelectedImage(newPath); // Set the selected image URI
    } catch (error) {
      console.error('Error saving the image:', error);
      Alert.alert('저장 오류', '이미지를 저장하는 데 실패했습니다.');
    }
  };

  const goHome = () => {
    navigation.navigate('Home');
  };

  const viewCalendar = () => {
    navigation.navigate('Calendar');
  };

  const viewStats = () => {
    navigation.navigate('Stats');
  };

  const viewProfile = () => {
    navigation.navigate('Profile');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>식단 기록</Text>
      <Image source={require('./assets/cry_cat.png')} style={styles.catImage} />
      <View style={styles.messageContainer}>
        <Text style={styles.message}>
          이날의 식단을 기록하지 않았습니다.{"\n\n"}식단을 기록해주세요.
        </Text>
      </View>

      {showOptions ? (
        <View style={styles.fabContainer}>
          <TouchableOpacity style={styles.fabButton} onPress={() => handleOptionSelect('camera')}>
            <Text style={styles.fabText}>카메라</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.fabButton} onPress={() => handleOptionSelect('gallery')}>
            <Text style={styles.fabText}>갤러리</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.fabButton} onPress={() => handleOptionSelect('text')}>
            <Text style={styles.fabText}>텍스트</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={toggleOptions}>
            <Text style={styles.closeButtonText}> ㅡ </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity style={styles.addButton} onPress={toggleOptions}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      )}

      <View style={styles.navigation}>
        <TouchableOpacity style={styles.navButton} onPress={goHome}>
          <Image source={require('./assets/home.png')} style={styles.navButtonImage} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={viewCalendar}>
          <Image source={require('./assets/calendar.png')} style={styles.navButtonImage} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={viewStats}>
          <Image source={require('./assets/insight.png')} style={styles.navButtonImage} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={viewProfile}>
          <Image source={require('./assets/profile.png')} style={styles.navButtonImage} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}