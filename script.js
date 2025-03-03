var imageUrls = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.src = url;
    img.onload = () => resolve(img);
    img.onerror = () => reject(`Failed to load image: ${url}`);
  });
}

async function downloadImages() {
  document.getElementById("loading").style.display = "block";
  document.getElementById("error").innerText = "";
  document.getElementById("output").innerHTML = "";

  try {
    let images = await Promise.all(imageUrls.map(downloadImage));

    document.getElementById("loading").style.display = "none";
    images.forEach(img => document.getElementById("output").appendChild(img));
  } catch (error) {
    document.getElementById("loading").style.display = "none";
    document.getElementById("error").innerText = error;
  }
}

// Attach event listener to the button
document.getElementById("download-images-button").addEventListener("click", downloadImages);
