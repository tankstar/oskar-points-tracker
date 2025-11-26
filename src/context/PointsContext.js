import React, {createContext, useContext, useMemo, useReducer} from 'react';
import {v4 as uuidv4} from 'uuid';
import {getDayKey, getEndOfWeek, getStartOfWeek} from '../utils/points';
import {isSameDay} from '../utils/time';

const PointsContext = createContext();

const initialState = {
  actions: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ACTION': {
      const updated = [action.payload, ...state.actions].filter(item => {
        const itemDate = new Date(item.date);
        const now = new Date();
        const diff = now - itemDate;
        const days = diff / (1000 * 60 * 60 * 24);
        return days <= 30;
      });
      return {...state, actions: updated};
    }
    default:
      return state;
  }
};

export const PointsProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addAction = ({label, value, comment = '', date = new Date()}) => {
    dispatch({
      type: 'ADD_ACTION',
      payload: {
        id: uuidv4(),
        label,
        value,
        comment,
        date: new Date(date).toISOString(),
      },
    });
  };

  const todayTotal = useMemo(() => {
    const today = new Date();
    return state.actions
      .filter(item => isSameDay(item.date, today))
      .reduce((sum, item) => sum + item.value, 0);
  }, [state.actions]);

  const weekSummary = useMemo(() => {
    const start = getStartOfWeek();
    const end = getEndOfWeek(start);
    const map = {};
    state.actions.forEach(item => {
      const itemDate = new Date(item.date);
      if (itemDate >= start && itemDate <= end) {
        const key = getDayKey(item.date);
        map[key] = (map[key] || 0) + item.value;
      }
    });
    const days = [];
    for (let i = 0; i < 7; i += 1) {
      const current = new Date(start);
      current.setDate(start.getDate() + i);
      const key = getDayKey(current);
      days.push({
        key,
        label: current.toLocaleDateString(undefined, {weekday: 'short'}),
        total: map[key] || 0,
      });
    }
    const total = days.reduce((sum, day) => sum + day.total, 0);
    return {days, total};
  }, [state.actions]);

  const history = useMemo(() => {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 30);
    return state.actions
      .filter(item => new Date(item.date) >= cutoff)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [state.actions]);

  const value = useMemo(
    () => ({
      actions: state.actions,
      addAction,
      todayTotal,
      weekSummary,
      history,
    }),
    [state.actions, todayTotal, weekSummary, history],
  );

  return <PointsContext.Provider value={value}>{children}</PointsContext.Provider>;
};

export const usePoints = () => {
  const ctx = useContext(PointsContext);
  if (!ctx) {
    throw new Error('usePoints must be used within PointsProvider');
  }
  return ctx;
};
