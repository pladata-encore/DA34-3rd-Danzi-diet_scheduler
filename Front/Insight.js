import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { InsightStyles } from './styles/InsightStyles';
import Svg, { Line, Path, G, Text as SvgText } from 'react-native-svg';
import * as d3Shape from 'd3-shape';  // line, pie

// 그래프 내부 여백 
const contentInset = { top: 20, bottom: 20 };

//Linechart: 7일치 칼로리 데이터 가져오는 로직 
export default function Insight({ navigation }) {
    const [lineData, setLineData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {

            const fetchedData = [
                { date: '일', calories: 900 },
                { date: '월', calories: 800 },
                { date: '화', calories: 700 },
                { date: '수', calories: 1000 },
                { date: '목', calories: 500 },
                { date: '금', calories: 600 },
                { date: '토', calories: 1100 },                
            ];
            setLineData(fetchedData);
        };

        fetchData();
    }, []);
    // X, Y 라벨값 지정 
    const getXLabels = () => lineData.map(entry => entry.date);
    const getYValues = () => lineData.map(entry => entry.calories);

    const renderGridLines = () => {
        return [0, 1, 2, 3, 4].map((_, index) => {
            const y = contentInset.top + (index / 4) * (200 - contentInset.top - contentInset.bottom);
            return (
                <Line
                    key={`grid-${index}`}
                    x1={'0%'}
                    x2={'100%'}
                    y1={y}
                    y2={y}
                    stroke={'rgba(0,0,0,0.2)'}
                    strokeWidth={1}
                />
            );
        });
    };
    const renderUpperLimitLine = () => {
        const upperLimitY = (200 - contentInset.top - contentInset.bottom) * (1200 / 1400) + contentInset.top;
        return (
            <Line
                key={'upper-limit'}
                x1={'0%'}
                x2={'100%'}
                y1={upperLimitY}
                y2={upperLimitY}
                stroke={'red'}
                strokeWidth={2}
                strokeDasharray={[4, 4]}
            />
        );
    };
    
    // pie chart 
    const pieData = [
        {
            key: 1,
            amount: 8000, 
            svg: { fill: '#D6BDF6' },
            label: '소모한 칼로리',
        },
        {
            key: 2,
            amount: 50000, 
            svg: { fill: '#d1d1d1' },
            label: '소모해야 할 칼로리',
        },
    ];

    const totalCalories = pieData.reduce((total, item) => total + item.amount, 0);
    const consumedCalories = pieData.find(item => item.label === '소모한 칼로리').amount;
    const remainingCalories = pieData.find(item => item.label === '소모해야 할 칼로리').amount;

    const progress = consumedCalories / remainingCalories;

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
                    <Svg height="200" width="100%">
                        {renderGridLines()}
                        {renderUpperLimitLine()}
                        <Line
                            x1="0%"
                            y1="100%"
                            x2="100%"
                            y2="0%"
                            stroke="purple"
                            strokeWidth="2"
                        />
                    </Svg>
                    <FlatList
                        horizontal
                        contentContainerStyle={{ margin: 5, justifyContent: 'center', alignItems: 'center' }}
                        data={getXLabels()}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <Text style={{ fontSize: 12, paddingHorizontal: 14 }}>{item}</Text>
                        )}
                    />
                </View>

                <View style={InsightStyles.piechartContainer}>
                    <Text style={InsightStyles.text}> 진행률 </Text>
                    <Svg height="200" width="300" >
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
                                {`${(progress * 100).toFixed(1)}%`}
                            </SvgText>
                        </G>
                    </Svg>
                </View>


                <View style={InsightStyles.menuBar}>
                    <TouchableOpacity onPress={() => navigation.navigate('MainPage')}>
                        <Image source={require('./assets/home.png')} style={InsightStyles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Calendar')}>
                        <Image source={require('./assets/calendar.png')} style={InsightStyles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Insight')}>
                        <Image source={require('./assets/insight.png')} style={InsightStyles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('MyPage')}>
                        <Image source={require('./assets/profile.png')} style={InsightStyles.icon} />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

