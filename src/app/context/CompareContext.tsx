import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CompareUniversity {
  id: string;
  name: string;
  city?: string;
  country: string;
  ranking?: number;
  tuition_min?: number;
  tuition_max?: number;
  currency?: string;
  acceptance_rate?: number;
  gpa_requirement?: number;
  ielts_requirement?: number;
  toefl_requirement?: number;
  living_cost?: number;
  course_duration?: string;
  scholarships?: boolean;
  deadline?: string;
  logo_url?: string;
  [key: string]: any;
}

interface CompareContextType {
  compareList: CompareUniversity[];
  addToCompare: (uni: CompareUniversity) => void;
  removeFromCompare: (id: string) => void;
  clearCompare: () => void;
  isInCompare: (id: string) => boolean;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);
const STORAGE_KEY = 'unihunt_compare';

export function CompareProvider({ children }: { children: ReactNode }) {
  const [compareList, setCompareList] = useState<CompareUniversity[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Persist to localStorage on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(compareList));
  }, [compareList]);

  const addToCompare = (uni: CompareUniversity) => {
    if (compareList.length >= 4 || compareList.find((u) => u.id === uni.id)) return;
    setCompareList((prev) => [...prev, uni]);
  };

  const removeFromCompare = (id: string) =>
    setCompareList((prev) => prev.filter((u) => u.id !== id));

  const clearCompare = () => setCompareList([]);

  const isInCompare = (id: string) => compareList.some((u) => u.id === id);

  return (
    <CompareContext.Provider value={{ compareList, addToCompare, removeFromCompare, clearCompare, isInCompare }}>
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error('useCompare must be used within CompareProvider');
  return ctx;
}
