import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export interface Expense {
  id: string;
  title: string;
  category: string;
  date: string;
  amount: number;
}

interface ExpenseItemProps {
  item: Expense;
  onEdit: () => void;
  onDelete: () => void;
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({ item, onEdit, onDelete }) => {
  if (!item) return null;

  return (
    <View className="mb-2 flex-row items-center justify-between rounded-xl bg-slate-100 px-4 py-3">
      <View className="flex-1 pr-3">
        <Text className="text-base font-semibold text-slate-900">
          {item.title}
        </Text>
        <Text className="mt-0.5 text-xs text-slate-500">
          {item.category} • {item.date}
        </Text>
      </View>

      <View className="flex-row items-center">
        <Text className="text-base font-bold text-emerald-600">
          ₹{item.amount}
        </Text>

        <Pressable onPress={onEdit} className="ml-3">
          <Ionicons name="create-outline" size={18} color="#4b5563" />
        </Pressable>

        <Pressable onPress={onDelete} className="ml-2">
          <Ionicons name="trash-outline" size={18} color="#dc2626" />
        </Pressable>
      </View>
    </View>
  );
};

export default ExpenseItem;
