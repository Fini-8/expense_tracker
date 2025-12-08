import React from 'react';
import { View, Text } from 'react-native';

export default function ExpenseItem({ item }: {
  item: {
    title: string;
    category: string;
    date: string;
    amount: number;
  }
}) {
  return (
    <View className="flex-row items-center justify-between rounded-x1 bg-slate-100 px-4 py-3 mb-2">
      <View className="flex-1 pr-3">
        <Text className="text-base font-sembold text-slate-900">
          {item.title}
        </Text>
        <Text className="text-xs text-slate-500 mt-0.5">
          {item.category} . {item.date}
        </Text>
      </View>
      <Text className="text-base font-bold text-emerald-600">
        ${item.amount}
      </Text>
    </View>
  );
}