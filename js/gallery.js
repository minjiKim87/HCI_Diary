function loadRandomImages() {
  var totalImages = 10;
  var selectedImages = [];
  while (selectedImages.length < 3) {
    var randomNumber = Math.floor(Math.random() * totalImages) + 1;
    var imagePath = "images/photo/photo (" + randomNumber + ").jpg";
    if (!selectedImages.includes(imagePath)) {
      selectedImages.push(imagePath);
    }
  }
  return selectedImages;
}

function displayImages(imagePaths) {
  var gallery = document.getElementById("gallery");
  imagePaths.forEach(function (path) {
    var img = document.createElement("img");
    img.src = path;
    img.classList.add("gallery-item");
    img.alt = "Random Image";
    img.addEventListener("click", function () {
      document.getElementById("mainPhoto").src = this.src;
    });
    gallery.appendChild(img);
  });
}

window.onload = function () {
  var randomImages = loadRandomImages();
  displayImages(randomImages);
  document.getElementById("mainPhoto").src = randomImages[0];
};
