// src/screens/AddExpenseScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Alert, Pressable, ScrollView } from 'react-native';
import { useExpenses } from '../context/ExpenseContext';

const CATEGORIES = ['Food', 'Travel', 'Shopping', 'Other'];

export default function AddExpenseScreen() {
  const { addExpense } = useExpenses();
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');

  const handleAdd = () => {
    if (!title || !amount) {
      Alert.alert('Missing fields', 'Please enter title and amount');
      return;
    }

    const newExpense = {
      id: Date.now().toString(),
      title,
      amount: Number(amount),
      category,
      date: new Date().toISOString().slice(0, 10), // YYYY-MM-DD
    };

    addExpense(newExpense);
    setTitle('');
    setAmount('');
    setCategory('Food');
    Alert.alert('Added', 'Expense added successfully');
  };

  return (
    <ScrollView
      className="flex-1 bg-white"
      contentContainerStyle={{ padding: 16 }}
      keyboardShouldPersistTaps="handled"
    >
      <Text className="mb-1 text-sm font-medium text-slate-700">Title</Text>
      <TextInput
        className="mb-3 rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900"
        placeholder="e.g., Zomato Order"
        value={title}
        onChangeText={setTitle}
        placeholderTextColor="#9ca3af"
      />

      <Text className="mb-1 text-sm font-medium text-slate-700">Amount</Text>
      <TextInput
        className="mb-3 rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900"
        placeholder="e.g., 250"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        placeholderTextColor="#9ca3af"
      />

      <Text className="mb-1 text-sm font-medium text-slate-700">Category</Text>
      <View className="mb-4 flex-row flex-wrap gap-2">
        {CATEGORIES.map((cat) => {
          const selected = cat === category;
          return (
            <Pressable
              key={cat}
              onPress={() => setCategory(cat)}
              className={`rounded-full px-4 py-2 border ${
                selected
                  ? 'bg-indigo-600 border-indigo-600'
                  : 'bg-slate-100 border-slate-300'
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
      </View>

      <Pressable
        onPress={handleAdd}
        className="mt-2 items-center justify-center rounded-2xl bg-emerald-600 py-3"
      >
        <Text className="text-sm font-semibold text-white">
          Add Expense
        </Text>
      </Pressable>
    </ScrollView>
  );
}
