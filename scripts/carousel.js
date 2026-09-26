const carouselContent = document.querySelector('.carousel-content');
const slides = document.querySelectorAll('.carousel-card');
const prevBtn = document.querySelector('.carousel-btn--prev');
const nextBtn = document.querySelector('.carousel-btn--next');
const paginationDots = document.querySelectorAll('.slider-btn');

let currentSlide = 0;
const totalSlides = slides.length;
let touchStartX = 0;
let touchEndX = 0;

if (carouselContent && totalSlides > 0) {
  const updateCarousel = (index) => {
    console.log('Attempt to move carousel at index ', index);

    currentSlide = index;
    carouselContent.style.transform = `translateX(-${index * 100}%)`;

    if (paginationDots.length > 1) {
      paginationDots.forEach((dot, i) => dot.classList.remove('slider-btn-active'));
      paginationDots[index].classList.add('slider-btn-active');
    }
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      let nextSlide = currentSlide + 1;
      if (nextSlide > totalSlides - 1) {
        nextSlide = 0;
      }
      updateCarousel(nextSlide);
    });
  }
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      let prevSlide = currentSlide - 1;
      if (prevSlide < 0) {
        prevSlide = totalSlides - 1;
      }
      updateCarousel(prevSlide);
    });
  }
  if (paginationDots.length > 0) {
    paginationDots.forEach((dot, i) => {
      dot.setAttribute('data-slide', i);
      dot.addEventListener('click', (e) => {
        const targetSlide = e.currentTarget.getAttribute('data-slide');
        updateCarousel(targetSlide);
      });
    });
  }

  //swipe
  carouselContent.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, {passive: true});
  carouselContent.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, {passive: true});

  const handleSwipe = () => {
    const swipeThreshold = 50;
    if (touchStartX - touchEndX > swipeThreshold) {
      let nextSlide = currentSlide + 1;
      if (nextSlide > totalSlides - 1) nextSlide = 0;
      updateCarousel(nextSlide);
    }
    if (touchStartX - touchEndX < -swipeThreshold) {
      let prevSlide = currentSlide - 1;
      if (prevSlide < 0) prevSlide = totalSlides - 1;
      updateCarousel(prevSlide);
    }
  }
}