import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, Dimensions, FlatList, Image, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import Svg, { G, Path, Text as SvgText } from 'react-native-svg';
import CalendarStrip from 'react-native-calendar-strip';
import styles from './styles_foodlist';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { FoodContext } from './FoodContext';

const { width } = Dimensions.get('screen');

const FoodList = () => {
  const { foodItems, setFoodItems } = useContext(FoodContext);
  const [showOptions, setShowOptions] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedFoodName, setSelectedFoodName] = useState('전체 메뉴');
  const navigation = useNavigation();
  const route = useRoute();
  const { date } = route.params;
  const foodForDate = foodItems[date] || [];
  const [selectedImage, setSelectedImage] = useState(null);

  const menuItems = [{ id: '0', name: '전체 메뉴' }, ...foodForDate.map((item, index) => ({ id: String(index + 1), name: item.foodName }))];

  const handleMenuToggle = () => {
    setMenuVisible(!menuVisible);
  };

  const handleMenuSelect = (item) => {
    setSelectedFoodName(item.name);
    setMenuVisible(false);
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleOptionSelect = async (option) => {
    setShowOptions(false);

    if (option === 'text') {
      navigation.navigate('AddText', { date });
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
      setSelectedImage(newPath);
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
      setSelectedImage(newPath);
    } catch (error) {
      console.error('Error saving the image:', error);
      Alert.alert('저장 오류', '이미지를 저장하는 데 실패했습니다.');
    }
  };

  const selectedItem = foodForDate.find(item => item.foodName === selectedFoodName) || {};

  const data = selectedFoodName === '전체 메뉴'
    ? [
        { key: '지방', amount: foodForDate.reduce((sum, item) => sum + Number(item.fat || 0), 0), color: '#FB9AD1' },
        { key: '탄수화물', amount: foodForDate.reduce((sum, item) => sum + Number(item.carbohydrates || 0), 0), color: '#8644A2' },
        { key: '단백질', amount: foodForDate.reduce((sum, item) => sum + Number(item.protein || 0), 0), color: '#BC7FCD' },
      ]
    : [
        { key: '지방', amount: Number(selectedItem.fat || 0), color: '#FB9AD1' },
        { key: '탄수화물', amount: Number(selectedItem.carbohydrates || 0), color: '#8644A2' },
        { key: '단백질', amount: Number(selectedItem.protein || 0), color: '#BC7FCD' },
      ];

  const total = data.reduce((sum, item) => sum + item.amount, 0);
  let cumulativeAngle = 0;

  const pieSlices = data.map((item, index) => {
    const value = total ? (item.amount / total) * 360 : 0;
    const largeArcFlag = value > 180 ? 1 : 0;
    const x1 = Math.cos((cumulativeAngle * Math.PI) / 180) * 65;
    const y1 = Math.sin((cumulativeAngle * Math.PI) / 180) * 65;
    cumulativeAngle += value;
    const x2 = Math.cos((cumulativeAngle * Math.PI) / 180) * 65;
    const y2 = Math.sin((cumulativeAngle * Math.PI) / 180) * 65;
    const pathData = `M0 0 L${x1} ${y1} A65 65 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

    const angle = cumulativeAngle - value / 2;
    const textX = Math.cos((angle * Math.PI) / 180) * 45;
    const textY = Math.sin((angle * Math.PI) / 180) * 45;

    const percentage = total ? ((item.amount / total) * 100).toFixed(1) : 0;

    return (
      <G key={item.key}>
        <Path d={pathData} fill={item.color} />
        <SvgText
          x={textX + 2}
          y={textY - 5}
          fill="white"
          fontSize="8"
          fontWeight="bold"
          textAnchor="middle"
          alignmentBaseline="middle"
        >
          {item.key}
        </SvgText>
        <SvgText
          x={textX - 8}
          y={textY + 7}
          fill="white"
          fontSize="8"
          fontWeight="bold"
          textAnchor="middle"
          alignmentBaseline="middle"
        >
          (  {percentage}%)
        </SvgText>
      </G>
    );
  });

  const handleDeletePress = () => {
    Alert.alert(
      "정말로 삭제하시겠습니까?",
      "",
      [
        {
          text: "예",
          onPress: () => {
            setFoodItems(prevItems => {
              const updatedItems = { ...prevItems };
              updatedItems[date] = updatedItems[date].filter(item => item.foodName !== selectedFoodName);
              if (updatedItems[date].length === 0) {
                delete updatedItems[date];
                navigation.navigate('Cal', { date });
              } else {
                setSelectedFoodName('전체 메뉴'); // 전체 메뉴로 변경
              }
              return updatedItems;
            });
          },
          style: "destructive"
        },
        {
          text: "아니오",
          onPress: () => {
            console.log("Cancel Pressed");
          },
          style: "cancel"
        }
      ],
      { cancelable: false }
    );
  };

  const handleEditPress = () => {
    navigation.navigate('FoodListModify', { date, ...selectedItem });
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
      <CalendarStrip
        style={styles.calendar}
        calendarColor={'#ffffff'}
        calendarHeaderStyle={{ color: '#000000' }}
        dateNumberStyle={{ color: '#000000' }}
        dateNameStyle={{ color: '#000000' }}
        highlightDateNumberStyle={{ color: '#ff6347' }}
        highlightDateNameStyle={{ color: '#ff6347' }}
        disabledDateNameStyle={{ color: 'grey' }}
        disabledDateNumberStyle={{ color: 'grey' }}
      />
      <Image source={require('./assets/default_food.png')} style={styles.foodImage} />

      <View style={styles.foodInfoContainer}>
        <TouchableOpacity style={styles.foodNameBox} onPress={handleMenuToggle}>
          <Text style={styles.foodName}>{selectedFoodName}</Text>
          <Text style={styles.dropdownIcon}>{menuVisible ? '▲' : '▼'}</Text>
        </TouchableOpacity>
        {menuVisible && (
          <View style={styles.menuContainer}>
            <FlatList
              data={menuItems}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuSelect(item)}>
                  <Text style={styles.menuItemText}>{item.name}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
        )}
      </View>

      {selectedFoodName === '전체 메뉴' ? (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.chartContainer}>
            <Svg width={width * 0.65} height={width * 0.65} viewBox="-65 -65 130 130">
              <G>
                {pieSlices}
              </G>
            </Svg>
          </View>
        </ScrollView>
      ) : (
        <View style={styles.foodDetailsContainer}>
          <View style={styles.foodDetails}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>칼로리</Text>
              <View style={styles.input}>
                <Text>{selectedItem.calories || 0}</Text>
                <Text style={styles.unitText}>kcal</Text>
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>탄수화물</Text>
              <View style={styles.input}>
                <Text>{selectedItem.carbohydrates || 0}</Text>
                <Text style={styles.unitText}>g</Text>
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>단백질</Text>
              <View style={styles.input}>
                <Text>{selectedItem.protein || 0}</Text>
                <Text style={styles.unitText}>g</Text>
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>지방</Text>
              <View style={styles.input}>
                <Text>{selectedItem.fat || 0}</Text>
                <Text style={styles.unitText}>g</Text>
              </View>
            </View>
          </View>
        </View>
      )}

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
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleEditPress}>
          <Text style={styles.saveButtonText}>수정</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={handleDeletePress}>
          <Text style={styles.cancelButtonText}>삭제</Text>
        </TouchableOpacity>
      </View>

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
};

export default FoodList;
