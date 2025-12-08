import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { useExpenses } from '../context/ExpenseContext';
import { PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const COLORS = ['#4c6fff', '#ff6b6b', '#f7b733', '#20bf6b', '#9b59b6', '#e84393'];

export default function StatsScreen() {
  const { expenses } = useExpenses();

  const chartData = useMemo(() => {
    const map = {};

    expenses.forEach((e) => {
      if (!map[e.category]) map[e.category] = 0;
      map[e.category] += Number(e.amount || 0);
    });

    const entries = Object.keys(map);
    if (entries.length === 0) return [];

    return entries.map((cat, index) => ({
      name: cat,
      amount: map[cat],
      color: COLORS[index % COLORS.length],
      legendFontColor: '#333',
      legendFontSize: 14,
    }));
  }, [expenses]);

  if (chartData.length === 0) {
    return (
      <View style={styles.center}>
        <Text>No data yet. Add some expenses!</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Spending by Category</Text>

      <PieChart
        data={chartData}
        width={screenWidth - 32}   // screen width minus padding
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

      <View style={styles.legendContainer}>
        {chartData.map((item) => (
          <View key={item.name} style={styles.legendItem}>
            <View
              style={[styles.legendColor, { backgroundColor: item.color }]}
            />
            <Text style={styles.legendText}>
              {item.name}: ₹{item.amount}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 18, fontWeight: '600', marginBottom: 16 },
  legendContainer: {
    marginTop: 24,
    alignSelf: 'stretch',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 4,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
  },
});
