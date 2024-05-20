document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    let query = document.getElementById('search-query').value;
    searchYouTube(query);
});

function searchYouTube(query) {
    const apiKey = 'AIzaSyCGuYzDlnQQ4GeP49UTGLd6utcp-gTXQrU';
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${query}&key=${apiKey}`;

    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayResults(data.items);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function displayResults(videos) {
    const resultsHeading = document.getElementById('results-heading');
    resultsHeading.textContent = 'Results:';

    const resultsContainer = document.getElementById('video-results');
    resultsContainer.innerHTML = '';

    videos.forEach(video => {
        const videoItem = document.createElement('div');
        videoItem.classList.add('video-item');

        const videoId = video.id.videoId;
        const videoTitle = video.snippet.title;
        const thumbnailUrl = video.snippet.thumbnails.high.url;

        videoItem.innerHTML = `
            <img src="${thumbnailUrl}" alt="${videoTitle}" class="thumbnail">
            <p class="video-title">${videoTitle}</p>
        `;

        videoItem.addEventListener('click', () => {
            window.location.href = `./videos/video.html?id=${videoId}&title=${encodeURIComponent(videoTitle)}`;
        });

        resultsContainer.appendChild(videoItem);
    });
}