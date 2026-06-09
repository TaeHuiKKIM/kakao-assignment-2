import { useState, useEffect } from 'react';
import { formatDate } from './utils/date';
import WeeklyCalendar from './components/WeeklyCalendar';
import TodoInput from './components/TodoInput';
import TodoFilter from './components/TodoFilter';
import TodoList from './components/TodoList';

function App() {
  // 상태 관리
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

  // Todo CRUD 핸들러
  const addTodo = (text) => {
    const newTodo = {
      id: Date.now().toString(36) + Math.random().toString(36).substring(2),
      text,
      completed: false,
      date: formatDate(selectedDate)
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const editTodo = (id, newText) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // 필터링 적용
  const getFilteredTodos = () => {
    // 1차 필터링: 선택된 날짜 (날짜 없는 예전 데이터도 임시 허용)
    let filtered = todos.filter(todo => todo.date === formatDate(selectedDate) || !todo.date);

    // 2차 필터링: 상태 적용
    if (currentFilter === 'active') {
      filtered = filtered.filter(todo => !todo.completed);
    } else if (currentFilter === 'completed') {
      filtered = filtered.filter(todo => todo.completed);
    }
    return filtered;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center py-10 px-4">
      <div className="bg-white w-full max-w-md h-[80vh] rounded-2xl shadow-xl overflow-hidden flex flex-col">
        {/* 앱 헤더 */}
        <header className="bg-primary text-white p-6 text-center shrink-0">
          <h1 className="text-2xl font-bold">My Todo</h1>
        </header>

        {/* 메인 영역 */}
        <main className="p-6 flex-1 overflow-y-auto flex flex-col">
          <WeeklyCalendar 
            selectedDate={selectedDate} 
            setSelectedDate={setSelectedDate} 
            todos={todos} 
          />
          
          <TodoInput addTodo={addTodo} />
          
          <TodoFilter 
            currentFilter={currentFilter} 
            setCurrentFilter={setCurrentFilter} 
          />
          
          <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar">
            <TodoList 
              todos={getFilteredTodos()} 
              toggleTodo={toggleTodo}
              editTodo={editTodo}
              deleteTodo={deleteTodo}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
