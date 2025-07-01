// Funcionalidad del slider de imágenes (original)
let currentImage = 1
const totalImages = 2

function nextImage() {
  const currentImg = document.getElementById(`slider-img-${currentImage}`)
  currentImg.classList.remove("active")

  currentImage = currentImage === totalImages ? 1 : currentImage + 1

  const nextImg = document.getElementById(`slider-img-${currentImage}`)
  nextImg.classList.add("active")
}

function prevImage() {
  const currentImg = document.getElementById(`slider-img-${currentImage}`)
  currentImg.classList.remove("active")

  currentImage = currentImage === 1 ? totalImages : currentImage - 1

  const prevImg = document.getElementById(`slider-img-${currentImage}`)
  prevImg.classList.add("active")
}

// Auto-play del slider
setInterval(nextImage, 5000)

// Funcionalidad del menú móvil
document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
  const mobileMenuOverlay = document.querySelector(".mobile-menu-overlay")
  const mobileMenuClose = document.querySelector(".mobile-menu-close")
  const mobileNavItems = document.querySelectorAll(".mobile-nav-item")
  const body = document.body

  // Función para abrir el menú móvil
  function openMobileMenu() {
    mobileMenuToggle.classList.add("active")
    mobileMenuOverlay.classList.add("active")
    mobileMenuToggle.setAttribute("aria-expanded", "true")
    body.style.overflow = "hidden" // Prevenir scroll del body
  }

  // Función para cerrar el menú móvil
  function closeMobileMenu() {
    mobileMenuToggle.classList.remove("active")
    mobileMenuOverlay.classList.remove("active")
    mobileMenuToggle.setAttribute("aria-expanded", "false")
    body.style.overflow = "" // Restaurar scroll del body
  }

  // Event listeners
  mobileMenuToggle.addEventListener("click", () => {
    if (mobileMenuOverlay.classList.contains("active")) {
      closeMobileMenu()
    } else {
      openMobileMenu()
    }
  })

  mobileMenuClose.addEventListener("click", closeMobileMenu)

  // Cerrar menú al hacer click en un enlace
  mobileNavItems.forEach((item) => {
    item.addEventListener("click", closeMobileMenu)
  })

  // Cerrar menú al hacer click fuera del contenido
  mobileMenuOverlay.addEventListener("click", (e) => {
    if (e.target === mobileMenuOverlay) {
      closeMobileMenu()
    }
  })

  // Cerrar menú con la tecla Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileMenuOverlay.classList.contains("active")) {
      closeMobileMenu()
    }
  })

  // Manejar redimensionamiento de ventana
  window.addEventListener("resize", () => {
    if (window.innerWidth > 992 && mobileMenuOverlay.classList.contains("active")) {
      closeMobileMenu()
    }
  })
})

// Funcionalidad del carrito (placeholder)
document.addEventListener("DOMContentLoaded", () => {
  const cartButtons = document.querySelectorAll(".cart")

  cartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Aquí puedes agregar la funcionalidad del carrito
      alert("Funcionalidad del carrito - Por implementar")
    })
  })
})