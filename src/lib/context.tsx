import React, { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { UserProfile, Opportunity, Application, ChatMessage } from './types';
import { mockUser, mockOpportunities, mockApplications } from './mockData';

interface AppState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  opportunities: Opportunity[];
  applications: Application[];
  savedOpportunities: string[];
  chatMessages: ChatMessage[];
  sidebarOpen: boolean;
}

interface AppContextType extends AppState {
  login: (user?: UserProfile) => void;
  logout: () => void;
  completeOnboarding: (data: Partial<UserProfile>) => void;
  saveOpportunity: (id: string) => void;
  unsaveOpportunity: (id: string) => void;
  addApplication: (oppId: string) => void;
  addChatMessage: (msg: ChatMessage) => void;
  setSidebarOpen: (open: boolean) => void;
  addXp: (amount: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>({
    user: null,
    isAuthenticated: false,
    opportunities: mockOpportunities,
    applications: mockApplications,
    savedOpportunities: ['1', '3', '7'],
    chatMessages: [],
    sidebarOpen: false,
  });

  const login = useCallback((user?: UserProfile) => {
    setState(prev => ({
      ...prev,
      user: user || mockUser,
      isAuthenticated: true,
    }));
  }, []);

  const logout = useCallback(() => {
    setState(prev => ({
      ...prev,
      user: null,
      isAuthenticated: false,
    }));
  }, []);

  const completeOnboarding = useCallback((data: Partial<UserProfile>) => {
    setState(prev => ({
      ...prev,
      user: prev.user ? { ...prev.user, ...data, onboardingComplete: true } : null,
    }));
  }, []);

  const saveOpportunity = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      savedOpportunities: [...prev.savedOpportunities, id],
    }));
  }, []);

  const unsaveOpportunity = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      savedOpportunities: prev.savedOpportunities.filter(oppId => oppId !== id),
    }));
  }, []);

  const addApplication = useCallback((oppId: string) => {
    setState(prev => ({
      ...prev,
      applications: [
        ...prev.applications,
        {
          id: `app-${Date.now()}`,
          opportunityId: oppId,
          status: 'submitted',
          appliedAt: new Date().toISOString(),
          lastUpdated: new Date().toISOString(),
        },
      ],
    }));
  }, []);

  const addChatMessage = useCallback((msg: ChatMessage) => {
    setState(prev => ({
      ...prev,
      chatMessages: [...prev.chatMessages, msg],
    }));
  }, []);

  const setSidebarOpen = useCallback((open: boolean) => {
    setState(prev => ({
      ...prev,
      sidebarOpen: open,
    }));
  }, []);

  const addXp = useCallback((amount: number) => {
    setState(prev => {
      if (!prev.user) return prev;
      return {
        ...prev,
        user: { ...prev.user, xp: prev.user.xp + amount }
      };
    });
  }, []);

  const value = {
    ...state,
    login,
    logout,
    completeOnboarding,
    saveOpportunity,
    unsaveOpportunity,
    addApplication,
    addChatMessage,
    setSidebarOpen,
    addXp,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
