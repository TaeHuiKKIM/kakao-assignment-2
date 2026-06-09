import { useState, useEffect, useCallback, useMemo } from 'react';
import { formatDate } from '../utils/date';

export function useTodos() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });
  const [currentFilter, setCurrentFilter] = useState('all');
  const [selectedDate, setSelectedDate] = useState(new Date());

  // 로컬스토리지 자동 저장
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = useCallback((text) => {
    const newTodo = {
      id: Date.now().toString(36) + Math.random().toString(36).substring(2),
      text,
      completed: false,
      date: formatDate(selectedDate)
    };
    setTodos(prev => [...prev, newTodo]);
  }, [selectedDate]);

  const toggleTodo = useCallback((id) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }, []);

  const editTodo = useCallback((id, newText) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    ));
  }, []);

  const deleteTodo = useCallback((id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  // 필터링된 결과값 메모이제이션
  const filteredTodos = useMemo(() => {
    const selectedDateStr = formatDate(selectedDate);
    
    // 1차 필터링: 날짜
    let result = todos.filter(todo => todo.date === selectedDateStr || !todo.date);

    // 2차 필터링: 상태
    if (currentFilter === 'active') {
      result = result.filter(todo => !todo.completed);
    } else if (currentFilter === 'completed') {
      result = result.filter(todo => todo.completed);
    }
    
    return result;
  }, [todos, currentFilter, selectedDate]);

  return {
    todos,
    filteredTodos,
    currentFilter,
    setCurrentFilter,
    selectedDate,
    setSelectedDate,
    addTodo,
    toggleTodo,
    editTodo,
    deleteTodo
  };
}
