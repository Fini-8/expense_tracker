// src/components/ExpenseItem.tsx
import React from 'react';
import { View, Text } from 'react-native';

// keep this in sync with your Expense type in context
export interface Expense {
  id: string;
  title: string;
  category: string;
  date: string;
  amount: number;
}

interface ExpenseItemProps {
  item: Expense;
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({ item }) => {
  // safety check – avoids crash if something is wrong in data
  if (!item) {
    return null;
  }

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
      <Text className="text-base font-bold text-emerald-600">
        ₹{item.amount}
      </Text>
    </View>
  );
};

export default ExpenseItem;
