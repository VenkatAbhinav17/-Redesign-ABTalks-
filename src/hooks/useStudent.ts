'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  StudentProfile,
  DEFAULT_STUDENT,
  ZERO_STATE_STUDENT,
  MISSED_DAY_STUDENT,
} from '@/data/mockData';

const STORAGE_KEY = 'abtalks_student_state';

interface StudentContextType {
  student: StudentProfile | null;
  isLoaded: boolean;
  submitProof: (day: number) => void;
  setEdgeCaseMode: (mode: 'normal' | 'zero' | 'missed') => void;
  useStreakFreeze: () => void;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export function StudentProvider({ children }: { children: React.ReactNode }) {
  const [student, setStudent] = useState<StudentProfile | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setStudent(JSON.parse(saved));
      } catch {
        setStudent(DEFAULT_STUDENT);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_STUDENT));
      }
    } else {
      setStudent(DEFAULT_STUDENT);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_STUDENT));
    }
    setIsLoaded(true);
  }, []);

  const save = (updated: StudentProfile) => {
    setStudent(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const submitProof = (day: number) => {
    if (!student) return;

    const completedDays = [...student.completedDays];
    if (!completedDays.includes(day)) {
      completedDays.push(day);
    }
    completedDays.sort((a, b) => a - b);

    let streak = student.streakCount;
    if (student.stateMode === 'zero') {
      streak = 1;
    } else if (student.stateMode === 'missed') {
      streak = 11;
    } else if (day === 12) {
      streak = 12;
    }

    save({
      ...student,
      completedDays,
      streakCount: streak,
      stateMode: student.stateMode === 'zero' ? 'normal' : student.stateMode,
    });
  };

  const setEdgeCaseMode = (mode: 'normal' | 'zero' | 'missed') => {
    const base =
      mode === 'zero'
        ? ZERO_STATE_STUDENT
        : mode === 'missed'
          ? MISSED_DAY_STUDENT
          : DEFAULT_STUDENT;
    save(base);
  };

  const useStreakFreeze = () => {
    if (!student || student.stateMode !== 'missed' || student.streakFreezeTokens <= 0) {
      return;
    }
    save({
      ...student,
      streakCount: 11,
      streakFreezeTokens: student.streakFreezeTokens - 1,
      stateMode: 'normal',
    });
  };

  const value: StudentContextType = {
    student,
    isLoaded,
    submitProof,
    setEdgeCaseMode,
    useStreakFreeze,
  };

  return React.createElement(StudentContext.Provider, { value }, children);
}

export function useStudent() {
  const context = useContext(StudentContext);
  if (context === undefined) {
    throw new Error('useStudent must be used within a StudentProvider');
  }
  return context;
}
