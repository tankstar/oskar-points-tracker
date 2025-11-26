export const isSameDay = (a, b) => {
  const first = new Date(a);
  const second = new Date(b);
  return (
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
  );
};

export const format = (date, pattern = 'YYYY-MM-DD HH:mm') => {
  const d = new Date(date);
  const pad = value => String(value).padStart(2, '0');
  const year = d.getFullYear();
  const month = pad(d.getMonth() + 1);
  const day = pad(d.getDate());
  const hours = pad(d.getHours());
  const minutes = pad(d.getMinutes());

  if (pattern === 'YYYY-MM-DD') {
    return `${year}-${month}-${day}`;
  }
  if (pattern === 'HH:mm') {
    return `${hours}:${minutes}`;
  }
  return `${year}-${month}-${day} ${hours}:${minutes}`;
};
