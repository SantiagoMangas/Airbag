const images = [
  "imagenes/portada.jpg",
  "imagenes/portada2.png",
  "imagenes/portada3.png",
  "imagenes/portada4.png",
  "imagenes/portada5.png",
  "imagenes/portada6.png",
]

let index = 0
let showingFirst = true
let autoplayInterval

const img1 = document.getElementById("slider-img-1")
const img2 = document.getElementById("slider-img-2")

function updateSlider() {
  const nextImage = new Image()
  nextImage.src = images[index]

  nextImage.onload = () => {
    if (showingFirst) {
      img2.src = nextImage.src
      img2.classList.add("active")
      img1.classList.remove("active")
    } else {
      img1.src = nextImage.src
      img1.classList.add("active")
      img2.classList.remove("active")
    }
    showingFirst = !showingFirst
  }

  nextImage.onerror = () => {
    console.warn(`Error loading image: ${images[index]}`)
    nextImage()
  }
}

function nextImage() {
  index = (index + 1) % images.length
  updateSlider()
}

function prevImage() {
  index = (index - 1 + images.length) % images.length
  updateSlider()
}

function startAutoplay() {
  autoplayInterval = setInterval(nextImage, 6000)
}

function stopAutoplay() {
  if (autoplayInterval) {
    clearInterval(autoplayInterval)
    autoplayInterval = null
  }
}

function handleVisibilityChange() {
  if (document.hidden) {
    stopAutoplay()
  } else {
    startAutoplay()
  }
}

function toggleMobileMenu() {
  const navMenu = document.querySelector(".nav-menu")
  const toggle = document.querySelector(".mobile-menu-toggle")

  navMenu.classList.toggle("active")
  toggle.classList.toggle("active")

  const isExpanded = toggle.getAttribute("aria-expanded") === "true"
  toggle.setAttribute("aria-expanded", !isExpanded)
}

function smoothScroll(target) {
  const element = document.querySelector(target)
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }
}

function lazyLoadIframes() {
  const iframes = document.querySelectorAll('iframe[loading="lazy"]')

  const iframeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const iframe = entry.target
        if (iframe.dataset.src) {
          iframe.src = iframe.dataset.src
          iframe.removeAttribute("data-src")
        }
        iframeObserver.unobserve(iframe)
      }
    })
  })

  iframes.forEach((iframe) => {
    iframeObserver.observe(iframe)
  })
}

function handleReducedMotion() {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")

  if (prefersReducedMotion.matches) {
    stopAutoplay()
    document.documentElement.style.setProperty("--animation-duration", "0.1s")
  }
}

document.addEventListener("DOMContentLoaded", () => {
  updateSlider()
  startAutoplay()

  document.addEventListener("visibilitychange", handleVisibilityChange)

  handleReducedMotion()

  if ("IntersectionObserver" in window) {
    lazyLoadIframes()
  }

  const mobileToggle = document.querySelector(".mobile-menu-toggle")
  if (mobileToggle) {
    mobileToggle.addEventListener("click", toggleMobileMenu)
  }

  const navLinks = document.querySelectorAll('.nav-item[href^="#"]')
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const target = link.getAttribute("href")
      smoothScroll(target)
    })
  })

  const arrows = document.querySelectorAll(".arrow")
  arrows.forEach((arrow) => {
    arrow.addEventListener("click", () => {
      stopAutoplay()
      setTimeout(startAutoplay, 10000)
    })
  })

  document.addEventListener("keydown", (e) => {
    if (e.target.closest(".slider")) {
      if (e.key === "ArrowLeft") {
        prevImage()
        stopAutoplay()
        setTimeout(startAutoplay, 10000)
      } else if (e.key === "ArrowRight") {
        nextImage()
        stopAutoplay()
        setTimeout(startAutoplay, 10000)
      }
    }
  })
})

if (window.matchMedia) {
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
  mediaQuery.addListener(handleReducedMotion)
}

const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
}

const animationObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const element = entry.target
    if (entry.isIntersecting) {
      element.style.animationPlayState = "running"
    } else {
      element.style.animationPlayState = "paused"
    }
  })
}, observerOptions)

document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(".slider-discos-track, .gira-track, .merch-track")
  animatedElements.forEach((element) => {
    animationObserver.observe(element)
  })
})

function handleImageError(img) {
  img.style.display = "none"
  console.warn(`Failed to load image: ${img.src}`)
}

document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll("img")
  images.forEach((img) => {
    img.addEventListener("error", () => handleImageError(img))
  })
})

const track = document.querySelector(".slider-discos-track")
const items = document.querySelectorAll(".slider-discos-track .disco")
const total = items.length
const visible = 4

function updateSliderDiscos() {
  const discoWidth = items[0].offsetWidth + 40
  const maxIndex = total - visible
  if (index > maxIndex) index = 0

  track.style.transform = `translateX(-${index * discoWidth}px)`
  index++
}

setInterval(updateSliderDiscos, 4000)