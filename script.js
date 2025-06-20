const images = [
  "imagenes/portada.jpg",
  "imagenes/portada2.png",
  "imagenes/portada3.png",
  "imagenes/portada4.png",
  "imagenes/portada5.png",
  "imagenes/portada6.png"
];

let index = 0;
let showingFirst = true;
const img1 = document.getElementById("slider-img-1");
const img2 = document.getElementById("slider-img-2");

function updateSlider() {
  const nextImage = new Image();
  nextImage.src = images[index];

  nextImage.onload = () => {
    if (showingFirst) {
      img2.src = nextImage.src;
      img2.classList.add("active");
      img1.classList.remove("active");
    } else {
      img1.src = nextImage.src;
      img1.classList.add("active");
      img2.classList.remove("active");
    }
    showingFirst = !showingFirst;
  };
}

function nextImage() {
  index = (index + 1) % images.length;
  updateSlider();
}

function prevImage() {
  index = (index - 1 + images.length) % images.length;
  updateSlider();
}

document.addEventListener("DOMContentLoaded", () => {
  updateSlider(); // inicializar el slider
  setInterval(nextImage, 6000); // autoplay
});

document.addEventListener("DOMContentLoaded", () => {
  // SLIDER DE DISCOS
  const track = document.querySelector(".slider-discos-track");
  const items = document.querySelectorAll(".slider-discos-track .disco");
  const total = items.length;
  const visible = 4;
  let index = 0;

  function updateSliderDiscos() {
    const discoWidth = items[0].offsetWidth + 40; // ancho + gap
    const maxIndex = total - visible;
    if (index > maxIndex) index = 0;

    track.style.transform = `translateX(-${index * discoWidth}px)`;
    index++;
  }

  setInterval(updateSliderDiscos, 4000);
});
