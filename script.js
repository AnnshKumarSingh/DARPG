//Option 1(speech to text)

document.getElementById('transcript').addEventListener('click', function () {
    const textarea = document.getElementById('textarea');
    const container = document.getElementById('container');
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();

    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    let fullTranscript = '';

    recognition.onresult = function (event) {
        const transcript = event.results[0][0].transcript;
        fullTranscript += transcript + ' ';
    };

    recognition.onend = function () {
        textarea.value = fullTranscript.trim();
        container.innerHTML = "<p>" + fullTranscript.trim() + "</p>";
    };

    recognition.start();
});

//Option 2(.mp3 to text)

document.getElementById('upload').addEventListener('click', function () {
    convertAudioToText();
});

function convertAudioToText() {
    const audioFileInput = document.getElementById('audioFileInput');
    const textarea = document.getElementById('textarea2');

    if (audioFileInput.files.length > 0) {
        const audioFile = audioFileInput.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            const audioData = e.target.result;
            recognizeSpeech(audioData, textarea);
        };

        reader.readAsArrayBuffer(audioFile);
    } else {
        alert('Please select an audio file.');
    }
}

function recognizeSpeech(audioData, textarea) {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    audioContext.decodeAudioData(audioData, function (buffer) {
        const audioSource = audioContext.createBufferSource();
        audioSource.buffer = buffer;

        const speechRecognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        speechRecognition.lang = 'en-US';

        speechRecognition.onresult = function (event) {
            const transcript = event.results[0][0].transcript;
            textarea.value = transcript;
        };

        audioSource.connect(audioContext.destination);
        audioSource.start();

        speechRecognition.start();
    }, function (err) {
        console.error('Error decoding audio file', err);
    });
}
