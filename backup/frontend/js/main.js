document.addEventListener("DOMContentLoaded", function () {
    const counterElement = document.getElementById("counter");
    
    // Replace with your deployed Function App URL
    const apiUrl = "https://brandonresumeapi.azurewebsites.net/api/GetVisitorCount";

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            counterElement.textContent = data.count;
        })
        .catch(error => {
            console.error("Error fetching visitor count:", error);
            counterElement.textContent = "N/A";
        });
});
// This script fetches the visitor count from the Azure Function and updates the counter element