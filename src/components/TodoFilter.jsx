export default function TodoFilter({ currentFilter, setCurrentFilter }) {
  const filters = [
    { id: 'all', label: '전체' },
    { id: 'active', label: '진행 중' },
    { id: 'completed', label: '완료' }
  ];

  return (
    <div className="flex gap-2 mb-4 border-b border-gray-200 pb-3">
      {filters.map(filter => (
        <button
          key={filter.id}
          onClick={() => setCurrentFilter(filter.id)}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 cursor-pointer text-sm
            ${currentFilter === filter.id 
              ? 'bg-primary-light text-primary font-bold' 
              : 'text-gray-500 hover:bg-gray-100'}`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
