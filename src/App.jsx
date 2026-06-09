import WeeklyCalendar from './components/WeeklyCalendar';
import TodoInput from './components/TodoInput';
import TodoFilter from './components/TodoFilter';
import TodoList from './components/TodoList';
import { useTodos } from './hooks/useTodos';

function App() {
  const {
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
  } = useTodos();

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
              todos={filteredTodos} 
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
