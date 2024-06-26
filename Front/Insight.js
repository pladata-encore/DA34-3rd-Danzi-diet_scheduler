import React from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { InsightStyles } from './styles/InsightStyles';
import { LineChart, YAxis } from 'react-native-svg-charts';
import { Svg, Line, RadialBarChart, RadialBar, Legend, Stop, RadialGradient } from 'react-native-svg';

export default function Insight({ navigation }) {
    const lineData = [
        { calories: 500 },
        { calories: 700 },
        { calories: 500 },
        { calories: 900 },
        { calories: 1000 },
        { calories: 1100 },
        { calories: 500 },
        { calories: 1100 },
        { calories: 1000 },
    ];

    const getXLabels = () => lineData.map(entry => entry.date);
    const getYValues = () => lineData.map(entry => entry.calories);

    const contentInset = { top: 20, bottom: 20 };

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

    const GridLine = ({ y }) => (
        <Line
            key={y}
            x1={'0'}
            x2={'100%'}
            y1={y}
            y2={y}
            stroke={'rgba(0,0,0,0.2)'}
            strokeWidth={1}
        />
    );

    const UpperLimitLine = ({ y }) => (
        <Line
            key={'upper-limit'}
            x1={'0'}
            x2={'100%'}
            y1={y}
            y2={y}
            stroke={'red'}
            strokeWidth={2}
            strokeDasharray={[4, 4]}
        />
    );

    return (
        <SafeAreaProvider>
            <SafeAreaView style={InsightStyles.container}>
                <Text style={InsightStyles.title}>On:ly 변화</Text>
                <View style={InsightStyles.linechartContainer}>
                    <Text style={InsightStyles.text}> 칼로리 추이 </Text>
                    <View style={{ flexDirection: 'row', height: 200 }}>
                        <YAxis
                            data={getYValues()}
                            contentInset={contentInset}
                            svg={{
                                fill: 'black',
                                fontSize: 10,
                            }}
                            numberOfTicks={6}
                            min={0}
                            max={1400}
                            formatLabel={(value) => `${value} kcal`}
                        />
                        <View style={{ flex: 1 }}>
                            <Svg style={{ position: 'absolute', width: '100%', height: '100%' }}>
                                {[...Array(5).keys()].map((_, index) => (
                                    <GridLine
                                        key={index}
                                        y={contentInset.top + (index / 3) * (200 - contentInset.top - contentInset.bottom)}
                                    />
                                ))}
                                <UpperLimitLine y={(200 - contentInset.top - contentInset.bottom) * (1200 / 1400) + contentInset.top} />
                            </Svg>
                            <LineChart
                                style={{ flex: 1 }}
                                data={getYValues()}
                                svg={{ stroke: 'purple' }}
                                contentInset={contentInset}
                                yMin={0}
                                yMax={1500}
                            />
                        </View>
                    </View>
                    <FlatList
                        horizontal
                        data={getXLabels()}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <Text style={{ fontSize: 11, paddingHorizontal: 6 }}>{item}</Text>
                        )}
                    />
                </View>

                <View style={InsightStyles.piechartContainer}>
                    <Text style={InsightStyles.text}> 진행률 </Text>
                    <RadialBarChart
                        style={{ height: 200 }}
                        data={[
                            { fill: '#D6BDF6', percent: progress * 100 },
                            { fill: '#d1d1d1', percent: (1 - progress) * 100 }
                        ]}
                        startAngle={-Math.PI * 0.5}
                        endAngle={Math.PI * 1.5}
                        innerRadius="10%"
                        outerRadius="80%"
                        cornerRadius={45}
                        barSize={10}
                    >
                        <RadialBar
                            dataKey="percent"
                            background
                            clockWise
                        />
                        <Legend
                            iconSize={10}
                            layout="vertical"
                            verticalAlign="middle"
                            align="right"
                            wrapperStyle={{
                                right: 10,
                                bottom: 10,
                                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                borderRadius: 3,
                                lineHeight: '20px',
                            }}
                        />
                    </RadialBarChart>
                    <Svg height={200} width={150}>
                        <RadialGradient id="grad" cx="50%" cy="50%" r="80%" gradientUnits="userSpaceOnUse">
                            <Stop offset="0%" stopColor="#D6BDF6" />
                            <Stop offset="100%" stopColor="#d1d1d1" />
                        </RadialGradient>
                    </Svg>
                </View>

                <View style={InsightStyles.menuBar}>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
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
