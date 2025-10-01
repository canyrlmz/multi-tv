document.getElementById('addScreen').addEventListener('click', () => {
    const urlInput = document.getElementById('streamUrl');
    const url = urlInput.value;
    const platform = document.getElementById('platformSelect').value;

    if (url) {
        if (platform === 'youtube') {
            const videoId = getYouTubeVideoId(url);
            if (videoId) {
                addScreen(`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`);
                urlInput.value = '';
            } else {
                alert('Lütfen geçerli bir YouTube video URL\'si girin.');
            }
        } else if (platform === 'kick') {
            const streamId = getKickStreamId(url);
            if (streamId) {
                addScreen(`https://player.kick.com/${streamId}?autoplay=1&mute=1`);
                urlInput.value = '';
            } else {
                alert('Lütfen geçerli bir Kick canlı yayın URL\'si girin.');
            }
        }
    }
});

function getYouTubeVideoId(url) {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

function getKickStreamId(url) {
    const regex = /kick\.com\/([a-zA-Z0-9_]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

function addScreen(embedUrl) {
    const screenContainer = document.getElementById('screenContainer');

    const screenDiv = document.createElement('div');
    screenDiv.className = 'screen';

    const iframe = document.createElement('iframe');
    iframe.src = embedUrl;
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.setAttribute('allowfullscreen', '');

    const controlsDiv = document.createElement('div');
    controlsDiv.className = 'screen-controls';
    
    const soundBtn = document.createElement('button');
    soundBtn.className = 'sound-btn';
    soundBtn.textContent = '🔇';
    let isMuted = true;
    soundBtn.addEventListener('click', () => {
        if (isMuted) {
            iframe.src = iframe.src.replace('mute=1', 'mute=0');
            soundBtn.textContent = '🔊';
            isMuted = false;
        } else {
            iframe.src = iframe.src.replace('mute=0', 'mute=1');
            soundBtn.textContent = '🔇';
            isMuted = true;
        }
    });

    const fullScreenBtn = document.createElement('button');
    fullScreenBtn.className = 'fullscreen-btn';
    fullScreenBtn.textContent = '⛶';
    fullScreenBtn.addEventListener('click', () => {
        if (screenDiv.requestFullscreen) {
            screenDiv.requestFullscreen();
        } else if (screenDiv.mozRequestFullScreen) {
            screenDiv.mozRequestFullScreen();
        } else if (screenDiv.webkitRequestFullscreen) {
            screenDiv.webkitRequestFullscreen();
        } else if (screenDiv.msRequestFullscreen) {
            screenDiv.msRequestFullscreen();
        }
    });

    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-btn';
    removeBtn.textContent = 'X';
    removeBtn.addEventListener('click', () => {
        screenDiv.remove();
    });

    controlsDiv.appendChild(soundBtn);
    controlsDiv.appendChild(fullScreenBtn);
    controlsDiv.appendChild(removeBtn);
    
    screenDiv.appendChild(iframe);
    screenDiv.appendChild(controlsDiv);
    screenContainer.appendChild(screenDiv);
}
