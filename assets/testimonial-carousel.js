class TestimonialComponent extends HTMLElement {
  constructor() {
    super();
    this.slider = this.querySelector('[id^="Testimonials-"]');
    this.slidesOnDesktop = this.slider.dataset.desktopSlides;
    this.slidesOnMobile = this.slider.dataset.mobileSlides;

    if (!this.slider) return;

    this.initializeSplide();
  }

  initializeSplide() {
    const splide = new Splide( '.splide', {
      arrows: false,
      pagination: false,
      perPage: this.slidesOnDesktop,
      padding: '12px',
      gap: '12px',
      breakpoints: {
        768: {
          perPage: this.slidesOnMobile,
        },
      },
    });
    splide.mount();
  }
}

customElements.define('testimonial-component', TestimonialComponent);
