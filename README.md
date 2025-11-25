# Oskar Points Tracker

Mobile app for a family point-scoring system (React Native + Expo) with Firebase Auth/Firestore.

## Features
- Auth screen for mom/dad (email + password)
- Today screen with quick-add buttons for positive/negative actions and optional comments
- Weekly summary with reward guidance based on totals
- 30-day history feed with who added each entry
- Firebase email/password auth + realtime Firestore sync

## Getting Started
1. Install deps: `npm install` (Expo CLI required globally)
2. Create a `.env` or configure Expo vars with:
```
EXPO_PUBLIC_FIREBASE_API_KEY=...
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=...
EXPO_PUBLIC_FIREBASE_PROJECT_ID=...
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=...
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
EXPO_PUBLIC_FIREBASE_APP_ID=...
```
3. Run the app: `npm start` then launch iOS/Android or web.

## Firebase
- Collections: `points`, `weekly_summaries`, `users`
- Firestore rules: see [`firebase.rules`](firebase.rules)

## Project Structure
- `App.js` – entry point with navigation
- `src/navigation` – auth + tab navigation
- `src/screens` – Auth, Today, Week, History
- `src/components` – reusable UI parts
- `src/services` – Firebase auth/points helpers
- `src/hooks` – realtime data hooks
- `src/utils` – point rules/rewards
