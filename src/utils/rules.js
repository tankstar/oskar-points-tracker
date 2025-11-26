export const POSITIVE_POINTS = {
  wakeUp: { label: 'Woke up at 7:30', value: 1 },
  bedtime: { label: 'On-time bedtime', value: 1 },
  homework: { label: 'Homework on time', value: 2 },
  cleanedRoom: { label: 'Cleaned room', value: 2 },
  schedule: { label: 'No procrastination', value: 1 },
  praise: { label: 'Praise from coach/teacher', value: 1 },
  helped: { label: 'Helped at home', value: 2 },
};

export const NEGATIVE_POINTS = {
  slowMorning: { label: 'Slow morning', value: -2 },
  lateBed: { label: 'Late bedtime', value: -2 },
  conflictHomework: { label: 'Homework conflict', value: -3 },
  procrastination: { label: 'Phone/toilet >30m', value: -2 },
  unauthorizedScreen: { label: 'TikTok/games', value: -5 },
  misbehavior: { label: 'Arguing/lying', value: -5 },
};

export const ALL_POINT_RULES = { ...POSITIVE_POINTS, ...NEGATIVE_POINTS };

export const WEEKLY_RULES = [
  { min: 15, reward: '+30m screen on weekend or dinner choice' },
  { min: 10, max: 14, reward: 'Normal week, no changes' },
  { min: -4, max: 9, reward: 'Lose 1 day of screen time' },
  { max: -5, reward: 'No TikTok/games for a week + discussion' },
];

export const calculateWeeklyReward = (total) => {
  const rule = WEEKLY_RULES.find((r) => {
    if (r.min !== undefined && r.max !== undefined) return total >= r.min && total <= r.max;
    if (r.min !== undefined) return total >= r.min;
    if (r.max !== undefined) return total <= r.max;
    return false;
  });
  return rule?.reward ?? 'No reward rule found';
};
