Tired of losing count of your pressure cooker's whistles? This simple, client-side web app is here to help you keep track of every single one, so you'll know exactly when your meal is ready. No more guesswork, no more soggy rice.

Features

    Real-time Whistle Detection: Uses your device's microphone to listen for the distinct sound of a pressure cooker whistle.

    Zero Data Collection: All audio processing happens directly in your browser. No data is stored, saved, or sent to any server, ensuring your privacy.

    Simple & Intuitive Interface: A clean design with a large counter and two buttons to start and stop listening.

    Mobile-Friendly: Designed to work on both desktop and mobile devices.

How to Use

    Clone this repository or simply download the index.html, style.css, and script.js files.

    Open index.html in a modern web browser like Chrome, Firefox, or Safari.

    Click "Start Listening." Your browser will ask for microphone permission. You must grant this for the app to work.

    Place your device near the pressure cooker.

    Watch the magic happen as the counter increments with each whistle.

Customization

The core logic is in script.js. You can easily adjust the whistleThreshold value to better suit the volume of your specific pressure cooker's whistle. If the counter is too sensitive and picks up background noise, try increasing this value. If it's not detecting whistles, try lowering it.
JavaScript

// A higher number means the sound has to be louder to be counted as a whistle.
const whistleThreshold = 100;

A Note on Privacy

This app is designed to be a local tool. The microphone access is used solely for real-time audio analysis within your browser. No audio data ever leaves your device. This ensures that your private conversations and kitchen sounds remain private.

Happy cooking! 🍲
