# Oskar Points Tracker (Expo SDK 55)

A family-friendly points tracker built with Expo Router, Firebase Auth, and Firestore. Mom and Dad can award or subtract points, see daily/weekly totals, and keep a synced 30-day history across iOS and Android using Expo Go.

## Prerequisites
- Node.js 18+
- Expo CLI (`npm install -g expo`), or run via `npx expo start`
- Firebase project with Firestore enabled

## Environment variables
Create an `.env` file (or set in your shell/CI) with Expo public prefixes so values are available on both platforms:

```
EXPO_PUBLIC_FIREBASE_API_KEY=...
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=...
EXPO_PUBLIC_FIREBASE_PROJECT_ID=...
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=...
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
EXPO_PUBLIC_FIREBASE_APP_ID=...
```

## Run the app (Expo Go)
1. Install dependencies: `npm install`
2. Start Expo: `npm run start`
3. Scan the QR code with Expo Go on iOS/Android.

## Project structure
```
app/
  _layout.js            # Root layout with providers and stack
  index.js              # Auth gate redirect
  auth.js               # Mom/Dad auth screen
  (tabs)/               # Tab navigator
    _layout.js
    today.js            # Daily buttons + comment + log
    week.js             # Weekly totals & reward rule
    history.js          # Last 30 days history
src/
  components/           # Reusable UI pieces
  firebase/config.js    # Firebase modular setup with AsyncStorage persistence
  hooks/                # Auth + points hooks
  providers/            # Context providers for auth/points
  services/             # Firestore + auth helpers
  utils/rules.js        # Point rules and reward logic
```

## Firebase security rules
See `firebase.rules` for Firestore access used by the app. Deploy with:
```
firebase deploy --only firestore:rules
```

## Notes
- Uses Expo SDK 55 and the app directory with Expo Router for modern navigation.
- Firebase Auth is configured with React Native persistence for Expo Go.
- Firestore queries stream today, week, and 30-day ranges for realtime sync.
