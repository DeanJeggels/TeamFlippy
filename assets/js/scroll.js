document.addEventListener("DOMContentLoaded", function() {
    const dots = document.querySelectorAll('.dot');
    const slides = document.querySelector('.image-carousel').children;
    let index = 0;

    function changeSlide() {
        index++;
        if (index === slides.length) {
            index = 0;
        }
        updateSlides();
    }

    function updateSlides() {
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.transform = `translateX(-${index * 100}%)`;
        }
        for (let i = 0; i < dots.length; i++) {
            dots[i].classList.remove('active');
        }
        dots[index].classList.add('active');
    }

    for (let i = 0; i < dots.length; i++) {
        dots[i].addEventListener('click', function() {
            index = i;
            updateSlides();
        });
    }

    setInterval(changeSlide, 2000); // Change slide every 1 second
});
