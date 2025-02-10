#!/bin/sh

FIREBASE_ENV=$1
cp -rf "./firebase/${FIREBASE_ENV}/google-services.json" "./android/app"
cp -rf "./firebase/${FIREBASE_ENV}/GoogleService-Info.plist" ios

echo "$1 config used"