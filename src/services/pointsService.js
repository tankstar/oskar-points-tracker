import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from 'firebase/firestore';
import { db, auth } from '../firebase/config';
import { ALL_POINT_RULES } from '../utils/rules';

const POINTS_COLLECTION = 'points';

const deriveCreatedBy = (user) => {
  if (!user) return 'parent';
  if (user.displayName) return user.displayName;
  if (user.email) return user.email.split('@')[0] || 'parent';
  return 'parent';
};

export const listenToTodayPoints = (dateString, callback) => {
  const ref = collection(db, POINTS_COLLECTION);
  const q = query(ref, where('date', '==', dateString), orderBy('timestamp', 'desc'));
  return onSnapshot(q, callback);
};

export const addPointEvent = async ({ category, value, comment = '' }) => {
  if (!auth.currentUser) throw new Error('Not authenticated');
  if (!ALL_POINT_RULES[category]) throw new Error('Unknown category');
  if (ALL_POINT_RULES[category].value !== value) throw new Error('Value does not match category rule');
  const cleanComment = comment.trim();
  const now = new Date();
  const date = now.toISOString().slice(0, 10);
  const payload = {
    timestamp: now.toISOString(),
    date,
    category,
    value,
    comment: cleanComment,
    createdBy: deriveCreatedBy(auth.currentUser),
    createdAt: serverTimestamp(),
  };
  await addDoc(collection(db, POINTS_COLLECTION), payload);
};

export const listenToWeekPoints = (startDate, endDate, callback) => {
  const ref = collection(db, POINTS_COLLECTION);
  const q = query(
    ref,
    where('date', '>=', startDate),
    where('date', '<=', endDate),
    orderBy('date', 'desc'),
    orderBy('timestamp', 'desc'),
  );
  return onSnapshot(q, callback);
};

export const listenToRangePoints = (startDate, endDate, callback) =>
  listenToWeekPoints(startDate, endDate, callback);
