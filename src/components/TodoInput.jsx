import { useState } from 'react';

export default function TodoInput({ addTodo }) {
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === '') {
      setError('할 일을 입력해주세요!');
      setTimeout(() => setError(''), 2000);
      return;
    }
    addTodo(text);
    setText('');
    setError('');
  };

  return (
    <div className="mb-4">
      <form onSubmit={handleSubmit} className="flex gap-2 mb-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="새로운 할 일을 입력하세요..."
          className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-base"
        />
        <button
          type="submit"
          className="bg-primary hover:bg-primary-hover text-white font-semibold px-6 py-3 rounded-xl transition-colors cursor-pointer"
        >
          추가
        </button>
      </form>
      <div className="h-5 text-sm text-red-500">{error}</div>
    </div>
  );
}
