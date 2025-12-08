import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define types for expense items
interface Expense {
  id: string;
  title: string;
  category: string;
  date: string;
  amount: number;
}

// Define type for context value
interface ExpenseContextType {
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
  deleteExpense: (id: string) => void;
  loading: boolean;
}

// Create context with proper typing
const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

const STORAGE_KEY = '@expenses';

// Define props for ExpenseProvider
interface ExpenseProviderProps {
  children: ReactNode;
}

export function ExpenseProvider({ children }: ExpenseProviderProps) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadExpenses = async () => {
      try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        if (json) {
          const parsedExpenses = JSON.parse(json);
          // Optional: Add runtime validation to ensure parsed data matches Expense type
          setExpenses(parsedExpenses);
        }
      } catch (e) {
        console.log('Error loading expenses', e);
      } finally {
        setLoading(false);
      }
    };
    
    loadExpenses();
  }, []); // Fixed: Removed extra closing parenthesis and fixed the dependency array

  useEffect(() => {
    const saveExpenses = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
      } catch (e) {
        console.log('Error saving expenses', e);
      }
    };
    
    if (!loading) {
      saveExpenses();
    }
  }, [expenses, loading]);

  const addExpense = (expense: Expense) => 
    setExpenses((prev) => [expense, ...prev]);

  const deleteExpense = (id: string) =>
    setExpenses((prev) => prev.filter((e) => e.id !== id));

  const value: ExpenseContextType = {
    expenses,
    addExpense,
    deleteExpense,
    loading
  };

  return (
    <ExpenseContext.Provider value={value}>
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpenses() {
  const context = useContext(ExpenseContext);
  
  if (context === undefined) {
    throw new Error('useExpenses must be used within an ExpenseProvider');
  }
  
  return context;
}