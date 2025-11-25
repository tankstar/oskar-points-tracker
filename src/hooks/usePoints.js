import { useEffect, useMemo, useState } from 'react';
import { listenToTodayPoints, listenToRangePoints } from '../services/pointsService';
import { calculateWeeklyReward } from '../utils/rules';

const formatDate = (date) => date.toISOString().slice(0, 10);

export const useTodayPoints = (date = new Date()) => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const dateString = formatDate(date);

  useEffect(() => {
    const unsubscribe = listenToTodayPoints(dateString, (snapshot) => {
      setEntries(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return unsubscribe;
  }, [dateString]);

  const total = useMemo(() => entries.reduce((sum, e) => sum + (e.value || 0), 0), [entries]);

  return { entries, total, loading };
};

export const useWeekPoints = (startDate, endDate) => {
  const { entries, loading } = useRangePoints(startDate, endDate);
  const total = useMemo(() => entries.reduce((sum, e) => sum + (e.value || 0), 0), [entries]);
  const reward = useMemo(() => calculateWeeklyReward(total), [total]);

  return { entries, total, reward, loading };
};

export const useRangePoints = (startDate, endDate) => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const start = formatDate(startDate);
  const end = formatDate(endDate);

  useEffect(() => {
    const unsubscribe = listenToRangePoints(start, end, (snapshot) => {
      setEntries(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))); 
      setLoading(false);
    });
    return unsubscribe;
  }, [start, end]);

  return { entries, loading };
};
