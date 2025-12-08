import React, { useMemo } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useExpenses } from '../context/ExpenseContext';
import ExpenseItem from '../components/ExpenseItem';

export default function HomeScreen() {
  const { expenses, loading } = useExpenses();

  const currentMonthTotal = useMemo(() => {
    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();

    return expenses
      .filter((e) => {
        const d = new Date(e.date);
        return d.getMonth() === month && d.getFullYear() === year;
      })
      .reduce((sum, e) => sum + Number(e.amount || 0), 0);
  }, [expenses]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>This Month's Spending</Text>
        <Text style={styles.summaryValue}>₹{currentMonthTotal}</Text>
      </View>

      <Text style={styles.listTitle}>Recent Expenses</Text>

      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ExpenseItem item={item} />}
        ListEmptyComponent={<Text>No expenses yet. Add your first one!</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  summaryCard: {
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#dde9ff',
    marginBottom: 16,
  },
  summaryLabel: { fontSize: 14, color: '#555' },
  summaryValue: { fontSize: 24, fontWeight: '700' },
  listTitle: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
});
