import { useState, useRef, useEffect } from 'react';

export default function TodoItem({ todo, toggleTodo, editTodo, deleteTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleSave = () => {
    if (editText.trim() === '') {
      alert('수정할 내용을 입력해주세요!');
      setEditText(todo.text);
      setIsEditing(false);
      return;
    }
    editTodo(todo.id, editText);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') handleCancel();
  };

  return (
    <li className={`flex items-center justify-between bg-gray-50 p-3 rounded-xl mb-2 transition-colors hover:bg-gray-100 ${todo.completed ? 'opacity-70' : ''}`}>
      <div className="flex items-center gap-3 flex-1 overflow-hidden">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
          className="w-5 h-5 accent-primary cursor-pointer"
        />
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 px-2 py-1 text-base border border-primary rounded outline-none"
          />
        ) : (
          <span className={`flex-1 text-base truncate ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
            {todo.text}
          </span>
        )}
      </div>

      <div className="flex gap-1 ml-2 shrink-0">
        {isEditing ? (
          <>
            <button onClick={handleSave} className="px-2 py-1 text-sm text-gray-600 hover:bg-gray-200 rounded cursor-pointer transition-colors">저장</button>
            <button onClick={handleCancel} className="px-2 py-1 text-sm text-gray-600 hover:bg-gray-200 rounded cursor-pointer transition-colors">취소</button>
          </>
        ) : (
          <>
            <button onClick={() => setIsEditing(true)} className="px-2 py-1 text-sm text-gray-600 hover:bg-gray-200 rounded cursor-pointer transition-colors">수정</button>
            <button onClick={() => deleteTodo(todo.id)} className="px-2 py-1 text-sm text-gray-600 hover:bg-gray-200 rounded cursor-pointer transition-colors">삭제</button>
          </>
        )}
      </div>
    </li>
  );
}
