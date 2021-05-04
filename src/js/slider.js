'use strict';

export function Slider(settings) {

  const privates = {};

  privates.setting = settings;
  privates.sel = {
    'main': document.querySelector(privates.setting.main),
    'wrap': document.querySelector(privates.setting.wrap),
    'slides': document.querySelector(privates.setting.wrap).children,
    'prev': document.querySelector(privates.setting.prev),
    'next': document.querySelector(privates.setting.next)
  };

  privates.opt = {
    'position': 0,
    'leftSlidePosition': 0, //Shows the number of slides under wrapper left side
    'maxPosition': document.querySelector(privates.setting.wrap).children.length,
    'fixed': privates.setting.fixed ? true : false,
    'moveDirection': privates.setting.moveDirection ? privates.setting.moveDirection : 'X',
    'transitionDuration': privates.setting.transitionDuration ? privates.setting.transitionDuration : 500,
  };

  const shift = privates.opt.moveDirection === 'X' ?
    privates.sel.slides[1].offsetLeft - privates.sel.slides[0].offsetLeft :
    privates.sel.slides[1].offsetTop - privates.sel.slides[0].offsetTop;
  const spaceBetween = privates.opt.moveDirection === 'X' ?
    shift - privates.sel.slides[0].offsetWidth :
    shift - privates.sel.slides[0].offsetHeight;

  privates.opt.shift = shift;
  privates.opt.rightSlidePosition = privates.opt.moveDirection === 'X' ?
    Math.round((privates.sel.main.clientWidth + spaceBetween) / shift) :
    Math.round((privates.sel.main.clientHeight + spaceBetween) / shift);

  function onPrevButtonClick() {
    this.prevSlide();
    window.setTimeout(() => privates.sel.prev.addEventListener('click', onPrevButtonClick.bind(this), { once: true }), privates.opt.transitionDuration + 50);

  }
  function onNextButtonClick() {
    this.nextSlide();
    window.setTimeout(() => privates.sel.next.addEventListener('click', onNextButtonClick.bind(this), { once: true }), privates.opt.transitionDuration + 50);

  }

  // Control
  if (privates.sel.prev) {
    privates.sel.prev.addEventListener('click', onPrevButtonClick.bind(this), { once: true });
  }
  if (privates.sel.next) {
    privates.sel.next.addEventListener('click', onNextButtonClick.bind(this), { once: true });
  }



  /* Public methods */
  // Prev slide
  this.prevSlide = () => {
    const lastSlideIndex = privates.sel.slides.length - 1;
    function showSlide() {
      privates.sel.wrap.style.transitionDuration = `${privates.opt.transitionDuration}ms`;
      privates.sel.wrap.style.transform = `translate${privates.opt.moveDirection}(0)`;
    }

    function onEndTransition(evt) {
      if (evt.propertyName !== 'transform') return;
      privates.sel.slides[lastSlideIndex + 1].remove();
      privates.sel.wrap.removeEventListener('transitionend', onEndTransition);
    }

    if (privates.opt.leftSlidePosition <= 0) {
      if (privates.opt.fixed) return;

      const addSlide = privates.sel.slides[lastSlideIndex].cloneNode(true);
      privates.sel.wrap.style.transitionDuration = '0s';
      privates.sel.wrap.insertBefore(addSlide, privates.sel.slides[0]);
      privates.sel.wrap.style.transform = `translate${privates.opt.moveDirection}(-${privates.opt.shift}px)`;
      window.setTimeout(showSlide, 0);
      privates.sel.wrap.addEventListener('transitionend', onEndTransition);
      return;
    }

    privates.opt.rightSlidePosition--;
    privates.opt.leftSlidePosition--;
    privates.sel.wrap.style.transitionDuration = `${privates.opt.transitionDuration}ms`;
    privates.sel.wrap.style.transform = `translate${privates.opt.moveDirection}(-${privates.opt.shift * privates.opt.leftSlidePosition}px)`;
  };


  // Next slide
  this.nextSlide = () => {
    // console.log('rightSlidePosition', privates.opt.rightSlidePosition);
    // console.log('maxPosition', privates.opt.maxPosition);
    // console.log('main.clientWidth', privates.sel.main.clientWidth);
    // console.log('shift', privates.opt.shift);
    // console.log('spaceBetween', spaceBetween);
    // console.log('privates.opt.moveDirection', privates.opt.moveDirection);
    // console.log('pr', privates);


    function deleteSlide(evt) {
      privates.sel.wrap.style.transitionDuration = '0s';
      privates.sel.slides[0].remove();
      privates.sel.wrap.style.transform = `translate${privates.opt.moveDirection}(-${privates.opt.shift * privates.opt.leftSlidePosition}px)`;
    }

    function onEndTransition(evt) {
      if (evt.propertyName !== 'transform') return;
      deleteSlide();
      privates.sel.wrap.removeEventListener('transitionend', onEndTransition);
    }

    if (privates.opt.rightSlidePosition === privates.opt.maxPosition) {
      if (privates.opt.fixed) return;
      const addSlide = privates.sel.slides[0].cloneNode(true);
      privates.sel.wrap.appendChild(addSlide);
      privates.sel.wrap.style.transitionDuration = `${privates.opt.transitionDuration}ms`;
      privates.sel.wrap.style.transform = `translate${privates.opt.moveDirection}(-${privates.opt.shift * (1 + privates.opt.leftSlidePosition)}px)`;
      privates.sel.wrap.addEventListener('transitionend', onEndTransition);
      return;
    }

    privates.opt.rightSlidePosition++;
    privates.opt.leftSlidePosition++;
    privates.sel.wrap.style.transitionDuration = `${privates.opt.transitionDuration}ms`;
    privates.sel.wrap.style.transform = `translate${privates.opt.moveDirection}(-${privates.opt.shift * privates.opt.leftSlidePosition}px)`;

  };

}

export function SliderWithTimer(settings) {
  const slider = new Slider({
    'main': settings.main,
    'wrap': settings.wrap,
    'prev': settings.prev,
    'next': settings.next
  });

  const privates = {};
  let currentTimer;

  privates.setting = settings;
  privates.sel = {
    'wrap': document.querySelector(privates.setting.wrap),
    'prev': document.querySelector(privates.setting.prev),
    'next': document.querySelector(privates.setting.next),
  };
  privates.opt = {
    'timerInterval': settings.timerInterval,
    'timerStopDuration': settings.timerStopDuration,
  };

  function moveSlide() {
    slider.nextSlide();
    currentTimer = window.setTimeout(moveSlide, privates.opt.timerInterval);
  }

  function onNextClick() {
    if (currentTimer) {
      window.clearTimeout(currentTimer);
    }
    currentTimer = window.setTimeout(moveSlide, privates.opt.timerStopDuration);
  }

  privates.sel.prev.addEventListener('click', onNextClick);
  privates.sel.next.addEventListener('click', onNextClick);
  privates.sel.wrap.addEventListener('click', onNextClick);
  currentTimer = window.setTimeout(moveSlide, privates.opt.timerInterval);

}



