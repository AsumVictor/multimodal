const audio = document.getElementById('myAudio');
        const playPauseBtn = document.getElementById('playPauseBtn');
        const volumeControl = document.getElementById('volumeControl');
        const timer = document.getElementById('timer');
        const canvas = document.getElementById('waveform');
        const ctx = canvas.getContext('2d');

        // Function to toggle play/pause
        function togglePlayPause() {
            if (audio.paused || audio.ended) {
                audio.play();
                playPauseBtn.innerHTML = '&#10074;&#10074;'; // Pause symbol
            } else {
                audio.pause();
                playPauseBtn.innerHTML = '&#9658;'; // Play symbol
            }
        }

        // Function to update volume
        function updateVolume() {
            audio.volume = volumeControl.value;
        }

        // Function to update timer
        function updateTimer() {
            const minutes = Math.floor(audio.currentTime / 60);
            let seconds = Math.floor(audio.currentTime % 60);
            if (seconds < 10) {
                seconds = '0' + seconds;
            }
            timer.textContent = minutes + ':' + seconds;
        }

        // Function to draw audio waveform
        function drawWaveform() {
            const bufferLength = audio.duration * 100; // Adjust this value for more or less detailed waveform
            const dataArray = new Uint8Array(bufferLength);

            const draw = () => {
                const WIDTH = canvas.width;
                const HEIGHT = canvas.height;

                ctx.clearRect(0, 0, WIDTH, HEIGHT);
                ctx.beginPath();

                const sliceWidth = (WIDTH * 1.0) / bufferLength;
                let x = 0;

                for (let i = 0; i < bufferLength; i++) {
                    const v = dataArray[i] / 128.0;
                    const y = (v * HEIGHT) / 2;

                    if (i === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }

                    x += sliceWidth;
                }

                ctx.lineTo(canvas.width, canvas.height / 2);
                ctx.strokeStyle = 'red';
                ctx.lineWidth = 2;
                ctx.stroke();
            };

            const analyser = audioContext.createAnalyser();
            analyser.fftSize = 2048;

            const source = audioContext.createMediaElementSource(audio);
            source.connect(analyser);
            analyser.connect(audioContext.destination);

            const drawVisual = () => {
                requestAnimationFrame(drawVisual);
                analyser.getByteTimeDomainData(dataArray);
                draw();
            };

            drawVisual();
        }

        // Event listeners
        playPauseBtn.addEventListener('click', togglePlayPause);
        volumeControl.addEventListener('input', updateVolume);
        audio.addEventListener('timeupdate', updateTimer);

        // Create audio context for Web Audio API
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();

        // Update volume and timer on page load
        updateVolume();
        updateTimer();
        drawWaveform();