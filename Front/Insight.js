import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, Dimensions } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { InsightStyles } from './styles/InsightStyles';
import Svg, { Line, Path, Circle, Text as SvgText, G, Rect } from 'react-native-svg';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import * as d3Shape from 'd3-shape';  // line, pie
import { insightpie } from './Api';

// 그래프 내부 여백
const contentInset = { top: 20, bottom: 20 };

const { width } = Dimensions.get('screen');

// 날짜를 ISO 8601 형식으로 변환하는 함수
const formatDate = (date) => {
    return date.toISOString().split('T')[0];
};

// MM-DD 형식으로 변환하는 함수
const formatToMMDD = (date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
};

// 현재 날짜를 기준으로 가장 가까운 일요일을 반환하는 함수
const getStartOfWeek = (date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());
    return startOfWeek;
};

// 현재 날짜를 기준으로 가장 가까운 토요일을 반환하는 함수
const getEndOfWeek = (date) => {
    const endOfWeek = new Date(date);
    endOfWeek.setDate(date.getDate() + (6 - date.getDay()));
    return endOfWeek;
};

// Linechart: 7일치 칼로리 데이터 가져오는 로직
export default function Insight({ navigation }) {
    const [lineData, setLineData] = useState([]);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [dietStartDate, setDietStartDate] = useState(null);
    const [dailyKcal, setDailyKcal] = useState(null);
    const [pieData, setPieData] = useState([]);

    const fetchData = async (startDate, endDate) => {
        try {
            const token = await AsyncStorage.getItem('accessToken');
            if (!token) {
                throw new Error('Token not found');
            }

            const response = await axios.get(
                `http://ec2-43-203-68-109.ap-northeast-2.compute.amazonaws.com:8000/diet/daily_meals/period/?start_date=${startDate}&end_date=${endDate}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            const fetchedData = response.data.map(item => ({
                ...item,
                date: new Date(item.date)
            }));

            setLineData(fetchedData);
        } catch (error) {
            console.error('Error fetching data', error);
            setLineData([]); // 데이터가 없을 경우 빈 배열 설정
        }
    };

    const fetchDietPeriodData = async () => {
        try {
            const token = await AsyncStorage.getItem('accessToken');
            if (!token) {
                throw new Error('Token not found');
            }

            const response = await axios.get(
                `http://ec2-43-203-68-109.ap-northeast-2.compute.amazonaws.com:8000/user/diet_info/`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            if (response.data && response.data.daily_kcal) {
                setDailyKcal(response.data.daily_kcal);
                setDietStartDate(new Date(response.data.start_dt));
            }
        } catch (error) {
            console.error('Error fetching diet period data', error);
            setDailyKcal(0); // 오류 발생 시 기본값 설정
        }
    };

    const fetchPieData = async () => {
        try {
            const pieInfo = await insightpie();
            setPieData([
                {
                    key: 1,
                    amount: pieInfo.kcal_difference_sum,
                    svg: { fill: '#D6BDF6' },
                    label: '소모한 칼로리',
                },
                {
                    key: 2,
                    amount: pieInfo.total_kcal - pieInfo.kcal_difference_sum,
                    svg: { fill: '#d1d1d1' },
                    label: '소모해야 할 칼로리',
                },
            ]);
        } catch (error) {
            Alert.alert('오류', '데이터를 불러오는 중 오류가 발생했습니다.', [
                { text: '확인' }
            ]);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            const today = new Date();
            setCurrentDate(today);
            const startOfWeek = getStartOfWeek(today);
            const endOfWeek = getEndOfWeek(today);
            const endDate = formatDate(endOfWeek);
            const startDate = formatDate(startOfWeek);
            console.log(`Fetching data from ${startDate} to ${endDate}`);  // 로그 추가
            fetchData(startDate, endDate);
            fetchDietPeriodData();
            fetchPieData();
        }, [])
    );

    // X, Y 라벨값 지정
    const getXLabels = () => {
        const startOfWeek = getStartOfWeek(currentDate);
        return Array.from({ length: 7 }, (_, i) => formatToMMDD(new Date(startOfWeek.getTime() + i * 86400000)));
    };

    const getYValues = () => {
        const startOfWeek = getStartOfWeek(currentDate);
        return Array.from({ length: 7 }, (_, i) => {
            const targetDate = new Date(startOfWeek.getTime() + i * 86400000);
            const entry = lineData.find(data => formatDate(data.date) === formatDate(targetDate));
            return entry ? entry.kcal : 0; // 데이터가 없는 경우 0으로 설정
        });
    };

    const renderGridLines = () => {
        const labels = [0, 500, 1000, 1500, 2000, 2500];
        return labels.map((label, index) => {
            const y = 220 - ((label / 1500) * (200 - contentInset.top - contentInset.bottom)) + contentInset.top;
            return (
                <React.Fragment key={index}>
                    <Line
                        x1={'0%'}
                        x2={'95%'}
                        y1={y}
                        y2={y}
                        stroke={'rgba(0,0,0,0.3)'}
                        strokeWidth={1}
                    />
                    <SvgText x="0" y={y - 5} fontSize="5" fill="black" textAnchor="start">
                        {label}kcal
                    </SvgText>
                </React.Fragment>
            );
        });
    };

    const renderDailyKcalLine = () => {
        if (dailyKcal === null) return null;
        const y = 220 - ((dailyKcal / 1500) * (200 - contentInset.top - contentInset.bottom)) + contentInset.top;
        return (
            <Line
                x1={'0%'}
                x2={'95%'}
                y1={y}
                y2={y}
                stroke={'red'}
                strokeWidth={2}
                strokeDasharray={[3, 3]}
            />
        );
    };

    const renderLineChart = () => {
        const xValues = getXLabels();
        const yValues = getYValues();
        const minValue = Math.min(...yValues);
        const maxValue = Math.max(...yValues);
        const range = maxValue - minValue;

        const points = yValues.map((value, index) => {
            const x = ((index + 0.3) / xValues.length) * width * 0.8; // X축 좌표를 날짜의 중간으로 조정
            const y = 240 - ((value / 1500) * (200 - contentInset.top - contentInset.bottom)); // Y축 좌표를 정확하게 매핑
            return { x, y, value };
        });

        const pathData = points.reduce((acc, point, index) => {
            return acc + `${index === 0 ? 'M' : 'L'}${point.x},${point.y} `;
        }, '');

        return (
            <Svg height="250" width="85%">
                {renderGridLines()}
                {renderDailyKcalLine()}
                <Path
                    d={pathData}
                    fill="none"
                    stroke="purple"
                    strokeWidth="2"
                />
                {points.map((point, index) => (
                    <React.Fragment key={index}>
                        <Circle cx={point.x} cy={point.y} r={2} fill="purple" />
                        <SvgText x={point.x} y={point.y -1} fontSize="8" fill="black" textAnchor="middle">
                            {point.value}
                        </SvgText>
                    </React.Fragment>
                ))}
            </Svg>
        );
    };

    const handlePreviousWeek = () => {
        const newDate = new Date(currentDate.setDate(currentDate.getDate() - 7));
        if (dietStartDate && newDate < dietStartDate) {
            alert('다이어트 시작일 이전으로는 이동할 수 없습니다.');
        } else {
            setCurrentDate(newDate);
            const startOfWeek = getStartOfWeek(newDate);
            const endOfWeek = getEndOfWeek(newDate);
            const endDate = formatDate(endOfWeek);
            const startDate = formatDate(startOfWeek);
            fetchData(startDate, endDate);
        }
    };

    const handleNextWeek = () => {
        const newDate = new Date(currentDate.setDate(currentDate.getDate() + 7));
        const today = new Date();
        if (newDate > today) {
            alert('오늘 날짜 이후로는 이동할 수 없습니다.');
        } else {
            setCurrentDate(newDate);
            const startOfWeek = getStartOfWeek(newDate);
            const endOfWeek = getEndOfWeek(newDate);
            const endDate = formatDate(endOfWeek);
            const startDate = formatDate(startOfWeek);
            fetchData(startDate, endDate);
        }
    };

    const consumedCalories = pieData.find(item => item.label === '소모한 칼로리')?.amount || 0;
    const remainingCalories = pieData.find(item => item.label === '소모해야 할 칼로리')?.amount || 0;
    const progress =  consumedCalories / (consumedCalories + remainingCalories) ;

    // 도넛 차트 그리기 
    const radius = 80;   // 도넛 두께 
    const innerRadius = 50;
    const pieGenerator = d3Shape.pie().value(d => d.amount); 
    const arcGenerator = d3Shape.arc()
        .innerRadius(innerRadius)
        .outerRadius(radius);

    const arcs = pieGenerator(pieData);

    return (
        <SafeAreaProvider>
            <SafeAreaView style={InsightStyles.container}>
                <Text style={InsightStyles.title}>On:ly 변화</Text>
                <View style={InsightStyles.linechartContainer}>
                    <Text style={InsightStyles.text}> 칼로리 추이 </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <TouchableOpacity onPress={handlePreviousWeek}>
                            <Text style={InsightStyles.arrow}>◀</Text>
                        </TouchableOpacity>
                        {renderLineChart()}
                        <TouchableOpacity onPress={handleNextWeek}>
                            <Text style={InsightStyles.arrow}>▶</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        horizontal
                        contentContainerStyle={{ margin: 5, justifyContent: 'center', alignItems: 'center' }}
                        data={getXLabels()}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <Text style={{ fontSize: 13, paddingHorizontal: 5 }}>{item}</Text>
                        )}
                    />
                </View>

                <View style={InsightStyles.piechartContainer}>
                    <Text style={InsightStyles.text}> 진행률 </Text>
                    <View style={InsightStyles.pie}>
                    {/* 진행률 박스 크기 */}
                    <Svg height="200" width="300" >
                        {/* pie 위치: G transform 사용 */}
                        <G transform="translate(170, 100)">  
                            {arcs.map((arc, index) => (
                                <Path
                                    key={index}
                                    d={arcGenerator(arc)}
                                    fill={pieData[index].svg.fill}
                                />
                            ))}
                            <SvgText
                                x="0"
                                y="0"
                                textAnchor="middle"
                                fontSize="24"
                                dy=".3em"
                                fill="black"
                            >
                                {`${ (progress * 100) .toFixed(2) }%`}
                            </SvgText>
                        </G>
                    </Svg>
                    </View>
                    <View style={InsightStyles.piecomment}>
                        {pieData.map((item, index) => (
                            <View key={index} style={InsightStyles.pieindex}>
                            <Svg height="20" width="20">
                                {/* Rect 역할: 주석 색깔 표시 width, height -> 사각형 */}
                                <Rect width="20" height="20" fill={item.svg.fill} /> 
                            </Svg>
                            <Text style={{ marginLeft: 10 }}>{item.label}</Text>
                        </View>
                        )
                         )}
                    </View>
                </View>
                
                <View style={InsightStyles.navigation}>
                    <TouchableOpacity style={InsightStyles.navButton} onPress={() => navigation.navigate('MainPage')}>
                        <Image source={require('./assets/home.png')} style={InsightStyles.navButtonImage} />
                    </TouchableOpacity>
                    <TouchableOpacity style={InsightStyles.navButton} onPress={() => navigation.navigate('Calendar')}>
                        <Image source={require('./assets/calendar.png')} style={InsightStyles.navButtonImage} />
                    </TouchableOpacity>
                    <TouchableOpacity style={InsightStyles.navButton} onPress={() => navigation.navigate('Insight')}>
                        <Image source={require('./assets/insight.png')} style={InsightStyles.navButtonImage} />
                    </TouchableOpacity>
                    <TouchableOpacity style={InsightStyles.navButton} onPress={() => navigation.navigate('MyPage')}>
                        <Image source={require('./assets/profile.png')} style={InsightStyles.navButtonImage} />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
