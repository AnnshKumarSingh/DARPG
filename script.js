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
