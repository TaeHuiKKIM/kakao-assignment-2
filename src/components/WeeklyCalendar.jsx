import { formatDate, getWeekStart } from '../utils/date';

export default function WeeklyCalendar({ selectedDate, setSelectedDate, todos }) {
  const startOfWeek = getWeekStart(selectedDate);
  const todayStr = formatDate(new Date());
  const selectedStr = formatDate(selectedDate);
  const daysStr = ['월', '화', '수', '목', '금', '토', '일'];

  const handlePrevWeek = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 7);
    setSelectedDate(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 7);
    setSelectedDate(newDate);
  };

  const weekDays = Array.from({ length: 7 }).map((_, i) => {
    const currentDate = new Date(startOfWeek);
    currentDate.setDate(startOfWeek.getDate() + i);
    const dateStr = formatDate(currentDate);
    const count = todos.filter(todo => todo.date === dateStr).length;

    return {
      dateObj: currentDate,
      dateStr,
      count,
      dayName: daysStr[i],
      dayNumber: currentDate.getDate()
    };
  });

  return (
    <div className="flex justify-between items-center mb-6">
      <button onClick={handlePrevWeek} className="text-xl font-bold text-gray-500 hover:text-gray-800 transition-colors px-2 py-1 cursor-pointer">&lt;</button>
      <div className="flex gap-2 flex-1 justify-center">
        {weekDays.map(day => (
          <div
            key={day.dateStr}
            onClick={() => setSelectedDate(day.dateObj)}
            className={`flex flex-col items-center px-3 py-2 rounded-xl cursor-pointer transition-all duration-200
              ${day.dateStr === selectedStr ? 'bg-primary text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'}
              ${day.dateStr === todayStr && day.dateStr !== selectedStr ? 'font-bold underline decoration-2 underline-offset-4' : ''}
            `}
          >
            <span className="text-xs mb-1 opacity-80">{day.dayName}</span>
            <span className="text-lg font-medium">{day.dayNumber}</span>
            <span className={`text-[10px] mt-1 px-2 py-0.5 rounded-full ${day.dateStr === selectedStr ? 'bg-white/30' : 'bg-black/10'}`}>
              {day.count}
            </span>
          </div>
        ))}
      </div>
      <button onClick={handleNextWeek} className="text-xl font-bold text-gray-500 hover:text-gray-800 transition-colors px-2 py-1 cursor-pointer">&gt;</button>
    </div>
  );
}
