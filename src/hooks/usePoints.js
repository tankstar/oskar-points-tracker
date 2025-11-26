import { useEffect, useMemo, useState } from 'react';
import { calculateWeeklyReward, ALL_POINT_RULES } from '../utils/rules';
import { addPointEvent, listenToPointsRange } from '../services/pointsService';

const formatDate = (date) => date.toISOString().slice(0, 10);

const getWeekRange = (date = new Date()) => {
  const current = new Date(date);
  const day = current.getDay();
  const diff = day === 0 ? -6 : 1 - day; // start on Monday
  const start = new Date(current);
  start.setDate(current.getDate() + diff);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  return { start: formatDate(start), end: formatDate(end) };
};

const getHistoryRange = () => {
  const today = new Date();
  const start = new Date();
  start.setDate(today.getDate() - 29);
  return { start: formatDate(start), end: formatDate(today) };
};

const sumValues = (items) => items.reduce((acc, item) => acc + (item.value || 0), 0);

export const usePoints = (enabled = true) => {
  const today = useMemo(() => formatDate(new Date()), []);
  const weekRange = useMemo(() => getWeekRange(), []);
  const historyRange = useMemo(() => getHistoryRange(), []);

  const [todayPoints, setTodayPoints] = useState([]);
  const [weekPoints, setWeekPoints] = useState([]);
  const [historyPoints, setHistoryPoints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!enabled) {
      setTodayPoints([]);
      setWeekPoints([]);
      setHistoryPoints([]);
      setLoading(false);
      return undefined;
    }

    setLoading(true);
    const unsubscribeToday = listenToPointsRange(today, today, (data) => setTodayPoints(data));
    const unsubscribeWeek = listenToPointsRange(weekRange.start, weekRange.end, (data) => setWeekPoints(data));
    const unsubscribeHistory = listenToPointsRange(historyRange.start, historyRange.end, (data) => {
      setHistoryPoints(data);
      setLoading(false);
    });

    return () => {
      unsubscribeToday?.();
      unsubscribeWeek?.();
      unsubscribeHistory?.();
    };
  }, [enabled, historyRange.end, historyRange.start, today, weekRange.end, weekRange.start]);

  const addPoint = async ({ category, comment }) => {
    const rule = ALL_POINT_RULES[category];
    if (!rule) {
      throw new Error('Unknown category');
    }
    await addPointEvent({ category, value: rule.value, comment });
  };

  const weekTotal = useMemo(() => sumValues(weekPoints), [weekPoints]);
  const weekReward = useMemo(() => calculateWeeklyReward(weekTotal), [weekTotal]);

  return {
    today,
    todayPoints,
    weekPoints,
    historyPoints,
    loading,
    addPoint,
    weekTotal,
    weekReward,
  };
};
