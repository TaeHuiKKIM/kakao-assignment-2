export function formatDate(dateObj) {
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getWeekStart(dateObj) {
  const d = new Date(dateObj);
  const day = d.getDay(); // 0: Sunday, 1: Monday, ..., 6: Saturday
  // Calculate Monday as the first day of the week
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(d.setDate(diff));
}
