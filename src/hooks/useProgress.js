import { useState, useEffect, useCallback } from 'react';

export function useProgress() {
  const [completedTopics, setCompletedTopics] = useState([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('pbd_progress');
      if (stored) {
        setCompletedTopics(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Falha ao ler o progresso interativo:', e);
    }
  }, []);

  const markAsRead = useCallback((topicId) => {
    setCompletedTopics((prev) => {
      if (prev.includes(topicId)) return prev;
      const next = [...prev, topicId];
      localStorage.setItem('pbd_progress', JSON.stringify(next));
      return next;
    });
  }, []);

  const isCompleted = useCallback((topicId) => {
    return completedTopics.includes(topicId);
  }, [completedTopics]);

  const progressPercentage = Math.round((completedTopics.length / 8) * 100);

  return { 
    completedTopics, 
    markAsRead, 
    isCompleted, 
    progressPercentage,
    totalTopics: 8 
  };
}
