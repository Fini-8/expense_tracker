import React, { useMemo } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert } from 'react-native';
import { useExpenses } from '../context/ExpenseContext';
import ExpenseItem, { Expense } from '../components/ExpenseItem';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const { expenses, loading, deleteExpense } = useExpenses();
  const router = useRouter();
  

  const currentMonthTotal = useMemo(() => {
    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();

    return expenses
      .filter((e) => {
        if (!e) return false;
        const d = new Date(e.date);
        return d.getMonth() === month && d.getFullYear() === year;
      })
      .reduce((sum, e) => sum + Number(e.amount || 0), 0);
  }, [expenses]);

  const cleanedExpenses: Expense[] = useMemo(
    () => expenses.filter((e): e is Expense => !!e && typeof e === 'object'),
    [expenses]
  );

  const handleDelete = (id: string) => {
    Alert.alert('Delete expense', 'Are you sure you want to delete this item?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => deleteExpense(id),
      },
    ]);
  };

 const handleEdit = (id: string) => {
 router.push({
  pathname: '/edit/[id]',
  params: { id },
});
};

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white px-4 pt-4">
      <View className="mb-4 rounded-2xl bg-indigo-100 px-4 py-3">
        <Text className="text-xs font-medium text-indigo-700">
          This Month&apos;s Spending
        </Text>
        <Text className="mt-1 text-2xl font-extrabold text-indigo-900">
          ₹{currentMonthTotal}
        </Text>
      </View>

      <Text className="mb-2 text-lg font-semibold text-slate-900">
        Recent Expenses
      </Text>

      <FlatList
        data={cleanedExpenses}
        keyExtractor={(item) => item.id}
       renderItem={({ item }) => (
  <ExpenseItem
    item={item}
    onEdit={() => handleEdit(item.id)}
    onDelete={() => handleDelete(item.id)}
  />
)}

        
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
