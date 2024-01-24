function sendMessage() {
  var name = document.getElementById("name").value;
  var message = document.getElementById("message").value;
  var webhookURL = document.getElementById("webhook").value;
  var imageInput = document.getElementById("image");

  var formData = new FormData();
  formData.append("content", `- ${message}`);
  formData.append("username", name);
  formData.append("file", imageInput.files[0]);

  fetch(webhookURL, {
    method: "POST",
    body: formData
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    alert("Message sent!");
  })
  .catch(error => {
    alert("Error" + error.message);
  });
}