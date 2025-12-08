import React, { useEffect, useMemo, useState } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import { useExpenses } from '../context/ExpenseContext';
import { useLocalSearchParams, useRouter } from 'expo-router';

const CATEGORIES = ['Food', 'Travel', 'Shopping', 'Other'];

export default function EditExpenseScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { expenses, updateExpense } = useExpenses();

  const existingExpense = useMemo(
    () => expenses.find(e => e.id === id),
    [expenses, id],
  );

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');

  useEffect(() => {
    if (existingExpense) {
      setTitle(existingExpense.title);
      setAmount(String(existingExpense.amount));
      setCategory(existingExpense.category);
    }
  }, [existingExpense]);

  const handleSave = () => {
    if (!id || !existingExpense) {
      Alert.alert('Error', 'Expense not found');
      return;
    }

    if (!title || !amount) {
      Alert.alert('Missing fields', 'Please enter title and amount');
      return;
    }

    updateExpense(id, {
      title,
      amount: Number(amount),
      category,
    });

    Alert.alert('Updated', 'Expense updated successfully');
    router.back();
  };

  if (!existingExpense) {
    return (
      <ScrollView
        className="flex-1 bg-white"
        contentContainerStyle={{ padding: 16 }}
      >
        <Text className="text-sm text-red-500">
          Expense not found.
        </Text>
      </ScrollView>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-white"
      contentContainerStyle={{ padding: 16 }}
      keyboardShouldPersistTaps="handled"
    >
      <Text className="mb-4 text-lg font-semibold text-slate-900">
        Edit Expense
      </Text>

      <Text className="mb-1 text-sm font-medium text-slate-700">Title</Text>
      <TextInput
        className="mb-3 rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900"
        value={title}
        onChangeText={setTitle}
        placeholderTextColor="#9ca3af"
      />

      <Text className="mb-1 text-sm font-medium text-slate-700">Amount</Text>
      <TextInput
        className="mb-3 rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        placeholderTextColor="#9ca3af"
      />

      <Text className="mb-1 text-sm font-medium text-slate-700">Category</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mb-4"
      >
        {CATEGORIES.map(cat => {
          const selected = cat === category;
          return (
            <Pressable
              key={cat}
              onPress={() => setCategory(cat)}
              className={`mr-2 rounded-full border px-4 py-2 ${
                selected
                  ? 'border-indigo-600 bg-indigo-600'
                  : 'border-slate-300 bg-slate-100'
              }`}
            >
              <Text
                className={
                  selected
                    ? 'text-xs font-semibold text-white'
                    : 'text-xs font-medium text-slate-700'
                }
              >
                {cat}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <Pressable
        onPress={handleSave}
        className="mt-2 items-center justify-center rounded-2xl bg-emerald-600 py-3"
      >
        <Text className="text-sm font-semibold text-white">
          Save Changes
        </Text>
      </Pressable>
    </ScrollView>
  );
}
