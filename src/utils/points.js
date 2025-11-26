import {format} from './time';

export const positiveActions = [
  {label: 'Wake up on time', value: 1},
  {label: 'Sleep on time', value: 1},
  {label: 'Homework done', value: 2},
  {label: 'Room clean / vacuum', value: 2},
  {label: 'Followed schedule without procrastination', value: 1},
  {label: 'Good behavior at school/training', value: 1},
  {label: 'Helped at home voluntarily', value: 2},
];

export const negativeActions = [
  {label: 'Late / slow morning', value: -2},
  {label: 'Slept after 21:30', value: -2},
  {label: 'Homework not done / done after conflict', value: -3},
  {label: 'Phone/toilet > 30 minutes', value: -2},
  {label: 'Screen use without permission', value: -5},
  {label: 'Arguing / lying / rude behavior', value: -5},
];

export const getWeeklyResultText = total => {
  if (total >= 15) {
    return 'Big reward: +30 min screen or choose dinner';
  }
  if (total >= 10) {
    return 'Normal week';
  }
  if (total >= 0) {
    return 'Lose 1 day of screen time';
  }
  if (total <= -5) {
    return '1 week no TikTok/games';
  }
  return 'Focus on improving next week';
};

export const getStartOfWeek = (date = new Date()) => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = (day === 0 ? -6 : 1 - day); // Monday start
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
};

export const getEndOfWeek = start => {
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);
  return end;
};

export const getDayKey = date => format(date, 'YYYY-MM-DD');
