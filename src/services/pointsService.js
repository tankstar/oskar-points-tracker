import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { ALL_POINT_RULES } from '../utils/rules';

const pointsRef = collection(db, 'points');

const mapSnapshot = (snapshot) => snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

const pointsQuery = (startDate, endDate) => {
  const constraints = [where('date', '>=', startDate), where('date', '<=', endDate), orderBy('date', 'desc'), orderBy('timestamp', 'desc')];
  return query(pointsRef, ...constraints);
};

export const listenToPointsRange = (startDate, endDate, callback) =>
  onSnapshot(pointsQuery(startDate, endDate), (snap) => callback(mapSnapshot(snap)));

export const addPointEvent = async ({ category, value, comment = '' }) => {
  if (!auth.currentUser) {
    throw new Error('Please sign in first.');
  }
  const rule = ALL_POINT_RULES[category];
  if (!rule || rule.value !== value) {
    throw new Error('Point value does not match rule.');
  }

  const now = new Date();
  const payload = {
    timestamp: now.toISOString(),
    date: now.toISOString().slice(0, 10),
    category,
    value,
    comment: comment.trim(),
    createdBy: auth.currentUser.email?.split('@')[0] || 'parent',
    createdAt: serverTimestamp(),
  };

  await addDoc(pointsRef, payload);
};
