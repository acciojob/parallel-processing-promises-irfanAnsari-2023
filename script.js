//your JS code here. If required.
function downloadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;

        img.onload = () => resolve(img); // Resolve when the image loads successfully
        img.onerror = () => reject(`Failed to load image: ${url}`); // Reject if loading fails
    });
}

async function downloadImages(imageUrls) {
    const outputDiv = document.getElementById("output");
    const errorDiv = document.getElementById("error");
    const loadingDiv = document.getElementById("loading");

    // Clear previous results
    outputDiv.innerHTML = "";
    errorDiv.innerHTML = "";
    loadingDiv.style.display = "block"; // Show loading spinner

    try {
        // Create an array of image download promises
        const imagePromises = imageUrls.map(downloadImage);

        // Wait for all images to download
        const images = await Promise.all(imagePromises);

        // Hide loading spinner
        loadingDiv.style.display = "none";

        // Append images to the output div
        images.forEach(img => outputDiv.appendChild(img));

    } catch (error) {
        // Hide loading spinner
        loadingDiv.style.display = "none";

        // Show error message
        errorDiv.textContent = error;
    }
}

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

downloadImages(imageUrls);