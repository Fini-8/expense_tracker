// src/screens/StatsScreen.tsx
import React, { useMemo } from 'react';
import { View, Text, Dimensions, ScrollView } from 'react-native';
import { useExpenses } from '../context/ExpenseContext';
import { PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const COLORS = [
  '#4c6fff',
  '#ff6b6b',
  '#f7b733',
  '#20bf6b',
  '#9b59b6',
  '#e84393',
];

export default function StatsScreen() {
  const { expenses } = useExpenses();

  const chartData = useMemo(() => {
    // Fix: Use Record<string, number> for better TypeScript typing
    const map: Record<string, number> = {};

    expenses.forEach((e) => {
      if (!map[e.category]) {
        map[e.category] = 0;
      }
      map[e.category] += Number(e.amount || 0);
    });

    const entries = Object.keys(map);
    if (entries.length === 0) return [];

    return entries.map((cat, index) => ({
      name: cat,
      amount: map[cat],
      color: COLORS[index % COLORS.length],
      legendFontColor: '#111827',
      legendFontSize: 13,
    }));
  }, [expenses]);

  if (chartData.length === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-sm text-slate-500">
          No data yet. Add some expenses!
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-white"
      contentContainerStyle={{ padding: 16, alignItems: 'center' }}
    >
      <Text className="mb-4 text-lg font-semibold text-slate-900">
        Spending by Category
      </Text>

      <PieChart
        data={chartData}
        width={screenWidth - 32}
        height={260}
        accessor="amount"
        backgroundColor="transparent"
        paddingLeft="16"
        chartConfig={{
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        absolute
      />

      {/* Legend */}
      <View className="mt-6 w-full">
        {chartData.map((item) => (
          <View
            key={item.name}
            className="mb-2 flex-row items-center"
          >
            <View
              className="mr-2 h-4 w-4 rounded"
              style={{ backgroundColor: item.color }}
            />
            <Text className="text-sm text-slate-800">
              {item.name}: ₹{item.amount}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}