import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
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
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., Zomato Order"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Amount</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., 250"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <Text style={styles.label}>Category</Text>
      {/* For now simple text input; later you can make a dropdown */}
      <TextInput
        style={styles.input}
        value={category}
        onChangeText={setCategory}
      />

      <Button title="Add Expense" onPress={handleAdd} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 8 },
  label: { fontSize: 14, fontWeight: '500' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 8,
  },
});
