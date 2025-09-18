let audioContext;
let analyser;
let mediaStreamSource;
let isListening = false;
let whistleCount = 0;
const whistleThreshold = 100;
const cooldownPeriod = 2000;
let lastWhistleTime = 0;
let wakeLock = null;

const startButton = document.getElementById('start-button');
const stopButton = document.getElementById('stop-button');
const whistleCountDisplay = document.getElementById('whistle-count');
const statusDisplay = document.getElementById('status');

async function startListening() {
    try {
        // Request microphone access
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

        // Request a screen wake lock
        if ('wakeLock' in navigator) {
            try {
                wakeLock = await navigator.wakeLock.request('screen');
                console.log('Wake Lock active!');
            } catch (err) {
                console.error(`${err.name}, ${err.message}`);
            }
        }

        // Create an AudioContext and connect to the microphone stream
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        mediaStreamSource = audioContext.createMediaStreamSource(stream);
        mediaStreamSource.connect(analyser);

        // Set up the analyser to get real-time audio data
        analyser.fftSize = 256;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        isListening = true;
        statusDisplay.textContent = "Listening for whistles...";
        startButton.style.display = 'none';
        stopButton.style.display = 'inline-block';

        function analyzeAudio() {
            if (!isListening) {
                return;
            }

            analyser.getByteFrequencyData(dataArray);

            const averageVolume = dataArray.reduce((sum, value) => sum + value, 0) / bufferLength;

            const currentTime = Date.now();
            if (averageVolume > whistleThreshold && (currentTime - lastWhistleTime) > cooldownPeriod) {
                whistleCount++;
                whistleCountDisplay.textContent = whistleCount;
                lastWhistleTime = currentTime;
                statusDisplay.textContent = `Whistle detected! Total: ${whistleCount}`;
            }

            requestAnimationFrame(analyzeAudio);
        }

        analyzeAudio();

    } catch (err) {
        console.error('Error accessing microphone:', err);
        statusDisplay.textContent = "Microphone access denied. Please grant permission.";
        startButton.style.display = 'inline-block';
        stopButton.style.display = 'none';
    }
}

function stopListening() {
    isListening = false;

    // Release the wake lock
    if (wakeLock) {
        wakeLock.release();
        wakeLock = null;
        console.log('Wake Lock released.');
    }

    if (mediaStreamSource) {
        const tracks = mediaStreamSource.mediaStream.getTracks();
        tracks.forEach(track => track.stop());
    }
    if (audioContext) {
        audioContext.close();
    }
    statusDisplay.textContent = "Listening stopped.";
    startButton.style.display = 'inline-block';
    stopButton.style.display = 'none';
}

startButton.addEventListener('click', startListening);
stopButton.addEventListener('click', stopListening);
