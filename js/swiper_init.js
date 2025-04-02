var swiper = new Swiper('.blog-slider', {
    passiveListeners: true,
    spaceBetween: 30,
    effect: 'fade',
    loop: true,
    autoplay: {
      disableOnInteraction: false,
      delay: 3000
    },
    mousewheel: true,
    // autoHeight: true,
    pagination: {
      el: '.blog-slider__pagination',
      clickable: true,
    },
    navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},
    on: {
      init: function() { // 确保Swiper初始化完成
        this.el.addEventListener('mouseenter', () => this.autoplay.stop());
        this.el.addEventListener('mouseleave', () => this.autoplay.start());
      }
    }
  });

if (location.pathname==='/' || location.pathname==='/index.html'){
  swiper.el.onmouseenter = function() {
  swiper.autoplay.stop();
  };
  swiper.el.onmouseleave = function() {
  swiper.autoplay.start();
  }
}
