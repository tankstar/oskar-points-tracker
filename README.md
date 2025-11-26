# Oskar Points Tracker

A React Native CLI app that tracks daily points for Oskar using positive and negative actions.

## Features
- Fake email/password login screen
- Today view with quick action buttons, optional comments, and a log of today’s entries
- Week view showing totals per day and reward/penalty message
- 30-day history of all logged actions (in-memory)

## Getting started

```bash
npm install
npx react-native run-android
npx react-native run-ios
```

> **Note:** The native folders mirror the React Native CLI layout, but the Android Gradle wrapper JAR and the full Xcode project workspace are intentionally not committed in this offline environment. After installing dependencies, regenerate native tooling if needed by running `gradle wrapper` inside `android/` and installing pods from `ios/`.

