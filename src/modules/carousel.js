// карусель "Нам доверяют":
class Carousel {
  constructor({
    main,
    wrap,
    prev,
    next,
    position = 0,
    slidesToShow = 5,
    infinity = false,
    responsive = []
  }) {
    this.main = document.querySelector(main);
    this.wrap = document.querySelector(wrap);
    this.slides = this.wrap.children;
    this.prev = document.querySelector(prev);
    this.next = document.querySelector(next);
    this.slidesToShow = slidesToShow;
    this.options = {
      position,
      slideWidth: Math.floor(100 / this.slidesToShow),
      infinity,
      maxPosition: this.slides.length - this.slidesToShow
    };
    this.responsive = responsive;
  }

  init() {
    this.addStyleClass();
    this.addStyle();
    if (this.prev && this.next) {
      this.controlSlider();
    } else {
      this.addArrow();
      this.controlSlider();
    }
    if (this.responsive) {
      this.responseInit();
    }
  }

  addStyleClass() {
    this.main.classList.add('glo-slider');
    this.wrap.classList.add('glo-slider_wrap');
    for (const item of this.slides) {
      item.classList.add('glo-slider_item');
    }
  }

  addStyle() {
    let style = document.getElementById('carousel-style');
    if (!style) {
      style = document.createElement('style');
      style.id = 'carousel-style';
    }
    style.textContent = `
      .glo-slider {
        overflow: hidden !important;
        position: relative !important;
      }
      .glo-slider_wrap {
        display: flex !important;
        transition: transform 0.5s !important;
        will-change: transform !important;
      }
      .glo-slider_item {
        display: flex !important;
        align-items: center;
        justify-content: center;
        flex: 0 0 ${this.options.slideWidth}% !important;
        margin: auto 0 !important;
      }
      .glo-slider_btn {
        position: absolute;
        top: 50%;
        width: 40px;
        height: 40px;
        background: rgba(0, 0, 0, 0.4);
        color: #fff;
        border: none;
        border-radius: 50%;
        font-size: 20px;
        line-height: 20px;
      }
      .glo-slider_btn.prev {
        left: 0;
      }
      .glo-slider_btn.next {
        right: 0;
      }
      .glo-slider_btn:hover,
      .glo-slider_btn:focus {
        cursor: pointer;
        background: rgba(0, 0, 0, 0.6);
        outline: none;
      }
    `;
    document.head.append(style);
  }

  addArrow() {
    this.prev = document.createElement('button');
    this.next = document.createElement('button');
    this.prev.className = 'glo-slider_btn prev';
    this.next.className = 'glo-slider_btn next';
    this.prev.textContent = 'ᐊ';
    this.next.textContent = 'ᐅ';
    this.main.append(this.prev);
    this.main.append(this.next);
  }

  prevSlider() {
    if (this.options.infinity || this.options.position > 0) {
      --this.options.position;
      if (this.options.position < 0) {
        this.options.position = this.options.maxPosition;
      }
      this.wrap.style.transform = `translateX(-${this.options.position * this.options.slideWidth}%)`;
    }
  }

  nextSlider() {
    if (this.options.infinity || this.options.position < this.options.maxPosition) {
      ++this.options.position;
      if (this.options.position > this.options.maxPosition) {
        this.options.position = 0;
      }
      this.wrap.style.transform = `translateX(-${this.options.position * this.options.slideWidth}%)`;
    }
  }

  controlSlider() {
    this.prev.addEventListener('click', this.prevSlider.bind(this));
    this.next.addEventListener('click', this.nextSlider.bind(this));
  }

  responseInit() {
    const slidesToShowDefault = this.slidesToShow,
          allResponse = this.responsive.map(item => item.breakpoint),
          maxResponse = Math.max(...allResponse);

    const checkResponse = () => {
      const widthWindow = document.documentElement.clientWidth;
      if (widthWindow < maxResponse) {
        for (let i = 0; i < allResponse.length; i++) {
          if (widthWindow < allResponse[i]) {
            this.slidesToShow = this.responsive[i].slidesToShow;
            this.options.slideWidth = Math.floor(100 / this.slidesToShow);
            this.addStyle();
            this.options.maxPosition = this.slides.length - this.slidesToShow;
          }
        }
      } else {
        this.slidesToShow = slidesToShowDefault;
        this.options.slideWidth = Math.floor(100 / this.slidesToShow);
        this.addStyle();
      }
    };

    checkResponse();
    window.addEventListener('resize', checkResponse);
  }
}

export default Carousel;
