import { create } from 'zustand';
import { User } from 'firebase/auth';

interface AuthState {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
}));

interface ExamState {
  currentExam: any;
  currentSession: any;
  answers: Record<string, string>;
  setCurrentExam: (exam: any) => void;
  setCurrentSession: (session: any) => void;
  setAnswer: (questionId: string, answer: string) => void;
  resetExam: () => void;
}

export const useExamStore = create<ExamState>((set) => ({
  currentExam: null,
  currentSession: null,
  answers: {},
  setCurrentExam: (exam) => set({ currentExam: exam }),
  setCurrentSession: (session) => set({ currentSession: session }),
  setAnswer: (questionId, answer) =>
    set((state) => ({
      answers: { ...state.answers, [questionId]: answer },
    })),
  resetExam: () => set({ currentExam: null, currentSession: null, answers: {} }),
}));

