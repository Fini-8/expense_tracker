// src/screens/HomeScreen.js
import React, { useMemo } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
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
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white px-4 pt-4">
      {/* Summary card */}
      <View className="mb-4 rounded-2xl bg-indigo-100 px-4 py-3">
        <Text className="text-xs font-medium text-indigo-700">
          This Month's Spending
        </Text>
        <Text className="mt-1 text-2xl font-extrabold text-indigo-900">
          ₹{currentMonthTotal}
        </Text>
      </View>

      <Text className="mb-2 text-lg font-semibold text-slate-900">
        Recent Expenses
      </Text>

      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ExpenseItem item={item} />}
        ListEmptyComponent={
          <Text className="mt-4 text-sm text-slate-500">
            No expenses yet. Add your first one on the Add tab.
          </Text>
        }
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </View>
  );
}
