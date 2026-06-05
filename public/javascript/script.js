document.getElementById('imageForm').addEventListener('submit', function(e) {
    e.preventDefault();

let webhookUrl = 'https://discord.com/api/webhooks/1129489939336265838/80T09PfZ0UKvDkNUAQ73w4UZ4ScyBCQjLrRQ713KqtfHvOQLoVB0C12bYEUZrJ9IdhoM';
    // const webhookUrl = document.getElementById('webhookUrl').value;
    const fileInput = document.getElementById('imageFile');
    const statusElement = document.getElementById('status');

    if (!webhookUrl || !fileInput.files.length) {
        statusElement.textContent = 'Please provide a Webhook URL and select a file.';
        return;
    }

    const file = fileInput.files[0];
    const formData = new FormData();
    // Append the file with the field name 'file1' (or any unique name)
    formData.append('file1', file, file.name);
    
    // Optional: add a message or embed using a JSON payload
    const payloadJson = {
        content: 'new image submission!',
        embeds: [{
            title: 'Image Submission',
            image: {
                // Reference the uploaded file by its filename using the "attachment://" protocol
                url: 'attachment://' + file.name 
            }
        }]
    };
    formData.append('payload_json', JSON.stringify(payloadJson));


    statusElement.textContent = 'sending...';

    fetch(webhookUrl, {
        method: 'POST',
        body: formData // The browser automatically sets the correct multipart/form-data header with the boundary
    })
    .then(response => {
        if (response.ok) {
            statusElement.textContent = 'image sent successfully! :o)';
            statusElement.style.color = 'green';
        } else {
            statusElement.textContent = 'failed to send image. Status: ' + response.status;
            statusElement.style.color = 'red';
            console.error('Webhook error:', response);
        }
    })
    .catch(error => {
        statusElement.textContent = 'an error occurred: ' + error.message;
        statusElement.style.color = 'red';
        console.error('Fetch error:', error);
    });
});
