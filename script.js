document.addEventListener("DOMContentLoaded", function () {
    const outputDiv = document.getElementById("output");

    // Create necessary elements for loading and error messages
    const loadingDiv = document.createElement("div");
    loadingDiv.id = "loading";
    loadingDiv.textContent = "Loading images...";
    outputDiv.appendChild(loadingDiv);

    const errorDiv = document.createElement("div");
    errorDiv.id = "error";
    errorDiv.style.color = "red";
    outputDiv.appendChild(errorDiv);

    // Image URLs array
    const imageUrls = [
       { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },/ This one is intentionally invalid for error handling
    ];

    // Function to download an image
    function downloadImage(url) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = url;
            img.onload = () => resolve(img);
            img.onerror = () => reject(`Failed to load image: ${url}`);
        });
    }

    // Function to download all images using Promise.all()
    function downloadImages(urls) {
        outputDiv.appendChild(loadingDiv);
        errorDiv.textContent = ""; // Clear any previous errors

        const downloadPromises = urls.map(downloadImage);

        Promise.all(downloadPromises)
            .then((images) => {
                // Remove loading message
                loadingDiv.remove();

                // Display images
                images.forEach((img) => outputDiv.appendChild(img));
            })
            .catch((error) => {
                // Remove loading message
                loadingDiv.remove();

                // Display error message
                errorDiv.textContent = error;
            });
    }

    // Start downloading images
    downloadImages(imageUrls);
});
